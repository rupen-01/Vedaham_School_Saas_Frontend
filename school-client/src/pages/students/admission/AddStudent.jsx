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
import SlidingLabelTextarea from '../../../components/common/SlidingLabelTextarea';
import { Icon } from '@iconify/react';

export default function AddStudent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState("Basic Details");

  const steps = [
    "Basic Details",
    "Parent Details",
    "Academic Info",
    "Facilities & Fees",
    "Document Info",
    "Confirm & Preview"
  ];

  const [studentData, setStudentData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    aadhar: '',
    bloodGroup: '',
    religion: '',
    nationality: '',
    caste: '',
    category: '',
    minority: false,
    ews: false,
    admissionNo: '',
    admissionDate: '',
    class: '',
    section: '',
    rollNo: '',
    house: '',
    presentAddress: '',
    permanentAddress: '',
    uploadPhoto: null,  
    fatherName: '',
    fatherOccupation: '',
    fatherContact: '',
    fatherEmail: '',
    motherName: '',
    motherOccupation: '',
    motherContact: '',
    motherEmail: '',
    guardianDifferent: false,
    guardianName: '',
    guardianOccupation: '',
    guardianContact: '',
    guardianEmail: '',
    guardianRelation: '',
    previousSchoolName: "",
    lastClassAttended: "",
    previousAcademicPerformance: "",
    admissionNotes: "",
    birthCertificate: null,
    aadharCard: null,
    casteCertificate: null,
    annualIncomeCertificate: null,
    medicalCertificate: null,
    guardianProofID: null,
    bankPassbook: null,
    previousClassReportCard: null,
    transferCertificate: null,
    migrationCertificate: null,
    ewsCertificate: null,
  });

  const currentIndex = steps.indexOf(step);

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    } else {
      console.log("✅ Final Submission Data:", studentData);
      // Submit to API
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <HeadingHeader
          title="Add Student"
          items={[
            { label: "Students", path: "/" },
            { label: "New Addmission", path: "/students/manage" },
            { label: "Add Student", path: "/students/add" },
          ]}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 flex items-center bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 cursor-pointer ml-3 sm:w-auto justify-center"
        >
          <Icon icon="mdi:cloud-upload" className="w-5 h-5 mr-2" />
          Bulk Upload
        </button>
      </div>

      <Card>
        <StepperIndicator
          steps={steps}
          icons={[
            "mdi:account",
            "mdi:account-group",
            "mdi:school",
            "mdi:currency-usd",
            "mdi:file-document",
            "mdi:eye",
          ]}
          activeStep={step}
        />
   
          {/* 1️⃣ Basic Information */}
        {step === "Basic Details" && (
  <BorderedFieldset>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SlidingLabelInput label="Full Name" value={studentData.fullName} onChange={(e) => setStudentData({...studentData, fullName: e.target.value})} />
      <SlidingLabelSelect label="Gender" options={[{label:"Male", value:"Male"},{label:"Female",value:"Female"}]} value={studentData.gender} onChangeProp={(e) => setStudentData({...studentData, gender:e.target.value})} />
      <SlidingLabelInput type="date" label="DOB" value={studentData.dob} onChange={(e) => setStudentData({...studentData, dob:e.target.value})} />
      <SlidingLabelInput label="Aadhar Number" value={studentData.aadhar} onChange={(e) => setStudentData({...studentData, aadhar:e.target.value})} />
      <SlidingLabelInput label="Blood Group" value={studentData.bloodGroup} onChange={(e) => setStudentData({...studentData, bloodGroup:e.target.value})} />
      <SlidingLabelInput label="Religion" value={studentData.religion} onChange={(e) => setStudentData({...studentData, religion:e.target.value})} />
      <SlidingLabelInput label="Nationality" value={studentData.nationality} onChange={(e) => setStudentData({...studentData, nationality:e.target.value})} />
      <SlidingLabelInput label="Caste" value={studentData.caste} onChange={(e) => setStudentData({...studentData, caste:e.target.value})} />
      <SlidingLabelSelect label="Category (OBC/SC/ST/GEN)" options={[{label:"OBC", value:"OBC"},{label:"SC", value:"SC"},{label:"ST", value:"ST"},{label:"GEN", value:"GEN"}]} value={studentData.category} onChangeProp={(e)=>setStudentData({...studentData, category:e.target.value})}/>
     
      <SlidingLabelCheckbox
        checkboxLabel="Yes"
        label="Minority"
        checked={studentData.minority}
        onChange={(e) =>
          setStudentData({
            ...studentData,
            minority: e.target.value,   // <-- Updates the minority field with the checkbox state
          })
        }
      />
           <SlidingLabelCheckbox
        checkboxLabel="Yes"
        label="EWS Flag"
 checked={studentData.ews}
onChange={(e)=>setStudentData({...studentData, ews: e.target.value})}
      />

        {/* <SlidingLabelCheckbox label="Yes" checked={studentData.ews} onChange={(e)=>setStudentData({...studentData, ews: e.target.checked})} />
    */}
         <SlidingLabelInput type="file" label="Upload Photo" onChange={(e)=>setStudentData({...studentData, uploadPhoto:e.target.files[0]})}/>
 
      <SlidingLabelInput label="Admission No." value={studentData.admissionNo} onChange={(e)=>setStudentData({...studentData, admissionNo: e.target.value})}/>
      <SlidingLabelInput type="date" label="Admission Date" value={studentData.admissionDate} onChange={(e)=>setStudentData({...studentData, admissionDate:e.target.value})}/>
      <SlidingLabelSelect label="Class" options={/* fetch class list */[]} value={studentData.class} onChangeProp={(e)=>setStudentData({...studentData, class:e.target.value})}/>
      <SlidingLabelSelect label="Section" options={/* fetch section list */[]} value={studentData.section} onChangeProp={(e)=>setStudentData({...studentData, section:e.target.value})}/>
      <SlidingLabelInput label="Roll No." value={studentData.rollNo} onChange={(e)=>setStudentData({...studentData, rollNo:e.target.value})}/>
      <SlidingLabelSelect label="Select House" options={/* fetch house list */[]} value={studentData.house} onChangeProp={(e)=>setStudentData({...studentData, house:e.target.value})}/>
    </div>
    <div className="grid grid-cols-1 gap-4 mt-4">
      <SlidingLabelTextarea label="Present Address"  value={studentData.presentAddress} onChange={(e)=>setStudentData({...studentData, presentAddress:e.target.value})}/>
      <SlidingLabelTextarea label="Permanent Address" value={studentData.permanentAddress} onChange={(e)=>setStudentData({...studentData, permanentAddress:e.target.value})}/>
    </div>
  </BorderedFieldset>
)}

{/* 2️⃣ Parent Details */}
{step === "Parent Details" && (
  <>
    {/* Father’s Information */}
    <BorderedFieldset legend="Father's Information">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <SlidingLabelInput
          label="Father's Name"
          value={studentData.fatherName}
          onChange={(e) =>
            setStudentData({ ...studentData, fatherName: e.target.value })
          }
        />
        <SlidingLabelInput
          label="Occupation"
          value={studentData.fatherOccupation}
          onChange={(e) =>
            setStudentData({ ...studentData, fatherOccupation: e.target.value })
          }
        />
        <SlidingLabelInput
          label="Contact Number"
          value={studentData.fatherContact}
          onChange={(e) =>
            setStudentData({ ...studentData, fatherContact: e.target.value })
          }
        />
        <SlidingLabelInput
          label="Email ID"
          value={studentData.fatherEmail}
          onChange={(e) =>
            setStudentData({ ...studentData, fatherEmail: e.target.value })
          }
        />
      </div>
    </BorderedFieldset>

    {/* Mother’s Information */}
    <BorderedFieldset legend="Mother's Information" className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <SlidingLabelInput
          label="Mother's Name"
          value={studentData.motherName}
          onChange={(e) =>
            setStudentData({ ...studentData, motherName: e.target.value })
          }
        />
        <SlidingLabelInput
          label="Occupation"
          value={studentData.motherOccupation}
          onChange={(e) =>
            setStudentData({ ...studentData, motherOccupation: e.target.value })
          }
        />
        <SlidingLabelInput
          label="Contact Number"
          value={studentData.motherContact}
          onChange={(e) =>
            setStudentData({ ...studentData, motherContact: e.target.value })
          }
        />
        <SlidingLabelInput
          label="Email ID"
          value={studentData.motherEmail}
          onChange={(e) =>
            setStudentData({ ...studentData, motherEmail: e.target.value })
          }
        />
      </div>
    </BorderedFieldset>

    {/* Guardian Checkbox */}
    <div className="mt-6 flex items-center">
      <input
        id="guardian-diff"
        type="checkbox"
        className="mr-2 h-4 w-4"
        checked={studentData.guardianDifferent}
        onChange={(e) =>
          setStudentData({ ...studentData, guardianDifferent: e.target.checked })
        }
      />
      <label htmlFor="guardian-diff" className="text-sm font-medium">
        Check if Guardian is Different From Parents
      </label>
    </div>

    {/* Guardian Information (only if different) */}
    {studentData.guardianDifferent && (
      <BorderedFieldset legend="Guardian Information" className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <SlidingLabelInput
            label="Guardian Name"
            value={studentData.guardianName}
            onChange={(e) =>
              setStudentData({ ...studentData, guardianName: e.target.value })
            }
          />
          <SlidingLabelInput
            label="Occupation"
            value={studentData.guardianOccupation}
            onChange={(e) =>
              setStudentData({
                ...studentData,
                guardianOccupation: e.target.value,
              })
            }
          />
          <SlidingLabelInput
            label="Contact Number"
            value={studentData.guardianContact}
            onChange={(e) =>
              setStudentData({ ...studentData, guardianContact: e.target.value })
            }
          />
          <SlidingLabelInput
            label="Email ID"
            value={studentData.guardianEmail}
            onChange={(e) =>
              setStudentData({ ...studentData, guardianEmail: e.target.value })
            }
          />
          <SlidingLabelInput
            label="Relationship with Student"
            value={studentData.guardianRelation}
            onChange={(e) =>
              setStudentData({
                ...studentData,
                guardianRelation: e.target.value,
              })
            }
            className="sm:col-span-2 lg:col-span-4"
          />
        </div>
      </BorderedFieldset>
    )}
  </>
)}

{/* 3️⃣ Academic Info */}
{step === "Academic Info" && (
  <>
    <BorderedFieldset className="h-auto">
      {/* Top three inline fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <SlidingLabelInput
          label="Previous School Name"
          value={studentData.previousSchoolName}
          onChange={(e) =>
            setStudentData({
              ...studentData,
              previousSchoolName: e.target.value,
            })
          }
        />
        <SlidingLabelInput
          label="Last Class Attended"
          value={studentData.lastClassAttended}
          onChange={(e) =>
            setStudentData({
              ...studentData,
              lastClassAttended: e.target.value,
            })
          }
        />
        <SlidingLabelInput
          label="Previous Academic Performance"
          value={studentData.previousAcademicPerformance}
          onChange={(e) =>
            setStudentData({
              ...studentData,
              previousAcademicPerformance: e.target.value,
            })
          }
        />
      </div>

      {/* Admission Notes textarea using SlidingLabelInput */}
      <SlidingLabelInput
        label="Admission Notes"
        type="textarea"
        value={studentData.admissionNotes}
        onChange={(e) =>
          setStudentData({ ...studentData, admissionNotes: e.target.value })
        }
        className="mt-4 sm:col-span-3 w-full"
      />
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

  {/* 4️⃣ Document Info */}
{step === "Document Info" && (
  <>
<BorderedFieldset legend="Upload Required Documents">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
    <SlidingLabelInput
      label="Birth Certificate"
      name="birthCertificate"
      type="file"
      value={studentData.birthCertificate}
      onChange={(file) =>
        setStudentData({ ...studentData, birthCertificate: file })
      }
    />
      
    <SlidingLabelInput
      label="Aadhar Card"
      name="aadharCard"
      type="file"
      value={studentData.aadharCard}
      onChange={(file) =>
        setStudentData({ ...studentData, aadharCard: file })
      }
    />
    <SlidingLabelInput
      label="Caste Certificate"
      name="casteCertificate"
      type="file"
      value={studentData.casteCertificate}
      onChange={(file) =>
        setStudentData({ ...studentData, casteCertificate: file })
      }
    />
    <SlidingLabelInput
      label="Annual Income Certificate"
      name="annualIncomeCertificate"
      type="file"
      value={studentData.annualIncomeCertificate}
      onChange={(file) =>
        setStudentData({ ...studentData, annualIncomeCertificate: file })
      }
    />
    <SlidingLabelInput
      label="Medical Certificate"
      name="medicalCertificate"
      type="file"
      value={studentData.medicalCertificate}
      onChange={(file) =>
        setStudentData({ ...studentData, medicalCertificate: file })
      }
    />
    <SlidingLabelInput
      label="Guardian Proof ID"
      name="guardianProofID"
      type="file"
      value={studentData.guardianProofID}
      onChange={(file) =>
        setStudentData({ ...studentData, guardianProofID: file })
      }
    />
    <SlidingLabelInput
      label="Bank Passbook"
      name="bankPassbook"
      type="file"
      value={studentData.bankPassbook}
      onChange={(file) =>
        setStudentData({ ...studentData, bankPassbook: file })
      }
    />
    <SlidingLabelInput
      label="Previous Class Report Card"
      name="previousClassReportCard"
      type="file"
      value={studentData.previousClassReportCard}
      onChange={(file) =>
        setStudentData({ ...studentData, previousClassReportCard: file })
      }
    />
    <SlidingLabelInput
      label="Transfer Certificate (TC)"
      name="transferCertificate"
      type="file"
      value={studentData.transferCertificate}
      onChange={(file) =>
        setStudentData({ ...studentData, transferCertificate: file })
      }
    />
    <SlidingLabelInput
      label="Migration Certificate"
      name="migrationCertificate"
      type="file"
      value={studentData.migrationCertificate}
      onChange={(file) =>
        setStudentData({ ...studentData, migrationCertificate: file })
      }
    />
    <SlidingLabelInput
      label="EWS Certificate"
      name="ewsCertificate"
      type="file"
      value={studentData.ewsCertificate}
      onChange={(file) =>
        setStudentData({ ...studentData, ewsCertificate: file })
      }
    />
  </div>
</BorderedFieldset>

  </>




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

        {/* Navigation Buttons <BulkUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}

        <div className="flex justify-between mt-6">
          <PrevButton onClick={handlePrev} currentIndex={currentIndex} />
          <NextButton onClick={handleNext} currentIndex={currentIndex} steps={steps} />
        </div>
      </Card>
    </div>
  );
}



     
    
  
