import ProjectCard from "./project-card";
import { getPostsWP } from "@/lib/wpApi";

export default async function Portfolio() {
  const posts = await getPostsWP();

  return (
    <section className="bg-white dark:bg-zinc-900 py-24" id="portfolio">
      <div className="container mx-auto max-w-screen-xl px-4">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-violet-600 dark:text-violet-400 text-sm">02.</span>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Portfolio</h2>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <p className="text-zinc-500 dark:text-zinc-500 text-base mb-10 max-w-xl">
          Production work delivered for real clients — web apps, headless CMS
          builds, and custom WordPress solutions that are live and running today.
        </p>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <ProjectCard
              key={post.slug}
              title={post.title}
              description={post.content}
              technologies={post.tags.nodes.map((tag) => tag.name)}
              imageUrl={post.featuredImage.node.sourceUrl}
              projectUrl={post.slug}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
