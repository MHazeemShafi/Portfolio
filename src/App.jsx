import Navbar from "./components/layout/Navbar";
import CustomCursor from "./components/layout/CustomCursor";
import ScrollProgress from "./components/layout/ScrollProgress";
import ScrollReveal from "./components/layout/ScrollReveal";
import Marquee from "./components/layout/Marquee";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <div className="app-shell">
      <ScrollProgress />
      <CustomCursor />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <ScrollReveal />
      <main id="main-content">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
