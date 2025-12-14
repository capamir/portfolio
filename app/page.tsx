import type { Metadata } from "next";
import { Hero, About, Skills } from "@/components/sections";
import Projects from "@/components/sections/Projects";
import Timeline from "@/components/sections/Timeline";
import HowIWork from "@/components/sections/HowIWork";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Amir Noruzi | Full‑stack Web Developer",
  description:
    "Portfolio of Amir Noruzi – building fast, reliable, production‑ready web applications with modern web technologies.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <HowIWork />
      <Contact />
      {/* Later: ContactSection */}
    </main>
  );
}
