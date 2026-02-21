"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Github, ExternalLink, FileText } from "lucide-react";
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

function ProjectCard({ title, description, tags, github, demo, paper, thumbnail }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="glass p-5 rounded-2xl transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {thumbnail && (
          <div className="w-full md:w-48 h-48 md:h-40 relative flex-shrink-0 rounded-xl overflow-hidden glass border border-slate-200">
            <Image 
              src={thumbnail} 
              alt={`${title} thumbnail`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 leading-tight">{title}</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag: string) => (
              <span key={tag} className="px-2.5 py-0.5 bg-white/60 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full text-[10px] text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mt-auto">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                <Github className="w-4 h-4" /> Code
              </a>
            )}
            {demo && (
              <a href={demo} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                <ExternalLink className="w-4 h-4" /> Demo
              </a>
            )}
            {paper && (
              <a href={paper} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                <FileText className="w-4 h-4" /> Paper
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/eshan";

export default function Projects() {
  const placeholderThumbnail = `${BASE_PATH}/projects/nn.png`;

  return (
    <section id="projects" className="mb-24">
      <SectionHeader title="Featured Projects" icon={Code} />
      <div className="grid grid-cols-1 gap-6">
        <ProjectCard 
          title="AI Software Engineer for GitHub Issue Resolution"
          description="Novel graph-based approach to localize erroneous files in large code repositories using Chain-of-Thought reasoning and AI agents."
          tags={["LangChain", "ChromaDB", "OpenAI", "Django", "GCP"]}
          github="https://github.com/cepdnaclk/e19-4yp-Solve-Issues-In-Large-Code-Repositories"
          paper="https://drive.google.com/file/d/1-OIqGh0k9liTHYvgF8_DqIqDZ9RXCuvq/view"
          thumbnail={placeholderThumbnail}
        />
        <ProjectCard 
          title="AI Agent for Code Editing Tasks"
          description="Autonomous coding agent using Google Gemini with function calling to identify and fix Python code bugs through agentic loop."
          tags={["Google Gemini", "Function Calling", "Python", "Agentic AI"]}
          github="https://github.com/EshanJayasundara/Coding-Agent"
          thumbnail={placeholderThumbnail}
        />
        <ProjectCard 
          title="SLM for Sinhala (SinQWEN)"
          description="First foundational 3B-parameter SLM for Sinhala via Full-Parameter Continual Pre-training on Qwen-3B."
          tags={["PyTorch", "Transformers", "Tokenization", "Quantization"]}
          demo="https://huggingface.co/eshangj/sin-qwen-3B-base"
          thumbnail={placeholderThumbnail}
        />
        <ProjectCard 
          title="Hand Tremor Biometric Recognition"
          description="ML solution for hand tremor based biometric recognition using 3 MPU9250 sensors. Developed MLP classifier from scratch."
          tags={["Machine Learning", "MLP", "Biometrics", "Signal Processing"]}
          github="https://github.com/cepdnaclk/e19-co544-Hand-Tremor-Based-Biometric-Recognition"
          thumbnail={placeholderThumbnail}
        />
        <ProjectCard 
          title="Sleep Apnea Detection Using Pulse Oximetry"
          description="Deep learning approach for sleep apnea screening using SpO2-only signals from NSRR datasets."
          tags={["PyTorch", "Signal Processing", "EDF", "Medical ML"]}
          github="https://github.com/EshanJayasundara/Sleep-Apnea-and-Pulse-Oximetry"
          paper="https://drive.google.com/file/d/14EkVJEzjqtYS-giRpDmHjGb963hWnZnq/view"
          thumbnail={placeholderThumbnail}
        />
        <ProjectCard 
          title="Simple Transformer Implementation"
          description="Single-head Transformer from scratch using PyTorch based on 'Attention Is All You Need' research."
          tags={["PyTorch", "Transformers", "Attention", "NLP"]}
          demo="https://huggingface.co/eshangj/SimpleTransformer"
          thumbnail={placeholderThumbnail}
        />
      </div>
    </section>
  );
}

