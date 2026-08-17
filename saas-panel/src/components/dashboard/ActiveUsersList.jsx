import React from 'react';

const Avatar = ({ name }) => (
  <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center text-white font-bold mr-3">
    {name ? name[0].toUpperCase() : '?'}
  </div>
);

const ActiveUsersList = ({ data }) => {
  const users = data?.length > 0 ? data.map(user => ({
    name: user.name || user.email || 'Unknown User',
    lastActive: user.updatedAt ? new Date(user.updatedAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : '—',
  })) : [];

  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col min-h-[180px] w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Active Users List</h2>
      {users.length > 0 ? (
        <ul className="flex-1 overflow-y-auto max-h-40 divide-y divide-gray-100">
          {users.map((u, i) => (
            <li key={i} className="flex items-center py-2 text-sm text-gray-600">
              <Avatar name={u.name} />
              <div>
                <div className="font-medium text-gray-800 text-sm">{u.name}</div>
                <div className="text-xs text-gray-400">{u.lastActive}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">No active users</div>
      )}
    </div>
  );
};

export default ActiveUsersList;