"use client";

import { motion } from "framer-motion";

export default function Card({ icon: Icon, title }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/20 backdrop-blur-xl rounded-3xl p-5 shadow-xl flex flex-col items-center"
    >
      <Icon size={28} className="text-white" />
      <p className="mt-2 text-sm font-semibold text-white">{title}</p>
    </motion.div>
  );
}