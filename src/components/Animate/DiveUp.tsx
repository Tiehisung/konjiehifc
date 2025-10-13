"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const DiveUpwards = ({
  children,
  dependency,
  yLimit = 50,
}: {
  children: ReactNode;
  dependency?: string | boolean | number;
  yLimit?: number;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2, // Adjust threshold as needed
  });
  const [delayOn, setDelayOn] = useState(false);

  useEffect(() => {
    setDelayOn(true);
    const timeout = setTimeout(() => {
      setDelayOn(false);
    }, 1);
    return () => clearTimeout(timeout);
  }, [dependency]);

  if (delayOn) return null;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yLimit }} // Initial values for animation
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : yLimit }} // Animate on view
      transition={{ duration: 0.5 }} // Animation duration
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  );
};

export default DiveUpwards;
