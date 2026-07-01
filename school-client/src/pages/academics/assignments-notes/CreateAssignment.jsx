import React, { useState } from 'react';
import Card from '../../../components/common/Card';
import SlidingLabelSelect from '../../../components/common/SlidingSelect';
import BorderedFieldset from '../../../components/common/BorderedFieldset';
import SlidingLabelInput from '../../../components/common/SlidingLabelInput';
import SlidingLabelTextarea from '../../../components/common/SlidingLabelTextarea';
import HeadingHeader from '../../../components/common/HeadingHeader';
import ToggleSwitch from '../../../components/common/ToggleSwitch';
import SlidingLabelRadio from '../../../components/common/SlidingLabelRadio';

const CreateAssignment = () => {
  const [assignmentData, setAssignmentData] = useState({
    assignedTeacher: 'Seema Sharma',
    selectedClass: '',
    selectedSections: [],
    subject: '',
    title: '',
    issueDate: '',
    submissionDate: '',
    allowLateSubmission: false,
    status: 'active',
    attachment: null,
    description: '',
  });

  const classOptions = ['Class 1', 'Class 2', 'Class 3'];
  const sectionOptions = ['A', 'B', 'C'];
  const subjectOptions = ['Math', 'Science', 'English'];

  const handleChange = (field, value) => {
    setAssignmentData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <HeadingHeader
        title="Create Assignment"
        items={[
          { label: 'Academic', path: '/academic' },
          { label: 'Assignments & Notes', path: '/academic/assignments' },
          { label: 'Create Assignment', path: '/academic/assignments/create' },
        ]}
      />

      <div className="flex flex-col">
        <Card>
          {/* Teacher, Class, Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SlidingLabelInput
              label="Assigned Teacher"
              value={assignmentData.assignedTeacher}
              disabled
              className="w-full"
            />

            <SlidingLabelSelect
              label="Select Class"
              name="selectedClass"
              value={assignmentData.selectedClass}
              onChangeProp={(e) => handleChange('selectedClass', e.target.value)}
              options={classOptions.map((cls) => ({ label: cls, value: cls }))}
              className="w-full"
            />

            <SlidingLabelSelect
              label="Select Section"
              name="selectedSections"
              value={assignmentData.selectedSections}
              multiple
              onChangeProp={(e) => handleChange('selectedSections', e.target.value)}
              options={sectionOptions.map((sec) => ({ label: sec, value: sec }))}
              className="w-full"
            />
          </div>

          {/* Subject, Title, File Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <SlidingLabelSelect
              label="Select Subject"
              name="subject"
              value={assignmentData.subject}
              onChangeProp={(e) => handleChange('subject', e.target.value)}
              options={subjectOptions.map((subj) => ({ label: subj, value: subj }))}
              className="w-full"
            />

            <SlidingLabelInput
              label="Title"
              value={assignmentData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full"
            />

            <SlidingLabelInput
              type="file"
              label="Attachment (Optional)"
              onChange={(e) => handleChange('attachment', e.target.files[0])}
              className="w-full"
            />
          </div>

          {/* Dates + Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">
            <SlidingLabelInput
              type="date"
              label="Issue Date"
              value={assignmentData.issueDate}
              onChange={(e) => handleChange('issueDate', e.target.value)}
              className="w-full"
            />

            <SlidingLabelInput
              type="date"
              label="Submission Date"
              value={assignmentData.submissionDate}
              onChange={(e) => handleChange('submissionDate', e.target.value)}
              className="w-full"
            />

            <ToggleSwitch
              label="Allow Late Submission"
              checked={assignmentData.allowLateSubmission}
              onChange={(val) => handleChange('allowLateSubmission', val)}
              className="w-full"
            />
          </div>

          {/* Status */}
    <BorderedFieldset 
  legend="Status" 
  className="mt-8 p-3 text-[12px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 h-auto"
>
  <SlidingLabelRadio
    name="status"
    value={assignmentData.status}
    onChange={(e) => handleChange("status", e.target.value)}
    options={["Active", "Inactive"]}
  />
</BorderedFieldset>


          {/* Description */}
          <SlidingLabelTextarea
            label="Description/Note"
            placeholder="Enter description or notes"
            value={assignmentData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="mt-4 w-full"
          />

          {/* Button */}
          <div className="text-right mt-6">
            <button
              onClick={() => console.log(assignmentData)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Add Assignment
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CreateAssignment;
