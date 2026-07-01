import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import ApiConfig from "../../../config/ApiConfig";
import Card from "../../../components/common/Card";
import SlidingLabelInput from "../../../components/common/SlidingLabelInput";

const AddStop = ({ isOpen = true, onClose = () => {}, editData = null, routeName = "" }) => {
  const [stopData, setStopData] = useState({
    routeName: routeName || "",
    stopName: "",
    orderNo: "",
    landmark: "",
    monthlyFee: "",
    distance: "",
  });

  const queryClient = useQueryClient();

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setStopData({
        routeName: editData.routeName || routeName || "",
        stopName: editData.stopName || "",
        orderNo: editData.orderNo || "",
        landmark: editData.landmark || "",
        monthlyFee: editData.monthlyFee || "",
        distance: editData.distance || "",
      });
    } else {
      setStopData({
        routeName: routeName || "",
        stopName: "",
        orderNo: "",
        landmark: "",
        monthlyFee: "",
        distance: "",
      });
    }
  }, [editData, routeName]);

  // ---------------------------
  // API Calls
  // ---------------------------
  const createStop = async (newStop) => {
    const token = Cookies.get("accessToken");
    const { data } = await axios.post(ApiConfig.STOP_CREATE, newStop, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };

  const updateStop = async (updatedStop) => {
    const token = Cookies.get("accessToken");
    const { data } = await axios.patch(
      ApiConfig.STOP_UPDATE(editData.id),
      updatedStop,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  };

  // Mutation
  const mutation = useMutation({
    mutationFn: editData ? updateStop : createStop,
    onSuccess: () => {
      toast.success(`Stop ${editData ? "updated" : "added"} successfully!`);
      queryClient.invalidateQueries(["stops"]);
      onClose();
      setStopData({
        routeName: routeName || "",
        stopName: "",
        orderNo: "",
        landmark: "",
        monthlyFee: "",
        distance: "",
      });
    },
    onError: (err) => {
      console.error("Failed:", err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    },
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setStopData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    mutation.mutate(stopData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-3 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto my-6">
        <Card className="p-4 sm:p-6 mt-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {editData ? "Edit Stop" : "Add Stop"}
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
              label="Route Name"
              placeholder="Autofill"
              value={stopData.routeName}
              onChange={(e) => handleChange("routeName", e.target.value)}
              disabled
            />
            <SlidingLabelInput
              type="text"
              label="Stop Name"
              placeholder="Enter Stop Name"
              value={stopData.stopName}
              onChange={(e) => handleChange("stopName", e.target.value)}
            />
            <SlidingLabelInput
              type="number"
              label="Order No."
              placeholder="1"
              value={stopData.orderNo}
              onChange={(e) => handleChange("orderNo", e.target.value)}
            />
            <SlidingLabelInput
              type="text"
              label="Landmark"
              placeholder="Nearby Landmark"
              value={stopData.landmark}
              onChange={(e) => handleChange("landmark", e.target.value)}
            />
            <SlidingLabelInput
              type="number"
              label="Monthly Fee"
              placeholder="500"
              value={stopData.monthlyFee}
              onChange={(e) => handleChange("monthlyFee", e.target.value)}
            />
            <SlidingLabelInput
              type="number"
              label="Distance (km)"
              placeholder="5"
              value={stopData.distance}
              onChange={(e) => handleChange("distance", e.target.value)}
            />
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
                ? "Update Stop"
                : "Add Stop"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddStop;
