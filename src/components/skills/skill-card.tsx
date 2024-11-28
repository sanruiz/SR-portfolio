import Image from "next/image";

interface SkillProps {
  name: string;
  description?: string;
  iconUrl: string;
}

export default function SkillCard({ name, description, iconUrl }: SkillProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <Image
        src={iconUrl}
        alt={`${name} Icon`}
        className="w-16 h-16 mx-auto mb-4 transition duration-300 transform hover:rotate-12"
        width={64}
        height={64}
      />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      {description && (
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      )}
    </div>
  );
}
