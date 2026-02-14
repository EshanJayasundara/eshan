"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Volunteering from "@/components/Volunteering";
import Footer from "@/components/Footer";

import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-white relative overflow-hidden">
        <NeuralNetworkBackground />
        <div className="max-w-7xl mx-auto px-6 md:px-24 py-20 pt-24 md:pt-32 relative z-10">
          <Hero />
          <Experience />
          <Education />
          <Projects />
          <Certifications />
          <Achievements />
          <Skills />
          <Volunteering />
        </div>
        <Footer />
      </main>
    </div>
  );
}
