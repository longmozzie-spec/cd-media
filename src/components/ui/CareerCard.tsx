"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Career } from "@/data/careers";

export default function CareerCard({ career, index = 0 }: { career: Career; index?: number }) {
  const typeColors: Record<string, string> = {
    "Full-time": "bg-green-500/20 text-green-400",
    "Part-time": "bg-yellow-500/20 text-yellow-400",
    "Intern": "bg-purple-500/20 text-purple-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/careers/${career.slug}`} className="group block">
        <div className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 hover:border-[#E50914]/30 hover:shadow-lg hover:shadow-[#E50914]/5 transition-all duration-300">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-white font-semibold text-lg group-hover:text-[#E50914] transition-colors">
                {career.title}
              </h3>
              <p className="text-[#A1A1AA] text-sm mt-1">{career.department}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${typeColors[career.type]}`}>
              {career.type}
            </span>
          </div>
          <p className="text-[#A1A1AA] text-sm mb-4 line-clamp-2">{career.description}</p>
          <div className="flex items-center gap-4 text-[#A1A1AA]/70 text-xs mb-4">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {career.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {career.type}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[#E50914] text-sm font-medium group-hover:gap-2 transition-all">
            Xem chi tiết <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}