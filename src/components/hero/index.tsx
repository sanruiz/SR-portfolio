import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white dark:bg-[#111214] overflow-hidden">
      {/* Radial violet glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.07),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.18),transparent)]" />
      {/* Dot grid */}
      <div className="absolute inset-0 bg-dot-grid" />

      <div className="relative container mx-auto max-w-screen-xl px-4 py-32 md:py-0 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-7 text-center md:text-left animate-fade-up">
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-300 text-xs font-medium">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
              style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
            />
            Open to freelance &amp; full-time roles
          </div>

          {/* Headline */}
          <div>
            <p className="text-zinc-500 dark:text-zinc-400 text-base mb-1 font-medium">Hi, I&apos;m</p>
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white leading-[1.05] tracking-tight">
              Santiago<br />
              <span className="gradient-text">Ramirez</span>
            </h1>
          </div>

          {/* Role */}
          <p className="font-mono text-violet-600/80 dark:text-violet-400/80 text-base md:text-lg tracking-wide">
            &lt; Senior Web Developer /&gt;
          </p>

          {/* Description */}
          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            I help product teams ship faster — building full-stack web apps with{" "}
            <span className="text-zinc-900 dark:text-zinc-200">Next.js</span>,{" "}
            <span className="text-zinc-900 dark:text-zinc-200">GraphQL</span>, and a
            decade of production experience behind every line of code.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 justify-center md:justify-start">
            <a
              href="#portfolio"
              className="w-full sm:w-auto px-7 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors duration-200 text-center"
            >
              See My Work
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-7 py-3 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-lg font-medium transition-all duration-200 text-center"
            >
              Start a Project
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:flex-1 flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-8 bg-violet-500/10 dark:bg-violet-600/20 blur-3xl rounded-full" />
            <div className="relative z-10 rounded-2xl overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-700/50">
              <Image
                src="/images/SantiagoR-web.png"
                alt="Santiago Ramirez"
                width={400}
                height={400}
                priority
                className="block"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-400 dark:text-zinc-600">
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-400 dark:from-zinc-600 to-transparent" />
      </div>
    </section>
  );
}
