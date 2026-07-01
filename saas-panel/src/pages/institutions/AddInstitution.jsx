import React, { useEffect, useState } from "react";
import StepperIndicator from "../../components/common/Stepper";
import Card from "../../components/common/Card";
import SlidingLabelInput from "../../components/common/SlidingLabelInput";
import SlidingLabelSelect from "../../components/common/SlidingSelect";
import NextButton from "../../components/common/NextButton";
import PrevButton from "../../components/common/PrevButton";
import HeadingHeader from "../../components/common/HeadingHeader";
import Pop from "../../components/common/pop";
import { useGetApi, useMutationApi } from "../../utils/useApi";
import ApiConfig from "../../config/ApiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function AddInstitution() {
  const queryClient = useQueryClient();
  const { id } = useParams();
   const isEditMode = Boolean(id);
  const institutionId = id;
  const navigate = useNavigate();
    // Single variable to handle all edit mode logic
  const isEditing = isEditMode;
    // Fetch plan data when in edit mode
  const { data: instituteDataFromApi, isLoading: instituteLoading, error: instituteError } = useGetApi({
    key: "institutes"+institutionId,
    url: `/school/${institutionId}`,
    requireAuth: true,
    options: {
      enabled: isEditMode && Boolean(institutionId)
    }
  });
  const [step, setStep] = useState("Basic Information");
  const steps = [
    "Basic Information",
    "Contact & Address",
    "Technical Setup",
    "Admin User Creation",
    "Preview",
  ];
// --- inside useState
const initialInstituteData = {
  slug: "",
  institutionName: "",
  institutionType: "",
  board: "",
  establishmentYear: "",
  medium: "",
  totalStudent: "",

  contactPersonName: "",
  contactNumber: "",
  alternateNumber: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  country: "",

  plan: "",
  smsSenderId: "",
  whatsappNumber: "",
  schoolImage: null,

  adminName: "",
  adminEmail: "",
  adminMobileNumber: "",
  password: "",

  notes: "",
};
const [instituteData, setInstituteData] = useState(initialInstituteData);
  useEffect(() => {
    if (isEditMode && instituteDataFromApi?.statusCode?.data) {
      const editData = instituteDataFromApi?.statusCode?.data;
      
      setInstituteData({
        slug: editData.slug || "",
        institutionName: editData.institutionName || "",
        institutionType: editData.institutionType || "",
        board: editData.board || "",
        establishmentYear: editData.establishmentYear || "",
        medium: editData.medium || "",
        totalStudent: editData.totalStudent || "",
        contactPersonName: editData.contactPersonName || "",
        contactNumber: editData.contactNumber || "",
        alternateNumber: editData.alternateNumber || "",
        email: editData.email || "",
        addressLine1: editData.addressLine1 || "",
        addressLine2: editData.addressLine2 || "",
        city: editData.city || "",
        state: editData.state || "",
        pincode: editData.pincode || "",
        country: editData.country || "",
        plan: editData.plan || "",
        smsSenderId: editData.smsSenderId || "",
        whatsappNumber: editData.whatsappNumber || "",
        adminName: editData.adminName || "",
        adminEmail: editData.adminEmail || "",
        adminMobileNumber: editData.adminMobileNumber || "",
        notes: editData.notes || "",
        password:editData.password || "",
        schoolImage: editData.schoolImage || null, // Keep existing image URL
      });
    }
  }, [isEditMode, instituteDataFromApi]);

  const {
    data: plansData,
    plansLoading,
    plansError,
    refetch,
  } = useGetApi({
    key: "plans",
    url: ApiConfig.PLAN_GET_ALL,
    requireAuth: true,
  });

  const addInstitutionMutation = useMutationApi({
    key: "institutes",
    url: isEditing ? `/school`: ApiConfig.INSTITUTE_CREATE,
   method: isEditing ? "PATCH" : "POST",
    requireAuth: true,
    multiPart: isEditing ? true : false,
    options: {
      onSuccess: (data) => {
        Pop("success", isEditing ? "Institute updated successfully!" : "Institute created successfully!");
        console.log(isEditing ? "Institute updated successfully:" : "Institute created successfully:", data);
        // 🚀 Invalidate old cache so next edit fetch is fresh
    queryClient.invalidateQueries("institutes" + institutionId);
        if (isEditing) {
          navigate('/institutions/manage');
        }
        setInstituteData(initialInstituteData);
      setStep("Basic Information");
      },
      onError: (error) => {
        Pop("error", error?.response?.data?.message || "Something went wrong!");
        console.log(isEditing ? "Error in Institute update:" : "Error creating Institution:", error);
      },
    },
  });
