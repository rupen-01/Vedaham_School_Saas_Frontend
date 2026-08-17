import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaCrown, FaRocket, FaStar, FaUser } from 'react-icons/fa';

const defaultIcons = [
  <FaUser className="text-primary" />,
  <FaStar className="text-primary" />,
  <FaRocket className="text-accent" />,
  <FaCrown className="text-primary" />,
];

const defaultColors = ['#a5b4fc', '#6C63FF', '#FFB800', '#6366f1'];

const PlanPieChart = ({ data }) => {
  const labels = data?.length > 0 ? data.map(d => d.name || 'Unknown') : [];
  const series = data?.length > 0 ? data.map(d => Number(d.value) || 0) : [];

  const options = {
    chart: { type: 'pie' },
    labels: labels.length > 0 ? labels : ['No Data'],
    legend: { show: false },
    colors: labels.length > 0 ? defaultColors.slice(0, labels.length) : ['#e5e7eb'],
    dataLabels: { enabled: false },
  };

  const chartSeries = series.length > 0 ? series : [1];

  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Plan Distribution</h2>
      <div className="h-32 w-full flex items-center justify-center">
        <ReactApexChart options={options} series={chartSeries} type="pie" height={120} />
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-3">
        {labels.length > 0 ? labels.map((label, i) => (
          <span key={label} className="flex items-center text-sm text-gray-600 mr-2">
            {defaultIcons[i % defaultIcons.length]}<span className="ml-1 font-medium">{label} ({series[i]})</span>
          </span>
        )) : (
          <span className="text-sm text-gray-400">No plan data available</span>
        )}
      </div>
    </div>
  );
};

export default PlanPieChart;