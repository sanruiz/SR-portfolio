import { Linkedin, Github } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-14" id="footer">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded text-violet-600 dark:text-violet-400">
                &lt;SR /&gt;
              </span>
            </div>
            <h3 className="text-zinc-800 dark:text-zinc-200 font-semibold mb-2">
              Santiago Ramirez
            </h3>
            <p className="text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed">
              Senior Full-Stack Developer · Available for hire
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-zinc-600 dark:text-zinc-400 font-medium text-xs uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-zinc-600 dark:text-zinc-400 font-medium text-xs uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="mailto:sanruiz@gmail.com"
                  className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-sm transition-colors"
                >
                  sanruiz@gmail.com
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/sanruiz"
                  className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={13} />
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com/in/sanruiz"
                  className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={13} />
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-400 dark:text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Santiago Ramirez. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-600 text-sm">
            <span>Built with</span>
            <span className="text-zinc-500 dark:text-zinc-500 font-mono">Next.js</span>
            <span>&middot;</span>
            <span>Deployed on</span>
            <span className="text-zinc-500 dark:text-zinc-500 font-mono">Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
