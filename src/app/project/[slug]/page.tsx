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
      <div className="min-h-screen bg-white dark:bg-[#111214] flex items-center justify-center">
        <div className="text-center px-4">
          <p className="font-mono text-violet-600 dark:text-violet-400 text-sm mb-4">
            {"// 404"}
          </p>
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Sorry, the project you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#111214]">
      {/* Hero area */}
      <div className="relative bg-zinc-50 dark:bg-[#111214] border-b border-zinc-200 dark:border-zinc-800 pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(124,58,237,0.06),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(124,58,237,0.12),transparent)]" />
        <div className="absolute inset-0 bg-dot-grid opacity-40" />

        <div className="relative container mx-auto max-w-screen-lg px-4">
          {/* Breadcrumb */}
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-sm font-mono transition-colors mb-8 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            Back to Portfolio
          </Link>

          {/* Label */}
          <p className="font-mono text-violet-600/80 dark:text-violet-400/80 text-sm mb-3 tracking-wide">
            {"// project"}
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight tracking-tight mb-6 max-w-3xl">
            {project.title}
          </h1>

          {/* Tech tags */}
          {project.tags?.nodes?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.nodes.map((tag) => (
                <span
                  key={tag.slug || tag.name}
                  className="px-2.5 py-1 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/80 font-mono"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto max-w-screen-lg px-4 py-16">
        {/* Featured Image */}
        {project.featuredImage?.node?.sourceUrl && (
          <div className="mb-14 rounded-xl overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-800">
            <Image
              src={project.featuredImage.node.sourceUrl}
              alt={project.title}
              className="w-full object-cover"
              width={960}
              height={480}
              priority
            />
          </div>
        )}

        {/* Project Content */}
        <div
          className="project-content max-w-2xl"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-sm font-mono transition-colors group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            All Projects
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Work with me
          </Link>
        </div>
      </div>
    </div>
  );
}
