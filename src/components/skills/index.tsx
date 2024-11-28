import SkillCard from "./skill-card";

const skills = [
  {
    id: 1,
    name: "Next.js",
    description: "A framework for building fast, SEO-friendly React apps.",
    iconUrl: "https://simpleicons.org/icons/nextdotjs.svg",
  },
  {
    id: 2,
    name: "React",
    description: "A JavaScript library for building user interfaces.",
    iconUrl: "https://simpleicons.org/icons/react.svg",
  },
  {
    id: 3,
    name: "TypeScript",
    description: "A typed superset of JavaScript for robust applications.",
    iconUrl: "https://simpleicons.org/icons/typescript.svg",
  },
  {
    id: 4,
    name: "WordPress",
    description: "A powerful CMS for building dynamic websites.",
    iconUrl: "https://simpleicons.org/icons/wordpress.svg",
  },
];

export default function Skills() {
  return (
    <section className="bg-gray-100 text-gray-800 py-20" id="skills">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Skills & Technologies</h2>
          <p className="text-lg text-gray-600 mt-4">
            Here are the tools and technologies I use to create modern,
            scalable, and user-friendly solutions.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              name={skill.name}
              description={skill.description}
              iconUrl={skill.iconUrl}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 italic">
            Always eager to learn and integrate new tools into my workflow.
          </p>
        </div>
      </div>
    </section>
  );
}
