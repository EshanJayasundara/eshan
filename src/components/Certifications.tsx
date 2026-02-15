"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, ExternalLink } from "lucide-react";
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

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/eshan";

function CertificationCard({ platform, link, courses, logo }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -3 }}
      className="glass p-6 rounded-3xl transition-all duration-300"
    >
      <div className="flex gap-4 items-center mb-6">
        {logo && (
          <div className="w-14 h-14 relative flex-shrink-0 rounded-2xl overflow-hidden glass border border-slate-100 flex items-center justify-center p-2">
            <Image 
              src={logo} 
              alt={`${platform} logo`}
              fill
              className="object-contain p-1.5"
            />
          </div>
        )}
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-slate-800 hover:text-primary transition-colors flex items-center gap-2">
          {platform} <ExternalLink className="w-5 h-5" />
        </a>
      </div>
      <ul className="space-y-4">
        {courses.map((course: any, idx: number) => (
          <li key={idx} className="flex items-center gap-4 group ml-3">
            {course.issuerLogo && (
              <div className="w-10 h-10 relative flex-shrink-0 rounded-xl overflow-hidden border border-slate-100 bg-white/50 p-1.5">
                <Image 
                  src={course.issuerLogo} 
                  alt="Issuer logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
            )}
            <div className="flex-1">
              <span className="text-slate-700 font-semibold group-hover:text-primary transition-colors block">
                {course.title}
              </span>
              {course.issuer && (
                <span className="text-xs text-slate-400 font-medium">{course.issuer}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="mb-24">
      <SectionHeader title="Certifications" icon={FileText} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <CertificationCard 
          platform="Coursera"
          link="https://www.coursera.org/user/364b57802f7fc0404f320dc78ed7b3df"
          logo={`${BASE_PATH}/certificates/coursera.png`}
          courses={[
            { 
              title: "Deep Learning Specialization", 
              issuer: "DeepLearning.AI", 
              issuerLogo: `${BASE_PATH}/certificates/deeplearningai.jpg` 
            },
            { 
              title: "Google AI Essentials", 
              issuer: "Google", 
              issuerLogo: `${BASE_PATH}/certificates/google-removebg-preview.png` 
            }
          ]}
        />
        <CertificationCard 
          platform="DataCamp"
          link="https://www.datacamp.com/portfolio/e19163"
          logo={`${BASE_PATH}/certificates/datacamp.jpg`}
          courses={[
            { 
              title: "Supervised Learning with scikit-learn",
              issuerLogo: `${BASE_PATH}/techstack/sklearn.png`
            },
            { 
              title: "Object-Oriented Programming in Python",
              issuerLogo: `${BASE_PATH}/techstack/python.png`
            }
          ]}
        />
      </div>
    </section>
  );
}


