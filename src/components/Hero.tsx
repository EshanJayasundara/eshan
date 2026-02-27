"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, FileText } from "lucide-react";
import Image from "next/image";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/eshan";

export default function Hero() {
  return (
    <section className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-24 mb-24 text-center md:text-left">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-48 h-48 md:w-96 md:h-96 relative overflow-hidden rounded-[2rem] md:rounded-[3rem] mt-0"
      >
        <Image 
          src={`${BASE_PATH}/eshangj_hero.png`} 
          alt="Eshan Jayasundara" 
          fill 
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col items-center md:items-start"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-foreground">
          Hi, I'm <br/><span className="text-gradient">Eshan Jayasundara</span>
        </h1>
        <p className="text-2xl md:text-3xl text-slate-700 dark:text-white mb-8 font-semibold">
          AI/ML Engineer
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mb-12 leading-relaxed">
          Specializing in <strong>Classical Machine Learning</strong>, <strong>Natural Language Processing</strong>, <strong>Large Language Models</strong> and <strong>AI Agents</strong>, with hands-on experience building and deploying production-grade ML pipelines. Focused on delivering scalable and reliable AI solutions.
        </p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8 w-full">
          <a href="https://github.com/EshanJayasundara" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-0 hover:gap-3 p-4 glass rounded-2xl hover:scale-105 hover:text-primary transition-all duration-300 ease-in-out">
            <Github className="w-6 h-6 shrink-0" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm font-medium">
              GitHub
            </span>
          </a>
          <a href="https://linkedin.com/in/eshan-jayasundara" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-0 hover:gap-3 p-4 glass rounded-2xl hover:scale-105 hover:text-primary transition-all duration-300 ease-in-out">
            <Linkedin className="w-6 h-6 shrink-0" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm font-medium">
              LinkedIn
            </span>
          </a>
          <a href="tel:+94766370774" className="group flex items-center gap-0 hover:gap-3 p-4 glass rounded-2xl hover:scale-105 hover:text-primary transition-all duration-300 ease-in-out">
            <Phone className="w-6 h-6 shrink-0" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm font-medium">
              +94 766 370 774
            </span>
          </a>
          <a href="mailto:jayasundara.jmeg@gmail.com" className="group flex items-center gap-0 hover:gap-3 p-4 glass rounded-2xl hover:scale-105 hover:text-primary transition-all duration-300 ease-in-out">
            <Mail className="w-6 h-6 shrink-0" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm font-medium">
              jayasundara.jmeg@gmail.com
            </span>
          </a>
          <a 
            href={`${BASE_PATH}/cv/Eshan_Jayasundara_AI_ML_Engineer_New.pdf`} 
            download 
            className="group flex items-center gap-3 p-4 glass rounded-2xl hover:scale-105 hover:text-primary transition-all duration-300 ease-in-out"
          >
            <FileText className="w-6 h-6 shrink-0" />
            <span className="text-sm font-medium">
              Download CV
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
