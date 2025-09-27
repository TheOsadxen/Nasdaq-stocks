import NasdaqLogo from "../assets/nasdaq-logo.svg?react";
import { motion } from "framer-motion";

export function Splash(): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <NasdaqLogo className="w-40 h-40" />
    </motion.div>
  );
}
