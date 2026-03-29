import SkillCard from "./skill-card";

const skills = [
  {
    id: 1,
    name: "Next.js",
    description: "My primary framework for SSR, SSG, and full-stack React apps — fast by default, SEO-ready out of the box.",
    iconUrl: "https://simpleicons.org/icons/nextdotjs.svg",
  },
  {
    id: 2,
    name: "React",
    description: "10+ years building component-driven UIs that are maintainable, accessible, and a pleasure to use.",
    iconUrl: "https://simpleicons.org/icons/react.svg",
  },
  {
    id: 3,
    name: "TypeScript",
    description: "I write TypeScript by default. Fewer bugs, better DX, and code that new team members can actually read.",
    iconUrl: "https://simpleicons.org/icons/typescript.svg",
  },
  {
    id: 4,
    name: "WordPress",
    description: "Custom themes, bespoke plugins, WooCommerce, and headless setups — I've done it all at scale.",
    iconUrl: "https://simpleicons.org/icons/wordpress.svg",
  },
];

export default function Skills() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-24" id="skills">
      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-violet-600 dark:text-violet-400 text-sm">03.</span>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Skills &amp; Technologies
          </h2>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <p className="text-zinc-500 dark:text-zinc-500 text-base mb-10 max-w-xl">
          My core stack — tools I use daily to ship reliable, performant
          applications in production.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              name={skill.name}
              description={skill.description}
              iconUrl={skill.iconUrl}
            />
          ))}
        </div>

        <p className="text-zinc-400 dark:text-zinc-600 font-mono text-sm mt-10">
          // always learning and integrating new tools
        </p>
      </div>
    </section>
  );
}
