"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
}

export default function CTASection({ title, description, buttonText, buttonHref }: CTASectionProps) {
  return (
    <section className="py-20 relative overflow-hidden" data-theme-locked="true">
      <div className="absolute inset-0 bg-gradient-to-r from-[#121214] via-[#1A1A1E] to-[#121214]" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#E50914]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-[#E50914]/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#A1A1AA] text-lg mb-8"
          >
            {description}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href={buttonHref}
            className="inline-flex px-8 py-4 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/25 hover:shadow-[#E50914]/40"
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}