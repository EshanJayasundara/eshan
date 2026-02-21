"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="mt-20 py-10 border-t border-slate-100 dark:border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50/20 dark:opacity-0 pointer-events-none" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-slate-600 dark:text-slate-400 text-sm font-medium tracking-wide"
        >
          Eshan Jayasundara @ 2026 All Rights Reserved
        </motion.p>
      </div>
    </footer>
  );
}
