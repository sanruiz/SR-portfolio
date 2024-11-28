import ProjectCard from "./project-card";
import { getPostsWP } from "@/lib/wpApi";

export default async function Portfolio() {
  const posts = await getPostsWP();

  return (
    <section className="bg-gray-900 text-gray-300 py-20" id="portfolio">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Portfolio</h2>
          <p className="text-lg text-gray-400 mt-4">
            Here are some of the projects I’ve worked on, showcasing my skills
            in modern web development.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
