export interface Trade {
  entryDate: string;
  exitDate: string;
  entryPrice: number;
  exitPrice: number;
  profit: number;
  type: 'LONG' | 'SHORT';
}

export interface BacktestResult {
  trades: Trade[];
  winRate: number;
  totalProfit: number;
  maxDrawdown: number;
  profitFactor: number;
  totalTrades: number;
}

export interface PriceData {
  date: string;
  price: number;
}

export type StrategyType = 'SMA_CROSSOVER' | 'RSI' | 'MACD' | string;

export interface StrategyParam {
  name: string;
  key: string;
  type: 'number';
  default: number;
  min?: number;
  max?: number;
}

export interface Strategy {
  type: StrategyType;
  name: string;
  description: string;
  params: StrategyParam[];
  code?: string;
}