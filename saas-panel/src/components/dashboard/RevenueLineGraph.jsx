import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RevenueLineGraph = ({ data }) => {
  const months = data?.length > 0 ? data.map(d => d.month || '—') : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const revenues = data?.length > 0 ? data.map(d => Number(d.revenue) || 0) : [];

  const options = {
    chart: { id: 'revenue-trend', toolbar: { show: false } },
    xaxis: { categories: months },
    colors: ['#6C63FF'],
    stroke: { curve: 'smooth', width: 3 },
    grid: { borderColor: '#f1f5f9' },
    dataLabels: { enabled: false },
  };
  const series = [{ name: 'Revenue', data: revenues }];

  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Revenue Trend</h2>
      <div className="h-48 rounded-xl bg-white">
        {revenues.length > 0 ? (
          <ReactApexChart options={options} series={series} type="line" height={180} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">No revenue data available</div>
        )}
      </div>
    </div>
  );
};

export default RevenueLineGraph;