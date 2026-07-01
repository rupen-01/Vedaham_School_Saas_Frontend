import React from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  chart: { type: 'bar', toolbar: { show: false } },
  xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  colors: ['#6C63FF'],
  grid: { borderColor: '#f1f5f9' },
  dataLabels: { enabled: false },
};
const series = [{ name: 'New Schools', data: [5, 8, 6, 10, 7, 12, 9] }];

const SchoolIcon = () => (
  <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 10l9-7 9 7"/><path d="M9 21V14h6v7"/><path d="M21 21V10.5a2 2 0 0 0-.8-1.6l-7.2-5.6a2 2 0 0 0-2.4 0l-7.2 5.6A2 2 0 0 0 3 10.5V21"/></svg>
);

const NewSchoolsBarGraph = () => (
  <div className="bg-white shadow-md rounded-xl p-6 flex flex-col w-full">
    <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center"><SchoolIcon />New Schools Added (7/30 Days)</h2>
    <div className="h-32 rounded-xl bg-white">
      <ReactApexChart options={options} series={series} type="bar" height={120} />
    </div>
  </div>
);

export default NewSchoolsBarGraph; 