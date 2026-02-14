"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-24 text-center md:text-left">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-48 h-48 md:w-96 md:h-96 relative overflow-hidden rounded-[2rem] md:rounded-[3rem] mt-0"
      >
        <Image 
          src="/eshangj_hero.png" 
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
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Hi, I'm <br/><span className="text-gradient">Eshan Jayasundara</span>
        </h1>
        <p className="text-3xl text-slate-600 mb-8 font-semibold">
          AI/ML Engineer
        </p>
        <p className="text-lg text-slate-500 max-w-2xl mb-12 leading-relaxed">
          Specializing in <strong>Classical Machine Learning</strong>, <strong>Natural Language Processing</strong>, <strong>Large Language Models</strong> and <strong>AI Agents</strong>, with hands-on experience building and deploying production-grade ML pipelines. Focused on delivering scalable and reliable AI solutions.
        </p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
          <a href="https://github.com/EshanJayasundara" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-2xl hover:scale-110 hover:text-primary transition-all duration-300">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/eshan-jayasundara" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-2xl hover:scale-110 hover:text-primary transition-all duration-300">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="mailto:jayasundara.jmeg@gmail.com" className="p-4 glass rounded-2xl hover:scale-110 hover:text-primary transition-all duration-300">
            <Mail className="w-6 h-6" />
          </a>
          <a href="tel:+94766370774" className="p-4 glass rounded-2xl hover:scale-110 hover:text-primary transition-all duration-300">
            <Phone className="w-6 h-6" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
