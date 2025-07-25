import { getProjectBySlug } from "@/lib/wpApi";
import Image from "next/image";
import Link from "next/link";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    return (
      <section className="bg-gray-100 text-gray-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Project Not Found</h1>
          <p className="text-lg mt-4">
            Sorry, the project you are looking for does not exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 text-gray-700 py-20">
      <div className="container mx-auto max-w-screen-lg px-4">
        {/* Project Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {project.title}
        </h1>

        {/* Featured Image */}
        {project.featuredImage?.node?.sourceUrl && (
          <Image
            src={project.featuredImage.node.sourceUrl}
            alt={project.title}
            className="w-4/5 object-cover mx-auto rounded-lg shadow-xl mb-8"
            width={800}
            height={400}
          />
        )}

        {/* Project Content */}
        <div
          className="text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />

        {/* Tags */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags?.nodes?.map((tag) => (
              <span
                key={tag.slug || tag.name}
                className="bg-indigo-100 text-indigo-600 text-sm font-medium px-3 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        <Link
          href="/"
          className="block mt-8 text-indigo-500 hover:text-indigo-700 text-lg font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
