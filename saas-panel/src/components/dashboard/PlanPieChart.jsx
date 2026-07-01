import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaCrown, FaRocket, FaStar, FaUser } from 'react-icons/fa';

const options = {
  chart: { type: 'pie' },
  labels: ['Free', 'Starter', 'Growth', 'Pro'],
  legend: { show: false },
  colors: ['#a5b4fc', '#6C63FF', '#FFB800', '#6366f1'],
  dataLabels: { enabled: false },
};
const series = [30, 25, 25, 20];

const icons = [
  <FaUser className="text-primary" />,
  <FaStar className="text-primary" />,
  <FaRocket className="text-accent" />,
  <FaCrown className="text-primary" />,
];

const PlanPieChart = () => (
  <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center w-full">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Plan Distribution</h2>
    <div className="h-32 w-full flex items-center justify-center">
      <ReactApexChart options={options} series={series} type="pie" height={120} />
    </div>
    <div className="flex flex-wrap justify-center gap-3 mt-3">
      {options.labels.map((label, i) => (
        <span key={label} className="flex items-center text-sm text-gray-600 mr-2">
          {icons[i]}<span className="ml-1 font-medium">{label}</span>
        </span>
      ))}
    </div>
  </div>
);

export default PlanPieChart; 