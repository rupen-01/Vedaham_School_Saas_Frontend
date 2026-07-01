// import React, { useState } from 'react';
// import Card from '../../../components/common/Card';
// import SlidingLabelSelect from '../../../components/common/SlidingSelect';
// import BorderedFieldset from '../../../components/common/BorderedFieldset';
// import SlidingLabelInput from '../../../components/common/SlidingLabelInput';
// import SlidingLabelTextarea from '../../../components/common/SlidingLabelTextarea';
// import HeadingHeader from '../../../components/common/HeadingHeader';
// import SlidingLabelCheckbox from '../../../components/common/SlidingLabelCheckbox';
// import SlidingLabelRadio from '../../../components/common/SlidingLabelRadio';

// const UploadStudyNotes = () => {
//   const [notesData, setNotesData] = useState({
//     uploadedBy: 'Pragya Sharma',
//     selectedClass: '',
//     selectedSections: [],
//     subject: '',
//     title: '',
//     uploadedDate: new Date().toISOString().split('T')[0],
//     fileType: '',
//     attachment: null,
//     status: 'Active',
//     description: '',
//   });

//   const classOptions = ['Class 1', 'Class 2', 'Class 3'];
//   const sectionOptions = ['A', 'B','C','D'];
//   const subjectOptions = ['Math', 'Science', 'English'];
//   const fileTypeOptions = ['PDF', 'DOC', 'Image'];

//   const handleChange = (field, value) => {
//     setNotesData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSectionToggle = (section) => {
//     setNotesData((prev) => {
//       const isSelected = prev.selectedSections.includes(section);
//       return {
//         ...prev,
//         selectedSections: isSelected
//           ? prev.selectedSections.filter((s) => s !== section)
//           : [...prev.selectedSections, section],
//       };
//     });
//   };

//   return (
//     <>
//       <HeadingHeader
//         title="Upload Study Notes"
//         items={[
//           { label: 'Academic', path: '/academic' },
//           { label: 'Assignments & Notes', path: '/academic/assignments' },
//           { label: 'Upload Study Notes', path: '/academic/assignments/upload' },
//         ]}
//       />

//       <div className="flex flex-col gap-4">
//         <Card>
//           {/* Top Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <SlidingLabelInput
//               label="Uploaded By"
//               value={notesData.uploadedBy}
//               disabled
//             />

//             <SlidingLabelSelect
//               label="Select Class"
//               name={"selectedClass"}
//               value={notesData.selectedClass}
//               onChangeProp={(e) => handleChange('selectedClass', e.target.value)}
//               options={classOptions.map((cls) => ({ label: cls, value: cls }))}
//          />
         
//             {/* Sections */}

//             <SlidingLabelSelect
//               label="Select Class"
//               name={"selectedClass"}
//               value={notesData.selectedClass}
//               onChangeProp={(e) => handleChange('selectedClass', e.target.value)}
//               options={classOptions.map((cls) => ({ label: cls, value: cls }))}
//             ></SlidingLabelSelect>
//          <BorderedFieldset
//                             legend={<span className="text-xs font-medium">Section</span>}
//                             className="h-12 mt-0 flex items-center"
//                           >
                          
//                                     <div className="grid grid-cols-4 gap-4 ">
//                               {sectionOptions.map((section) => (
//                                         <SlidingLabelCheckbox
//                                               key={section}
//                     label={section}
//                     checked={notesData.selectedSections.includes(section)}
//                     onChange={() => handleSectionToggle(section)}
//                                         />
//                                       ))}
//                                     </div>
//                                   </BorderedFieldset>
//           </div>

//           {/* Second Row */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
//             <SlidingLabelSelect
//               label="Select Subject"
//               value={notesData.subject}
//               onChange={(e) => handleChange('subject', e.target.value)}
//             >
//               <option value="">Select Subject</option>
//               {subjectOptions.map((subj, i) => (
//                 <option key={i} value={subj}>
//                   {subj}
//                 </option>
//               ))}
//             </SlidingLabelSelect>

//             <SlidingLabelInput
//               label="Title"
//               value={notesData.title}
//               onChange={(e) => handleChange('title', e.target.value)}
//             />

//             <SlidingLabelInput
//               type="date"
//               label="Uploaded Date"
//               value={notesData.uploadedDate}
//               disabled
//             />
//           </div>

//           {/* File upload */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
//             <SlidingLabelSelect
//               label="Upload File Type"
//               value={notesData.fileType}
//               onChange={(e) => handleChange('fileType', e.target.value)}
//             >
//               <option value="">Select File Type</option>
//               {fileTypeOptions.map((file, i) => (
//                 <option key={i} value={file}>
//                   {file}
//                 </option>
//               ))}
//             </SlidingLabelSelect>

//             <SlidingLabelInput
//               type="file"
//               label="Attachment(PDF)"
//               onChange={(e) => handleChange('attachment', e.target.files[0])}
//             />

  

//          <BorderedFieldset
//   legend={<span className="text-xs font-medium">Status</span>}
//   className="h-11 mt-0 flex items-center"
// >
//   <div className="flex items-center justify-center  mb-5">
//     <SlidingLabelRadio
//       name="status"
//       value={notesData.status}
//       onChange={(e) => handleChange('status', e.target.value)}
//       options={['Active', 'Inactive']}
//     />
//   </div>
// </BorderedFieldset>

