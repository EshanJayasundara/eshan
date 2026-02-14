"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, ExternalLink } from "lucide-react";
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

function ExperienceCard({ company, role, period, website, highlights, logo }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3 }}
      className="glass p-6 rounded-2xl transition-all duration-300"
    >
      <div className="flex gap-4 md:gap-6 mb-3">
        {logo && (
          <div className="w-16 h-16 relative flex-shrink-0 rounded-2xl overflow-hidden glass border border-slate-200">
            <Image 
              src={logo} 
              alt={`${company} logo`}
              fill
              className="object-contain p-2 rounded-2xl"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-0.5">{role}</h3>
            <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline flex items-center gap-1 text-sm md:text-base">
              {company} <ExternalLink className="w-4 h-4" />
            </a>
            <span className="text-slate-400 font-medium text-xs md:hidden block mt-1">{period}</span>
          </div>
          <span className="text-slate-400 font-medium text-sm mt-2 md:mt-0 hidden md:block">{period}</span>
        </div>
      </div>
      <ul className="space-y-1.5">
        {highlights.map((highlight: string, idx: number) => (
          <li key={idx} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2 ml-2">
            <span className="text-primary select-none mt-[0px]">⚬</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="mb-24">
      <SectionHeader title="Experience" icon={Briefcase} />
      <div className="space-y-5">
        <ExperienceCard 
          company="IronOne Technologies LLC"
          role="Trainee Machine Learning Engineer"
          period="July 2024 - January 2025"
          website="https://irononeailabs.com"
          logo="/ironone.jpg"
          highlights={[
            "Enhanced model explainability using SHAP to improve stakeholder trust and regulatory compliance",
            "Specialized in handling imbalanced datasets through advanced experimentation",
            "Designed custom loss functions to boost model performance on minority classes",
            "Improved recall for delinquent customers from 0.39 to 0.47, while maintaining recall of non-delinquent customers at 0.98"
          ]}
        />
        <ExperienceCard 
          company="Fonix EDU (PVT) LTD"
          role="AI/ML Developer"
          period="September 2024 - Present"
          website="https://fonixedu.com"
          logo="/fonix.png"
          highlights={[
            "Customized TrOCR model for Sinhala by adapting tokenizer and training on custom dataset",
            "Integrated Google Gemini API for AI-assisted exam grading workflow within LMS/IMS platform",
            "Developed benchmark to evaluate LLM hallucination rates in handwriting recognition tasks"
          ]}
        />
      </div>
    </section>
  );
}

