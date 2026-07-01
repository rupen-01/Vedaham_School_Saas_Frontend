import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import ApiConfig from "../../../config/ApiConfig";
import Card from "../../../components/common/Card";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";
import SlidingLabelSelect from "../../../components/common/SlidingSelect";
import SlidingLabelRadio from "../../../components/common/SlidingLabelRadio";
import BorderedFieldset from "../../../components/common/BorderedFieldset";

const AddVehicle = ({ isOpen = true, onClose = () => {}, editData = null }) => {
  const [vehicleData, setVehicleData] = useState({
    vehicleNo: "",
    vehicleType: "",
    vehicleName: "",
    seatingCapacity: "",
    insuranceExpiryDate: "",
    status: "Active",
  });

  const queryClient = useQueryClient();

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setVehicleData({
        vehicleNo: editData.vehicleNo || "",
        vehicleType: editData.vehicleType || "",
        vehicleName: editData.vehicleName || "",
        seatingCapacity: editData.seatingCapacity || "",
        insuranceExpiryDate: editData.insuranceExpiryDate || "",
        status:
          editData.status === true || editData.status === "Active"
            ? "Active"
            : "Inactive",
      });
    } else {
      setVehicleData({
        vehicleNo: "",
        vehicleType: "",
        vehicleName: "",
        seatingCapacity: "",
        insuranceExpiryDate: "",
        status: "Active",
      });
    }
  }, [editData]);

  // ---------------------------
  // API Calls
  // ---------------------------
  const createVehicle = async (newVehicle) => {
    const token = Cookies.get("accessToken");
    const { data } = await axios.post(ApiConfig.VEHICLE_CREATE, newVehicle, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };

  const updateVehicle = async (updatedVehicle) => {
    const token = Cookies.get("accessToken");
    const { data } = await axios.patch(
      ApiConfig.VEHICLE_UPDATE(editData.id),
      updatedVehicle,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  };

  // Mutation
  const mutation = useMutation({
    mutationFn: editData ? updateVehicle : createVehicle,
    onSuccess: () => {
      toast.success(`Vehicle ${editData ? "updated" : "added"} successfully!`);
      queryClient.invalidateQueries(["vehicles"]);
      onClose();
      setVehicleData({
        vehicleNo: "",
        vehicleType: "",
        vehicleName: "",
        seatingCapacity: "",
        insuranceExpiryDate: "",
        status: "Active",
      });
    },
    onError: (err) => {
      console.error("Failed:", err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    },
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setVehicleData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    mutation.mutate(vehicleData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-3 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto my-6">
        <Card className="p-4 sm:p-6 mt-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {editData ? "Edit Vehicle" : "Add Vehicle"}
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-700 bg-red-100 w-8 h-8 flex items-center justify-center rounded-lg transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SlidingLabelInput
              type="text"
              label="Vehicle Number"
              placeholder="Enter Vehicle Number"
              value={vehicleData.vehicleNo}
              onChange={(e) => handleChange("vehicleNo", e.target.value)}
            />
            <SlidingLabelSelect
              label="Vehicle Type"
              name="vehicleType"
              value={vehicleData.vehicleType}
              onChangeProp={(e) => handleChange("vehicleType", e.target.value)}
              options={[
                { label: "Bus", value: "Bus" },
                { label: "Van", value: "Van" },
                { label: "Auto", value: "Auto" },
              ]}
            />
            <SlidingLabelInput
              type="text"
              label="Vehicle Name"
              placeholder="Blue Bus"
              value={vehicleData.vehicleName}
              onChange={(e) => handleChange("vehicleName", e.target.value)}
            />
            <SlidingLabelInput
              type="number"
              label="Seating Capacity"
              placeholder="36"
              value={vehicleData.seatingCapacity}
              onChange={(e) => handleChange("seatingCapacity", e.target.value)}
            />
            <SlidingLabelInput
              type="date"
              label="Insurance Expiry Date"
              placeholder="YYYY-MM-DD"
              value={vehicleData.insuranceExpiryDate}
              onChange={(e) =>
                handleChange("insuranceExpiryDate", e.target.value)
              }
            />
             {/* Status Radio */}
          <BorderedFieldset legend="Status" className="mt-0 h-12 text-[12px] flex  items-center ">
            <div className="flex items-center mb-4"> 
            <SlidingLabelRadio
              name="status"
          
              value={vehicleData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              options={["Active", "Inactive"]}
            />
            </div>
          </BorderedFieldset>
          
          </div>

         

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              disabled={mutation.isLoading}
              className={`px-5 sm:px-6 py-2 rounded-lg text-white cursor-pointer ${
                mutation.isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {mutation.isLoading
                ? editData
                  ? "Updating..."
                  : "Adding..."
                : editData
                ? "Update Vehicle"
                : "Add Vehicle"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddVehicle;
