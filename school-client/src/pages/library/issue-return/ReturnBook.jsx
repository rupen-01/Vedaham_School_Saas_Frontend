import React, { useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Card from "../../../components/common/Card";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import BorderedFieldset from "../../../components/common/BorderedFieldset";

const ReturnBook = () => {
  const [formData, setFormData] = useState({
    section: "",
    student: "",
    type: "Student",
    class: "",
    issuedBook: "",
    returnType: "",
    returnDate: "",
    condition: "",
    fine: "20",
    remark: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Return Data:", formData);
    alert("Book Returned Successfully!");
    // API call here
  };

  return (
    <>
      <HeadingHeader
        title="Return Book"
        items={[
          { label: "Library", path: "/" },
          { label: "Issue & Return", path: "/library/issue-return" },
          { label: "Return Book", path: "/library/return-book" },
        ]}
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SlidingLabelSelect
              label="Select Section (Optional)"
              name="section"
              value={formData.section}
              onChangeProp={(e) => handleChange("section", e.target.value)}
              options={[
                { label: "A", value: "A" },
                { label: "B", value: "B" },
              ]}
            />

            <SlidingLabelSelect
              label="Select Student"
              name="student"
              value={formData.student}
              onChange={(e) => handleChange("student", e.target.value)}
              options={[
                { label: "Amit", value: "1" },
                { label: "Kanha", value: "2" },
              ]}
              required
            />

            <SlidingLabelSelect
              label="Type"
              name="type"
              value={formData.type}
              onChangeProp={(e) => handleChange("type", e.target.value)}
              options={[
                { label: "Student", value: "Student" },
                { label: "Staff", value: "Staff" },
              ]}
            />

            <SlidingLabelSelect
              label="Select Class"
              name="class"
              value={formData.class}
              onChangeProp={(e) => handleChange("class", e.target.value)}
              options={[
                { label: "Class 1", value: "1" },
                { label: "Class 2", value: "2" },
              ]}
              required
            />
          </div>

          <BorderedFieldset legend="Issued Book">
            {/* Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <SlidingLabelSelect
                label="Issued Book"
                name="issuedBook"
                value={formData.issuedBook}
                onChangeProp={(e) =>
                  handleChange("issuedBook", e.target.value)
                }
                options={[
                  { label: "Introduction to Algorithms", value: "Intro to Algo" },
                  { label: "Database Systems", value: "DB Systems" },
                ]}
                required
              />

              <SlidingLabelSelect
                label="Select Return/Renewal"
                name="returnType"
                value={formData.returnType}
                onChangeProp={(e) => handleChange("returnType", e.target.value)}
                options={[
                  { label: "Return", value: "Return" },
                  { label: "Renewal", value: "Renewal" },
                ]}
                required
              />

              <SlidingLabelSelect
                label="Select Condition (Optional)"
                name="condition"
                value={formData.condition}
                onChangeProp={(e) => handleChange("condition", e.target.value)}
                options={[
                  { label: "Good", value: "Good" },
                  { label: "Damaged", value: "Damaged" },
                  { label: "Lost", value: "Lost" },
                ]}
              />

              <SlidingLabelInput
                type="date"
                label="Return Date"
                value={formData.returnDate}
                onChange={(e) => handleChange("returnDate", e.target.value)}
              />

              <SlidingLabelInput label="Fine" value={formData.fine} disabled />
            </div>
          </BorderedFieldset>

          <SlidingLabelInput
            label="Remark"
            value={formData.remark}
            onChange={(e) => handleChange("remark", e.target.value)}
          />

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Return Book
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default ReturnBook;
