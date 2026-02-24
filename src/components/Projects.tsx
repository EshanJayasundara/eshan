"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Code, Github, ExternalLink, FileText, ChevronDown, ChevronUp, Maximize2, X } from "lucide-react";
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
      className="flex flex-col md:flex-row md:items-center gap-3 mb-8"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">{title}</h2>
      </div>
      <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-slate-300 to-transparent ml-4" />
    </motion.div>
  );
};

type Category = "All" | "AI/ML" | "SE" | "IoT" | "Hardware";

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: Category;
  github?: string;
  demo?: string;
  demoLabel?: string;
  paper?: string;
  paperLabel?: string;
  diagram?: string;
  thumbnail: string;
}

function ProjectCard({ title, description, tags, github, demo, demoLabel, paper, paperLabel, diagram, thumbnail, onViewDiagram }: Omit<Project, 'category'> & { onViewDiagram: (url: string, title: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div 
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      whileHover={{ y: -5, transition: { duration: 0.1 } }}
      className="glass p-5 rounded-2xl transition-all duration-150 h-full flex flex-col"
    >
      {thumbnail && (
        <div className="w-full aspect-[16/10] relative mb-5 rounded-xl overflow-hidden glass border border-slate-200">
          <Image 
            src={thumbnail} 
            alt={`${title} thumbnail`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 leading-tight">{title}</h3>
        <p className={`text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-2 ${isExpanded ? "" : "line-clamp-3"}`}>{description}</p>
        {description.length > 120 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-primary text-[11px] font-bold uppercase tracking-wider mb-4 hover:opacity-80 transition-opacity"
          >
            {isExpanded ? (
              <>See Less <ChevronUp className="w-3 h-3" /></>
            ) : (
              <>See More <ChevronDown className="w-3 h-3" /></>
            )}
          </button>
        )}
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
              <ExternalLink className="w-4 h-4" /> {demoLabel || "Demo"}
            </a>
          )}
          {paper && (
            <a href={paper} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
              <FileText className="w-4 h-4" /> {paperLabel || "Paper"}
            </a>
          )}
          {diagram && (
            <button 
              onClick={() => onViewDiagram(diagram, title)}
              className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest"
            >
              <Maximize2 className="w-4 h-4" /> Circuit
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/eshan";

const PROJECTS_DATA: Project[] = [
  {
    title: "AI Software Engineer for GitHub Issue Resolution",
    description: "Novel graph-based approach to localize erroneous files in large code repositories using Chain-of-Thought reasoning and AI agents.",
    tags: ["LangChain", "ChromaDB", "OpenAI", "Django", "GCP"],
    category: "AI/ML",
    github: "https://github.com/cepdnaclk/e19-4yp-Solve-Issues-In-Large-Code-Repositories",
    paper: "https://drive.google.com/file/d/1-OIqGh0k9liTHYvgF8_DqIqDZ9RXCuvq/view",
    thumbnail: `${BASE_PATH}/projects/AI Software Engineer for GitHub Issue Resolution.png`,
  },
  {
    title: "AI Agent for Code Editing Tasks",
    description: "Autonomous coding agent using Google Gemini with function calling to identify and fix Python code bugs through agentic loop.",
    tags: ["Google Gemini", "Function Calling", "Python", "Agentic AI"],
    category: "AI/ML",
    github: "https://github.com/EshanJayasundara/Coding-Agent",
    thumbnail: `${BASE_PATH}/projects/AI Agent for Code Editing Tasks.png`,
  },
  {
    title: "SLM for Sinhala (SinQWEN)",
    description: "First foundational 3B-parameter SLM for Sinhala via Full-Parameter Continual Pre-training on Qwen-3B.",
    tags: ["PyTorch", "Transformers", "Tokenization", "Quantization"],
    category: "AI/ML",
    demo: "https://huggingface.co/eshangj/sin-qwen-3B-base",
    demoLabel: "More Info",
    thumbnail: `${BASE_PATH}/projects/SLM for Sinhala (SinQWEN).png`,
  },
  {
    title: "Hand Tremor Biometric Recognition",
    description: "ML solution for hand tremor based biometric recognition using 3 MPU9250 sensors. Developed MLP classifier from scratch.",
    tags: ["Machine Learning", "MLP", "Biometrics", "Signal Processing"],
    category: "AI/ML",
    github: "https://github.com/cepdnaclk/e19-co544-Hand-Tremor-Based-Biometric-Recognition",
    thumbnail: `${BASE_PATH}/projects/Hand Tremor Biometric Recognition.png`,
  },
  {
    title: "Sleep Apnea Detection Using Pulse Oximetry",
    description: "Deep learning approach for sleep apnea screening using SpO2-only signals from NSRR datasets.",
    tags: ["PyTorch", "Signal Processing", "EDF", "Medical ML"],
    category: "AI/ML",
    github: "https://github.com/EshanJayasundara/Sleep-Apnea-and-Pulse-Oximetry",
    paper: "https://drive.google.com/file/d/14EkVJEzjqtYS-giRpDmHjGb963hWnZnq/view",
    thumbnail: `${BASE_PATH}/projects/Sleep Apnea Detection Using Pulse Oximetry.webp`,
  },
  {
    title: "Simple Transformer Implementation",
    description: "Single-head Transformer from scratch using PyTorch based on 'Attention Is All You Need' research.",
    tags: ["PyTorch", "Transformers", "Attention", "NLP"],
    category: "AI/ML",
    demo: "https://huggingface.co/eshangj/SimpleTransformer",
    thumbnail: `${BASE_PATH}/projects/Simple Transformer Implementation.png`,
  },
  {
    title: "Deep Neural Network from Scratch",
    description: "A comprehensive implementation of a multi-layer neural network from scratch without deep learning frameworks. Features include forward/backward propagation, various activation functions, and optimization techniques.",
    tags: ["Python", "NumPy", "Neural Networks", "Deep Learning from Scratch", "MLP"],
    category: "AI/ML",
    github: "https://github.com/EshanJayasundara/DeepNN",
    thumbnail: `${BASE_PATH}/projects/Deep NN.png`,
  },
  {
    title: "3-bit Binary Counter",
    description: "A 3-bit Binary Counter circuit implemented using 7474 D flip-flops and logic ICs, including 7486 (XOR), 7408 (AND), and 7404 (NOT).",
    tags: ["Digital Design", "Computer Engineering", "Logic Gates", "Flip-Flops", "Hardware"],
    category: "Hardware",
    demo: "https://www.linkedin.com/posts/eshan-jayasundara_digitaldesign-computerengineering-activity-7012131176316375040-9YsG",
    thumbnail: `${BASE_PATH}/projects/3 bit Binary Counter.png`,
  },
  {
    title: "First-Person AR Game with Localization - ARCombat",
    description: "Immersive first-person AR combat experience designed to encourage physical activity. Features AR Cloud Anchor support for persistent multiplayer environments and a custom 3D-printed gun with electronic triggers and reload mechanisms.",
    tags: ["AR", "Cloud Anchors", "Multiplayer", "IoT", "3D Printing"],
    category: "IoT",
    github: "https://github.com/cepdnaclk/e19-3yp-First-Person-AR-Game-with-Localization",
    thumbnail: `${BASE_PATH}/projects/First Person AR Game with Localization.png`,
  },
  {
    title: "Crypto Accepted Here",
    description: "A freelancing project developed for a client in Texas, USA. This custom Cryptocurrency Point-of-Sale (POS) & Invoicing application designed to seamlessly bridge fiat and crypto payments for modern merchants features secure Xaman Wallet integration, real-time USD to XRP conversion, and instant QR code generation.",
    tags: ["Fintech", "XRP Ledger", "Xaman Wallet", "React", "Crypto Payments"],
    category: "SE",
    demo: "https://www.linkedin.com/posts/multi-fusion-engineering_deoplabs-appdevelopment-cryptopos-ugcPost-7412177716336197632-a3Hi",
    demoLabel: "More Info",
    thumbnail: `${BASE_PATH}/projects/Crypto Accepted Here.png`,
  },
  {
    title: "OpenTwin Documentation",
    description: "Comprehensive documentation for the OpenTwins platform, providing clear setup guides and explanations for beginners to overcome the complexity of the original platform documentation.",
    tags: ["Documentation", "IoT", "Digital Twins", "OpenTwin", "Engineering"],
    category: "IoT",
    github: "https://github.com/EshanJayasundara/OpenTwinDocumentation",
    thumbnail: `${BASE_PATH}/projects/Open Twin Documentation.png`,
  },
  {
    title: "Medical Clinic Manager",
    description: "Full-stack web application for medical clinic management featuring a Spring Boot backend secured with JWT and a MySQL database configuration.",
    tags: ["Spring Boot", "JWT", "MySQL", "Java", "Backend"],
    category: "SE",
    github: "https://github.com/EshanJayasundara/e19-co226-Medical-Clinic-Manager",
    thumbnail: `${BASE_PATH}/projects/Medical Clinic Manager.png`,
  },
  {
    title: "Department Space Management System",
    description: "A solution for real-time space booking and management at the Department of Computer Engineering, University of Peradeniya.",
    tags: ["Web App", "Space Management", "Real-time", "Booking System"],
    category: "SE",
    github: "https://github.com/EshanJayasundara/e19-co225-Department-Space-Management-System-Mobile-App",
    demo: "https://cepdnaclk.github.io/e19-co225-Department-Space-Management-System-Mobile-App/",
    demoLabel: "More Info",
    thumbnail: `${BASE_PATH}/projects/Department Space Management System.png`,
  },
  {
    title: "5V Regulator",
    description: "Development and testing of a 5V voltage regulator circuit using the LM7805 IC, providing a stable 5V output from inputs above 7V. Verified through simulation in Proteus and physical breadboard testing.",
    tags: ["LM7805", "Circuit Design", "Proteus", "Hardware"],
    category: "Hardware",
    paper: "https://drive.google.com/file/d/12anGX6aE-348ZMvRyi42hWcsONIugalA/view?usp=drive_link",
    paperLabel: "Doc",
    thumbnail: `${BASE_PATH}/projects/5V Regulator.png`,
  },
  {
    title: "BCD to 7-Segment Decoder",
    description: "Design and implementation of a BCD to 7-segment decoder using Karnaugh maps for logic simplification. Features full schematic integration and verification through Proteus 8 simulation.",
    tags: ["BCD Decoder", "7-Segment", "Logic Gates", "Proteus", "Hardware"],
    category: "Hardware",
    demo: "https://drive.google.com/file/d/1lHWaFNCV3EIIM_46EJQjhsLsB-48ndoD/view?usp=drive_link",
    paper: "https://drive.google.com/file/d/1EzfwNlxkj9KaRzsjjEtypPYO3G7dDFFS/view?usp=drive_link",
    paperLabel: "Doc",
    thumbnail: `${BASE_PATH}/projects/BCD to 7-Segment Decoder.png`,
  },
  {
    title: "4-Bit Adder/Subtractor",
    description: "Implementation of a 4-bit binary adder/subtractor circuit using the 74LS83 Full Adder and 74LS86 XOR ICs. The design includes output decoding to a 7-segment display via a 74LS47 IC.",
    tags: ["74LS83", "Binary Adder", "Digital Logic", "Circuit Design", "Hardware"],
    category: "Hardware",
    paper: "https://drive.google.com/file/d/10XKfKk9-DI_XKM9L1mNBSXx3gmMCfzez/view?usp=drive_link",
    paperLabel: "Doc",
    thumbnail: `${BASE_PATH}/projects/4-Bit Adder-Subtractor.png`,
  },
  {
    title: "Reverse Engineered LED Bulb",
    description: "Reverse-engineered non-isolated mains-powered LED driver with integrated battery backup functionality. Features integrated AC-to-DC conversion, constant current driving, and automatic emergency switchover.",
    tags: ["Hardware", "Reverse Engineering", "Power Electronics", "PCB Design"],
    category: "Hardware",
    thumbnail: `${BASE_PATH}/projects/Reverse Engineered Orange LED Bulb.png`,
    diagram: `${BASE_PATH}/projects/Reverse Engineered Orange LED Bulb Circuit.jpg`,
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeDiagram, setActiveDiagram] = useState<{ url: string; title: string } | null>(null);
  const categories: Category[] = ["All", "AI/ML", "SE", "IoT", "Hardware"];

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return PROJECTS_DATA;
    return PROJECTS_DATA.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="mb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <SectionHeader title="Featured Projects" icon={Code} />
        
        <div className="flex flex-wrap gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-white dark:bg-white/20 text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.title} 
              {...project} 
              onViewDiagram={(url, title) => setActiveDiagram({ url, title })}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {activeDiagram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/90 backdrop-blur-md"
            onClick={() => setActiveDiagram(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-100 dark:border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">{activeDiagram.title} - Circuit Diagram</h3>
                <button 
                  onClick={() => setActiveDiagram(null)}
                  className="p-2 bg-slate-100 dark:bg-white/10 rounded-full text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-center">
                <img 
                  src={activeDiagram.url} 
                  alt={`${activeDiagram.title} circuit diagram`}
                  className="w-auto h-auto max-w-full max-h-full shadow-lg rounded-lg outline outline-1 outline-slate-200 dark:outline-white/10"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

