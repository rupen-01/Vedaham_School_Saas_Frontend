
import { useLocation } from "react-router-dom";
import HeadingHeader from "../../../components/common/HeadingHeader";
import BackButton from "../../../components/common/BackButton";
import ExportPdf from "../../../components/common/ExportPdf";
import BorderedFieldset from "../../../components/common/BorderedFieldset";

const ViewStudentDetails = () => {
  const location = useLocation();

  const rawStudent = location.state?.student;

  const student = {
    name: "Ravi Sharma",
    gender: "Male",
    dob: "02/05/2025",
    aadhaar: "123456789101",
    bloodGroup: "O+",
    religion: "Hindu",
    nationality: "Indian",
    caste: "Baniya",
    category: "General",
    admissionNo: "12345",
    admissionDate: "02/05/2025",
    className: "6th",
    section: "A",
    house: "Red House",
    rollNo: "2002",
    minority: "No",
    ewsFlag: "Yes",
    presentAddress: "Ghanta Ghar Chowk, Khandwa",
    permanentAddress: "Ghanta Ghar Chowk, Khandwa",
    parents: [
      {
        name: "Rajendra Sharma",
        relation: "Father",
        occupation: "Manager",
        contact: "1234567890",
        email: "Raj@gmail.com",
      },
      {
        name: "Sandhya Sharma",
        relation: "Mother",
        occupation: "Tailor",
        contact: "3456789012",
        email: "San@gmail.com",
      },
    ],
    guardian: [
      {
        name: "Rajendra Sharma",
        relation: "Father",
        occupation: "Manager",
        contact: "1234567890",
        email: "Raj@gmail.com",
      },
    ],
    previousSchool: "Sophia Convent Senior Secondary School, Khandwa (MP)",
    lastClass: "5th",
    previousPerformance: "Good Performance with 89% marks.",
    admissionNotes: "Extra focus on english communication.",
    documents: {
      birthCertificate: "View Birth Doc",
      aadhaarCard: "View Aadhaar",
      casteCertificate: "View Caste Doc",
      annualIncome: "View Doc",
      medicalCertificate: "View Medical",
      bankPassbook: "View Bank Doc",
      guardianProof: "View Proof ID",
      migration: "View Migration",
      transferCertificate: "View TC",
      previousReportCard: "View Report Card",
    },
    ...rawStudent,
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <HeadingHeader
          title="View Student Name Details"
          items={[
            { label: "Student", path: "/" },
            { label: "Manage Students", path: "/students/manage-students" },
            { label: "View Student Name Details", path: "#" },
          ]}
        />
        <div className="flex gap-2">
          <ExportPdf
            data={student}
            fileName={student.name.replace(/\s+/g, "_") + "_details"}
          />
          <BackButton back="/students/admission/manage" />
        </div>
      </div>

      <div className=" rounded-md shadow-sm bg-white p-6">
        {/* Student Info with Image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pb-4 pl-2">
          <div className="flex justify-center items-center border rounded h-64 w-60 bg-gray-100">
            <div className="flex justify-center items-center w-40 h-52">
              {student.photo ? (
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM5 5h14v9l-4.5-4.5-6 6L5 11v8z" />
                </svg>
              )}
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-3 gap-x-6 gap-y-2 text-sm">
            <div> <b>Name:</b> {student.name}</div>
            <div><b>Gender:</b> {student.gender}</div>
            <div><b>DOB:</b> {student.dob}</div>
            <div><b>Aadhar No.:</b> {student.aadhaar}</div>
            <div><b>Blood Group:</b> {student.bloodGroup}</div>
            <div><b>Religion:</b> {student.religion}</div>
            <div><b>Nationality:</b> {student.nationality}</div>
            <div><b>Caste:</b> {student.caste}</div>
            <div><b>Category:</b> {student.category}</div>
            <div><b>Admission No.:</b> {student.admissionNo}</div>
            <div><b>Admission Date:</b> {student.admissionDate}</div>
            <div><b>Class:</b> {student.className}</div>
            <div><b>Section:</b> {student.section}</div>
            <div><b>House Name:</b> {student.house}</div>
            <div><b>Roll No.:</b> {student.rollNo}</div>
            <div><b>Minority:</b> {student.minority}</div>
            <div><b>EWS Flag:</b> {student.ewsFlag}</div>
          </div>
        </div>

        {/* Address */}
        <div className="text-sm  ">
          <p className="p-3"><b>Present Address:</b> {student.presentAddress}</p>
          <p className="p-3"><b>Permanent Address:</b> {student.permanentAddress}</p>
        </div>
<BorderedFieldset legend="Parent's Details" className="border border-gray-700">

        {/* Parents */}
        <div className="text-sm">
          <h3 className="font-semibold mb-2">Parent&apos;s Details</h3>
          <table className="w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Relation with Student</th>
                <th className="p-2 border">Occupation</th>
                <th className="p-2 border">Contact Number</th>
                <th className="p-2 border">Email Id</th>
              </tr>
            </thead>
            <tbody>
              {student.parents?.map((p, i) => (
                <tr key={i}>
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">{p.relation}</td>
                  <td className="p-2 border">{p.occupation}</td>
                  <td className="p-2 border">{p.contact}</td>
                  <td className="p-2 border">{p.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Guardian */}
        <div className="mt-4 text-sm">
          <h3 className="font-semibold mb-2">Guardian Details</h3>
          <table className="w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Relation with Student</th>
                <th className="p-2 border">Occupation</th>
                <th className="p-2 border">Contact Number</th>
                <th className="p-2 border">Email Id</th>
              </tr>
            </thead>
            <tbody>
              {student.guardian?.map((g, i) => (
                <tr key={i}>
                  <td className="p-2 border">{g.name}</td>
                  <td className="p-2 border">{g.relation}</td>
                  <td className="p-2 border">{g.occupation}</td>
                  <td className="p-2 border">{g.contact}</td>
                  <td className="p-2 border">{g.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
</BorderedFieldset>
        {/* Academic Info */}
        <BorderedFieldset legend="Academic Info " className="border border-gray-700">
        <div className=" text-sm">
          <p className="p-1"><b>Previous School Name:</b> {student.previousSchool}</p>
          <p className="p-1"><b>Last Class Attended:</b> {student.lastClass}</p>
          <p className="p-1"><b>Previous Year Performance:</b> {student.previousPerformance}</p>
          <p className="p-1"><b>Admission Notes:</b> {student.admissionNotes}</p>
        </div>
</BorderedFieldset>
        {/* Documents */}
          <BorderedFieldset legend="Documents" className="border border-gray-700">
      
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {student.documents &&
              Object.entries(student.documents).map(([key, label], i) => (
                <p key={i}>
                  <span className="font-semibold capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>{" "}
                  <button className="text-blue-600 underline">{label}</button>
                </p>
              ))}
        </div>
        </BorderedFieldset>
      </div>
    </>
  );
};

export default ViewStudentDetails;
