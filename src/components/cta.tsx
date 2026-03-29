export default function Cta() {
  return (
    <section className="relative bg-zinc-100 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800 py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(124,58,237,0.06),transparent)] dark:bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(124,58,237,0.12),transparent)]" />
      <div className="absolute inset-0 bg-dot-grid opacity-60" />

      <div className="relative container mx-auto max-w-screen-xl px-4 text-center">
        <p className="font-mono text-violet-600/80 dark:text-violet-400/80 text-sm mb-5 tracking-wide">
          // open to new opportunities
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight tracking-tight">
          Ready to Ship Your{" "}
          <span className="gradient-text">Next Project?</span>
        </h2>

        <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          I&apos;m currently available for freelance work and open to full-time
          roles. Whether you need a product built from scratch, a performance
          overhaul, or an extra set of hands on a growing team — let&apos;s talk.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="#contact"
            className="px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Start a Project
          </a>
          <a
            href="#portfolio"
            className="px-8 py-3.5 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-lg font-medium transition-all duration-200"
          >
            View Case Studies
          </a>
        </div>
      </div>
    </section>
  );
}
