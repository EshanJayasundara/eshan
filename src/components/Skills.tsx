"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code } from "lucide-react";
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

function SkillCard({ title, items }: { title: string; items: { name: string; logo?: string }[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="glass p-5 rounded-2xl h-full"
    >
      <h3 className="text-base font-bold mb-4 text-slate-800 dark:text-white uppercase tracking-wider">{title}</h3>
      <div className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <div 
            key={item.name} 
            className="flex items-center gap-3 px-3.5 py-2 bg-white/60 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/20 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
          >
            {item.logo && (
              <div className="w-7 h-7 relative flex-shrink-0">
                <Image 
                  src={item.logo} 
                  alt={item.name} 
                  fill 
                  className="object-contain group-hover:scale-110 transition-transform duration-300 rounded-sm" 
                />
              </div>
            )}
            <span className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-bold">{item.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/eshan";

export default function Skills() {
  const skills = [
    {
      title: "ML/DL",
      items: [
        { name: "PyTorch", logo: `${BASE_PATH}/techstack/pytorch.png` },
        { name: "TensorFlow", logo: `${BASE_PATH}/techstack/tensorflow.jpg` },
        { name: "scikit-learn", logo: `${BASE_PATH}/techstack/sklearn.png` },
        { name: "SHAP", logo: `${BASE_PATH}/techstack/shap.png` },
        { name: "imbalanced-learn", logo: `${BASE_PATH}/techstack/imblearn.jpg` },
        { name: "MLflow", logo: `${BASE_PATH}/techstack/mlflow.png` },
      ]
    },
    {
      title: "LLM/NLP",
      items: [
        { name: "Google Gemini", logo: `${BASE_PATH}/techstack/gemini.png` },
        { name: "Anthropic", logo: `${BASE_PATH}/techstack/anthropic.png` },
        { name: "OpenAI", logo: `${BASE_PATH}/techstack/openai.png` },
        { name: "LangGraph", logo: `${BASE_PATH}/techstack/langgraph.png` },
        { name: "Hugging Face", logo: `${BASE_PATH}/techstack/huggingface.png` },
        { name: "ChromaDB", logo: `${BASE_PATH}/techstack/chroma.png` },
        { name: "Qdrant", logo: `${BASE_PATH}/techstack/qdrant.png` },
      ]
    },
    {
      title: "Data Science",
      items: [
        { name: "NumPy", logo: `${BASE_PATH}/techstack/numpy.jpg` },
        { name: "Pandas", logo: `${BASE_PATH}/techstack/pandas.png` },
        { name: "Matplotlib", logo: `${BASE_PATH}/techstack/matplotlib.png` },
        { name: "Seaborn", logo: `${BASE_PATH}/techstack/seaborn.png` },
        { name: "Jupyter", logo: `${BASE_PATH}/techstack/Jupyter_logo.png` },
      ]
    },
    {
      title: "Languages & Tools",
      items: [
        { name: "Python", logo: `${BASE_PATH}/techstack/python.png` },
        { name: "TypeScript", logo: `${BASE_PATH}/techstack/Typescript.png` }, // Fallback to github or fix based on available
        { name: "Docker", logo: `${BASE_PATH}/techstack/docker.png` },
        { name: "GCP", logo: `${BASE_PATH}/techstack/google-cloud.jpg` },
        { name: "Git/GitHub", logo: `${BASE_PATH}/techstack/github.png` },
      ]
    },
    {
      title: "Backend & DB",
      items: [
        { name: "Nest.js", logo: `${BASE_PATH}/techstack/nest.png` },
        { name: "MySQL", logo: `${BASE_PATH}/techstack/mysql.png` },
        { name: "PostgreSQL", logo: `${BASE_PATH}/techstack/postgress.png` },
      ]
    }
  ];

  return (
    <section id="skills" className="mb-24">
      <SectionHeader title="Technical Expertise" icon={Code} />
      <div className="flex flex-col gap-4 mx-auto">
        {skills.map((category) => (
          <SkillCard key={category.title} title={category.title} items={category.items} />
        ))}
      </div>
    </section>
  );
}


