import Image from "next/image";

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  excerpt: string;
}

export default function ProjectCard({
  title,
  technologies,
  imageUrl,
  projectUrl,
}: ProjectProps) {
  return (
    <div className="group bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl overflow-hidden transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden">
        <a href={`/project/${projectUrl}`}>
          <Image
            src={imageUrl}
            alt={`${title} thumbnail`}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            height={192}
            width={480}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <a href={`/project/${projectUrl}`}>
          <h3 className="text-zinc-800 dark:text-zinc-100 font-semibold text-lg mb-3 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            {title}
          </h3>
        </a>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/80"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <a
            href={`/project/${projectUrl}`}
            rel="follow"
            className="inline-flex items-center gap-1.5 text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 text-sm font-medium transition-colors"
          >
            View Project
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
