"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type MenuLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function MenuLink({ href, children, onClick }: MenuLinkProps) {
  return (
    <Link
      href={href}
      className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-sm transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white/80 dark:bg-[#111214]/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/60 fixed w-full z-50">
      <div className="container mx-auto max-w-screen-xl px-4 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
          <span className="font-mono text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-2 py-1 rounded text-violet-600 dark:text-violet-400 tracking-widest">
            &lt;SR /&gt;
          </span>
          <span className="font-semibold text-zinc-900 dark:text-white text-sm hidden sm:block">
            Santiago Ramirez
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <MenuLink href="/" onClick={closeMobileMenu}>Home</MenuLink>
          <MenuLink href="/#about" onClick={closeMobileMenu}>About</MenuLink>
          <MenuLink href="/#portfolio" onClick={closeMobileMenu}>Portfolio</MenuLink>
          <MenuLink href="/#skills" onClick={closeMobileMenu}>Skills</MenuLink>
          <MenuLink href="/#contact" onClick={closeMobileMenu}>Contact</MenuLink>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="#contact"
            className="hidden md:block px-4 py-2 border border-zinc-300 dark:border-zinc-700 hover:border-violet-400 dark:hover:border-violet-500/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-lg text-sm transition-all duration-200"
          >
            Hire Me
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav
          ref={menuRef}
          className="md:hidden flex flex-col items-center gap-5 p-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 fixed inset-x-0 top-[57px] z-40"
        >
          <MenuLink href="/" onClick={closeMobileMenu}>Home</MenuLink>
          <MenuLink href="/#about" onClick={closeMobileMenu}>About</MenuLink>
          <MenuLink href="/#portfolio" onClick={closeMobileMenu}>Portfolio</MenuLink>
          <MenuLink href="/#skills" onClick={closeMobileMenu}>Skills</MenuLink>
          <MenuLink href="/#contact" onClick={closeMobileMenu}>Contact</MenuLink>
          <Link
            href="#contact"
            onClick={closeMobileMenu}
            className="w-full text-center px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Hire Me
          </Link>
        </nav>
      )}
    </header>
  );
}
