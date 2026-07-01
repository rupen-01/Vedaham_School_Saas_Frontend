import React from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  chart: { id: 'revenue-trend', toolbar: { show: false } },
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
  colors: ['#6C63FF'],
  stroke: { curve: 'smooth', width: 3 },
  grid: { borderColor: '#f1f5f9' },
  dataLabels: { enabled: false },
};
const series = [{ name: 'Revenue', data: [12000, 15000, 14000, 18000, 20000, 22000, 25000] }];

const RevenueLineGraph = () => (
  <div className="bg-white shadow-md rounded-xl p-6 flex flex-col w-full">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Revenue Trend</h2>
    <div className="h-48 rounded-xl bg-white">
      <ReactApexChart options={options} series={series} type="line" height={180} />
    </div>
  </div>
);

export default RevenueLineGraph; 