const updateImageMutation = useMutationApi({
  key: "updateSchoolImage",
  url: `/school/image/${institutionId}`,
  method: "PATCH",
  requireAuth: true,
  multiPart: true,
  options: {
    onSuccess: () => {
      Pop("success", "Logo updated successfully!");
      queryClient.invalidateQueries("institutes" + institutionId);
    },
    onError: (error) => {
      Pop("error", error?.response?.data?.message || "Error updating logo!");
    },
  },
});

  const currentIndex = steps.indexOf(step)
const handleNext = () => {
  // if not the last step → move to next
  if (currentIndex < steps.length - 1) {
    setStep(steps[currentIndex + 1]);
    return;
  }

  // ✅ Required fields
  const requiredFields = [
    "slug",
    "institutionName",
    "institutionType",
    "board",
    "establishmentYear",
    "medium",
    "totalStudent",
    "contactPersonName",
    "contactNumber",
    "email",
    "addressLine1",
    "city",
    "state",
    "pincode",
    "country",
    "plan",
    "adminName",
    "adminEmail",
    "adminMobileNumber",
  ];
if (!isEditing) {
  requiredFields.push("password");
}
  for (let field of requiredFields) {
    if (!instituteData[field] || instituteData[field].toString().trim() === "") {
      Pop("error", `${field.replace(/([A-Z])/g, " $1")} is required`);
      return;
    }
  }

  // ✅ Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(instituteData.email)) {
    Pop("error", "Invalid email format for contact email");
    return;
  }
  if (!emailRegex.test(instituteData.adminEmail)) {
    Pop("error", "Invalid email format for admin email");
    return;
  }

  // ✅ Mobile number validation (10 digits for India)
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(instituteData.contactNumber)) {
    Pop("error", "Contact number must be a valid 10-digit Indian mobile number");
    return;
  }
  if (instituteData.alternateNumber && !mobileRegex.test(instituteData.alternateNumber)) {
    Pop("error", "Alternate number must be a valid 10-digit Indian mobile number");
    return;
  }
  if (!mobileRegex.test(instituteData.adminMobileNumber)) {
    Pop("error", "Admin mobile number must be a valid 10-digit Indian mobile number");
    return;
  }

  // ✅ Password validation
  const password = instituteData.password;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
if (!isEditing) {
  if (!passwordRegex.test(password)) {
    Pop(
      "error",
      "Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character"
    );
    return;
  }
}

  // ✅ Pincode validation (India - 6 digits)
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  if (!pincodeRegex.test(instituteData.pincode)) {
    Pop("error", "Pincode must be a valid 6-digit number");
    return;
  }

  // ✅ Convert object to FormData
  const formData = new FormData();
  Object.entries(instituteData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(`${key}[]`, v));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, value ?? "");
    }
  });

  console.log("Sending Payload:", instituteData);
  if (isEditing) {
  const { schoolImage, ...restData } = instituteData;

  // Update basic data
  addInstitutionMutation.mutate({ id: institutionId, payload: restData });

// If new image selected → update separately
if (schoolImage && schoolImage instanceof File) {
  const imageFormData = new FormData();
  imageFormData.append("schoolImage", schoolImage);

  updateImageMutation.mutate({
    payload: imageFormData,
  });
}

} else {
  addInstitutionMutation.mutate({
    payload: formData,
  });
}

};

  const handlePrev = () => {
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };
  // Helper Component
const PreviewItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-[15px] text-gray-900">{value?.toString().trim() || "—"}</p>
  </div>
);

