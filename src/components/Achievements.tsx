"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, ExternalLink } from "lucide-react";
import Image from "next/image";

const SectionHeader = ({ title, icon: Icon }: { title: string; icon: any }) => {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-6"
    >
      <Icon className="w-6 h-6 text-primary" />
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-slate-300 to-transparent ml-4" />
    </motion.div>
  );
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/eshan";

function AchievementCard({ title, year, team, certificate, logo }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      whileHover={{ y: -3, transition: { duration: 0.1 } }}
      className="glass p-5 rounded-2xl transition-all duration-150"
    >
      <div className="flex gap-4 items-center">
        {logo && (
          <div className="w-14 h-14 relative flex-shrink-0 rounded-2xl overflow-hidden glass border border-slate-100 flex items-center justify-center p-2">
            <Image 
              src={logo} 
              alt={`${title} logo`}
              fill
              className="object-contain p-1.5 rounded-2xl"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-slate-800 dark:text-white leading-snug">{title}</h3>
            {certificate && (
              <a href={certificate} target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-110 transition-transform flex-shrink-0">
                <Award className="w-5 h-5" />
              </a>
            )}
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 flex items-center gap-2">
            <span className="font-semibold text-primary/80">{team}</span>
            {team && year && <span>•</span>}
            <span>{year}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="mb-24">
      <SectionHeader title="Achievements & Competitions" icon={Trophy} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        <AchievementCard 
          title="IEEEXtreme 18.0 - Island Rank 77"
          year="2024"
          team="Team BitBoss"
          logo={`${BASE_PATH}/achievements/ieeexterme.png`}
          certificate="https://certificate.ieeextreme.org/generate-email-certificate/X9BeZKjt2lwNFjP"
        />
        <AchievementCard 
          title="ACES Coders v11.0 - Top 30"
          year="2024"
          team="Team Whitehats"
          logo={`${BASE_PATH}/achievements/coders.png`}
        />
        <AchievementCard 
          title="IEEE Innovation Nation Sri Lanka - 3rd Place"
          year="2023"
          team="Central Province"
          logo={`${BASE_PATH}/achievements/ieeeinsl.png`}
        />
      </div>
    </section>
  );
}

