import { Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto max-w-screen-xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h3 className="text-2xl font-bold text-white">Santiago Ramirez</h3>
          <p className="text-gray-400 mt-2">
            Senior Web Developer crafting modern, scalable web solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/#about" className="hover:text-indigo-400">
                About Me
              </Link>
            </li>
            <li>
              <Link href="/#portfolio" className="hover:text-indigo-400">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/#skills" className="hover:text-indigo-400">
                Skills
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-indigo-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href="mailto:your-email@example.com"
                className="hover:text-indigo-400"
              >
                sanruiz@gmail.com
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/sanruiz"
                className="hover:text-indigo-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github /> GitHub
              </Link>
            </li>
            <li>
              <Link
                href="https://linkedin.com/in/sanruiz"
                className="hover:text-indigo-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin /> LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center border-t border-gray-700 pt-6">
        <p className="text-gray-500">
          &copy; 2024 Santiago Ramirez. All rights reserved.
        </p>
        <Link
          href="#"
          className="text-indigo-400 hover:text-indigo-500 block mt-2"
        >
          Back to Top ↑
        </Link>
      </div>
    </footer>
  );
}
