"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users } from "lucide-react";
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

function VolunteerCard({ role, organization, period, description, logo }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
      className="glass p-5 rounded-2xl transition-all duration-300"
    >
      <div className="flex gap-4 items-start">
        {logo && (
          <div className="w-12 h-12 relative flex-shrink-0 rounded-xl overflow-hidden glass border border-slate-100 flex items-center justify-center p-1.5">
            <Image 
              src={logo} 
              alt={`${organization} logo`}
              fill
              className="object-contain p-1 rounded-xl"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-base font-bold text-slate-800 leading-tight mb-1">{role}</h3>
          <p className="text-primary text-sm font-semibold">{organization}</p>
          {period && <p className="text-slate-400 text-xs mt-1">{period}</p>}
          {description && <p className="text-slate-600 text-sm mt-3 leading-relaxed">{description}</p>}
        </div>
      </div>
    </motion.div>
  );
}

export default function Volunteering() {
  return (
    <section id="volunteering" className="mb-20">
      <SectionHeader title="Volunteering" icon={Users} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VolunteerCard 
          role="Casual Instructor (Undergraduate Teaching Assistant)"
          organization="University of Peradeniya"
          logo="/eshan/volunteering/uop.jpg"
          description="Lab instructor for Computing (Python), Digital Design, Data Structures & Algorithms, and Machine Learning courses."
        />
        <VolunteerCard 
          role="Secretary"
          organization="IEEE Computer Society"
          logo="/eshan/volunteering/ieeecs.png"
          period="Term 24/25"
        />
        <VolunteerCard 
          role="Web Master"
          organization="IEEE Robotics and Automation Society"
          logo="/eshan/volunteering/ieeeras.jpg"
          period="Term 23/24"
        />
        <VolunteerCard 
          role="Committee Member"
          organization="Association of Computer Engineering Students (ACES)"
          logo="/eshan/volunteering/aces.jpg"
          period="Term 23/24"
        />
        <VolunteerCard 
          role="Organizing Committee Member"
          organization="IEEEXtreme 17.0"
          logo="/eshan/volunteering/ieeexterme.png"
        />
        <VolunteerCard 
          role="Contributor"
          organization="Department Project ESCAL Website Development"
          logo="/eshan/volunteering/escal.png"
          description="Contributed to continuous development of the Embedded Systems and Computer Architecture Laboratory website."
        />
      </div>
    </section>
  );
}

