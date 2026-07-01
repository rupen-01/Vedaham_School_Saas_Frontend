import React, { useState } from "react"; 
import HeadingHeader from "../../../components/common/HeadingHeader";
import Card from "../../../components/common/Card";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import BorderedFieldset from "../../../components/common/BorderedFieldset";
import SlidingLabelRadio from "../../../components/common/SlidingLabelRadio";
import BackButton from "../../../components/common/BackButton";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import ViewModal from "../../../components/common/Viewmodel";

const IssueBook = () => {
  const [deleteData, setDeleteData] = useState(null);
  const [viewData, setViewData] = useState(null);

  // ✅ Declare classes here
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4"];

  const [formData, setFormData] = useState({
    member: "",
    type: "Student",
    bookCode: "",
    section: "",
    class: "",
    department: "",
    staff: "",
    issueDate: "",
    dueDate: "",
    remark: "",
    availableCount: "12", // mock value
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const [issueData, setIssueData] = useState({
    member: "",
    type: "Student",
    bookCode: "",
    section: "",
    class: "",
    department: "",
    staff: "",
    issueDate: "",
    dueDate: "",
    remark: "",
  });

  const issuedBooks = [
    {
      id: "IS001",
      title: "Introduction to Algorithms",
      issueDate: "2025-08-01",
      returnDate: "2025-08-15",
      status: "Issued",
      condition: "Good",
    },
    {
      id: "IS002",
      title: "Database Systems",
      issueDate: "2025-08-05",
      returnDate: "2025-08-20",
      status: "Returned",
      condition: "Damaged",
    },
  ];

  const tableConfig = {
    headers: [
      "Issue ID",
      "Book Title",
      "Issue Date",
      "Due Date",
      "Return Date",
      "Status",
      "Condition",

    ],
    keys: [
      "id",
      "title",
      "issueDate",
      "dueDate",
      "returnDate",
      "status",
      "condition",

    ],
  };

  const tableData = issuedBooks.map((book) => ({
    ...book,
    returnDate: book.returnDate || "-",
    condition: book.condition || "-",
 
    
  }));

  return (
    <>
      <HeadingHeader
        title="Issue Book"
        items={[
          { label: "Library", path: "/" },
          { label: "Issue Book", path: "/library/issue-book" },
        ]}
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <SlidingLabelInput
              label="Issuer Name / ID"
              value={formData.issuer}
              onChange={(e) => handleChange("issuer", e.target.value)}
              required
            />
            <SlidingLabelInput
              label="Book Title / Code"
              value={formData.bookCode}
              onChange={(e) => handleChange("bookCode", e.target.value)}
              required
            />

            <SlidingLabelSelect
              label="Type"
              name={"type"}
              value={formData.type}
              onChangeProp={(e) => handleChange("type", e.target.value)}
              required
              options={[
                { label: "Student", value: "Student" },
                { label: "Staff", value: "Staff" },
              ]}
            />

            {formData.type === "Student" ? (
              <SlidingLabelSelect
                label="Select Class"
                name={"class"}
                value={formData.class}
                onChangeProp={(e) => handleChange("class", e.target.value)}
                required
                options={classes.map((cls) => ({ label: cls, value: cls }))}
              />
            ) : (
              <SlidingLabelSelect
                label="Department"
                name={"department"}
                value={formData.department}
                onChangeProp={(e) => handleChange("department", e.target.value)}
                required
                options={[
                  { label: "Human Resources", value: "Human Resources" },
                  { label: "Finance", value: "Finance" },
                  { label: "Development", value: "Development" },
                  { label: "Marketing", value: "Marketing" },
                ]}
              />
            )}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {formData.type === "Student" ? (
              <SlidingLabelSelect
                label="Select Section"
                name={"section"}
                value={formData.section}
                onChangeProp={(e) => handleChange("section", e.target.value)}
                required
                options={["A", "B", "C", "D"].map((sec) => ({
                  label: sec,
                  value: sec,
                }))}
              />
            ) : (
              <SlidingLabelInput
                label="Staff Name"
                value={formData.issuer}
                onChange={(e) => handleChange("issuer", e.target.value)}
                required
              />
            )}

            <SlidingLabelSelect
              label="Select Student"
              name={"student"}
              value={formData.student}
              onChangeProp={(e) => handleChange("student", e.target.value)}
              required
              options={["Student 1", "Student 2", "Student 3"].map((s) => ({
                label: s,
                value: s,
              }))}
            />

            <SlidingLabelInput
              type="date"
              label="Issue Date"
              value={formData.issueDate}
              onChange={(e) => handleChange("issueDate", e.target.value)}
              required
            />
            <SlidingLabelInput
              type="date"
              label="Due Date"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              required
            />
            <SlidingLabelInput
              label="Available Count"
              value={formData.availableCount}
              disabled
            />
          </div>

          <Table
            className="shadow-none overflow-x-auto"
            Search={false}
            ImageContainerShow={false}
            Data={tableData}
            headers={tableConfig.headers}
            dataKeys={tableConfig.keys}
          />

          {/* Remarks */}
          <SlidingLabelInput
            label="Remarks"
            value={formData.remark}
            onChange={(e) => handleChange("remark", e.target.value)}
          />
        </form>
      </Card>

      {/* Buttons */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Issue Book
        </button>
      </div>

      {/* Staff Issue Form */}
      <Card className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <SlidingLabelInput
            label="Member Name/ID"
            value={issueData.member}
            onChange={(e) => handleChange("member", e.target.value)}
          />
          <SlidingLabelInput
            label="Book Title/Code"
            value={issueData.bookCode}
            onChange={(e) => handleChange("bookCode", e.target.value)}
          />
          <SlidingLabelInput label="Type" value="Staff" readOnly />
          <SlidingLabelInput
            label="Department"
            value={issueData.department}
            onChange={(e) => handleChange("department", e.target.value)}
          />

          <SlidingLabelSelect
            label="Select Staff"
            name={"staff"}
            value={formData.staff}
            onChangeProp={(e) => handleChange("staff", e.target.value)}
            required
            options={["Staff 1", "Staff 2", "Staff 3"].map((s) => ({
              label: s,
              value: s,
            }))}
          />

          <SlidingLabelInput
            type="date"
            label="Issue Date"
            value={issueData.issueDate}
            onChange={(e) => handleChange("issueDate", e.target.value)}
          />
          <SlidingLabelInput
            type="date"
            label="Due Date"
            value={issueData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />
          <SlidingLabelInput label="Available Count" value="2" readOnly />
        </div>

        <SlidingLabelInput
          className="mt-3"
          label="Remark"
          value={issueData.remark}
          onChange={(e) => handleChange("remark", e.target.value)}
        />
      </Card>

      {/* Modals */}
      <DeleteModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        alertMessage="Are you sure you want to delete this issued record?"
      />

      <ViewModal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="Issued Book Details"
        data={viewData}
      />
    </>
  );
};

export default IssueBook;
