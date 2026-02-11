'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  {
    name: 'Page A',
    income: 4000,
    expence: 2400,
    saving: 2400,
  },
  {
    name: 'Page B',
    income: 3000,
    expence: 1398,
    saving: 2210,
  },
  {
    name: 'Page C',
    income: 2000,
    expence: 9800,
    saving: 2290,
  },
  {
    name: 'Page D',
    income: 2780,
    expence: 3908,
    saving: 2000,
  },
  {
    name: 'Page E',
    income: 1890,
    expence: 4800,
    saving: 2181,
  },
  {
    name: 'Page F',
    income: 2390,
    expence: 3800,
    saving: 2500,
  },
  {
    name: 'Page G',
    income: 3490,
    expence: 4300,
    saving: 2100,
  },
];

// #endregion
const BiaxialBarChart = () => {
  return (
    <BarChart
      style={{ width: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" width="auto" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" width="auto" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="income" fill="#8884d8" />
      <Bar yAxisId="right" dataKey="expence" fill="#82ca9d" />
      <RechartsDevtools />
    </BarChart>
  );
};

export default BiaxialBarChart;