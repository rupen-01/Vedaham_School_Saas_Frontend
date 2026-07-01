import { Icon } from "@iconify/react";
import { useColorContext } from "../../context/context";
import { motion, AnimatePresence } from "framer-motion";

const StepperIndicator = ({ steps, icons, activeStep }) => {
  const { color, bgColor } = useColorContext();
  const activeIndex = steps.indexOf(activeStep);

  return (
    <div className="flex flex-wrap items-center justify-between w-full py-4 px-2 sm:px-4 md:px-6 relative gap-y-6">
      {steps.map((step, index) => {
        const isCompleted = index < activeIndex;
        const isActive = index === activeIndex;

        return (
          <div
            key={index}
            className="flex flex-col items-center flex-1 min-w-[70px] relative"
          >
            {/* Dashed Base Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full z-0 hidden sm:block">
                <div className="border-t-2 border-dashed border-gray-300 w-full" />
                <AnimatePresence mode="wait">
                  {index < activeIndex && (
                    <motion.div
                      key={`${index}-line-fill`}
                      className="border-t-2 absolute top-0 left-0 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      exit={{ width: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      style={{ borderColor: color }}
                    />
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Step Circle Icon */}
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 relative ${
                isActive ? "shadow-lg ring-2 ring-offset-1" : ""
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                borderColor: isActive || isCompleted ? color : "#D1D5DB",
                background: isActive ? bgColor : "#fff",
                color: isActive || isCompleted ? color : "#9CA3AF",
              }}
            >
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Icon
                      icon="mdi:check-circle"
                      className="w-5 h-5"
                      style={{ color }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={icons[index]}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon
                      icon={icons[index]}
                      className="w-5 h-5"
                      style={{ color: isActive ? color : "#9CA3AF" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Step Label */}
            <motion.span
              className="mt-2 text-xs text-center font-medium break-words max-w-[80px] sm:max-w-[120px]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                color: isCompleted || isActive ? color : "#9CA3AF",
              }}
            >
              {step}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
};

export default StepperIndicator;
