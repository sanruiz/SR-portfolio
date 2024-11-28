import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-20">
      <div className="container mx-auto max-w-screen-xl px-4 flex flex-col-reverse md:flex-row items-center">
        {/* Left Column */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Hi, I&apos;m{" "}
            <span className="text-indigo-400">Santiago Ramirez</span> <br />{" "}
            Senior Web Developer
          </h1>

          <p className="text-lg md:text-xl text-gray-300">
            Specializing in modern web technologies like Next.js and wpGraphQL
            to build scalable and user-friendly solutions.
          </p>

          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="#portfolio"
              className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="border border-indigo-500 text-indigo-500 px-6 py-3 rounded-lg shadow-md hover:bg-indigo-500 hover:text-white transition duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/images/SantiagoR-web.png"
            alt="Developer Graphic"
            width={400}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  );
}
