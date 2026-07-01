import React from "react";
import { useParams } from "react-router-dom";
import { useGetApi } from "../../utils/useApi";
import HeadingHeader from "../../components/common/HeadingHeader";
import Card from "../../components/common/Card";

export default function ViewInstitute() {
  const { id } = useParams();

  const { data: instituteData, isLoading } = useGetApi({
    key: `institutes-${id}`,
    url: `/school/${id}`,
    requireAuth: true,
  });

  const institute = instituteData?.statusCode?.data || {};

  const PreviewItem = ({ label, value }) => (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-[15px] text-gray-900">{value ?? "—"}</p>
    </div>
  );

  if (isLoading) {
    return (
      <>
    <div className="mb-6 h-20 w-full mt-4 rounded-xl bg-gray-200/90 animate-pulse">
    </div>
        <Card>
          <div className="grid grid-cols-3 gap-6 mt-5">
            {/* Basic Info Skeleton */}
            <div className="col-span-3 bg-white rounded-2xl shadow p-6 animate-pulse">
              <div className="h-6 w-1/3 bg-gray-200/90 mb-4 rounded"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="h-56 w-56 bg-gray-200/90 rounded-xl mx-auto"></div>
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-6 bg-gray-200/90 rounded mb-2"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info Skeleton */}
            <div className="col-span-3 bg-white rounded-2xl shadow p-6 animate-pulse">
              <div className="h-6 w-1/3 bg-gray-200/90 mb-4 rounded"></div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-6 bg-gray-200/90 rounded mb-2"></div>
                ))}
              </div>
            </div>

            {/* Address Skeleton */}
            <div className="col-span-3 bg-white rounded-2xl shadow p-6 animate-pulse">
              <div className="h-6 w-1/3 bg-gray-200/90 mb-4 rounded"></div>
              <div className="h-16 bg-gray-200/90 rounded"></div>
            </div>

            {/* Admin Info Skeleton */}
            <div className="col-span-3 bg-white rounded-2xl shadow p-6 animate-pulse">
              <div className="h-6 w-1/3 bg-gray-200/90 mb-4 rounded"></div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 bg-gray-200/90 rounded mb-2"></div>
                ))}
              </div>
            </div>

            {/* Notes Skeleton */}
            <div className="col-span-3 bg-white rounded-2xl shadow p-6 animate-pulse">
              <div className="h-6 w-1/3 bg-gray-200/90 mb-4 rounded"></div>
              <div className="h-12 bg-gray-200/90 rounded"></div>
            </div>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <HeadingHeader
        title={`View Institute - ${institute?.institutionName || ""}`}
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Institutions", path: "/institutions/manage" },
          { label: "Manage Institutions", path: "/institutions/manage" },
          { label: "View Institute", path: `/institutions/view/${id}` },
        ]}
        back={true}
        Goback="/institutions/manage"
      />

      <Card>
        <div className="grid grid-cols-3 gap-6 mt-5">
          {/* 🏫 Basic Information */}
          <div className="col-span-3 bg-white rounded-2xl shadow p-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              🏫 Basic Information
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="flex flex-col items-center">
                {institute?.schoolImage ? (
                  <img
                    src={institute.schoolImage}
                    alt="School Logo"
                    className="h-56 w-56 object-contain rounded-xl border border-gray-300 shadow-sm"
                  />
                ) : (
                  <div className="h-56 w-56 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400">
                    No Logo
                  </div>
                )}
              </div>

              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <PreviewItem label="Slug" value={institute.slug} />
                <PreviewItem label="Institution Name" value={institute.institutionName} />
                <PreviewItem label="Type" value={institute.institutionType} />
                <PreviewItem
                  label="Board"
                  value={Array.isArray(institute.board) ? institute.board.join(", ") : institute.board}
                />
                <PreviewItem label="Establishment Year" value={institute.establishmentYear} />
                <PreviewItem label="Medium" value={institute.medium} />
                <PreviewItem label="Total Students" value={institute.totalStudent} />
              </div>
            </div>
          </div>

          {/* 📞 Contact Information */}
          <div className="col-span-3 bg-white rounded-2xl shadow p-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              📞 Contact Information
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <PreviewItem label="Contact Person" value={institute.contactPersonName} />
              <PreviewItem label="Contact Number" value={institute.contactNumber} />
              <PreviewItem label="Alternate Number" value={institute.alternateNumber} />
              <PreviewItem label="Email" value={institute.email} />
              <PreviewItem label="WhatsApp" value={institute.whatsappNumber} />
              <PreviewItem label="SMS Sender ID" value={institute.smsSenderId} />
            </div>
          </div>

          {/* 📍 Address */}
          <div className="col-span-3 bg-white rounded-2xl shadow p-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              📍 Address
            </h4>
            <p className="text-gray-800 text-[15px] leading-relaxed">
              {[
                institute.addressLine1,
                institute.addressLine2,
                institute.city,
                institute.state,
                institute.pincode,
                institute.country,
              ]
                .filter((part) => part && part.trim() !== "")
                .join(", ") || "—"}
            </p>
          </div>

          {/* 👩‍💼 Admin Information */}
          <div className="col-span-3 bg-white rounded-2xl shadow p-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              👩‍💼 Admin Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <PreviewItem label="Admin Name" value={institute.adminName} />
              <PreviewItem label="Admin Email" value={institute.adminEmail} />
              <PreviewItem label="Admin Mobile" value={institute.adminMobileNumber} />
            </div>
          </div>
{/* 📦 Plan Details */}
{institute?.plans && (
  <div className="col-span-3 bg-white rounded-2xl shadow p-6">
    <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
      📦 Plan Details
    </h4>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <PreviewItem label="Plan Name" value={institute.plans.name} />
      <PreviewItem label="Category" value={institute.plans.category} />
      <PreviewItem label="Billing Cycle" value={institute.plans.billingCycle} />
      <PreviewItem label="Duration" value={institute.plans.duration} />
      <PreviewItem label="Actual Price" value={institute.plans.actualPrice} />
      <PreviewItem label="Offer Price" value={institute.plans.offerPrice} />
      <PreviewItem label="Max Students" value={institute.plans.maxStudent} />
      <PreviewItem label="Max Staff Users" value={institute.plans.maxStaffUser} />
      <PreviewItem label="Storage Limit (MB)" value={institute.plans.storageLimit} />
      <PreviewItem label="GST (%)" value={institute.plans.gst} />
      <PreviewItem label="Credit Carry Forward" value={institute.plans.creditCarryForward ? "Yes" : "No"} />
      <PreviewItem label="Custom Logo Branding" value={institute.plans.customeLogoBranding ? "Yes" : "No"} />
      <PreviewItem label="Email Notification" value={institute.plans.emailNotification ? "Enabled" : "Disabled"} />
      <PreviewItem label="SMS Alerts" value={institute.plans.smsAlerts ? "Enabled" : "Disabled"} />
      <PreviewItem label="WhatsApp Alerts" value={institute.plans.whatsappAlerts ? "Enabled" : "Disabled"} />
      <PreviewItem
  label="Terms & Policy"
  value={
    institute.plans?.termsAndPolicy ? (
      <div className="flex flex-col items-start gap-2">
        <a
          href={
            institute.plans.termsAndPolicy?.startsWith("http")
              ? institute.plans.termsAndPolicy
              : `https://${institute.plans.termsAndPolicy}`
          }
          target="_blank"
          rel="noopener noreferrer"
        className="text-blue-600 hover:underline font-medium"
      >
        View Terms & Policy
      </a>
      </div>
    ) : (
      "—"
    )
  }
/>

    </div>

    {/* Pros */}
    {Array.isArray(institute.plans.planPros) && institute.plans.planPros.length > 0 && (
      <div className="mt-6">
        <h5 className="font-semibold text-gray-700 mb-2">✅ Pros</h5>
        <ul className="list-disc list-inside text-gray-800 text-[15px] space-y-1">
          {institute.plans.planPros.map((pro, idx) => (
            <li key={idx}>{pro}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Cons */}
    {Array.isArray(institute.plans.planCons) && institute.plans.planCons.length > 0 && (
      <div className="mt-6">
        <h5 className="font-semibold text-gray-700 mb-2">❌ Cons</h5>
        <ul className="list-disc list-inside text-gray-800 text-[15px] space-y-1">
          {institute.plans.planCons.map((con, idx) => (
            <li key={idx}>{con}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Admin Notes */}
    {institute.plans.adminNotes && (
      <div className="mt-6">
        <h5 className="font-semibold text-gray-700 mb-2">📝 Admin Notes</h5>
        <p className="text-gray-800 text-[15px]">{institute.plans.adminNotes}</p>
      </div>
    )}
  </div>
)}
{/* 📚 Modules */}
{Array.isArray(institute.plans?.modules) && institute.plans.modules.length > 0 && (
  <div className="col-span-3 bg-white rounded-2xl shadow p-6 mt-6">
    <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2 flex items-center gap-2">
      📚 Modules
      <span className="text-sm text-gray-500 font-normal">
        ({institute.plans.modules.length})
      </span>
    </h4>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {institute.plans.modules.map((mod, idx) => (
        <div
          key={mod.id || idx}
          className="p-5 rounded-2xl border border-gray-200 bg-gradient-to-tr from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
        >
          {/* Module Title */}
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-[16px] capitalize font-semibold text-gray-800">
              {mod.name}
            </h5>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
              #{idx + 1}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 capitalize text-sm mb-4 leading-relaxed line-clamp-3">
            {mod.description || "No description available"}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">💰 Price</span>
            <span className="font-semibold text-green-600">
              {mod.price ? `₹${mod.price}` : "—"}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


          {/* 📝 Notes */}
          {institute.notes && (
            <div className="col-span-3 bg-white rounded-2xl shadow p-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                📝 Notes
              </h4>
              <p className="text-gray-800 text-[15px]">{institute.notes}</p>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
