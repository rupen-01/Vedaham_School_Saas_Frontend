import { useState } from "react";
import HeadingHeader from "../../components/common/HeadingHeader";
import Table from "../../components/common/Table";
import { useNavigate } from "react-router-dom";
import { FaDownload } from "react-icons/fa";

const PayslipManagement = () => {
  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const navigate = useNavigate();

  // Data from your screenshot
  const payslipData = [
    {
      id: 1,
      name: "Ravi Sharma",
      department: "Maths",
      role: "Teacher",
      payslipId: "PAYSLIP-05-AUG-2025",
    },
    {
      id: 2,
      name: "Jyoti Singh",
      department: "Transport",
      role: "Attendant",
      payslipId: "PAYSLIP-05-AUG-2025",
    },
    {
      id: 3,
      name: "Rama Joshi",
      department: "Transport",
      role: "Driver",
      payslipId: "PAYSLIP-05-AUG-2025",
    },
  ];

  // Apply filters
  const filteredData = payslipData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    // Month/year filters could be implemented if your payslipId encodes them
    return matchesSearch;
  });

  const tableHeaders = [
    "Name",
    "Department",
    "Role",
    "Payslip ID",
    "Download",
  ];

  const tableData = filteredData.map((row) => ({
    ...row,
    download: (
      <button
        onClick={() => alert(`Downloading ${row.payslipId}...`)}
        className="text-blue-500 hover:text-blue-700"
      >
        <FaDownload />
      </button>
    ),
  }));

  return (
    <>
      <HeadingHeader
        title="Payslip Management"
        items={[
          { label: "Payroll", path: "/" },
          { label: "Payslip Management", path: "/payroll/payslip-management" },
        ]}
      />

      <Table
        Search={false}
        ImageContainerShow={false}
        filters={false}
        Data={tableData}
        headers={tableHeaders}
        dataKeys={["name", "department", "role", "payslipId", "download"]}
      />
    </>
  );
};

export default PayslipManagement;
