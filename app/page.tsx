import type { Metadata } from "next";
import { Hero, About, Skills } from "@/components/sections";

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
      <Skills />
      {/* Later:  ProjectsSection, ContactSection */}
    </main>
  );
}
