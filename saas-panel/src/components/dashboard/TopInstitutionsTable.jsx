import React from 'react';

const SchoolIcon = () => (
  <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 10l9-7 9 7"/><path d="M9 21V14h6v7"/><path d="M21 21V10.5a2 2 0 0 0-.8-1.6l-7.2-5.6a2 2 0 0 0-2.4 0l-7.2 5.6A2 2 0 0 0 3 10.5V21"/></svg>
);

const TopInstitutionsTable = ({ data }) => {
  const institutions = data?.length > 0 ? data.map(inst => ({
    name: inst.schoolName || inst.name || 'Unknown',
    students: inst.totalStudent ?? 0,
    staff: inst.totalStaff ?? 0,
    plan: inst.plans?.name || '—',
    duration: inst.subscriptionEndDate
      ? `${Math.max(0, Math.ceil((new Date(inst.subscriptionEndDate) - new Date()) / (1000 * 60 * 60 * 24 * 30)))} mo`
      : '—',
  })) : [];

  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col min-h-[180px] w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center"><SchoolIcon />Top Performing Institutions</h2>
      {institutions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2 pr-4 font-semibold">Institute Name</th>
                <th className="py-2 pr-4 font-semibold">Students</th>
                <th className="py-2 pr-4 font-semibold">Staff</th>
                <th className="py-2 pr-4 font-semibold">Plan</th>
                <th className="py-2 pr-4 font-semibold">Remain Duration</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map((inst, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2 pr-4 flex items-center font-medium text-gray-800"><SchoolIcon />{inst.name}</td>
                  <td className="py-2 pr-4">{inst.students}</td>
                  <td className="py-2 pr-4">{inst.staff}</td>
                  <td className="py-2 pr-4">{inst.plan}</td>
                  <td className="py-2 pr-4">{inst.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm py-8">No institution data available</div>
      )}
    </div>
  );
};

export default TopInstitutionsTable;