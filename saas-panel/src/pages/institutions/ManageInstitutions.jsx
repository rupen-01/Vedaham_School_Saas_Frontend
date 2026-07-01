import React, { useState } from 'react'
import HeadingHeader from '../../components/common/HeadingHeader'
import Table from '../../components/common/Table'
import DeleteModal from '../../components/common/Delete';
import { useGetApi, useMutationApi } from '../../utils/useApi';
import ApiConfig from '../../config/ApiConfig';
import Pop from '../../components/common/pop';
import { useNavigate } from 'react-router-dom';

export default function ManageInstitutions() {
  const [deleteData, setDeleteData] = useState(null);
  const navigate = useNavigate();
  const {
    data: institutions,
    instituteLoading,
    instituteError,
    refetch,
  } = useGetApi({
    key: "institutes",
    url: ApiConfig.INSTITUTE_GET_ALL,
    requireAuth: true,
  });
  console.log("institutions", institutions);
  const deleteInstitute = useMutationApi({
        key: "institutes", // Same key as useGetApi to ensure proper invalidation
        url: "/school", // Base URL, ID will be passed in mutation
        method: "DELETE",
        requireAuth: true,
        options: {
            onSuccess: () => {
                Pop("success", "Institute deleted successfully");
                setDeleteData(null);
            },
            onError: (err) => {
                Pop("error", "Failed to delete Institute. Please try again.");
                console.log(err);
            }
        }
    })
const handleDelete = (rowData) => {
  console.log("Deleting row:", rowData);
  deleteInstitute.mutate({ id: rowData.id });
};

    const institutionTableHeaders = [
        "Institution Name",
        "Type",
        "Curriculum",
        "City",
        "State",
        "Admin Name",
        "Phone"
      ];
      
    const institutionTableDataKeys = [
        "institutionName",
        "institutionType",
        "board",
        "city",
        "state",
        "adminName",
        "contactNumber"
      ];
      
      

  return (
    <>
    <HeadingHeader
    title='Manage Institutions'
    items={[
        { label: 'Dashboard', path: '/' },
        { label: 'Institutions', path: '/institutions/manage' },
        { label: 'Manage Institutions', path: '/institutions/manage' },
    ]}
    />

    <Table
    Data={institutions?.statusCode?.data}
    ImageContainerShow={false}
    headers={institutionTableHeaders}
    dataKeys={institutionTableDataKeys}
    onDelete={(data) => setDeleteData(data)}
    onView={(data) => navigate(`/institutions/view/${data.id}`)}
    onEdit={(data) => navigate(`/institutions/edit/${data.id}`)}
    />
     <DeleteModal
                isOpen={deleteData}
                onConfirm={() => {handleDelete(deleteData)}}
                onClose={() => setDeleteData(null)}
                alertMessage="Are you sure you want to delete this institution?" 
            />
    </>
  )
}
