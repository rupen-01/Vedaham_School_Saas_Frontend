
import { Icon } from "@iconify/react";
import HeadingHeader from "../../../../components/common/HeadingHeader";
import BackButton from "../../../../components/common/BackButton";

export default function ViewStaff() {
  // Example staff data (replace with API data)
  const staff = {
    status: "Active",
    staffName: "Ravi Sharma",
    department: "IT",
    role: "Teacher",
    fatherName: "Ravi Sharma",
    motherName: "Jyoti Sharma",
    gender: "Male",
    contact: "1234567890",
    alternateContact: "1234567891",
    email: "test@mail.com",
    maritalStatus: "Single",
    doj: "02/05/2018",
    dob: "02/05/2005",
    currentAddress: "Ghanta Ghar Chowk, Khadwa",
    permanentAddress: "Ghanta Ghar Chowk, Khadwa",
    education: [
      { name: "12th", institute: "Govt. H. S. S. Malgaon", board: "MP Board", session: "2021-2022" },
      { name: "10th", institute: "Govt. H. S. S. Malgaon", board: "MP Board", session: "2019-2020" },
    ],
    experience: [
      { company: "Angels Planet School", role: "Teacher", period: "2023-2025", reason: "Extra Workload" },
      { company: "Genius Public School", role: "Receptionist", period: "2022-2023", reason: "Want to teaching" },
    ],
    aadhar: "123456789012",
    pan: "PKQW12345",
    bloodGroup: "O+",
    contractType: "Permanent",
    basicSalary: "15000 ₹",
    workShift: "Morning",
    workLocation: "Khadwa",
    casualLeave: "04",
    sickLeave: "05",
    medicalLeave: "10",
    maternityLeave: "02",
    bankName: "Bank Of India",
    accountName: "Ravi Sharma",
    accountNumber: "1234567890123456",
    ifsc: "BOID12345",
    branch: "BOI Khadwa",
    documents: [
      { label: "Resume/CV", file: "#" },
      { label: "Joining Letter", file: "#" },
      { label: "Non-criminal Certificate", file: "#" },
      { label: "Aadhar Card", file: "#" },
      { label: "Medical Certificate", file: "#" },
      { label: "Resignation Letter", file: "#" },
      { label: "Education Certificate", file: "#" },
      { label: "PAN Card", file: "#" },
      { label: "Experience Certificate", file: "#" },
    ]
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="flex justify-between items-center">
        <HeadingHeader
          title="View Staff"
          items={[
            { label: "Staff", path: "/staff" },
              { label: " Manage Staff", path: "/staff/manage-staff" },
            { label: "View Staff", path: "/staff/manage-staff/view" },
          ]}
        />
         <div className="flex gap-2">
            <button className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded flex items-center">
              <Icon icon="mdi:file-pdf-box" className="mr-1" /> Export PDF
            </button>
      <BackButton back={"/staff/manage-staff"}></BackButton>
          </div>
      </div>

      {/* Staff Details Card */}
      <div className="bg-white shadow rounded p-4 mt-4">
        {/* Header Row */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">
            View staff Name Details (Staff ID){" "}
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
              {staff.status}
            </span>
          </h2>
         
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-2 flex justify-center">
            <div className="w-28 h-28 bg-gray-200 flex items-center justify-center rounded">
              <Icon icon="mdi:account" className="text-gray-500 text-5xl" />
            </div>
          </div>
          <div className="col-span-10 grid grid-cols-3 gap-3 text-sm">
            <p><strong>Staff Name:</strong> {staff.staffName}</p>
            <p><strong>Department:</strong> {staff.department}</p>
            <p><strong>Role:</strong> {staff.role}</p>
            <p><strong>Father Name:</strong> {staff.fatherName}</p>
            <p><strong>Mother Name:</strong> {staff.motherName}</p>
            <p><strong>Gender:</strong> {staff.gender}</p>
            <p><strong>Contact No:</strong> {staff.contact}</p>
            <p><strong>Alternate No:</strong> {staff.alternateContact}</p>
            <p><strong>Email:</strong> {staff.email}</p>
            <p><strong>Marital Status:</strong> {staff.maritalStatus}</p>
            <p><strong>Date of Joining:</strong> {staff.doj}</p>
            <p><strong>DOB:</strong> {staff.dob}</p>
            <p className="col-span-3"><strong>Current Address:</strong> {staff.currentAddress}</p>
            <p className="col-span-3"><strong>Permanent Address:</strong> {staff.permanentAddress}</p>
          </div>
        </div>

        {/* Education & Experience */}
        <div className="mt-6">
          <h3 className="font-semibold border-b pb-1">Education</h3>
          <table className="w-full text-sm border mt-2">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Education Name</th>
                <th className="border p-2">Institute Name</th>
                <th className="border p-2">Board/University</th>
                <th className="border p-2">Session</th>
              </tr>
            </thead>
            <tbody>
              {staff.education.map((e, i) => (
                <tr key={i}>
                  <td className="border p-2">{e.name}</td>
                  <td className="border p-2">{e.institute}</td>
                  <td className="border p-2">{e.board}</td>
                  <td className="border p-2">{e.session}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="font-semibold border-b pb-1 mt-4">Experience</h3>
          <table className="w-full text-sm border mt-2">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Company/Institute Name</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Working Period</th>
                <th className="border p-2">Reason for Resign</th>
              </tr>
            </thead>
            <tbody>
              {staff.experience.map((exp, i) => (
                <tr key={i}>
                  <td className="border p-2">{exp.company}</td>
                  <td className="border p-2">{exp.role}</td>
                  <td className="border p-2">{exp.period}</td>
                  <td className="border p-2">{exp.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Identity & Official */}
        <div className="mt-6">
          <h3 className="font-semibold border-b pb-1">Identity & Official</h3>
          <div className="grid grid-cols-4 gap-3 text-sm mt-2">
            <p><strong>Aadhar No:</strong> {staff.aadhar}</p>
            <p><strong>PAN No:</strong> {staff.pan}</p>
            <p><strong>Blood Group:</strong> {staff.bloodGroup}</p>
            <p><strong>Contract Type:</strong> {staff.contractType}</p>
            <p><strong>Basic Salary:</strong> {staff.basicSalary}</p>
            <p><strong>Work Shift:</strong> {staff.workShift}</p>
            <p><strong>Work Location:</strong> {staff.workLocation}</p>
            <p><strong>Casual Leave:</strong> {staff.casualLeave}</p>
            <p><strong>Sick Leave:</strong> {staff.sickLeave}</p>
            <p><strong>Medical Leave:</strong> {staff.medicalLeave}</p>
            <p><strong>Maternity Leave:</strong> {staff.maternityLeave}</p>
          </div>
        </div>

        {/* Bank Details */}
        <div className="mt-6">
          <h3 className="font-semibold border-b pb-1">Bank Details</h3>
          <div className="grid grid-cols-3 gap-3 text-sm mt-2">
            <p><strong>Bank Name:</strong> {staff.bankName}</p>
            <p><strong>Account Name:</strong> {staff.accountName}</p>
            <p><strong>Account Number:</strong> {staff.accountNumber}</p>
            <p><strong>IFSC Code:</strong> {staff.ifsc}</p>
            <p><strong>Branch:</strong> {staff.branch}</p>
          </div>
        </div>

        {/* Documents */}
        <div className="mt-6">
          <h3 className="font-semibold border-b pb-1">Documents</h3>
          <div className="grid grid-cols-3 gap-2 text-sm mt-2">
            {staff.documents.map((doc, i) => (
              <p key={i}>
                <strong>{doc.label}:</strong>{" "}
                <a href={doc.file} className="text-indigo-600 hover:underline">
                  View
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
