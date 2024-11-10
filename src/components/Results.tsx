import React from 'react';
import { BacktestResult } from '../types/trading';
import { TrendingUp, TrendingDown, BarChart2, Activity } from 'lucide-react';

export default function Results({ results }: { results: BacktestResult }) {
  const stats = [
    {
      label: 'Win Rate',
      value: `${results.winRate.toFixed(2)}%`,
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      label: 'Total Profit',
      value: `$${results.totalProfit.toFixed(2)}`,
      icon: BarChart2,
      color: results.totalProfit >= 0 ? 'text-green-600' : 'text-red-600',
    },
    {
      label: 'Max Drawdown',
      value: `$${results.maxDrawdown.toFixed(2)}`,
      icon: TrendingDown,
      color: 'text-red-600',
    },
    {
      label: 'Total Trades',
      value: results.totalTrades,
      icon: Activity,
      color: 'text-blue-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}