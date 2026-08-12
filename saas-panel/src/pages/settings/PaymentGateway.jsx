import React, { useState } from "react";
import {
  FiCreditCard,
  FiSettings,
  FiCheckCircle,
  FiAlertCircle,
  FiActivity,
  FiDollarSign,
  FiRefreshCw,
  FiLock,
  FiEye,
  FiEyeOff,
  FiSave,
} from "react-icons/fi";

const GATEWAYS = [
  {
    id: "razorpay",
    name: "Razorpay",
    status: "Connected",
    env: "Live",
    lastUpdated: "2 days ago",
    logo: "₹",
  },
  {
    id: "stripe",
    name: "Stripe",
    status: "Not Connected",
    env: "Test",
    lastUpdated: "1 month ago",
    logo: "S",
  },
  {
    id: "manual",
    name: "Manual Payment",
    status: "Connected",
    env: "Live",
    lastUpdated: "5 hrs ago",
    logo: "M",
  },
];

const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-90921",
    institution: "Horizon Global School",
    amount: "₹14,500",
    gateway: "Razorpay",
    method: "UPI",
    date: "Oct 12, 2026",
    status: "Successful",
  },
  {
    id: "TXN-90920",
    institution: "Silver Oak Academy",
    amount: "₹8,200",
    gateway: "Razorpay",
    method: "Credit Card",
    date: "Oct 12, 2026",
    status: "Successful",
  },
  {
    id: "TXN-90919",
    institution: "Maple Leaf School",
    amount: "₹22,000",
    gateway: "Manual",
    method: "Bank Transfer",
    date: "Oct 11, 2026",
    status: "Pending",
  },
  {
    id: "TXN-90918",
    institution: "Crescent Public",
    amount: "₹5,000",
    gateway: "Stripe",
    method: "Debit Card",
    date: "Oct 10, 2026",
    status: "Failed",
  },
  {
    id: "TXN-90917",
    institution: "Emerald Heights",
    amount: "₹12,500",
    gateway: "Razorpay",
    method: "Net Banking",
    date: "Oct 09, 2026",
    status: "Refunded",
  },
];

const INITIAL_CONFIG = {
  razorpay: {
    keyId: "rzp_live_xxxxxxxxx",
    keySecret: "••••••••••••••••",
    webhookSecret: "••••••••••••••••",
    env: "Live",
    enabled: true,
  },

  stripe: {
    pubKey: "pk_test_xxxxxxxxx",
    secKey: "••••••••••••••••",
    webhookSecret: "••••••••••••••••",
    env: "Test",
    enabled: false,
  },

  manual: {
    enabled: true,
    instructions:
      "Please transfer the exact amount to the official school account and upload the payment receipt.",
    requireApproval: true,
  },
};

