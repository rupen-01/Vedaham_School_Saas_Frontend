import React from "react";
import Card from "../../../components/common/Card";
import { FiX } from "react-icons/fi";
import Table from "../../../components/common/Table";

const StatusBadge = ({ status }) => {
  const isActive = status?.toLowerCase() === "active";
  return (
    <span
      className={`px-3 py-1 rounded-full border text-sm font-medium ${
        isActive
          ? "border-green-400 text-green-600 bg-green-50"
          : "border-red-400 text-red-600 bg-red-50"
      }`}
    >
      {status}
    </span>
  );
};

const ViewSalaryStructureModal = ({ data, onClose }) => {
  if (!data) return null;

  // Example payHeads (would normally come from API)
  const payHeads = [
    { payHead: "Basic Salary", amount: 15000 },
    { payHead: "HRA", amount: 3000 },
    { payHead: "Transport Allowance", amount: 1500 },
  ];

  const totalAmount = payHeads.reduce((acc, curr) => acc + curr.amount, 0);

  const columns = [
    { header: "Pay Head Name", accessor: "payHead" },
    { header: "Amount", accessor: (row) => `${row.amount.toLocaleString()} rs.` },
  ];

  return (
 <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
        <Card>
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg font-semibold">{data.salaryStructureName}</h2>
            <div className="flex items-center gap-3">
              <StatusBadge status={data.status} />
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition"
              >
                <FiX className="text-xl" />
              </button>
            </div>
          </div>

      

      {/* Pay Head Table */}
      <div>
        <h3 className="font-semibold mb-2">Pay Head Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border border-gray-300">
                  Pay Head Name
                </th>
                <th className="px-4 py-2 text-left border border-gray-300">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {payHeads.map((ph, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-2 border border-gray-300">{ph.payHead}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {ph.amount.toLocaleString()} rs.
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-semibold">
                <td className="px-4 py-2 border border-gray-300">Total</td>
                <td className="px-4 py-2 border border-gray-300">
                  {totalAmount.toLocaleString()} rs.
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          </div>

          {/* Total Row */}
          <div className="flex justify-between mt-3 font-semibold border-t pt-2">
            <span>Total</span>
            <span>{totalAmount.toLocaleString()} rs.</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ViewSalaryStructureModal;
