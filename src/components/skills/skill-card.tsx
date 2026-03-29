import Image from "next/image";

interface SkillProps {
  name: string;
  description?: string;
  iconUrl: string;
}

export default function SkillCard({ name, description, iconUrl }: SkillProps) {
  return (
    <div className="group bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-violet-400/50 dark:hover:border-violet-500/40 rounded-xl p-6 transition-all duration-300">
      <div className="w-10 h-10 mb-5 transition-transform duration-300 group-hover:-translate-y-1">
        <Image
          src={iconUrl}
          alt={`${name} icon`}
          width={40}
          height={40}
          className="w-full h-full object-contain icon-filter"
        />
      </div>
      <h3 className="text-zinc-800 dark:text-zinc-100 font-semibold text-base">{name}</h3>
      {description && (
        <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-2 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
