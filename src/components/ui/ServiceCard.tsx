"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  index?: number;
}

export default function ServiceCard({ title, description, icon, index = 0 }: ServiceCardProps) {
  const IconComponent = (Icons as unknown as Record<string, Icons.LucideIcon>)[icon] || Icons.Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 hover:border-[#E50914]/30 hover:shadow-lg hover:shadow-[#E50914]/5 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-[#E50914]/10 flex items-center justify-center mb-4 group-hover:bg-[#E50914]/20 transition-all">
        <IconComponent size={24} className="text-[#E50914]" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-[#A1A1AA] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}