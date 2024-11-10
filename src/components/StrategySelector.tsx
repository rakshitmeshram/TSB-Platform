import React, { useState } from 'react';
import { Strategy } from '../types/trading';
import CustomStrategyModal from './CustomStrategyModal';
import { PlusCircle } from 'lucide-react';

interface StrategySelectorProps {
  strategies: Strategy[];
  selectedStrategy: Strategy;
  onStrategyChange: (strategy: Strategy) => void;
  parameters: Record<string, number>;
  onParameterChange: (key: string, value: number) => void;
  onAddStrategy: (strategy: Strategy) => void;
}

export default function StrategySelector({
  strategies,
  selectedStrategy,
  onStrategyChange,
  parameters,
  onParameterChange,
  onAddStrategy,
}: StrategySelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleParameterChange = (key: string, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    onParameterChange(key, numValue);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Strategy
          </label>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            <span className="text-sm font-medium">Custom Strategy</span>
          </button>
        </div>

        <select
          value={selectedStrategy.type}
          onChange={(e) => {
            const strategy = strategies.find(s => s.type === e.target.value);
            if (strategy) onStrategyChange(strategy);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {strategies.map((strategy) => (
            <option key={strategy.type} value={strategy.type}>
              {strategy.name}
            </option>
          ))}
        </select>
        
        <p className="mt-2 text-sm text-gray-500">
          {selectedStrategy.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedStrategy.params.map((param) => (
            <div key={param.key}>
              <label className="block text-sm font-medium text-gray-700">
                {param.name}
              </label>
              <input
                type="number"
                value={parameters[param.key] || 0}
                min={param.min}
                max={param.max}
                onChange={(e) => handleParameterChange(param.key, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      <CustomStrategyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onAddStrategy}
      />
    </div>
  );
}