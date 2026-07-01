import { useState } from "react";
import { Users, UserPlus, UserX, Filter, Search } from "lucide-react";

import Card from "../../components/common/Card";
import HeadingHeader from "../../components/common/HeadingHeader";
import Table from "../../components/common/Table";
import DeleteModal from "../../components/common/Delete";
import UserViewModal from "./UserViewModel";

const UserStats = () => {
  
  return (


<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mt-6">
  {/* Total Users */}
  <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border border-l-2 border-l-blue-500 border-indigo-100 hover:shadow-xl hover:scale-[1.02] transition duration-300 min-w-[250px]">
    <div>
      <p className="text-gray-500 text-sm">Total Users</p>
      <h2 className="text-3xl font-bold text-indigo-500">200</h2>
    </div>
    <div className="bg-gradient-to-tr from-indigo-100 to-indigo-200 text-indigo-600 p-4 rounded-full shadow">
      <Users className="w-8 h-8" />
    </div>
  </div>

  {/* Active Users */}
  <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border border-l-2 border-l-green-500 border-green-100 hover:shadow-xl hover:scale-[1.02] transition duration-300 min-w-[250px]">
    <div>
      <p className="text-gray-500 text-sm">Active Users</p>
      <h2 className="text-3xl font-bold text-green-600">130</h2>
    </div>
    <div className="bg-gradient-to-tr from-green-100 to-green-200 text-green-600 p-4 rounded-full shadow">
      <UserPlus className="w-8 h-8" />
    </div>
  </div>

  {/* Deactive Users */}
  <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between border border-l-2 border-l-red -500 border-red-100 hover:shadow-xl hover:scale-[1.02] transition duration-300 min-w-[250px]">
    <div>
      <p className="text-gray-500 text-sm">Deactive Users</p>
      <h2 className="text-3xl font-bold text-red-500">70</h2>
    </div>
    <div className="bg-gradient-to-tr from-red-100 to-red-200 text-red-500 p-4 rounded-full shadow">
      <UserX className="w-8 h-8" />
    </div>
  </div>
</div>



  );
};

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteData, setDeleteData] = useState(null);
  const [results, setResults] = useState([]);
  const [viewUser, setViewUser] = useState(null);

  const users = [
    {
      id: 1,
      name: 'Divya Panwar',
      role: 'Super Admin',
      email: 'divya@example.com',
      phone: '9876543210',
      status: 'Active',
      permissions: ['Manage Users', 'Edit Settings'],
    },
    {
      id: 2,
      name: 'Amit Verma',
      role: 'Support Agent',
      email: 'amit@example.com',
      phone: '9988776655',
      status: 'Inactive',
      permissions: ['Support Tickets'],
    },
    {
      id: 3,
      name: 'Riya Singh',
      role: 'Technical Admin',
      email: 'riya@example.com',
      phone: '9876543211',
      status: 'Active',
      permissions: ['Manage Backend', 'Server Access'],
    },
  ];

  // Apply filter and search
  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === 'All' || user.status === filter;
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const tableHeaders = [
    'Name',
    'Role',
    'Email',
    'Phone',
    'Status',
    'Permissions',
  ];

  const tableDataKeys = [
    'name',
    'role',
    'email',
    'phone',
    'status',
    'permissions',
  ];



  const handleSearch = () => {
    // Simulate API filtering logic
    const filtered = users.filter((user) => {
      const matchSearch = user.name.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "All" || user.status === filter;
      return matchSearch && matchFilter;
    });
    setResults(filtered);
  };
  return (
    <>
      <Card className="mt-2 flex items-center  align-middle justify-between">
        <HeadingHeader
          title="Manage Users"
          items={[
            { label: "Dashboard", path: "/" },
            { label: "User", path: "/users/manage" },
            { label: "Manage Users", path: "/users/manage" },
          ]}
        />

        {/* User Stats Section */}
        <UserStats />
      </Card>

 <Card className="mt-6">
      


        {/* Reusable Table Component */}
        <Table
      Search={true} 
 filters={true}
          Data={filteredUsers}
          headers={tableHeaders}
          dataKeys={tableDataKeys}
          onDelete={(data) => setDeleteData(data)}
    
 onView={(user) => setViewUser(user)}
/>

        
   {/* View Modal */}
        <UserViewModal
          isOpen={!!viewUser}
          onClose={() => setViewUser(null)}
          user={viewUser}
        />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this user?"
      />
   

      </Card>

    </>
  );
};

export default ManageUsers;