function generateSlugId(instituteName) {
  const namePart = instituteName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, "-"); // spaces → hyphen

  const datePart = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 12); 
  // Example: 202509101947 → YYYYMMDDHHMM

  return `${namePart}-${datePart}`;
}


  return (
    <div>
       {!isEditing && (
 <HeadingHeader
        title="Add Institution"
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Institutions", path: "/institutions/manage" },
          { label: "Add Institution", path: "/institutions/add" },
        ]}
      />
            )}
            {isEditing && (
               <HeadingHeader
        title="Edit Institution"
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Institutions", path: "/institutions/manage" },
          { label: "Edit Institution", path: `/institutions/edit/${institutionId}` },
        ]}
      />
            )}

      <Card>
        <StepperIndicator
          steps={steps}
          icons={[
            "mdi:account", // Iconify icon names
            "mdi:badge-account",
            "mdi:bank",
            "mdi:folder",
            "mdi:lock",
          ]}
          activeStep={step}
        />

        <div className="grid grid-cols-3 gap-3 mt-5">
          {/* Step-wise Form Fields */}

          {/* 🧾 Section 1: Basic School Information */}
          {step === "Basic Information" && (
            <>
            <SlidingLabelInput
  type="text"
  placeholder="Institution Name"
  label="Institution Name"
  value={instituteData.institutionName}
  onChange={(e) =>
    setInstituteData({
      ...instituteData,
      institutionName: e.target.value,
      slug: generateSlugId(e.target.value), // ✅ auto-generate slug
    })
  }
/>
              <SlidingLabelSelect
                label="institution Type"
                value={instituteData.institutionType}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    institutionType: e.target.value,
                  })
                }
              >
                <option value="">Select Institution Type</option>
                <option>School</option>
                <option>College</option>
                <option>Coaching</option>
                <option>Other</option>
              </SlidingLabelSelect>

              <SlidingLabelSelect
                label="board Curriculum"
                value={instituteData.board}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    board: Array.from(e.target.selectedOptions, (opt) => opt.value),
                  })
                }
              >
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State-Board">State Board</option>
                <option value="IB">IB</option>
              </SlidingLabelSelect>

              <SlidingLabelInput
                type="number"
                placeholder="Establishment Year"
                label="Establishment Year"
                value={instituteData.establishmentYear}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    establishmentYear: e.target.value,
                  })
                }
              />

              <SlidingLabelSelect
                label="medium"
                value={instituteData.medium}
                onChange={(e) =>
                  setInstituteData({ ...instituteData, medium: e.target.value })
                }
              >
                <option value="">Select medium</option>
                <option>English</option>
                <option>Hindi</option>
                <option>Bilingual</option>
              </SlidingLabelSelect>

              <SlidingLabelInput
                type="number"
                placeholder="Student Capacity"
                label="Total Student Capacity"
                value={instituteData.totalStudent}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    totalStudent: e.target.value,
                  })
                }
              />
            </>
          )}

          {/* 🧭 Section 2: Contact & Address */}
          {step === "Contact & Address" && (
            <>
              <SlidingLabelInput
                type="text"
                placeholder="Contact Person Name"
                label="Contact Person Name"
                value={instituteData.contactPersonName}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    contactPersonName: e.target.value,
                  })
                }
              />

              <SlidingLabelInput
                type="text"
                placeholder="Contact Number"
                label="Contact Number"
                value={instituteData.contactNumber}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    contactNumber: e.target.value,
                  })
                }
              />

              <SlidingLabelInput
                type="text"
                placeholder="Alternate Number"
                label="Alternate Number"
                value={instituteData.alternateNumber}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    alternateNumber: e.target.value,
                  })
                }
              />

              <SlidingLabelInput
                type="email"
                placeholder="Email ID"
                label="Email ID"
                value={instituteData.email}
                onChange={(e) =>
                  setInstituteData({ ...instituteData, email: e.target.value })
                }
              />

              <SlidingLabelInput
                type="text"
                placeholder="Address Line 1"
                label="Address Line 1"
                value={instituteData.addressLine1}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    addressLine1: e.target.value,
                  })
                }
              />

              <SlidingLabelInput
                type="text"
                placeholder="Address Line 2"
                label="Address Line 2"
                value={instituteData.addressLine2}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    addressLine2: e.target.value,
                  })
                }
              />

              <SlidingLabelInput
                type="text"
                placeholder="City"
                label="City"
                value={instituteData.city}
                onChange={(e) =>
                  setInstituteData({ ...instituteData, city: e.target.value })
                }
              />

              <SlidingLabelSelect
                label="State"
                value={instituteData.state}
                onChange={(e) =>
                  setInstituteData({ ...instituteData, state: e.target.value })
                }
              >
                <option value="">Select State</option>
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
                {/* Add more states */}
              </SlidingLabelSelect>

              <SlidingLabelInput
                type="number"
                placeholder="Pincode"
                label="Pincode"
                value={instituteData.pincode}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    pincode: e.target.value,
                  })
                }
              />

              <SlidingLabelSelect
                value={instituteData.country}
                label="Country"
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    country: e.target.value,
                  })
                }
              >
                <option value="">Select Country</option>
                <option>India</option>
                <option>Other</option>
              </SlidingLabelSelect>
            </>
          )}

          {/* 🛠️ Section 3: Technical Setup */}
          {step === "Technical Setup" && (
            <>
              <SlidingLabelSelect
                label="Plan"
                value={instituteData.plan}
                onChange={(e) =>
                  setInstituteData({ ...instituteData, plan: e.target.value })
                }
              >
                <option value="">Select Plan</option>
                {plansLoading && <option disabled>Loading plans...</option>}
                {plansError && <option disabled>Failed to load plans</option>}

                {plansData?.data?.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </SlidingLabelSelect>

              <SlidingLabelInput
                type="text"
                placeholder="SMS Sender ID"
                label="SMS Sender ID"
                value={instituteData.smsSenderId}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    smsSenderId: e.target.value,
                  })
                }
              />

              <SlidingLabelInput
                type="text"
                placeholder="WhatsApp Number"
                label="WhatsApp Number"
                value={instituteData.whatsappNumber}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    whatsappNumber: e.target.value,
                  })
                }
              />

              <label className="block col-span-3">
  <span className="text-sm font-medium text-gray-700">School Logo</span>
  <div className="mt-2 flex items-center gap-4">
   {instituteData.schoolImage ? (
  typeof instituteData.schoolImage === "string" ? (
    // 🖼️ Show old image from backend
    <img
      src={instituteData.schoolImage}
      alt="School Logo"
      className="h-56 w-56 object-cover rounded-xl border border-gray-300 shadow-sm"
    />
  ) : (
    // 🖼️ Show newly uploaded image (File object)
    <img
      src={URL.createObjectURL(instituteData.schoolImage)}
      alt="School Logo"
      className="h-56 w-56 object-cover rounded-xl border border-gray-300 shadow-sm"
    />
  )
) : (
  <div className="h-56 w-56 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400">
    No Logo
  </div>
)}

    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setInstituteData({
          ...instituteData,
          schoolImage: e.target.files[0],
        })
      }
      className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-600
                 hover:file:bg-blue-100"
    />
  </div>
