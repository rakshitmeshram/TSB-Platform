import { Strategy } from '../types/trading';

export const STRATEGIES: Strategy[] = [
  {
    type: 'SMA_CROSSOVER',
    name: 'Moving Average Crossover',
    description: 'Generates signals based on crossovers between short and long moving averages',
    params: [
      {
        name: 'Short SMA Period',
        key: 'shortPeriod',
        type: 'number',
        default: 10,
        min: 2,
        max: 50
      },
      {
        name: 'Long SMA Period',
        key: 'longPeriod',
        type: 'number',
        default: 20,
        min: 5,
        max: 200
      }
    ]
  },
  {
    type: 'RSI',
    name: 'Relative Strength Index',
    description: 'Generates signals based on overbought and oversold conditions',
    params: [
      {
        name: 'RSI Period',
        key: 'period',
        type: 'number',
        default: 14,
        min: 2,
        max: 50
      },
      {
        name: 'Overbought Level',
        key: 'overbought',
        type: 'number',
        default: 70,
        min: 50,
        max: 90
      },
      {
        name: 'Oversold Level',
        key: 'oversold',
        type: 'number',
        default: 30,
        min: 10,
        max: 50
      }
    ]
  },
  {
    type: 'MACD',
    name: 'MACD',
    description: 'Generates signals based on MACD line crossovers',
    params: [
      {
        name: 'Fast Period',
        key: 'fastPeriod',
        type: 'number',
        default: 12,
        min: 2,
        max: 50
      },
      {
        name: 'Slow Period',
        key: 'slowPeriod',
        type: 'number',
        default: 26,
        min: 5,
        max: 100
      },
      {
        name: 'Signal Period',
        key: 'signalPeriod',
        type: 'number',
        default: 9,
        min: 2,
        max: 50
      }
    ]
  }
];