import React from 'react'
import HeadingHeader from '../../components/common/HeadingHeader'
import Table from '../../components/common/Table'

export default function ManageInstitutions() {

    const institutions = [
      {
        institutionName: "Greenfield International School",
        assignedPlan:"My Plan",
        startDate:"01/01/2022",
        endDate:"01/01/2024",
        subscriptionType:"Paid",
        price:"40000",
        paymentStatus:"Paid",
        status:"Active",
    
        notes: "School migrated from manual to ERP in 2022. Located in the urban sector."
      },
      {
        institutionName: "Bright Minds College",
        assignedPlan:"My Plan 2",
        startDate:"01/01/2023",
        endDate:"15/05/2025",
        subscriptionType:"Promotional",
        price:"35000",
        paymentStatus:"Pending",
        status:"Cancelled",
    
        notes: "Recognized as a premier institute for technical education."
      }
    ];

    const institutionTableHeaders = [
        "Institution Name",
        "Assigned Plan",
        "Start Date",
        "End Date",
        "Type",
        "Price",
        "Payment Status",
      ];
      
    const institutionTableDataKeys = [
        "institutionName",
        "assignedPlan",
        "startDate",
        "endDate",
        "subscriptionType",
        "price",
        "paymentStatus"
      ];
      
      

  return (
    <>
    <HeadingHeader
    title='View Subscription'
    items={[
        { label: 'Dashboard', path: '/' },
        { label: 'Subscriptions', path: '/subscriptions/view' },
        { label: 'View Subscription', path: '/view' },
    ]}
    />

    <Table
    Data={institutions}
    ImageContainerShow={false}
    headers={institutionTableHeaders}
    dataKeys={institutionTableDataKeys}
    hasStatus="status"
    hiddenActions={["Edit", "Delete"]}
    />
    </>
  )
}
