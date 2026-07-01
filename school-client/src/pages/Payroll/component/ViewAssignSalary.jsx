
import HeadingHeader from "../../../components/common/HeadingHeader";
import BackButton from "../../../components/common/BackButton";
import Card from "../../../components/common/Card";

const ViewAssignSalary = () => {
  
  const salaryInfo = {
    name: "Ravi Sharma",
    department: "Transport",
    role: "Driver",
    assignedVehicle: "BUS1",
    grossSalary: 19500,
    salaryStructure: "Driver",
    effectiveFrom: "02/02/2025",
    payHeads: [
      { name: "Basic Salary", amount: 15000 },
      { name: "HRA", amount: 3000 },
      { name: "Transport Allowance", amount: 1500 },
    ],
  };

  const totalAmount = salaryInfo.payHeads.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <>
      {/* Header with Back button */}
      <div className="flex items-center justify-between mb-4">
        <HeadingHeader
          title="View Assignee Name Salary"
          items={[
            { label: "Payroll", path: "/" },
            { label: "Assign Salary", path: "/payroll/assign-salary" },
            { label: "View Assignee Salary", path: "#" },
          ]}
        />
        <BackButton back="/payroll/assign-salary" />
      </div>

      {/* Top Status Row */}
  <Card>
            {/* <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-400 text-sm font-medium">
            Active
          </span>
          {/* <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <i className="fa fa-file-pdf-o" /> Export PDF
          </button> */}
        {/* </div> */} 
              <div className="bg-white p-6 rounded-lg shadow" id="salaryDetails">
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-400 text-sm font-medium">
            Active
          </span>
          <ExportPDFButton targetId="salaryDetails" fileName="Salary_Details.pdf" />
        </div>
        </div>

        {/* Salary Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 border-b pb-4 mb-4">
          <InfoRow label="Name" value={salaryInfo.name} />
          <InfoRow label="Department" value={salaryInfo.department} />
          <InfoRow label="Role" value={salaryInfo.role} />
          <InfoRow label="Assigned Vehicle" value={salaryInfo.assignedVehicle} />
          <InfoRow
            label="Gross Salary"
            value={`${salaryInfo.grossSalary} rs.`}
          />
          <InfoRow label="Salary Structure" value={salaryInfo.salaryStructure} />
          <InfoRow label="Effective From" value={salaryInfo.effectiveFrom} />
        </div>

        {/* Pay Head Table */}
        <h3 className="text-lg font-semibold mb-2">Pay Head Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="text-left px-4 py-2 border-r border-gray-300">
                  Pay Head Name
                </th>
                <th className="text-left px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {salaryInfo.payHeads.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="px-4 py-2 border-r border-gray-300">
                    {item.name}
                  </td>
                  <td className="px-4 py-2">{item.amount} rs.</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-100">
                <td className="px-4 py-2 border-r border-gray-300">Total</td>
                <td className="px-4 py-2">{totalAmount} rs.</td>
              </tr>
            </tbody>
          </table>
        </div>
 </Card>

    </>
  );
};

export default ViewAssignSalary;

const InfoRow = ({ label, value }) => (
  <div className="flex items-center">
    <span className="font-medium w-40">{label}:</span>
    <span>{value}</span>
  </div>
);
