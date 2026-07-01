import React, { useState } from "react";
import HeadingHeader from "../../components/common/HeadingHeader";
import { Icon } from "@iconify/react";
import Card from "../../components/common/Card";
import { useGetApi, useMutationApi } from "../../utils/useApi";
import ApiConfig from "../../config/ApiConfig";
import Pop from "../../components/common/pop";
import DeleteModal from "../../components/common/Delete";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../components/common/Table";

export default function ManagePlans() {
  const navigate = useNavigate();
  const [deleteData, setDeleteData] = useState(null);


  // Fetch plans from API
  const { data: plansData, isLoading, error, refetch } = useGetApi({
    key: "plans",
    url: ApiConfig.PLAN_GET_ALL,
    requireAuth: true,
  });
console.log(plansData);
    const deletePlan = useMutationApi({
        key: "plans", // Same key as useGetApi to ensure proper invalidation
        url: "/plan", // Base URL, ID will be passed in mutation
        method: "DELETE",
        requireAuth: true,
        options: {
            onSuccess: () => {
                Pop("success", "Plan deleted successfully");
                setDeleteData(null);
            },
            onError: (err) => {
                Pop("error", "Failed to delete plan. Please try again.");
                console.log(err);
            }
        }
    })

    const handleDelete = (data) => {
        deletePlan.mutate({ 
            id: data // Pass the ID to the mutation
        });
    }

  const getStatusBadge = (status) => {
    if (status === true || status === "active") {
      return (
        <span className="px-3 py-1.5 text-green-700 bg-green-100 text-[11px] md:text-[11px] text-nowrap font-semibold rounded-lg">
          Active
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1.5 text-red-700 bg-red-100 text-[11px] md:text-[11px] text-nowrap font-semibold rounded-lg">
          Inactive
        </span>
      );
    }
  };
  
  const formatDuration = (duration) => {
    if (!duration) return "-";
    return duration.replace(/(\d+)([a-zA-Z]+)/, "$1 $2");
  };
  const plans = (plansData?.data || []).map(plan => ({
  ...plan,
  status: getStatusBadge(plan.status)  ,
  duration: formatDuration(plan.duration)
}));
  const planTableHeaders = [
  "Plan Name",
  "Code",
  "Category",
  "Billing Cycle",
  "Duration",
  "Actual Price",
  "Offered Price",
  "Status"
];

const planTableDataKeys = [
  "name",
  "code",
  "category",
  "billingCycle",
  "duration",
  "actualPrice",
  "offerPrice",
  "status"
];

  return (
    <>
      <HeadingHeader
        title="Manage Plans"
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Plans", path: "/plans/manage" },
          { label: "Manage Plans", path: "/plans/manage" },
        ]}
      />
        <Table
          Data={plans}
          ImageContainerShow={false}
          headers={planTableHeaders}
          dataKeys={planTableDataKeys}
          onDelete={(data) => {setDeleteData(data.id)}}
          onView={(data) =>navigate(`/plans/view/${data.id}`)}
          onEdit={(data) => navigate(`/plans/edit/${data.id}`)}
          />
 <DeleteModal
                isOpen={deleteData}
            onConfirm={() => {handleDelete(deleteData)}}
                onClose={() => setDeleteData(null)}
                alertMessage="Are you sure you want to delete this plan?" 
            />
    </>
  );
}
  // const [selectedPlanId, setSelectedPlanId] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  // const [selectedPlan, setSelectedPlan] = useState(null);
  // const handleMenuToggle = (planId) => {
  //   setSelectedPlanId(selectedPlanId === planId ? null : planId);
  // };

  // const handleSeeMore = (plan) => {
  //   setSelectedPlan(plan);
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setSelectedPlan(null);
  // };
  // const getDefaultIcon = (category) => {
  //   switch (category?.toLowerCase()) {
  //     case 'flexible':
  //       return 'mdi:autorenew';
  //     case 'fixed':
  //       return 'mdi:lock';
  //     default:
  //       return 'mdi:package-variant';
  //   }
  // };
      {/* <Card>
        {isLoading && (
          <div className="mt-4 px-5 py-8 flex justify-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Icon icon="eos-icons:loading" className="text-2xl animate-spin" />
              <span>Loading plans...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 px-5 py-8 flex justify-center">
            <div className="flex items-center gap-2 text-red-600">
              <Icon icon="mdi:alert-circle" className="text-2xl" />
              <span>Error loading plans: {error.message}</span>
            </div>
          </div>
        )}

        {!isLoading && !error && (
        <div className="mt-4 px-5 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.length === 0 ? (
              <div className="col-span-full flex justify-center py-8">
                <div className="text-center text-gray-500">
                  <Icon icon="mdi:package-variant-closed" className="text-4xl mx-auto mb-2" />
                  <p>No plans found</p>
                </div>
              </div>
            ) : (
              plans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-xl shadow-md border border-gray-100 bg-white hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                      <h2 className="text-[18px] flex items-center gap-2 font-semibold capitalize text-gray-600">
                    <Icon
                          icon={plan.icon || getDefaultIcon(plan.category)}
                          className="text-2xl"
                          style={{ color: plan.iconColor || "#3B82F6" }}
                    />
                    {plan.name}
                  </h2>
                      {getStatusBadge(plan.status)}
                </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {plan.description}
                    </p>

                    <div className="border-t border-gray-200 mb-4"></div>
                <ul className="space-y-2 my-4">

                      {plan.planPros && plan.planPros.slice(0, 4).map((pro, idx) => (
                    <li
                          key={`pro-${idx}`}
                      className="flex items-center text-sm gap-2 text-gray-600"
                    >
                      <Icon
                        icon="mdi:check-circle-outline"
                        className="text-green-600"
                      />
                          <span>{pro}</span>
                    </li>
                  ))}

                      {plan.planCons && plan.planCons.slice(0, 4).map((con, idx) => (
                    <li
                          key={`con-${idx}`}
                      className="flex items-center text-sm gap-2 text-gray-600"
                    >
                      <Icon
                        icon="mdi:close-circle-outline"
                        className="text-red-600"
                      />
                          <span>{con}</span>
                    </li>
                  ))}
                </ul>

                    {((plan.planPros && plan.planPros.length > 4) || (plan.planCons && plan.planCons.length > 4)) && (
                      <div className="text-center mb-4">
                        <button
                          onClick={() => handleSeeMore(plan)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium underline transition-colors duration-200"
                        >
                          See More Features
                        </button>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-3 mb-4">
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>
                          <span className="font-medium">Price:</span> ₹{plan.offerPrice}
                        </div>
                        <div>
                          <span className="font-medium">Billing:</span> {plan.billingCycle}
                        </div>
                        <div>
                          <span className="font-medium">Category:</span> {plan.category}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {plan.duration}
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-end">
                    <div className="relative inline-block text-left">
                      <button
                        className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition duration-200 flex items-center justify-center"
                          onClick={() => handleMenuToggle(plan.id)}
                      >
                        <Icon
                          icon="mdi:dots-vertical"
                          className="md:w-5 w-4 md:h-5 h-4 text-gray-600"
                        />
                      </button>
                        {selectedPlanId === plan.id && (
                          <div>
                          <div
                            className="absolute right-0 top-full mt-1 min-w-max px-2 py-0.5 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                          >
                            <div>
                              <button onClick={()=>{navigate(`/plans/view/${selectedPlanId}`)}} className="flex cursor-pointer items-center gap-3.5 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition">
                                <Icon
                                  icon="carbon:view-filled"
                                  className="md:w-5 w-4 md:h-5 h-4 text-blue-500"
                                />
                                View
                              </button>
                            </div>
                            <div>
                              <button onClick={()=>{navigate(`/plans/edit/${selectedPlanId}`)}} className="flex cursor-pointer items-center gap-3.5 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition">
                                <Icon
                                  icon="mage:edit-fill"
                                  className="md:w-5 w-4 md:h-5 h-4 text-yellow-500"
                                />
                                Edit
                              </button>
                            </div>
                            <div>
                              <button onClick={()=>{setDeleteData(selectedPlanId);setSelectedPlanId(null)}} className="flex cursor-pointer items-center gap-3.5 w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 transition">
                                <Icon
                                  icon="icon-park-solid:delete-five"
                                  className="md:w-5 w-4 md:h-5 h-4 text-red-500"
                                />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        )}
      </Card>
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Icon
                  icon={selectedPlan.icon || getDefaultIcon(selectedPlan.category)}
                  className="text-3xl"
                  style={{ color: selectedPlan.iconColor || "#3B82F6" }}
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{selectedPlan.name}</h2>
                  <p className="text-sm text-gray-600">{selectedPlan.description}</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <Icon icon="mdi:close" className="text-xl text-gray-600" />
              </button>
            </div>


            <div className="p-6 overflow-y-auto max-h-[60vh]">
    
              {selectedPlan.planPros && selectedPlan.planPros.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                    <Icon icon="mdi:check-circle" className="text-green-600" />
                    Plan Benefits
                  </h3>
                  <ul className="space-y-3">
                    {selectedPlan.planPros.map((pro, idx) => (
                      <li
                        key={`modal-pro-${idx}`}
                        className="flex items-start text-sm gap-3 text-gray-700"
                      >
                        <Icon
                          icon="mdi:check-circle-outline"
                          className="text-green-600 mt-0.5 flex-shrink-0"
                        />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
            </div>
              )}
              {selectedPlan.planCons && selectedPlan.planCons.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
                    <Icon icon="mdi:close-circle" className="text-red-600" />
                    Limitations
                  </h3>
                  <ul className="space-y-3">
                    {selectedPlan.planCons.map((con, idx) => (
                      <li
                        key={`modal-con-${idx}`}
                        className="flex items-start text-sm gap-3 text-gray-700"
                      >
                        <Icon
                          icon="mdi:close-circle-outline"
                          className="text-red-600 mt-0.5 flex-shrink-0"
                        />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}  */}