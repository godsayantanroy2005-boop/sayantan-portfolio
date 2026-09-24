import { lazy, Suspense } from "react";
import { LivingAIUniverse } from "./components/animations/LivingAIUniverse";
import { ResumeModal } from "./components/ui/ResumeModal";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./sections/Hero";
import { SectionReveal } from "./components/ui/SectionReveal";
import { AIAssistant } from "./components/ui/AIAssistant";

const About = lazy(() => import("./sections/About").then((m) => ({ default: m.About })));
const Experience = lazy(() => import("./sections/Experience").then((m) => ({ default: m.Experience })));
const Expertise = lazy(() => import("./sections/Expertise").then((m) => ({ default: m.Expertise })));
const Showcase = lazy(() => import("./sections/Showcase").then((m) => ({ default: m.Showcase })));
const Skills = lazy(() => import("./sections/Skills").then((m) => ({ default: m.Skills })));
const CreativeTools = lazy(() => import("./sections/CreativeTools").then((m) => ({ default: m.CreativeTools })));
const Projects = lazy(() => import("./sections/Projects").then((m) => ({ default: m.Projects })));
const Games = lazy(() => import("./sections/Games").then((m) => ({ default: m.Games })));
const Achievements = lazy(() => import("./sections/Achievements").then((m) => ({ default: m.Achievements })));
const GitHubSection = lazy(() => import("./sections/GitHub").then((m) => ({ default: m.GitHubSection })));
const Learning = lazy(() => import("./sections/Learning").then((m) => ({ default: m.Learning })));
const Contact = lazy(() => import("./sections/Contact").then((m) => ({ default: m.Contact })));

function SectionFallback() {
  return (
    <div className="py-24 px-6 flex justify-center">
      <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" aria-label="Loading..." />
    </div>
  );
}

export default function App() {
  return (
    <>
      <LivingAIUniverse />
      <AIAssistant />
      <ResumeModal />
      <ThemeToggle />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Navbar />

      <main tabIndex={-1}>
        <SectionReveal delay={0}>
          <Hero />
        </SectionReveal>

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal>
            <About />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal>
            <Experience />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal>
            <Expertise />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal>
            <Skills />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal>
            <CreativeTools />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal>
            <Showcase />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal>
            <Projects />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal>
            <Games />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal>
            <Achievements />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal>
            <GitHubSection />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal>
            <Learning />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal>
            <Contact />
          </SectionReveal>
        </Suspense>
      </main>

      <SectionReveal direction="up">
        <Footer />
      </SectionReveal>
    </>
  );
}


