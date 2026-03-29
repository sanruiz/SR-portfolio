const timeline = [
  {
    label: "UI/UX & Frontend",
    description:
      "Cut my teeth on pixel-perfect, interactive interfaces — learning early that great software always starts with the user.",
  },
  {
    label: "WordPress Expert",
    description:
      "Delivered 50+ custom WordPress sites with bespoke plugins, WooCommerce integrations, and headless setups for clients across industries.",
  },
  {
    label: "React & Next.js",
    description:
      "Moved fully into the React ecosystem, shipping SPAs, SSR applications, and GraphQL APIs for fast-growing product teams.",
  },
  {
    label: "Tech Lead & Architect",
    description:
      "Now architecting end-to-end systems — from database to deployment — combining modern frameworks, headless CMS, and CI/CD pipelines.",
  },
];

export default function About() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-900 py-24" id="about">
      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-violet-600 dark:text-violet-400 text-sm">01.</span>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">About Me</h2>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div className="space-y-5 text-zinc-600 dark:text-zinc-400 text-[1.05rem] leading-relaxed">
            <p>
              I&apos;m a senior full-stack developer with{" "}
              <span className="text-zinc-900 dark:text-zinc-200 font-medium">
                10+ years
              </span>{" "}
              of turning product ideas into live, production-ready applications. I&apos;ve
              worked with startups, agencies, and enterprise teams — and I know how to
              own a project from first commit to final deployment.
            </p>
            <p>
              My go-to stack is{" "}
              <span className="text-violet-600 dark:text-violet-400 font-medium">Next.js</span>,{" "}
              <span className="text-violet-600 dark:text-violet-400 font-medium">TypeScript</span>,
              and{" "}
              <span className="text-violet-600 dark:text-violet-400 font-medium">GraphQL</span>{" "}
              for modern web apps, paired with deep{" "}
              <span className="text-violet-600 dark:text-violet-400 font-medium">WordPress</span>{" "}
              expertise for headless and CMS-driven projects. I write clean, maintainable
              code — and I&apos;m equally comfortable navigating greenfield builds and
              legacy systems.
            </p>
            <p>
              If you need a developer who can own a project end-to-end and communicate
              clearly along the way — that&apos;s exactly what I do.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { value: "10+", label: "Years of experience" },
                { value: "50+", label: "Projects shipped" },
                { value: "100%", label: "Remote-friendly" },
                { value: "24h", label: "Avg. response time" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4"
                >
                  <p className="text-zinc-900 dark:text-white font-bold text-xl">{stat.value}</p>
                  <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex gap-6 items-start">
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 border-violet-500/60 bg-white dark:bg-zinc-900 flex items-center justify-center">
                    <span className="font-mono text-violet-600 dark:text-violet-400 text-[10px] font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <h3 className="text-zinc-800 dark:text-zinc-200 font-semibold mb-1">
                      {item.label}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
