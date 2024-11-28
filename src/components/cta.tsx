export default function Cta() {
  return (
    <section
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white py-20 text-center bg"
      style={{
        backgroundSize: "200% 200%",
        animation: "gradient 6s ease infinite",
      }}
    >
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="text-4xl font-bold mb-4">
          Let’s Build Something Amazing Together!
        </h2>
        <p className="text-lg mb-8">
          Whether you have a project in mind or just want to connect, feel free
          to reach out.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex justify-center space-x-4">
          <a
            href="#contact"
            className="bg-white text-indigo-500 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Get in Touch
          </a>
          <a
            href="#portfolio"
            className="bg-transparent border border-white px-6 py-3 rounded-lg shadow-md hover:bg-white hover:text-indigo-500 hover:scale-105 hover:shadow-lg transition duration-300"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
}
