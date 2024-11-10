import { Trade, PriceData, BacktestResult, Strategy } from '../types/trading';

export function calculateSMA(prices: number[], period: number): number[] {
  const sma: number[] = [];
  for (let i = period - 1; i < prices.length; i++) {
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    sma.push(sum / period);
  }
  return sma;
}

export function executeStrategy(
  data: PriceData[],
  strategy: Strategy,
  parameters: Record<string, number>
): Trade[] {
  if (strategy.code) {
    try {
      const strategyFn = new Function('data', 'params', strategy.code);
      return strategyFn(data, parameters);
    } catch (error) {
      console.error('Error executing custom strategy:', error);
      return [];
    }
  }

  // Default SMA crossover strategy
  const prices = data.map(d => d.price);
  const shortPeriod = parameters.shortPeriod || parameters.period || parameters.fastPeriod || 10;
  const longPeriod = parameters.longPeriod || parameters.slowPeriod || 20;
  
  const shortSMA = calculateSMA(prices, shortPeriod);
  const longSMA = calculateSMA(prices, longPeriod);
  
  const trades: Trade[] = [];
  let inPosition = false;
  let entryPrice = 0;
  let entryDate = '';
  
  const offset = Math.max(shortPeriod, longPeriod) - 1;
  
  for (let i = 1; i < shortSMA.length; i++) {
    const prevShort = shortSMA[i - 1];
    const prevLong = longSMA[i - 1];
    const currShort = shortSMA[i];
    const currLong = longSMA[i];
    
    if (prevShort <= prevLong && currShort > currLong && !inPosition) {
      inPosition = true;
      entryPrice = prices[i + offset];
      entryDate = data[i + offset].date;
    }
    else if (prevShort >= prevLong && currShort < currLong && inPosition) {
      const exitPrice = prices[i + offset];
      trades.push({
        entryDate,
        exitDate: data[i + offset].date,
        entryPrice,
        exitPrice,
        profit: exitPrice - entryPrice,
        type: 'LONG'
      });
      inPosition = false;
    }
  }

  return trades;
}

export function backtestStrategy(
  data: PriceData[],
  strategy: Strategy,
  parameters: Record<string, number>
): BacktestResult {
  const trades = executeStrategy(data, strategy, parameters);
  
  const profits = trades.map(t => t.profit);
  const winningTrades = trades.filter(t => t.profit > 0);
  const totalProfit = profits.reduce((sum, profit) => sum + profit, 0);
  
  let maxDrawdown = 0;
  let peak = -Infinity;
  let runningTotal = 0;
  
  profits.forEach(profit => {
    runningTotal += profit;
    if (runningTotal > peak) peak = runningTotal;
    const drawdown = peak - runningTotal;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;
  });

  return {
    trades,
    winRate: trades.length ? (winningTrades.length / trades.length) * 100 : 0,
    totalProfit,
    maxDrawdown,
    profitFactor: trades.filter(t => t.profit < 0).reduce((sum, t) => sum + t.profit, 0) === 0 
      ? Infinity 
      : Math.abs(
          winningTrades.reduce((sum, t) => sum + t.profit, 0) /
          trades.filter(t => t.profit < 0).reduce((sum, t) => sum + t.profit, 0)
        ),
    totalTrades: trades.length
  };
}