"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  index?: number;
}

export default function TestimonialCard({ name, role, company, content, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 hover:border-[#E50914]/20 hover:shadow-lg hover:shadow-[#E50914]/5 transition-all"
    >
      <Quote size={32} className="text-[#E50914]/30 mb-4" />
      <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">{content}</p>
      <div>
        <p className="text-white font-medium text-sm">{name}</p>
        <p className="text-[#A1A1AA]/70 text-xs">{role} — {company}</p>
      </div>
    </motion.div>
  );
}