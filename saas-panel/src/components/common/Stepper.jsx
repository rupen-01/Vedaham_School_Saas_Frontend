// import { Icon } from "@iconify/react";

// const StepperIndicator = ({ steps, icons, steps.indexOf(activeStep) }) => {
//   return (
//     <div className="flex flex-col items-center justify-center my-8 w-full">
//       {/* Circles and Lines */}
//       <div className="flex items-center w-full justify-center">
//         {steps.map((step, index) => (
//           <div key={index} className="flex items-center w-full relative">
//             {/* Step Circle with Icon */}
//             <div
//               className={`w-12 h-12 flex items-center justify-center rounded-full z-10 border-2 transition-all duration-200
//                 ${
//                   index < steps.indexOf(activeStep)
//                     ? "bg-indigo-100 border-indigo-400 text-indigo-500"
//                     : index === steps.indexOf(activeStep)
//                     ? "bg-white border-indigo-400 text-indigo-500 shadow-md"
//                     : "bg-white border-gray-300 text-gray-400"
//                 }
//               `}
//             >
//               {index < steps.indexOf(activeStep) ? (
//                 <Icon icon="mdi:check-circle" className="w-7 h-7 text-indigo-500" />
//               ) : icons && icons[index] ? (
//                 <Icon icon={icons[index]} className="w-7 h-7" />
//               ) : (
//                 index + 1
//               )}
//             </div>
//             {/* Dashed Line Between Steps */}
//             {index < steps.length - 1 && (
//               <div
//                 className={`flex-1 h-0.5 border-t-2 border-dashed mx-2 ${
//                   index < steps.indexOf(activeStep) ? "border-indigo-400" : "border-gray-300"
//                 }`}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//       {/* Step Labels */}
//       <div className="flex items-center w-full justify-between mt-2">
//         {steps.map((step, index) => (
//           <div key={index} className="flex-1 flex flex-col items-center min-w-0">
//             <span
//               className={`text-sm text-center px-2 ${
//                 index === steps.indexOf(activeStep)
//                   ? "text-indigo-500 font-semibold"
//                   : "text-gray-400"
//               }`}
//             >
//               {step}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StepperIndicator;

import { Icon } from "@iconify/react";
import { useColorContext } from "../../context/context";
import { motion, AnimatePresence } from "framer-motion";

const StepperIndicator = ({ steps, icons, activeStep }) => {
  const { color, bgColor } = useColorContext();
  const activeIndex = steps.indexOf(activeStep);

  return (
    <div className="flex items-center justify-between w-full py-5 px-4 relative">
      {steps.map((step, index) => {
        const isCompleted = index < activeIndex;
        const isActive = index === activeIndex;
        const isFuture = index > activeIndex;

        return (
          <div key={index} className="flex flex-col items-center flex-1 relative">
            {/* Dashed Base Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full z-0">
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
                        ease: "easeInOut"
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
                    <Icon icon="mdi:check-circle" className="w-5 h-5" style={{ color }} />
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
              className={`mt-2 text-xs text-center font-medium`}
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
