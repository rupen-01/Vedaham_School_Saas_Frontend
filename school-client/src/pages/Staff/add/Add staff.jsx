import React, { useState } from 'react';
import HeadingHeader from '../../../components/common/HeadingHeader';
import StepperIndicator from '../../../components/common/Stepper';
import SlidingLabelSelect from '../../../components/common/SlidingSelect';
import SlidingLabelInput from '../../../components/common/SlidingLabelInput';
import Card from '../../../components/common/Card';
import PrevButton from '../../../components/common/PrevButton';
import NextButton from '../../../components/common/NextButton';
import BorderedFieldset from '../../../components/common/BorderedFieldset';
import SlidingLabelCheckbox from '../../../components/common/SlidingLabelCheckbox';
import BulkUploadModal from './component/BulkUploadModal';
import { Icon } from '@iconify/react';
export default function AddStaff() {

    
  const [isModalOpen, setIsModalOpen] = useState(false);
const [step, setStep] = useState("Basic Information");
  const steps = [
    "Basic Information",
    "Education & Experience",
    "Identity & Official",
    "Bank Details",
    "Documents Upload",
    "Application Access"
  ];

  const [staffData, setStaffData] = useState({
    role: '', department: '', firstName: '', lastName: '', fatherName: '',
    motherName: '', email: '', phone: '', emergencyContact: '', gender: '',
    dob: '', doj: '', maritalStatus: '', address: '', permanentAddress: '',
    uploadImage: null, education: [], experience: [], aadhar: '', pan: '',
    bloodGroup: '', contractType: '', basicSalary: '', workShift: '',
    workLocation: '', medicalLeave: '', casualLeave: '', maternityLeave: '',
    sickLeave: '', bankName: '', accountName: '', accountNumber: '',
    ifscCode: '', branch: '', documents: {}, giveaccesstoapplication: false,
    username: '', password: '', confirmPassword: '', accessRole: ''
  });
const role = ['Teacher', 'Admin', 'Accountant', 'Librarian', 'Receptionist'];
const department = ['Math', 'Science', 'English', 'History', 'Computer'];
const gender = ['Male','Female'];
const maritalStatus = ['Single','Married'];
const contracttype = ['Full-Time','Part-Time','Contract'];
const workshift = ['Morning','Evening','Night'];
  const currentIndex = steps.indexOf(step);

  const handleChange = (field, value) => {
    setStaffData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    console.log("\u{1F50D} Staff Data at Step:", step);
    console.log(staffData);

    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    } else {
      console.log("\u{2705} Final Form Submission Data:", staffData);
      // Optionally submit to API here
    }
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...staffData.education];
    updated[index][field] = value;
    setStaffData(prev => ({ ...prev, education: updated }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...staffData.experience];
    updated[index][field] = value;
    setStaffData(prev => ({ ...prev, experience: updated }));
  };

  const addEducation = () => {
    const updated = [...staffData.education, { educationName: '', board: '', institute: '', session: '' }];
    setStaffData(prev => ({ ...prev, education: updated }));
  };

  const removeEducation = (index) => {
    const updated = staffData.education.filter((_, i) => i !== index);
    setStaffData(prev => ({ ...prev, education: updated }));
  };

  const addExperience = () => {
    const updated = [...staffData.experience, { company: '', period: '', role: '', reason: '' }];
    setStaffData(prev => ({ ...prev, experience: updated }));
  };

  const removeExperience = (index) => {
    const updated = staffData.experience.filter((_, i) => i !== index);
    setStaffData(prev => ({ ...prev, experience: updated }));
  };

  const handleFileChange = (name, file) => {
    setStaffData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: file
      }
    }));
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };
    const [education, setEducation] = useState([
    { educationName: "", board: "", institute: "", session: "" },
  ]);
  const [experience, setExperience] = useState([
    { company: "", period: "", role: "", reason: "" },
  ]);

  return (
    <div>
   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
  {/* Header */}
  <HeadingHeader
    title="Add Staff"
    items={[
      { label: "Dashboard", path: "/" },
      { label: "Staff", path: "/staff/manage" },
      { label: "Add Staff", path: "/staff/add" },
    ]}
  />

  {/* Bulk Upload button */}
  <button
    onClick={() => setIsModalOpen(true)}
    className=" mb-4 flex items-center bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 cursor-pointer ml-3  sm:w-auto justify-center"
  >
    <Icon icon="mdi:cloud-upload" className="w-5 h-5 mr-2" />
    Bulk Upload
  </button>
</div>

      <Card>
        {/* Stepper */}
        <StepperIndicator
          steps={steps}
          icons={[
            "mdi:account",
            "mdi:school",
            "mdi:card-account-details",
            "mdi:bank",
            "mdi:file-upload",
            "mdi:lock"
          ]}
          activeStep={step}
        />

        {/* Step Sections */}
   
          {/* 1️⃣ Basic Information */}
          {step === "Basic Information" && (
     <>
         <BorderedFieldset className='h-auto'>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
   
    <SlidingLabelSelect
      label="Role"
      name={"role"}
      value={staffData.role}
      onChangeProp={(e) => setStaffData({ staffData, role: e.target.value })}
      options={role.map((role) => ({ label: role, value: role }))}
    />


    <SlidingLabelSelect
      label="Department"
      name={"department"}
      value={staffData.department}
      onChangeProp={(e) => setStaffData({staffData, department: e.target.value })}
      options={department.map((dept) => ({ label: dept, value: dept }))}
    />


    <SlidingLabelInput
      label="First Name"
      value={staffData.firstName}
      onChange={(e) => setStaffData({ ...staffData, firstName: e.target.value })}
    />

    <SlidingLabelInput
      label="Last Name"
      value={staffData.lastName}
      onChange={(e) => setStaffData({ ...staffData, lastName: e.target.value })}
    />

    <SlidingLabelInput
      label="Father Name"
      value={staffData.fatherName}
      onChange={(e) => setStaffData({ ...staffData, fatherName: e.target.value })}
    />

    <SlidingLabelInput
      label="Mother Name"
      value={staffData.motherName}
      onChange={(e) => setStaffData({ ...staffData, motherName: e.target.value })}
    />

    <SlidingLabelInput
      type="email"
      label="Email"
      value={staffData.email}
      onChange={(e) => setStaffData({ ...staffData, email: e.target.value })}
    />

    <SlidingLabelInput
      label="Phone"
      value={staffData.phone}
      onChange={(e) => setStaffData({ ...staffData, phone: e.target.value })}
    />

    <SlidingLabelInput
      label="Emergency Contact"
      value={staffData.emergencyContact}
      onChange={(e) => setStaffData({ ...staffData, emergencyContact: e.target.value })}
    />

    <SlidingLabelSelect
      label="Gender"
      name={'gender'}
      value={staffData.gender}
      onChangeProp={(e) => setStaffData({ ...staffData, gender: e.target.value })}
      options={gender.map((gender) => ({ label: gender, value: gender}))}
    >
      <option value="">Select Gender</option>
      <option>Male</option>
      <option>Female</option>
    </SlidingLabelSelect>

    <SlidingLabelInput
      type="date"
      label="Date of Birth"
      value={staffData.dob}
      onChange={(e) => setStaffData({ ...staffData, dob: e.target.value })}
    />

    <SlidingLabelInput
      type="date"
      label="Date of Joining"
      value={staffData.doj}
      onChange={(e) => setStaffData({ ...staffData, doj: e.target.value })}
    />

    {/* Marital Status and Upload Image in one row */}
    <SlidingLabelSelect
      label="Marital Status"  
      name={'maritalStatus'}
      value={staffData.maritalStatus}
      onChangeProp={(e) => setStaffData({ ...staffData, maritalStatus: e.target.value })}
      options={maritalStatus.map((status) => ({ label: status, value: status }))}
      className="col-span-3"
    >
  
    </SlidingLabelSelect>

    <SlidingLabelInput
      label="Upload Image"
      type="file"
      onChange={(file) => setStaffData({ ...staffData, uploadImage: file })}

    />

  </div>
  <div  className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-5'> 
    {/* Address and Permanent Address in one row */}
    <SlidingLabelInput
      label="Address"
      value={staffData.address}
      onChange={(e) => setStaffData({ ...staffData, address: e.target.value })}
      className="col-span-2"
    />

    <SlidingLabelInput
      label="Permanent Address"
      value={staffData.permanentAddress}
      onChange={(e) => setStaffData({ ...staffData, permanentAddress: e.target.value })}
      className="col-span-2"
    />
    </div>
      </BorderedFieldset>
</>


          )}

          {/* 2️⃣ Education & Experience */}
          {step === "Education & Experience" && (

<>
  {/* Education Section */}
  <BorderedFieldset legend="Education" className="min-h-[10rem]">
    {(staffData.education.length ? staffData.education : [{ educationName: '', board: '', institute: '', session: '' }]).map((edu, index) => (
      <React.Fragment key={index}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full mt-4">
          <SlidingLabelInput
            label="Education Name"
            value={edu.educationName}
            onChange={(e) =>
              handleEducationChange(index, "educationName", e.target.value)
            }
          />
          <SlidingLabelInput
            label="Board/University"
            value={edu.board}
            onChange={(e) =>
              handleEducationChange(index, "board", e.target.value)
            }
          />
          <SlidingLabelInput
            label="Institute Name"
            value={edu.institute}
            onChange={(e) =>
              handleEducationChange(index, "institute", e.target.value)
            }
          />
          <div className="flex items-end gap-2">
            <SlidingLabelInput
              label="Session"
              value={edu.session}
              onChange={(e) =>
                handleEducationChange(index, "session", e.target.value)
              }
            />
            {staffData.education.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="flex items-center cursor-pointer justify-center w-9 h-9 rounded-full border border-red-500 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200 shrink-0"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    ))}
    <div className="flex justify-end mt-3">
      <button
        type="button"
        onClick={addEducation}
        className="bg-indigo-600 text-white cursor-pointer px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
      >
        Add Education
      </button>
    </div>
  </BorderedFieldset>

  {/* Experience Section */}
  <BorderedFieldset legend="Experience">
    {(staffData.experience.length ? staffData.experience : [{ company: '', period: '', role: '', reason: '' }]).map((exp, index) => (
      <React.Fragment key={index}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full mt-4">
          <SlidingLabelInput
            label="Company/Institute Name"
            value={exp.company}
            onChange={(e) =>
              handleExperienceChange(index, "company", e.target.value)
            }
          />
          <SlidingLabelInput
            label="Working Period"
            value={exp.period}
            onChange={(e) =>
              handleExperienceChange(index, "period", e.target.value)
            }
          />
          <SlidingLabelInput
            label="Role"
            value={exp.role}
            onChange={(e) =>
              handleExperienceChange(index, "role", e.target.value)
            }
          />
          <div className="flex items-end gap-2">
            <SlidingLabelInput
              label="Reason for Resign"
              value={exp.reason}
              onChange={(e) =>
                handleExperienceChange(index, "reason", e.target.value)
              }
            />
            {staffData.experience.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="flex items-center cursor-pointer justify-center w-9 h-9 rounded-full border border-red-500 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200 shrink-0"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    ))}
    <div className="flex justify-end mt-3">
      <button
        type="button"
        onClick={addExperience}
        className="bg-indigo-600 text-white cursor-pointer px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
      >
        Add Experience
      </button>
    </div>
  </BorderedFieldset>
</>

)}

        

          {/* 3️⃣ Identity & Official */}
          {step === "Identity & Official" && (

         <>
             <BorderedFieldset className='h-auto'>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
   
    <SlidingLabelInput
      label="Aadhar Number"
      value={staffData.aadhar}
      onChange={(e) => setStaffData({ ...staffData, aadhar: e.target.value })}
    />

    <SlidingLabelInput
      label="PAN number"
      value={staffData.pan}
      onChange={(e) => setStaffData({ ...staffData, pan: e.target.value })}
    />

    <SlidingLabelInput
      label="Blood Group"
      value={staffData.bloodGroup}
      onChange={(e) => setStaffData({ ...staffData, bloodGroup: e.target.value })}
    />

    <SlidingLabelSelect
      label="Contract Type"
      name={"contractType"}
      value={staffData.contractType}
      onChangeProp={(e) => setStaffData({ ...staffData, contractType: e.target.value })}
  options={contracttype.map((type) => ({ label: type, value: type }))}
    />
    

    <SlidingLabelInput
      label="Basic Salary"
      value={staffData.basicSalary}
      onChange={(e) => setStaffData({ ...staffData, basicSalary: e.target.value })}
    />

    <SlidingLabelSelect
      label="Work Shift"
      name={"workShift"}
      value={staffData.workShift}
      onChangeProp={(e) => setStaffData({ ...staffData, workShift: e.target.value })}
      options={workshift.map((shift) => ({ label: shift, value: shift }))}
/>

    <SlidingLabelInput
      label="Work Location"
      value={staffData.workLocation}
      onChange={(e) => setStaffData({ ...staffData, workLocation: e.target.value })}
    />

    <SlidingLabelInput
      label="Medical Leave"
      value={staffData.medicalLeave}
      onChange={(e) => setStaffData({ ...staffData, medicalLeave: e.target.value })}
    />

    <SlidingLabelInput
      label="Casual Leave"
      value={staffData.casualLeave}
      onChange={(e) => setStaffData({ ...staffData, casualLeave: e.target.value })}
    />

    <SlidingLabelInput
      label="Maternity Leave"
      value={staffData.maternityLeave}
      onChange={(e) => setStaffData({ ...staffData, maternityLeave: e.target.value })}
    />

    <SlidingLabelInput
      label="Sick Leave"
      value={staffData.sickLeave}
      onChange={(e) => setStaffData({ ...staffData, sickLeave: e.target.value })}
    />

   

  
  </div>
      </BorderedFieldset>
</>

          )}

          {/* 4️⃣ Bank Details */}
          {step === "Bank Details" && (
   <>
  <BorderedFieldset className="h-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <SlidingLabelInput
        label="Bank Name"
        value={staffData.bankName}
        onChange={(e) =>
          setStaffData({ ...staffData, bankName: e.target.value })
        }
      />
      <SlidingLabelInput
        label="Account Name"
        value={staffData.accountName}
        onChange={(e) =>
          setStaffData({ ...staffData, accountName: e.target.value })
        }
      />
      <SlidingLabelInput
        label="Account Number"
        type="number"
        value={staffData.accountNumber}
        onChange={(e) =>
          setStaffData({ ...staffData, accountNumber: e.target.value })
        }
      />
      <SlidingLabelInput
        label="IFSC Code"
        value={staffData.ifscCode}
        onChange={(e) =>
          setStaffData({ ...staffData, ifscCode: e.target.value })
        }
      />
      <SlidingLabelInput
        label="Branch"
        value={staffData.branch}
        onChange={(e) =>
          setStaffData({ ...staffData, branch: e.target.value })
        }
      />
    </div>
  </BorderedFieldset>


            </>
          )}

          {/* 5️⃣ Documents Upload */}
          {step === "Documents Upload" && (
<BorderedFieldset className="h-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <SlidingLabelInput type="file" label="Resume or CV" name="resume" />
    <SlidingLabelInput type="file" label="Joining Letter" name="joiningLetter" />
    <SlidingLabelInput type="file" label="PAN Card" name="panCard" />
    <SlidingLabelInput type="file" label="Aadhar Card / Govt. ID" name="aadharCard" />
    <SlidingLabelInput type="file" label="Educational Certificates" name="educationalCertificates" />
    <SlidingLabelInput type="file" label="Experience Letters" name="experienceLetters" />
    <SlidingLabelInput type="file" label="Medical Fitness Certificate" name="medicalFitness" />
    <SlidingLabelInput type="file" label="Non-Criminal Certificate" name="nonCriminal" />
    <SlidingLabelInput type="file" label="Resignation Letter" name="resignationLetter" />
  </div>
</BorderedFieldset>


          )}

          {/* 6️⃣ Application Access */}
          {step === "Application Access" && (
          <>
  <BorderedFieldset className="h-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-center sm:text-xs">
        <SlidingLabelCheckbox
          label="Give Access To Application"
          name="Give Access"
          checked={staffData.giveaccesstoapplication}
          onChange={(e) => handleChange("giveaccesstoapplication", e.target.checked)}
        />
      </div>

      <SlidingLabelSelect
        label="Select System Role"
        name="workShift"
        value={staffData.workShift}
        onChange={(e) => setStaffData({ ...staffData, workShift: e.target.value })}
        options={workshift.map((shift) => ({ label: shift, value: shift }))}
      />

      <SlidingLabelInput type="password" label="Create Password" name="createpassword" />
      <SlidingLabelInput type="password" label="Confirm Password" name="confirmpassword" />

    </div>
  </BorderedFieldset>
</>

          )}
        {/* </div> */}

        {/* Navigation Buttons */} <BulkUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <div className="flex justify-between mt-6">
          <PrevButton onClick={handlePrev} currentIndex={currentIndex} />
          <NextButton onClick={handleNext} currentIndex={currentIndex} steps={steps} />
        </div>
      </Card>
    </div>
  );
}



     
    
  
