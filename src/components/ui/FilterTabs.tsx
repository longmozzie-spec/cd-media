"use client";

import { motion } from "framer-motion";

interface FilterTabsProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export default function FilterTabs({ categories, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-10">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            active === cat
              ? "bg-[#E50914] text-white shadow-lg shadow-[#E50914]/25"
              : "bg-[#27272A] text-[#A1A1AA] border border-[#27272A] hover:border-[#E50914]/30 hover:text-white"
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
}