</label>

            </>
          )}

          {/* 👨‍💼 Section 4: Admin User Creation */}
          {step === "Admin User Creation" && (
            <>
              <SlidingLabelInput
                type="text"
                placeholder="Admin Name"
                label="Admin Name"
                value={instituteData.adminName}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    adminName: e.target.value,
                  })
                }
              />

              <SlidingLabelInput
                type="email"
                placeholder="Admin Email"
                label="Admin Email"
                value={instituteData.adminEmail}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    adminEmail: e.target.value,
                  })
                }
              />

              <SlidingLabelInput
                type="text"
                placeholder="Mobile Number"
                label="Mobile Number"
                value={instituteData.adminMobileNumber}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    adminMobileNumber: e.target.value,
                  })
                }
              />

              {!isEditing && <SlidingLabelInput
                type="password"
                placeholder="Create Password"
                label="Create Password"
                value={instituteData.password}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    password: e.target.value,
                  })
                }
              />}
            </>
          )}
{step === "Preview" && (
  <>
  <div className="col-span-3 space-y-6">
    {/* <h3 className="text-xl font-bold text-gray-800 mb-4">
      Preview Institution Details
    </h3> */}

    <div className="bg-white rounded-2xl shadow p-6">
      {/* Basic Information */}
      <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
        🏫 Basic Information
      </h4>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Logo */}
        <div className="flex flex-col items-center">
          {instituteData.schoolImage ? (
  typeof instituteData.schoolImage === "string" ? (
    // 🖼️ Show old image from backend
    <img
      src={instituteData.schoolImage}
      alt="School Logo"
      className="h-56 w-56 object-cover rounded-xl border border-gray-300 shadow-sm"
    />
  ) : (
    // 🖼️ Show newly uploaded image (File object)
    <img
      src={URL.createObjectURL(instituteData.schoolImage)}
      alt="School Logo"
      className="h-56 w-56 object-cover rounded-xl border border-gray-300 shadow-sm"
    />
  )
) : (
  <div className="h-56 w-56 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400">
    No Logo
  </div>
)}
        </div>

        {/* Info */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <PreviewItem label="Slug" value={instituteData.slug} />
          <PreviewItem label="Institution Name" value={instituteData.institutionName} />
          <PreviewItem label="Type" value={instituteData.institutionType} />
          <PreviewItem
            label="Board"
            value={Array.isArray(instituteData.board) ? instituteData.board.join(", ") : instituteData.board}
          />
          <PreviewItem label="Establishment Year" value={instituteData.establishmentYear} />
          <PreviewItem label="Medium" value={instituteData.medium} />
          <PreviewItem label="Total Students" value={instituteData.totalStudent} />
        </div>
      </div>
    </div>

    {/* Contact Info */}
    <div className="bg-white rounded-2xl shadow p-6">
      <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
        📞 Contact Information
      </h4>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <PreviewItem label="Contact Person" value={instituteData.contactPersonName} />
        <PreviewItem label="Contact Number" value={instituteData.contactNumber} />
        <PreviewItem label="Alternate Number" value={instituteData.alternateNumber} />
        <PreviewItem label="Email" value={instituteData.email} />
        <PreviewItem label="WhatsApp" value={instituteData.whatsappNumber} />
        <PreviewItem label="SMS Sender ID" value={instituteData.smsSenderId} />
      </div>
    </div>

    {/* Address */}
    <div className="bg-white rounded-2xl shadow p-6">
      <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
        📍 Address
      </h4>
      <p className="text-gray-800 text-[15px] leading-relaxed">
        {[
          instituteData.addressLine1,
          instituteData.addressLine2,
          instituteData.city,
          instituteData.state,
          instituteData.pincode,
          instituteData.country,
        ]
          .filter((part) => part && part.trim() !== "")
          .join(", ") || "—"}
      </p>
    </div>

    {/* Admin Info */}
    <div className="bg-white rounded-2xl shadow p-6">
      <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
        👩‍💼 Admin Information
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <PreviewItem label="Admin Name" value={instituteData.adminName} />
        <PreviewItem label="Admin Email" value={instituteData.adminEmail} />
        <PreviewItem label="Admin Mobile" value={instituteData.adminMobileNumber} />
      </div>
    </div>

    {/* Notes */}
    {instituteData.notes && (
      <div className="bg-white mb-3 rounded-2xl shadow p-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          📝 Notes
        </h4>
        <p className="text-gray-800 text-[15px]">{instituteData.notes}</p>
      </div>
    )}
  </div>
<SlidingLabelInput type="textarea" label="Notes/Remarks" value={instituteData.notes} onChange={(e) => setInstituteData({ ...instituteData, notes: e.target.value }) } className="col-span-3" /> </>  
)}

        </div>

        {/* Step Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <PrevButton onClick={handlePrev} currentIndex={currentIndex} />

          <NextButton
            onClick={handleNext}
            currentIndex={currentIndex}
            steps={steps}
            label={currentIndex === steps.length - 1 ? (!isEditing ?"Submit":"Update Institute") : "Next"}
            disabled={
              currentIndex === steps.length - 1 &&
              addInstitutionMutation.isLoading
            }
          />
        </div>

        {addInstitutionMutation.isLoading && (
          <button className="text-center mt-3 text-blue-500">
            Submitting...
          </button>
        )}
      </Card>
    </div>
  );
}
