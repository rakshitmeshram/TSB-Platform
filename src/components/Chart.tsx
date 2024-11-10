import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PriceData } from '../types/trading';

interface ChartProps {
  data: PriceData[];
  shortSMA: number[];
  longSMA: number[];
}

export default function Chart({ data, shortSMA, longSMA }: ChartProps) {
  const chartData = data.map((d, i) => ({
    date: d.date,
    price: d.price,
    shortSMA: shortSMA[i],
    longSMA: longSMA[i],
  }));

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#2563eb" dot={false} name="Price" />
          <Line type="monotone" dataKey="shortSMA" stroke="#dc2626" dot={false} name="Short SMA" />
          <Line type="monotone" dataKey="longSMA" stroke="#16a34a" dot={false} name="Long SMA" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}