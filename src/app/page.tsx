import Hero from "@/components/hero";
import About from "@/components/about";
import Portfolio from "@/components/portfolio";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Skills />
        <Cta />
        <Contact />
      </main>
    </>
  );
}
