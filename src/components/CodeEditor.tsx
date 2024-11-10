import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export default function CodeEditor({ code, onChange }: CodeEditorProps) {
  return (
    <div className="relative">
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 font-mono text-sm p-4 bg-gray-50 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        spellCheck="false"
        placeholder={`// Write your strategy logic here
// Example:
function execute(data, params) {
  const trades = [];
  let inPosition = false;
  let entryPrice = 0;
  let entryDate = '';

  // Access your custom parameters
  const { period, threshold } = params;

  for (let i = period; i < data.length; i++) {
    // Your trading logic here
    // Return array of trades with:
    // { entryDate, exitDate, entryPrice, exitPrice, type: 'LONG' | 'SHORT' }
  }

  return trades;
}`}
      />
    </div>
  );
}