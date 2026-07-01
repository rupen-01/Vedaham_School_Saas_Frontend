import React from "react";
import { jsPDF } from "jspdf";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Card from "../../../components/common/Card";
import ExportPdf from "../../../components/common/ExportPdf";

const LeavePolicy = () => {
  const policyContent = [
    {
      title: "Eligibility",
      lines: [
        "This leave is applicable to: {{Eligibility Criteria}}. Only employees who meet this criterion are entitled to apply for this leave."
      ]
    },
    {
      title: "Advance Notice",
      lines: [
        "Employees must submit their leave request at least {{Advance Notice Period}} day(s) prior to the intended leave date. In emergencies, the approving authority may waive this requirement at their discretion."
      ]
    },
    {
      title: "Document Requirement",
      lines: [
        "Submission of supporting documents is mandatory (if applicable). The following document(s) are required for this leave type:",
        "{{#each Documents}}",
        "• {{Document Name}}",
        "{{/each}}",
        "All documents must be clear, verifiable, and submitted at the time of application."
      ]
    },
    {
      title: "Approval Process",
      lines: [
        "Approval for this leave must be obtained from: {{Selected Approval Required}}. No leave will be considered valid without official approval from the designated authority."
      ]
    },
    {
      title: "Leave Duration",
      lines: [
        "Minimum / Maximum Leave at Once: {{Minimum/Maximum Leave at Once}} day(s)",
        "Maximum Days Allowed Per Year: {{Maximum Days Allowed}} day(s)",
        "Employees are advised to plan their leaves responsibly and within the allowable limits."
      ]
    },
    {
      title: "Carry Forward Policy",
      lines: [
        "Carry Forward Status: {{Carry Forward Allowed}}",
        "If not allowed, unused leave days at the end of the academic or calendar year will lapse automatically."
      ]
    },
    {
      title: "Interval Restrictions",
      lines: [
        "To maintain operational efficiency, the following interval rules apply:",
        "• Minimum Gap Between Two Leaves: {{Leave Interval Restriction 1}} day(s)",
        "• Maximum Interval Between Repeated Leaves: {{Leave Interval Restriction 2}} day(s)"
      ]
    },
    {
      title: "Applicable User Roles",
      lines: [
        "This leave is applicable to the following roles: {{Applying Roles}}",
        "{{#if CustomRolesExist}}",
        "Custom Role-Based Allowance:",
        "{{#each CustomRoles}}",
        "• {{Role Name}} (Max Days Allowed: {{Max Days Allowed}} day(s))",
        "{{/each}}",
        "{{/if}}"
      ]
    },
    {
      title: "General Instructions",
      lines: [
        "Misuse or misrepresentation of leave data or documentation may lead to disciplinary action.",
        "Unapproved leave will be treated as unauthorized and may result in salary deduction or written warning.",
        "Leave balances and usage can be tracked via the School ERP dashboard under the 'Leave Summary' section.",
        "Note: This policy is system-generated and subject to change based on school management’s discretion."
      ]
    }
  ];

  const handleExportPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    let y = 40;

    // Title
    doc.setFontSize(16).setFont("helvetica", "bold");
    doc.text("Leave Policy", 40, y);
    y += 20;

    policyContent.forEach((section) => {
      doc.setFontSize(12).setFont("helvetica", "bold");
      doc.text(section.title, 40, y);
      y += 16;

      doc.setFont("helvetica", "normal");
      section.lines.forEach((line) => {
        const split = doc.splitTextToSize(line, 500);
        doc.text(split, 60, y); // indent bullets
        y += split.length * 14;
      });

      y += 10;
    });

    doc.save("Leave_Policy.pdf");
  };

  return (
    <div className="">
      {/* Header Section with Breadcrumb + Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <HeadingHeader
          title="View Leave Summary"
          items={[
            { label: "Staff", path: "/staff" },
            { label: "Leave Management", path: "/staff/leave" },
            { label: "Leave Policy", path: "/staff/leave/policy" },
          ]}
        />

        {/* ✅ Reusable PDF Button */}
        <ExportPdf onClick={handleExportPDF} fileName="Leave_Policy.pdf" />
      </div>

      {/* Policy Content */}
      <Card>
        <h3 className="font-semibold text-lg mb-4">Leave Policy</h3>
        {policyContent.map((section, idx) => (
          <div key={idx} className="mb-4">
            <h4 className="font-semibold mb-2">{section.title}</h4>
            <ul className="list-disc list-inside space-y-1">
              {section.lines.map((line, i) => (
                <li key={i} className="text-gray-700">{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default LeavePolicy;
