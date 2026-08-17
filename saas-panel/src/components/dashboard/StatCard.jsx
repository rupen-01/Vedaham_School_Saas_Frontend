import { Icon } from '@iconify/react';

const defaultStatData = [
  { title: 'Total Institutions', value: '—', icon: 'mdi:school', color: 'bg-blue-300', border: 'border-blue-500' },
  { title: 'Total Students', value: '—', icon: 'mdi:account-group-outline', color: 'bg-green-300', border: 'border-green-500' },
  { title: 'Active Subscriptions', value: '—', icon: 'mdi:account-check-outline', color: 'bg-purple-300', border: 'border-purple-500' },
  { title: 'Trial Institutions', value: '—', icon: 'mdi:account-tie-outline', color: 'bg-yellow-300', border: 'border-yellow-500' },
  { title: 'Revenue (This Month)', value: '—', icon: 'mdi:currency-usd', color: 'bg-teal-300', border: 'border-teal-500' },
  { title: 'Top Support Agent', value: '—', icon: 'mdi:account-star', color: 'bg-pink-300', border: 'border-pink-500' },
];

const StatCard = ({ title, value, icon, color, border }) => (
  <div
    className={`flex flex-col items-center bg-white justify-center p-4 rounded-2xl shadow-sm hover:shadow-md transition duration-300 ${border} border-l-2`}
  >
    {" "}
    <div className={`p-3 rounded-full shadow text-3xl mb-2 ${color}`}>
      {" "}
      <Icon icon={icon} className="text-white" />{" "}
    </div>{" "}
    <h3 className="text-lg font-semibold text-gray-800">{value}</h3>{" "}
    <p className="text-xs text-gray-600 text-center">{title}</p>{" "}
  </div>
);

export default function StatCardsGrid({ stats }) {
  const statData = stats ? [
    { title: 'Total Institutions', value: String(stats.totalInstitutions ?? '—'), icon: 'mdi:school', color: 'bg-blue-300', border: 'border-blue-500' },
    { title: 'Total Students', value: (stats.totalStudents ?? 0).toLocaleString(), icon: 'mdi:account-group-outline', color: 'bg-green-300', border: 'border-green-500' },
    { title: 'Active Subscriptions', value: String(stats.activeSubscriptions ?? '—'), icon: 'mdi:account-check-outline', color: 'bg-purple-300', border: 'border-purple-500' },
    { title: 'Trial Institutions', value: String(stats.trialInstitutions ?? '—'), icon: 'mdi:account-tie-outline', color: 'bg-yellow-300', border: 'border-yellow-500' },
    { title: 'Revenue (This Month)', value: stats.totalRevenue != null ? `₹${Number(stats.totalRevenue).toLocaleString()}` : '—', icon: 'mdi:currency-usd', color: 'bg-teal-300', border: 'border-teal-500' },
    { title: 'Top Support Agent', value: stats.topSupportAgent || '—', icon: 'mdi:account-star', color: 'bg-pink-300', border: 'border-pink-500' },
  ] : defaultStatData;

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 col-span-12">
  {statData.map((item, index) => (
  <StatCard key={index} {...item} />
  ))}
  </div>
  );
  }