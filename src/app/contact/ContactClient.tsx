"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Globe, Play, MessageCircle, ChevronDown } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import ContactForm from "@/components/ui/ContactForm";
import { companyInfo } from "@/data/common";

export default function ContactClient() {
  const [ytOpen, setYtOpen] = useState(false);

  return (
    <>
      <HeroSection
        title="Liên hệ"
        subtitle="Hãy cho chúng tôi biết bạn cần gì — CD Media sẵn sàng đồng hành."
        compact
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Gửi yêu cầu tư vấn</h2>
                <ContactForm />
              </motion.div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 space-y-5"
              >
                <h3 className="text-white font-semibold text-lg">Thông tin liên hệ</h3>
                <div className="flex gap-3 text-[#A1A1AA]">
                  <MapPin size={20} className="text-[#E50914] shrink-0 mt-0.5" />
                  <span className="text-sm">{companyInfo.address}</span>
                </div>
                <div className="flex gap-3 text-[#A1A1AA]">
                  <Phone size={20} className="text-[#E50914] shrink-0" />
                  <span className="text-sm">{companyInfo.phone}</span>
                </div>
                <div className="flex gap-3 text-[#A1A1AA]">
                  <Mail size={20} className="text-[#E50914] shrink-0" />
                  <span className="text-sm">{companyInfo.email}</span>
                </div>
                <div className="flex gap-3 text-[#A1A1AA]">
                  <Clock size={20} className="text-[#E50914] shrink-0" />
                  <span className="text-sm">{companyInfo.workingHours}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6"
              >
                <h3 className="text-white font-semibold text-lg mb-4">Mạng xã hội</h3>
                <div className="space-y-3">
                  <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#27272A] transition-colors group">
                    <div className="w-9 h-9 rounded-lg bg-[#27272A] group-hover:bg-[#E50914]/10 flex items-center justify-center transition-colors">
                      <Globe size={18} className="text-[#A1A1AA] group-hover:text-[#E50914]" />
                    </div>
                    <span className="text-sm text-[#A1A1AA] group-hover:text-[#E50914]">Facebook</span>
                  </a>

                  <div className="relative">
                    <button
                      onClick={() => setYtOpen(!ytOpen)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#27272A] transition-colors group w-full"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#27272A] group-hover:bg-[#E50914]/10 flex items-center justify-center transition-colors">
                        <Play size={18} className="text-[#A1A1AA] group-hover:text-[#E50914]" />
                      </div>
                      <span className="text-sm text-[#A1A1AA] group-hover:text-[#E50914]">YouTube</span>
                      <ChevronDown size={16} className={`ml-auto text-[#A1A1AA] transition-transform ${ytOpen ? "rotate-180" : ""}`} />
                    </button>
                    {ytOpen && (
                      <div className="mt-1 ml-12 space-y-1">
                        {companyInfo.youtubeChannels.map((ch) => (
                          <a key={ch.url} href={ch.url} target="_blank" rel="noopener noreferrer" className="block px-3 py-1.5 rounded-lg text-sm text-[#A1A1AA] hover:text-[#E50914] hover:bg-[#27272A] transition-colors">
                            {ch.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <a href={companyInfo.social.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#27272A] transition-colors group">
                    <div className="w-9 h-9 rounded-lg bg-[#27272A] group-hover:bg-[#E50914]/10 flex items-center justify-center transition-colors">
                      <MessageCircle size={18} className="text-[#A1A1AA] group-hover:text-[#E50914]" />
                    </div>
                    <span className="text-sm text-[#A1A1AA] group-hover:text-[#E50914]">TikTok</span>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl overflow-hidden border border-[#27272A] aspect-[4/3]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d931.2!2d105.807884!3d20.9929779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad6282f3b8fd%3A0xa2775776e0e2c7b6!2zQ8OUTkcgVFkgQ0QgTUVESUEgVknhu4ZUIE5BTQ!5e0!3m2!1svi!2svn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CD Media Vietnam - Google Maps"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