//                     </div>
//                     <div className='mt-2'>
//           {/* Description */}
//           <SlidingLabelTextarea
//             label="Description/Note"
//             placeholder="Enter description or notes"
//             value={notesData.description}
//             onChange={(e) => handleChange('description', e.target.value)}
      
//           />
//           </div>

//           {/* Submit Button */}
//           <div className="text-right mt-6">
//             <button
//               onClick={() => console.log(notesData)}
//               className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
//             >
//               Upload Notes
//             </button>
//           </div>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default UploadStudyNotes;
import React, { useState } from 'react';
import Card from '../../../components/common/Card';
import SlidingLabelSelect from '../../../components/common/SlidingSelect';
import BorderedFieldset from '../../../components/common/BorderedFieldset';
import SlidingLabelInput from '../../../components/common/SlidingLabelInput';
import SlidingLabelTextarea from '../../../components/common/SlidingLabelTextarea';
import HeadingHeader from '../../../components/common/HeadingHeader';
import SlidingLabelCheckbox from '../../../components/common/SlidingLabelCheckbox';
import SlidingLabelRadio from '../../../components/common/SlidingLabelRadio';

const UploadStudyNotes = () => {
  const [notesData, setNotesData] = useState({
    uploadedBy: 'Pragya Sharma',
    selectedClass: '',
    selectedSections: [],
    subject: '',
    title: '',
    uploadedDate: new Date().toISOString().split('T')[0],
    fileType: '',
    attachment: null,
    status: 'Active',
    description: '',
  });

  const data = {
    classes: ['Class 1', 'Class 2', 'Class 3'],
    sectionsByClass: {
      'Class 1': ['A', 'B'],
      'Class 2': ['A', 'B', 'C'],
      'Class 3': ['A', 'B', 'C', 'D'],
    },
    subjects: ['Math', 'Science', 'English'],
    fileTypes: ['PDF', 'DOC', 'Image'],
  };

  const handleChange = (field, value) => {
    setNotesData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'selectedClass' && { selectedSections: [] }),
    }));
  };

  const handleSectionToggle = (section) => {
    setNotesData((prev) => {
      const isSelected = prev.selectedSections.includes(section);
      return {
        ...prev,
        selectedSections: isSelected
          ? prev.selectedSections.filter((s) => s !== section)
          : [...prev.selectedSections, section],
      };
    });
  };

  return (
    <>
      <HeadingHeader
        title="Upload Study Notes"
        items={[
          { label: 'Academic', path: '/academic' },
          { label: 'Assignments & Notes', path: '/academic/assignments' },
          { label: 'Upload Study Notes', path: '/academic/assignments/upload' },
        ]}
      />

      <div className="flex flex-col gap-4">
        <Card>
          {/* Top Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SlidingLabelInput
              label="Uploaded By"
              value={notesData.uploadedBy}
              disabled
            />

            <SlidingLabelSelect
              label="Select Class"
              name="selectedClass"
              value={notesData.selectedClass}
              onChangeProp={(e) => handleChange('selectedClass', e.target.value)}
              options={data.classes.map((cls) => ({ label: cls, value: cls }))}
            />

            {/* Sections */}
      
            <SlidingLabelSelect
              label="Select Section"
              name="selectedSections"
              value={notesData.selectedSections}
              multiple
              onChangeProp={(e) => handleChange('selectedSections', e.target.value)}
              options={
                notesData.selectedClass
                  ? data.sectionsByClass[notesData.selectedClass].map((sec) => ({
                      label: sec,
                      value: sec,
                    }))
                  : []
              }
            />
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <SlidingLabelSelect
              label="Select Subject"
              value={notesData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              options={data.subjects.map((s) => ({ label: s, value: s }))}
            />

            <SlidingLabelInput
              label="Title"
              value={notesData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />

            <SlidingLabelInput
              type="date"
              label="Uploaded Date"
              value={notesData.uploadedDate}
              disabled
            />
          </div>

          {/* File upload */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <SlidingLabelSelect
              label="Upload File Type"
              value={notesData.fileType}
              onChange={(e) => handleChange('fileType', e.target.value)}
              options={data.fileTypes.map((f) => ({ label: f, value: f }))}
            />

            <SlidingLabelInput
              type="file"
              label="Attachment"
              onChange={(e) => handleChange('attachment', e.target.files[0])}
            />

            {/* Status */}
            <BorderedFieldset
              legend={<span className="text-xs font-medium">Status</span>}
              className="h-auto mt-0 flex flex-col sm:flex-row sm:items-center"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <SlidingLabelRadio
                  name="status"
                  value={notesData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  options={['Active', 'Inactive']}
                />
              </div>
            </BorderedFieldset>
          </div>

          {/* Description */}
          <div className="mt-4">
            <SlidingLabelTextarea
              label="Description/Note"
              placeholder="Enter description or notes"
              value={notesData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="text-right mt-6">
            <button
              onClick={() => console.log(notesData)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
            >
              Upload Notes
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UploadStudyNotes;
