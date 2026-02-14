"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";
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
      <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-slate-300 to-transparent ml-4" />
    </motion.div>
  );
};

function EducationCard({ degree, institution, period, gpa, logo }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3 }}
      className="glass p-5 rounded-2xl transition-all duration-300"
    >
      <div className="flex gap-5">
        {logo && (
          <div className="w-16 h-16 relative flex-shrink-0 rounded-2xl overflow-hidden glass border border-slate-200">
            <Image 
              src={logo} 
              alt={`${institution} logo`}
              fill
              className="object-contain p-2 rounded-xl"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary mb-1">{degree}</h3>
          <p className="text-base text-slate-700 font-semibold mb-1">{institution}</p>
          <div className="flex justify-between items-center text-slate-500 text-sm">
            <span>{period}</span>
            <span className="font-semibold">{gpa}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="mb-24">
      <SectionHeader title="Education" icon={GraduationCap} />
      <div className="space-y-4">
        <EducationCard 
          degree="BScEngHons in Computer Engineering"
          institution="University of Peradeniya"
          period="2021 - 2025"
          gpa="GPA: 3.65 / 4.00"
          logo="/eshan/uop.jpg"
        />
        <EducationCard 
          degree="GCE Advanced Level - Physical Science"
          institution="Central College Kuliyapitiya"
          period="2019"
          gpa="Z Score: 2.1645 | District Rank: 40"
          logo="/eshan/cck.jpg"
        />
      </div>
    </section>
  );
}

