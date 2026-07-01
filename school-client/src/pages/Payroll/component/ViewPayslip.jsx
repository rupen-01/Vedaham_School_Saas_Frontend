import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { FaDownload } from "react-icons/fa";

const ViewPayslip = () => {
  const payslip = {
    schoolName: "School Name",
    month: "August 2025",
    employee: {
      id: "EMP0123",
      name: "Ramesh Sharma",
      department: "Mathematics",
      designation: "Senior Teacher",
    },
    payslipDetails: {
      payId: "05Aug-2025",
      payDate: "05-Aug-2025",
      paymentMode: "Bank Transfer",
      bankAccount: "XXXX-XXXX-1234",
    },
    earnings: [
      { component: "Basic Pay", amount: 18000 },
      { component: "HRA", amount: 4000 },
      { component: "Performance Bonus", amount: 500 },
    ],
    deductions: [
      { component: "PF", amount: 1800 },
      { component: "Professional Tax", amount: 400 },
      { component: "ESI", amount: 500 },
    ],
  };

  const totalEarnings = payslip.earnings.reduce((sum, e) => sum + e.amount, 0);
  const totalDeductions = payslip.deductions.reduce(
    (sum, d) => sum + d.amount,
    0
  );
  const netPay = totalEarnings - totalDeductions;

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(payslip.schoolName, 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Payslip for the Month of ${payslip.month}`, 105, 22, {
      align: "center",
    });

    doc.setFontSize(10);
    doc.text("Employee Details", 14, 35);
    doc.text(`Employee ID: ${payslip.employee.id}`, 14, 40);
    doc.text(`Name: ${payslip.employee.name}`, 14, 45);
    doc.text(`Department: ${payslip.employee.department}`, 14, 50);
    doc.text(`Designation: ${payslip.employee.designation}`, 14, 55);

    doc.text("Payslip Details", 120, 35);
    doc.text(`Pay ID: ${payslip.payslipDetails.payId}`, 120, 40);
    doc.text(`Pay Date: ${payslip.payslipDetails.payDate}`, 120, 45);
    doc.text(`Payment Mode: ${payslip.payslipDetails.paymentMode}`, 120, 50);
    doc.text(`Bank A/C No: ${payslip.payslipDetails.bankAccount}`, 120, 55);

    doc.autoTable({
      startY: 65,
      head: [["Earnings", "Amount (₹)"]],
      body: payslip.earnings.map((e) => [e.component, e.amount]),
      theme: "grid",
      styles: { halign: "right" },
      headStyles: { halign: "center", fillColor: [200, 200, 255] },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "right" },
      },
      foot: [["Total Earnings", totalEarnings]],
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 5,
      head: [["Deductions", "Amount (₹)"]],
      body: payslip.deductions.map((d) => [d.component, d.amount]),
      theme: "grid",
      styles: { halign: "right" },
      headStyles: { halign: "center", fillColor: [200, 200, 255] },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "right" },
      },
      foot: [["Total Deductions", totalDeductions]],
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 5,
      head: [["Net Pay Summary", "Amount (₹)"]],
      body: [
        ["Gross Salary", totalEarnings],
        ["Total Deductions", totalDeductions],
        ["Net Salary Payable", netPay],
      ],
      theme: "grid",
      styles: { halign: "right" },
      headStyles: { halign: "center", fillColor: [200, 200, 255] },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "right" },
      },
    });

    doc.save(`Payslip-${payslip.payslipDetails.payId}.pdf`);
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Payslip</h2>
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FaDownload className="mr-2" /> Download
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">{payslip.schoolName}</h3>
        <p className="text-sm">
          Payslip for the Month of {payslip.month}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p>Employee ID: {payslip.employee.id}</p>
          <p>Name: {payslip.employee.name}</p>
          <p>Department: {payslip.employee.department}</p>
          <p>Designation: {payslip.employee.designation}</p>
        </div>
        <div>
          <p>Pay ID: {payslip.payslipDetails.payId}</p>
          <p>Pay Date: {payslip.payslipDetails.payDate}</p>
          <p>Payment Mode: {payslip.payslipDetails.paymentMode}</p>
          <p>Bank A/C No: {payslip.payslipDetails.bankAccount}</p>
        </div>
      </div>

      <table className="w-full border mb-4">
        <thead className="bg-purple-100">
          <tr>
            <th className="border p-2 text-left">Earnings</th>
            <th className="border p-2 text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {payslip.earnings.map((e, idx) => (
            <tr key={idx}>
              <td className="border p-2">{e.component}</td>
              <td className="border p-2 text-right">{e.amount}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="border p-2">Total Earnings</td>
            <td className="border p-2 text-right">{totalEarnings}</td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border mb-4">
        <thead className="bg-purple-100">
          <tr>
            <th className="border p-2 text-left">Deductions</th>
            <th className="border p-2 text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {payslip.deductions.map((d, idx) => (
            <tr key={idx}>
              <td className="border p-2">{d.component}</td>
              <td className="border p-2 text-right">{d.amount}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="border p-2">Total Deductions</td>
            <td className="border p-2 text-right">{totalDeductions}</td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border">
        <thead className="bg-purple-100">
          <tr>
            <th className="border p-2 text-left">Net Pay Summary</th>
            <th className="border p-2 text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Gross Salary</td>
            <td className="border p-2 text-right">{totalEarnings}</td>
          </tr>
          <tr>
            <td className="border p-2">Total Deductions</td>
            <td className="border p-2 text-right">{totalDeductions}</td>
          </tr>
          <tr className="font-bold">
            <td className="border p-2">Net Salary Payable</td>
            <td className="border p-2 text-right">{netPay}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewPayslip;
