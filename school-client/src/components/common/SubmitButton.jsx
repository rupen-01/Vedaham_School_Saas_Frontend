import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, ArrowUpCircle, Loader2 } from "lucide-react";

export default function SubmitButton({status,children="Submit",width="fit",position="center",onClick=()=>{},className=""}) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`flex gap-4 justify-${position} w-full`}>
     <motion.button
        type="submit"
        onClick={(e) => onClick(e)}
        className={`relative w-${width} cursor-pointer text-[12.25px] md:text-[14px] px-[16px] py-[13px] text-base font-bold text-white rounded-[8px] overflow-hidden transition-all duration-300 flex items-center justify-center
          ${className}
          ${status === "idle" ? "bg-[#1c252e]" : ""}
          ${status === "loading" ? "bg-gray-600" : ""}
          ${status === "success" ? "bg-green-600" : ""}
          ${status === "error" ? "bg-red-600" : ""}
        `}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        whileHover={status === "idle" ? { scale: 1.05 } : {}}
        whileTap={{ scale: 0.95 }}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-5 h-5" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
              <Loader2 className="w-5 h-5" />
            </motion.div>
            <span>Loading...</span>
          </motion.div>
        ) : status === "success" ? (
          <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CheckCircle className="w-5 h-5" />
            <span>Success</span>
          </motion.div>
        ) : status === "error" ? (
          <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <XCircle className="w-5 h-5" />
            <span>Error</span>
          </motion.div>
        ) : (
          <span>{children}</span>
        )}
      </motion.button>
    </div>
  );
}
