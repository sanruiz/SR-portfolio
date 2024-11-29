export default function About() {
  return (
    <section className="bg-gray-100 text-gray-800 py-20" id="about">
      <div className="container mx-auto max-w-screen-xl px-4 gap-12 flex flex-col md:flex-row items-center md:items-start">
        {/* Left: Text */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <p className="text-lg">
            I am a senior web developer with over 10 years of experience
            building modern and scalable digital solutions. My goal is to
            transform ideas into intuitive, fast, and visually appealing web
            applications.
          </p>
          <p className="text-lg">
            While I specialize in tools like{" "}
            <span className="text-indigo-500 font-semibold">Next.js</span>,{" "}
            <span className="text-indigo-500 font-semibold">TypeScript</span>,
            and <span className="text-indigo-500 font-semibold">GraphQL</span>,
            I also bring extensive experience with{" "}
            <span className="text-indigo-500 font-semibold">WordPress</span>.
            This allows me to offer solutions for clients who need highly
            customizable websites or content management systems.
          </p>
          <p className="text-lg">
            Whether you&apos;re looking for a cutting-edge web app or a robust
            WordPress site, I have the skills to deliver.
          </p>
        </div>

        {/* Right: Timeline or Image */}
        <div className="md:w-1/2 mt-10 md:mt-16 flex flex-col items-center">
          {/* Timeline */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full shrink-0">
                1
              </div>
              <p className="flex-1">
                Started my career as a frontend designer, focusing on dynamic,
                user-centered projects.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full shrink-0">
                2
              </div>
              <p className="flex-1">
                Built dozens of custom WordPress websites, integrating unique
                features tailored to client needs.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full shrink-0">
                3
              </div>
              <p className="flex-1">
                Specialized in modern technologies like React and Next.js to
                deliver advanced solutions.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full shrink-0">
                4
              </div>
              <p className="flex-1">
                Now leading projects that blend modern frameworks with CMS
                platforms to optimize performance and user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
