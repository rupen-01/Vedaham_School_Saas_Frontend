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

const AddRoute = ({ isOpen = true, onClose = () => {}, editData = null, routeName = "" }) => {
  const [routeData, setRouteData] = useState({
    routeName: routeName || "",
    vehicleId: "",
    startingPoint: "",
    endingPoint: "",
    totalDistance: "",
    status: "Active",
  });

  const queryClient = useQueryClient();

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setRouteData({
        routeName: editData.routeName || routeName || "",
        vehicleId: editData.vehicleId || "",
        startingPoint: editData.startingPoint || "",
        endingPoint: editData.endingPoint || "",
        totalDistance: editData.totalDistance || "",
        status:
          editData.status === true || editData.status === "Active"
            ? "Active"
            : "Inactive",
      });
    } else {
      setRouteData({
        routeName: routeName || "",
        vehicleId: "",
        startingPoint: "",
        endingPoint: "",
        totalDistance: "",
        status: "Active",
      });
    }
  }, [editData, routeName]);

  // ---------------------------
  // API Calls
  // ---------------------------
  const createRoute = async (newRoute) => {
    const token = Cookies.get("accessToken");
    const { data } = await axios.post(ApiConfig.ROUTE_CREATE, newRoute, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };

  const updateRoute = async (updatedRoute) => {
    const token = Cookies.get("accessToken");
    const { data } = await axios.patch(
      ApiConfig.ROUTE_UPDATE(editData.id),
      updatedRoute,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  };

  // Mutation
  const mutation = useMutation({
    mutationFn: editData ? updateRoute : createRoute,
    onSuccess: () => {
      toast.success(`Route ${editData ? "updated" : "added"} successfully!`);
      queryClient.invalidateQueries(["routes"]);
      onClose();
      setRouteData({
        routeName: routeName || "",
        vehicleId: "",
        startingPoint: "",
        endingPoint: "",
        totalDistance: "",
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
    setRouteData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    mutation.mutate(routeData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-3 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto my-6 ">
        <Card className="p-4 sm:p-6 mt-4 ">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {editData ? "Edit Route" : "Add Route"}
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
            {/* Route Name (Autofill) */}
            <SlidingLabelInput
              type="text"
              label="Route Name"
              placeholder="Autofill"
              value={routeData.routeName}
              onChange={(e) => handleChange("routeName", e.target.value)}
              disabled
            />
            {/* Vehicle Select */}
            <SlidingLabelSelect
              label="Select Vehicle"
              name="vehicleId"
              value={routeData.vehicleId}
              onChangeProp={(e) => handleChange("vehicleId", e.target.value)}
              options={[
                { label: "Select Vehicle", value: "" },
                { label: "Bus 1", value: "bus1" },
                { label: "Van 1", value: "van1" },
                { label: "Auto 1", value: "auto1" },
              ]}
            />
            <SlidingLabelInput
              type="text"
              label="Starting Point"
              placeholder="Enter Starting Point"
              value={routeData.startingPoint}
              onChange={(e) => handleChange("startingPoint", e.target.value)}
            />
            <SlidingLabelInput
              type="text"
              label="Ending Point"
              placeholder="Enter Ending Point"
              value={routeData.endingPoint}
              onChange={(e) => handleChange("endingPoint", e.target.value)}
            />
            <SlidingLabelInput
              type="number"
              label="Total Distance (km)"
              placeholder="10"
              value={routeData.totalDistance}
              onChange={(e) => handleChange("totalDistance", e.target.value)}
            />

            {/* Status */}
            <BorderedFieldset legend="Status" className="mt-0 h-12 text-[12px] flex items-center">
              <div className="flex items-center mb-4">
                <SlidingLabelRadio
                  name="status"
                  value={routeData.status}
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
                ? "Update Route"
                : "Add Route"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddRoute;
