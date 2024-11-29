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
    <div className="bg-slate-800 rounded-lg shadow-lg shadow-indigo-500/50 overflow-hidden">
      <a href={`/project/${projectUrl}`}>
        <Image
          src={imageUrl}
          alt={`${title} Thumbnail`}
          className="w-full h-48 object-cover"
          height={192}
          width={480}
        />
      </a>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {/* <p
          className="text-sm text-gray-400 mt-2"
          dangerouslySetInnerHTML={{ __html: excerpt || "" }}
        /> */}
        <div className="text-sm text-gray-200 mt-4 font-semibold">
          {technologies.join(", ")}
        </div>
        <a
          href={`/project/${projectUrl}`}
          rel="follow"
          className="text-indigo-400 hover:text-indigo-500 mt-4 block"
        >
          View Project →
        </a>
      </div>
    </div>
  );
}
