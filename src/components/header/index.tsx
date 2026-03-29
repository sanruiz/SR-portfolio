"use client";

import { Button } from "@/components/ui/button";
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
    <Link href={href} className="hover:text-indigo-400" onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-indigo-400"
        >
          Santiago Ramirez
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <MenuLink href="/" onClick={closeMobileMenu}>
            Home
          </MenuLink>
          <MenuLink href="/#about" onClick={closeMobileMenu}>
            About Me
          </MenuLink>
          <MenuLink href="/#portfolio" onClick={closeMobileMenu}>
            Portfolio
          </MenuLink>
          <MenuLink href="/#skills" onClick={closeMobileMenu}>
            Skills
          </MenuLink>
          <MenuLink href="/#contact" onClick={closeMobileMenu}>
            Contact
          </MenuLink>
        </nav>

        {/* CTA Button */}
        <Link
          href="#contact"
          className="hidden md:block bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
        >
          Hire Me
        </Link>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:text-indigo-400"
          onClick={toggleMobileMenu}
          aria-label={
            isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
          }
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav
          ref={menuRef}
          className="md:hidden flex flex-col items-center space-y-4 p-4 bg-gray-800 border-t fixed inset-x-0 top-[60px] z-40"
        >
          <MenuLink href="/" onClick={closeMobileMenu}>
            Home
          </MenuLink>
          <MenuLink href="/#about" onClick={closeMobileMenu}>
            About Me
          </MenuLink>
          <MenuLink href="/#portfolio" onClick={closeMobileMenu}>
            Portfolio
          </MenuLink>
          <MenuLink href="/#skills" onClick={closeMobileMenu}>
            Skills
          </MenuLink>
          <MenuLink href="/#contact" onClick={closeMobileMenu}>
            Contact
          </MenuLink>
          <Button
            asChild
            className="w-full bg-indigo-500 text-white hover:bg-indigo-600 transition duration-300"
          >
            <Link href="#contact" onClick={closeMobileMenu}>
              Hire Me
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
