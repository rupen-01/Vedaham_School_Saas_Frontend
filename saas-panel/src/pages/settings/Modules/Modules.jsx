import React, { use, useState } from "react";
import HeadingHeader from "../../../components/common/HeadingHeader";
import Table from "../../../components/common/Table";
import DeleteModal from "../../../components/common/Delete";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import SlidingLabelTextarea from "../../../components/common/SlidingLabelTextarea";
import AddModule from "./AddModules";
import { useColorContext } from "../../../context/context";
import { useGetApi, useMutationApi } from "../../../utils/useApi";
import ApiConfig from "../../../config/ApiConfig";
import Pop from "../../../components/common/pop";

export default function Modules(){
    const [deleteData, setDeleteData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const { color } = useColorContext();
    const [DeleteId, setDeleteId] = useState(null);

    const { data:modules, isLoading, error } = useGetApi({
        key: "Module",
        url: ApiConfig.MODULE_GET_ALL,
        requireAuth: true,
    });

    console.log(modules);

    const moduleTableHeaders = [
        "Module Name",
        "Price",
        "Description",
        "Actions"
      ];
      
    const moduleTableDataKeys = [
        "name",
        "price",
        "description"
      ];

    const handleEdit = (data) => {
        setEditData(data);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditData(null);
    };

    const handleSubmit = (formData) => {
        if (editData) {
            // Handle edit - update existing module
            console.log("Editing module:", { ...editData, ...formData });
            // Here you would typically make an API call to update the module
        } else {
            // Handle add - create new module
            console.log("Adding new module:", formData);
            // Here you would typically make an API call to create the module
        }
        handleCloseModal();
    };

    const deleteModule = useMutationApi({
        key: "Module", // Same key as useGetApi to ensure proper invalidation
        url: "/module", // Base URL, ID will be passed in mutation
        method: "DELETE",
        requireAuth: true,
        options: {
            onSuccess: () => {
                Pop("success", "Module deleted successfully");
                setDeleteData(null);
            },
            onError: (err) => {
                Pop("error", "Failed to delete module. Please try again.");
                console.log(err);
            }
        }
    })

    const handleDelete = (data) => {
        deleteModule.mutate({ 
            id: data.id // Pass the ID to the mutation
        });
    }

    // Form component with access to form state
    const ModuleForm = ({ formData, handleInputChange }) => (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <SlidingLabelInput
                label="Module Name"
                name="name"
                value={formData?.name || ''}
                onChange={handleInputChange}
            />

            <SlidingLabelInput
                label="Price"
                name="price"
                value={formData?.price || ''}
                onChange={handleInputChange}
            />

            <SlidingLabelTextarea
                label="Description"
                name="description"
                value={formData?.description || ''}
                onChange={handleInputChange}
            />
        </div>
    );

    return(
        <>
        <div className="flex justify-between items-center">
              <HeadingHeader
        title="Manage Modules"
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Modules", path: "/settings/modules" },
          { label: "Manage Modules", path: "/settings/modules" },
        ]}
      />
      <button onClick={()=>{setModalOpen(true)}} style={{backgroundColor: color}} className="text-white text-sm cursor-pointer h-10 px-2 rounded-md">Add Module</button>
      </div>
 <Table
    Data={modules?.data}
    isLoading={isLoading}
    ImageContainerShow={false}
    hiddenActions={["View"]}
    headers={moduleTableHeaders}
    dataKeys={moduleTableDataKeys}
    onDelete={(data) => setDeleteData(data)}
    onEdit={handleEdit}
    showActions={true}
    />
     <DeleteModal
                isOpen={deleteData}
            onConfirm={() => {handleDelete(deleteData)}}
                onClose={() => setDeleteData(null)}
                alertMessage="Are you sure you want to delete this module?" 
            />
                  <AddModule
        title={editData ? "Edit Module" : "Add Module"}
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        submitLabel={editData ? "Update Module" : "Add Module"}
        editData={editData}
      >
        <ModuleForm />
      </AddModule>
        </>
    )
}