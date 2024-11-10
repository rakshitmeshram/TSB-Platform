import React, { useState, useEffect, useRef } from 'react';
import { Settings, RefreshCw } from 'lucide-react';
import Chart from './components/Chart';
import Results from './components/Results';
import TradeList from './components/TradeList';
import StrategySelector from './components/StrategySelector';
import ShareReport from './components/ShareReport';
import { backtestStrategy, calculateSMA } from './utils/backtest';
import { PriceData, BacktestResult, Strategy } from './types/trading';
import { STRATEGIES } from './utils/strategies';

const generateMockData = (days: number): PriceData[] => {
  const data: PriceData[] = [];
  let price = 100;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    price += (Math.random() - 0.5) * 2;
    data.push({
      date: date.toISOString().split('T')[0],
      price: Number(price.toFixed(2))
    });
  }
  
  return data;
};

const initializeParameters = (strategy: Strategy): Record<string, number> => {
  const params: Record<string, number> = {};
  strategy.params.forEach(param => {
    params[param.key] = param.default;
  });
  return params;
};

function App() {
  const [historicalData, setHistoricalData] = useState<PriceData[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>(STRATEGIES);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy>(STRATEGIES[0]);
  const [parameters, setParameters] = useState<Record<string, number>>(() => 
    initializeParameters(STRATEGIES[0])
  );
  const [results, setResults] = useState<BacktestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = generateMockData(100);
    setHistoricalData(data);
  }, []);

  useEffect(() => {
    setParameters(initializeParameters(selectedStrategy));
  }, [selectedStrategy]);

  const handleAddStrategy = (newStrategy: Strategy) => {
    setStrategies([...strategies, newStrategy]);
    setSelectedStrategy(newStrategy);
  };

  const runBacktest = () => {
    setIsLoading(true);
    setTimeout(() => {
      const result = backtestStrategy(historicalData, selectedStrategy, parameters);
      setResults(result);
      setIsLoading(false);
    }, 500);
  };

  const prices = historicalData.map(d => d.price);
  const shortPeriod = parameters.shortPeriod || parameters.period || parameters.fastPeriod || 10;
  const longPeriod = parameters.longPeriod || parameters.slowPeriod || 20;
  
  const shortSMA = calculateSMA(prices, shortPeriod);
  const longSMA = calculateSMA(prices, longPeriod);
  
  const paddedShortSMA = Array(shortPeriod - 1).fill(null).concat(shortSMA);
  const paddedLongSMA = Array(longPeriod - 1).fill(null).concat(longSMA);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Trading Strategy Backtester</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <StrategySelector
            strategies={strategies}
            selectedStrategy={selectedStrategy}
            onStrategyChange={setSelectedStrategy}
            parameters={parameters}
            onParameterChange={(key, value) => 
              setParameters(prev => ({ ...prev, [key]: value }))
            }
            onAddStrategy={handleAddStrategy}
          />
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={runBacktest}
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <RefreshCw className="animate-spin h-5 w-5 mr-2" />
              ) : (
                'Run Backtest'
              )}
            </button>
            {results && (
              <ShareReport
                strategy={selectedStrategy}
                results={results}
                parameters={parameters}
                chartRef={chartRef}
              />
            )}
          </div>
        </div>

        {results && <Results results={results} />}
        
        <div className="mb-8" ref={chartRef}>
          <Chart 
            data={historicalData}
            shortSMA={paddedShortSMA}
            longSMA={paddedLongSMA}
          />
        </div>

        {results && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Trade History</h2>
            <TradeList trades={results.trades} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;