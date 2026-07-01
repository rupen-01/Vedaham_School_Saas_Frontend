import { toast } from "react-hot-toast";
import { Icon } from "@iconify/react";

const Pop = (type="", msg) => {
  return toast(msg, {
    icon: (
      <div
        className={`p-1 rounded-xl flex items-center justify-center ${
          type === "success"
            ? "bg-green-100"
            : type === "error"
            ? "bg-red-100"
            : type === "info"
            ? "bg-blue-100"
            : type === "custom"
            ? "bg-purple-100"
            : type === "loading"
            ? "bg-gray-100"
            : "bg-gray-100" // Default case
        }`}
      >
        {/* Success Icon */}
        {type === "success" && (
          <Icon icon="ep:success-filled" className="text-green-500 h-6 w-6" />
        )}

        {/* Error Icon */}
        {type === "error" && (
          <Icon icon="clarity:error-solid" className="text-red-500 h-6 w-6" />
        )}

        {/* Info Icon */}
        {type === "info" && (
          <Icon icon="clarity:error-solid" className="text-blue-500 rotate-180 h-6 w-6" />
        )}

        {/* Custom Icon */}
        {type === "custom" && (
          <Icon icon="mdi:star-circle" className="text-purple-500 h-6 w-6" />
        )}

        {/* Loading Icon */}
        {type === "loading" && (
          <Icon icon="line-md:loading-loop" className="text-gray-500 h-6 w-6 animate-spin" />
        )}

        {/* Default Icon */}
        {!["success", "error", "info", "custom", "loading"].includes(type) && (
          <Icon icon="mdi:message-text" className="text-gray-500 h-5 w-5" />
        )}
      </div>
    ),
  });
};

export default Pop;
