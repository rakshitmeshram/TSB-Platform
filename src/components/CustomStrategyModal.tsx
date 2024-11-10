import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Strategy, StrategyParam } from '../types/trading';
import CodeEditor from './CodeEditor';

interface CustomStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (strategy: Strategy) => void;
}

export default function CustomStrategyModal({ isOpen, onClose, onSave }: CustomStrategyModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [params, setParams] = useState<StrategyParam[]>([
    {
      name: 'Period',
      key: 'period',
      type: 'number',
      default: 14,
      min: 2,
      max: 100
    }
  ]);

  const handleAddParam = () => {
    setParams([...params, {
      name: '',
      key: '',
      type: 'number',
      default: 0,
      min: 0,
      max: 100
    }]);
  };

  const handleRemoveParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const handleParamChange = (index: number, field: keyof StrategyParam, value: any) => {
    const newParams = [...params];
    newParams[index] = { ...newParams[index], [field]: value };
    if (field === 'name') {
      newParams[index].key = value.toLowerCase().replace(/\s+/g, '_');
    }
    setParams(newParams);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Test if the code is valid JavaScript
      new Function('data', 'params', code);
      
      const customStrategy: Strategy = {
        type: `CUSTOM_${Date.now()}`,
        name,
        description,
        params,
        code
      };
      onSave(customStrategy);
      onClose();
      resetForm();
    } catch (error) {
      alert('Invalid JavaScript code. Please check your strategy implementation.');
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCode('');
    setParams([{ name: 'Period', key: 'period', type: 'number', default: 14, min: 2, max: 100 }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Custom Strategy</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Strategy Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Parameters</h3>
              <button
                type="button"
                onClick={handleAddParam}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Parameter
              </button>
            </div>

            <div className="space-y-4">
              {params.map((param, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={param.name}
                      onChange={(e) => handleParamChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Default Value</label>
                    <input
                      type="number"
                      value={param.default}
                      onChange={(e) => handleParamChange(index, 'default', Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Min</label>
                    <input
                      type="number"
                      value={param.min}
                      onChange={(e) => handleParamChange(index, 'min', Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Max</label>
                    <input
                      type="number"
                      value={param.max}
                      onChange={(e) => handleParamChange(index, 'max', Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  {params.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveParam(index)}
                      className="mt-6 text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Strategy Code</label>
            <CodeEditor code={code} onChange={setCode} />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Strategy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}