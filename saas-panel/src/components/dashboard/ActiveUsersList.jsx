import React from 'react';

const users = [
  { name: 'Alice Johnson', lastActive: '2 min ago' },
  { name: 'Bob Smith', lastActive: '5 min ago' },
  { name: 'Carol Lee', lastActive: '10 min ago' },
  { name: 'David Kim', lastActive: '20 min ago' },
];

const Avatar = ({ name }) => (
  <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center text-white font-bold mr-3">
    {name[0]}
  </div>
);

const ActiveUsersList = () => (
  <div className="bg-white shadow-md rounded-xl p-6 flex flex-col min-h-[180px] w-full">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Active Users List</h2>
    <ul className="flex-1 overflow-y-auto max-h-40 divide-y divide-gray-100">
      {users.map(u => (
        <li key={u.name} className="flex items-center py-2 text-sm text-gray-600">
          <Avatar name={u.name} />
          <div>
            <div className="font-medium text-gray-800 text-sm">{u.name}</div>
            <div className="text-xs text-gray-400">{u.lastActive}</div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ActiveUsersList; 