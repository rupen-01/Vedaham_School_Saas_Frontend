import React from "react";
import {useParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import Card from "../../components/common/Card";
import HeadingHeader from "../../components/common/HeadingHeader";
import { useGetApi } from "../../utils/useApi";

export default function ViewPlan() {
  const id= useParams().id;
  console.log("Plan ID from URL:", id);

    const { data: plansData, isLoading} = useGetApi({
    key: `plan-${id}`,
    url: `/plan/${id}`,
    requireAuth: true,
  });

  const plan = plansData?.data || [];

  const durationLabels = {
  "7days": "7 Days",
  "30days": "30 Days",
  "90days": "90 Days",
  "1year": "1 Year",
};

if (isLoading) {
    return(<>
    <div className="mb-6 h-20 w-full mt-4 rounded-xl bg-gray-200/70 animate-pulse">
    </div>
    <Card>
  <div className="p-6 max-w-6xl mx-auto space-y-6 font-sans">
    {isLoading ? (
      <>
        {/* Header Skeleton */}
        <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
          <div>
            <div className="flex items-center gap-4">
              <SkeletonBox className="h-6 w-40" />
              <SkeletonBox className="h-4 w-16" />
            </div>
            <SkeletonBox className="h-4 w-60 mt-2" />
          </div>
          <SkeletonBox className="h-5 w-20 rounded-full" />
        </div>

        {/* Details Skeleton */}
        <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-xs space-y-4">
          <SkeletonBox className="h-5 w-32" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {Array(6).fill(0).map((_, i) => (
              <SkeletonBox key={i} className="h-4 w-32" />
            ))}
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-xs">
          <SkeletonBox className="h-5 w-24 mb-3" />
          <div className="grid md:grid-cols-2 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <SkeletonBox key={i} className="h-4 w-28" />
            ))}
          </div>
        </div>
      </>
    ) : (
      <>
        {/* 🔹 Your full plan structure (the code you pasted) */}
        {/* ... keep as is ... */}
      </>
    )}
  </div>
</Card>    
    </>) 

  }
  return (
    <>
          <HeadingHeader
            title= {`View Plan - ${plan ? plan?.name : ''}`}
            items={[
              { label: "Dashboard", path: "/" },
              { label: "Plans", path: "/plans/manage" },
              { label: "Manage Plans", path: "/plans/manage" },
              { label: "View Plan", path: "/plans/view" },
            ]}
            back={true}
            Goback='/plans/manage'
          />
    <Card>
    <div className="p-6 max-w-6xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
        <div>
            <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold capitalize text-gray-900">{plan.name}</h1>
          <span
  className={`px-3 py-1 text-[10px] flex items-center gap-1 rounded-md capitalize font-semibold 
  ${plan?.status
    ? "bg-gradient-to-r from-green-100 to-green-200 text-green-600"
    : "bg-gradient-to-r from-red-100 to-red-200 text-red-600"} 
tracking-wide`}
>
  <span
    className={`h-1 rounded-full w-1 inline-block 
    ${plan?.status ? "bg-green-600" : "bg-red-600"}`}
  ></span>
  {plan.status ? "Active" : "Inactive"}
</span>
            </div>
          <p className="text-sm capitalize text-gray-500">{plan.description}</p>
        </div>
        <span className="px-3 py-1 text-xs rounded-full bg-gray-900 text-white uppercase tracking-wide">
          {plan.category}
        </span>
      </div>

      {/* Basic Info */}
      <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-xs space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Plan Details</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm">
          <InfoItem label="Plan Code" value={plan.code} />
          <InfoItem
  label="Duration"
  value={durationLabels[plan.duration] || plan.duration || "N/A"}
/>

          <InfoItem label="Billing Cycle" value={plan.billingCycle} />
          <InfoItem label="Actual Price" value={`₹${plan.actualPrice}`} />
          <InfoItem label="Offer Price" value={`₹${plan.offerPrice}`} />
          {plan?.category === "Flexible" && (<>
          <InfoItem label="Per Student Price" value={plan.perStudentPrice || "N/A"} />
                    <InfoItem label="Max Student Limit" value={plan.maxStudentLimit || "N/A"} />
          <InfoItem label="Min Student Limit" value={plan.minStudentLimit || "N/A"} />
          </>)}
          <InfoItem label="GST" value={`${plan.gst}%`} />
                    {plan?.category === "Fixed" && (<>
          <InfoItem label="Max Students" value={plan.maxStudent} />
          <InfoItem label="Max Staff Users" value={plan.maxStaffUser} />
          <InfoItem label="Storage Limit" value={`${plan.storageLimit} MB`} />
          </>)}
            <div className={`flex gap-20 border-b col-span-3 capitalize border-dashed border-gray-200 pb-1`}>
    <span className="text-gray-500">Admin Notes</span>
    <span className="font-medium text-gray-900">{plan.adminNotes}</span>
  </div>
        </div>
      </div>

      {/* Features */}
            {plan.emailNotification || plan.smsAlerts || plan.whatsappAlerts || plan.customeLogoBranding || (plan?.category === "Flexible" && plan.creditCarryForward) ? (
      <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-xs">
  <h2 className="text-lg font-semibold text-gray-900 mb-3">Features</h2>
  <ul className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
    {plan.emailNotification && (
      <InfoItem label="Email Notifications" value="Enabled" />
    )}
    {plan.smsAlerts && (
      <InfoItem label="SMS Alerts" value="Enabled" />
    )}
    {plan.whatsappAlerts && (
      <InfoItem label="WhatsApp Alerts" value="Enabled" />
    )}
    {plan.customeLogoBranding && (
      <InfoItem label="Custom Logo Branding" value="Enabled" />
    )}
    {plan?.category === "Flexible" && plan.creditCarryForward && (
      <InfoItem label="Credit Carry Forward" value="Enabled" />
    )}
  </ul>
</div>) : null}
      {/* Pros & Cons */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-xs">
          <h3 className="font-semibold mb-3">Pros</h3>
          <ul className="space-y-2">
            {plan.planPros?.map((pro, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-xs">
          <h3 className="font-semibold mb-3">Cons</h3>
          <ul className="space-y-2">
            {plan.planCons?.map((con, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <XCircle className="h-4 w-4 text-red-500" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modules */}
      <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-xs">
        <h3 className="font-semibold mb-3">Modules Included</h3>
        <ul className="space-y-3">
          {plan.modules?.map((mod) => (
            <li
              key={mod.id}
              className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2 last:border-none"
            >
              <div>
                <p className="font-medium text-sm capitalize">{mod.name}</p>
                <p className="text-xs text-gray-500 capitalize">{mod.description}</p>
              </div>
              <span className="text-xs font-semibold">₹{mod.price}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Terms */}
<div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-xs">
  <h3 className="font-semibold flex items-center mb-3">Terms & Policy       
    <span className="text-xs ml-2 text-gray-400">
        Opens in a new tab for better readability
      </span></h3>
  
  {plan.termsAndPolicy ? (
    <div className="flex flex-col items-start gap-2">
     <a
  href={
    plan.termsAndPolicy?.startsWith("http")
      ? plan.termsAndPolicy
      : `https://${plan.termsAndPolicy}`
  }
  target="_blank"
  rel="noopener noreferrer"
  className="px-5 py-2 rounded-lg bg-white/30 border border-gray-200 text-xs font-medium text-gray-700 hover:bg-white/40 
             hover:shadow-sm transition-all duration-200"
>
  View Terms & Conditions
</a>
    </div>
  ) : (
    <p className="text-sm text-gray-600">N/A</p>
  )}
</div>
    </div>
      </Card>
      </>
  );
}

/* Reusable Info Item Component */
const InfoItem = ({ label, value,className }) => (
  <div className={`flex justify-between border-b ${className} capitalize border-dashed border-gray-200 pb-1`}>
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);
const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`}></div>
);


