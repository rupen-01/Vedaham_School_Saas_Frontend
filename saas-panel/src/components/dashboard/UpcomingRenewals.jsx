import React from 'react';

const CalendarIcon = () => (
  <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
);

const UpcomingRenewals = ({ data }) => {
  const renewals = data?.length > 0 ? data.map(school => {
    const endDate = school.subscriptionEndDate ? new Date(school.subscriptionEndDate) : null;
    const daysLeft = endDate ? Math.max(0, Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24))) : 0;
    return {
      name: school.schoolName || school.name || 'Unknown School',
      days: daysLeft,
      plan: school.plans?.name || '—',
    };
  }) : [];

  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col h-full w-full">
      <h2 className="font-semibold text-gray-700 mb-2 flex items-center"><CalendarIcon />Upcoming Renewals</h2>
      {renewals.length > 0 ? (
        <ul className="text-sm text-gray-600 space-y-2 overflow-y-auto max-h-40 pr-2">
          {renewals.map((r, i) => (
            <li key={i} className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-2">
              <span className="flex items-center font-medium text-gray-700"><CalendarIcon />{r.name}</span>
              <span className="text-primary font-semibold">{r.days} days</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">No upcoming renewals</div>
      )}
    </div>
  );
};

export default UpcomingRenewals;