import Hero from "@/components/hero";
import About from "@/components/about";
import Portfolio from "@/components/portfolio";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Skills />
      </main>
    </>
  );
}