const PaymentGateway = () => {
  const [selectedGateway, setSelectedGateway] = useState("razorpay");
  const [config, setConfig] = useState(INITIAL_CONFIG);

  const [showSecret, setShowSecret] = useState(false);
  const [showWebhook, setShowWebhook] = useState(false);

  const [transactions] = useState(INITIAL_TRANSACTIONS);

  const activeGateway = GATEWAYS.find(
    (gateway) => gateway.id === selectedGateway
  );

  const activeConfig = config[selectedGateway];

  const updateConfig = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      [selectedGateway]: {
        ...prev[selectedGateway],
        [field]: value,
      },
    }));
  };

  const handleGatewaySelect = (gatewayId) => {
    setSelectedGateway(gatewayId);
    setShowSecret(false);
    setShowWebhook(false);
  };

  const handleSave = () => {
    alert(
      `${activeGateway?.name} configuration saved successfully.`
    );
  };

  const handleTest = () => {
    alert(
      `Connection test for ${activeGateway?.name} completed successfully.`
    );
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Successful":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      case "Refunded":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full min-w-0 p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FiCreditCard className="text-purple-600" />
            Payment Gateway
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Configure and manage payment gateway settings for the platform.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-medium">
          <FiCheckCircle />
          Payment System Active
        </div>
      </div>

      {/* Gateway Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {GATEWAYS.map((gateway) => {
          const isSelected = selectedGateway === gateway.id;

          return (
            <div
              key={gateway.id}
              onClick={() => handleGatewaySelect(gateway.id)}
              className={`bg-white rounded-2xl p-5 border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-purple-500 shadow-md ring-4 ring-purple-50"
                  : "border-gray-100 shadow-sm hover:border-purple-300"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                      isSelected
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {gateway.logo}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      {gateway.name}
                    </h3>

                    <p className="text-xs text-gray-500">
                      Updated: {gateway.lastUpdated}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full ${
                    gateway.status === "Connected"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {gateway.status}
                </span>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    gateway.env === "Live"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-orange-50 text-orange-600"
                  }`}
                >
                  {gateway.env} Environment
                </span>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleGatewaySelect(gateway.id);
                  }}
                  className="text-sm font-medium text-purple-600 flex items-center gap-1 hover:text-purple-800"
                >
                  <FiSettings size={14} />
                  Configure
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <FiLock className="text-purple-600" />
              {activeGateway?.name} Configuration
            </h2>

            {/* Razorpay */}
            {selectedGateway === "razorpay" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">
                    Enable Gateway
                  </span>

                  <input
                    type="checkbox"
                    checked={activeConfig.enabled}
                    onChange={(e) =>
                      updateConfig("enabled", e.target.checked)
                    }
                    className="w-4 h-4 accent-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Environment
                  </label>

                  <select
                    value={activeConfig.env}
                    onChange={(e) => updateConfig("env", e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  >
                    <option>Live</option>
                    <option>Test</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Key ID
                  </label>

                  <input
                    type="text"
                    value={activeConfig.keyId}
                    onChange={(e) =>
                      updateConfig("keyId", e.target.value)
                    }
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none font-mono"
                  />
                </div>

                <SecretInput
                  label="Key Secret"
                  value={activeConfig.keySecret}
                  visible={showSecret}
                  onToggle={() => setShowSecret((prev) => !prev)}
                  onChange={(value) => updateConfig("keySecret", value)}
                />

                <SecretInput
                  label="Webhook Secret"
                  value={activeConfig.webhookSecret}
                  visible={showWebhook}
                  onToggle={() => setShowWebhook((prev) => !prev)}
                  onChange={(value) =>
                    updateConfig("webhookSecret", value)
                  }
                />
              </div>
            )}

            {/* Stripe */}
            {selectedGateway === "stripe" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">
                    Enable Gateway
                  </span>

                  <input
                    type="checkbox"
                    checked={activeConfig.enabled}
                    onChange={(e) =>
                      updateConfig("enabled", e.target.checked)
                    }
                    className="w-4 h-4 accent-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Environment
                  </label>

                  <select
                    value={activeConfig.env}
                    onChange={(e) => updateConfig("env", e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  >
                    <option>Test</option>
                    <option>Live</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Publishable Key
                  </label>

                  <input
                    type="text"
                    value={activeConfig.pubKey}
                    onChange={(e) =>
                      updateConfig("pubKey", e.target.value)
                    }
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none font-mono"
                  />
                </div>

                <SecretInput
                  label="Secret Key"
                  value={activeConfig.secKey}
                  visible={showSecret}
                  onToggle={() => setShowSecret((prev) => !prev)}
                  onChange={(value) => updateConfig("secKey", value)}
                />

                <SecretInput
                  label="Webhook Secret"
                  value={activeConfig.webhookSecret}
                  visible={showWebhook}
                  onToggle={() => setShowWebhook((prev) => !prev)}
                  onChange={(value) =>
                    updateConfig("webhookSecret", value)
                  }
                />
              </div>
            )}

            {/* Manual */}
            {selectedGateway === "manual" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">
                    Enable Manual Payments
                  </span>

                  <input
                    type="checkbox"
                    checked={activeConfig.enabled}
                    onChange={(e) =>
                      updateConfig("enabled", e.target.checked)
                    }
                    className="w-4 h-4 accent-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Payment Instructions
                  </label>

                  <textarea
                    rows={5}
                    value={activeConfig.instructions}
                    onChange={(e) =>
                      updateConfig("instructions", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                  <span className="text-sm text-gray-600">
                    Require Admin Approval
                  </span>

                  <input
                    type="checkbox"
                    checked={activeConfig.requireApproval}
                    onChange={(e) =>
                      updateConfig("requireApproval", e.target.checked)
                    }
                    className="w-4 h-4 accent-purple-600"
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={handleSave}
                className="w-full bg-purple-600 text-white font-medium py-2.5 rounded-xl hover:bg-purple-700 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <FiSave size={15} />
                Save Configuration
              </button>

              {selectedGateway !== "manual" && (
                <button
                  onClick={handleTest}
                  className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FiRefreshCw size={14} />
                  Test Connection
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Statistics and Transactions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<FiActivity />}
              title="Total Transactions"
              value="12,402"
            />

            <StatCard
              icon={<FiCheckCircle className="text-green-500" />}
              title="Successful"
              value="11,940"
            />

            <StatCard
              icon={<FiAlertCircle className="text-red-500" />}
              title="Failed"
              value="312"
            />

            <StatCard
              icon={<FiDollarSign className="text-blue-500" />}
              title="Revenue"
              value="₹4.2 Cr"
              valueClass="text-purple-700"
            />
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
              <div>
                <h3 className="font-bold text-gray-800">
                  Recent Transactions
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Latest payment activity across all gateways.
                </p>
              </div>

              <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap min-w-[700px]">
                <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-semibold">
                      Transaction ID
                    </th>

                    <th className="px-4 py-3 font-semibold">
                      Institution
                    </th>

                    <th className="px-4 py-3 font-semibold">
                      Amount
                    </th>

                    <th className="px-4 py-3 font-semibold">
                      Gateway
                    </th>

                    <th className="px-4 py-3 font-semibold">
                      Date
                    </th>

                    <th className="px-4 py-3 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {transactions.map((txn) => (
                    <tr
                      key={txn.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">
                        {txn.id}
                      </td>

                      <td className="px-4 py-3 font-medium text-gray-800">
                        {txn.institution}
                      </td>

                      <td className="px-4 py-3 font-semibold text-gray-700">
                        {txn.amount}
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-xs text-gray-600">
                          {txn.gateway}
                          <span className="text-gray-400">
                            {" "}
                            · {txn.method}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {txn.date}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full ${getStatusClasses(
                            txn.status
                          )}`}
                        >
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
            <FiLock className="text-blue-600 mt-0.5 shrink-0" />

            <div>
              <h4 className="font-semibold text-blue-900 text-sm">
                Security Notice
              </h4>

              <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                Payment gateway secrets should never be exposed in frontend
                production code. Store sensitive credentials securely on the
                backend and use environment variables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Small local UI helpers */
const StatCard = ({ icon, title, value, valueClass = "text-gray-800" }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
    <div className="text-gray-500 text-xs font-medium mb-1 flex items-center gap-1">
      {icon}
      {title}
    </div>

    <div className={`text-2xl font-bold ${valueClass}`}>
      {value}
    </div>
  </div>
);

const SecretInput = ({
  label,
  value,
  visible,
  onToggle,
  onChange,
}) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1">
      {label}
    </label>

    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none font-mono pr-10"
      />

      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {visible ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  </div>
);

export default PaymentGateway;