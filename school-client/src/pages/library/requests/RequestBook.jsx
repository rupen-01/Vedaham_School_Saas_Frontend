import React, { useState } from "react";
import Card from "../../../components/common/Card";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import SlidingLabelTextarea from "../../../components/common/SlidingLabelTextarea";
import HeadingHeader from "../../../components/common/HeadingHeader";

const RequestBook = () => {
  const [requestData, setRequestData] = useState({
    requesterName: "",
    requesterType: "",
    dateRequested: "",
    bookTitle: "",
    reason: "",
  });

  const requesterOptions = ["Student", "Teacher", "Staff"];
  const requesterNames = ["John Doe", "Priya Sharma", "Amit Kumar"];
  const bookTitles = ["Mathematics Vol 1", "Physics Concepts", "English Grammar"];

  const handleChange = (field, value) => {
    setRequestData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <HeadingHeader
        title="Request Book"
        items={[
          { label: "Library", path: "/library" },
          { label: "Request", path: "/library/request" },
          { label: "Manage Request", path: "/library/request/manage" },
        ]}
      />

      <div className="flex flex-col">
        <Card>
          {/* Requester Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SlidingLabelSelect
              label="Requester Name"
              name="requesterName"
              value={requestData.requesterName}
              onChangeProp={(e) => handleChange("requesterName", e.target.value)}
              options={requesterNames.map((n) => ({ label: n, value: n }))}
              className="w-full"
            />

            <SlidingLabelSelect
              label="Requester Type"
              name="requesterType"
              value={requestData.requesterType}
              onChangeProp={(e) => handleChange("requesterType", e.target.value)}
              options={requesterOptions.map((t) => ({ label: t, value: t }))}
              className="w-full"
            />

            <SlidingLabelInput
              type="date"
              label="Date Requested"
              value={requestData.dateRequested}
              onChange={(e) => handleChange("dateRequested", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Book Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 ">
            <SlidingLabelSelect
              label="Book Title Requested"
              name="bookTitle"
              value={requestData.bookTitle}
              onChangeProp={(e) => handleChange("bookTitle", e.target.value)}
              options={bookTitles.map((b) => ({ label: b, value: b }))}
              className="w-full"
            />
          </div>

          {/* Reason */}
          <SlidingLabelTextarea

            label="Reason"
            placeholder="Enter reason for requesting the book"
            value={requestData.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            className="mt-6 w-full"
          />

          {/* Button */}
          <div className="text-right mt-6">
            <button
              onClick={() => console.log(requestData)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Request Book
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default RequestBook;
