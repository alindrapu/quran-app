import { useState } from "react";
import { Menu, X, Home, Book, BookOpen } from "lucide-react";
import { Button } from "../ui/button";

const menuItems = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/quran", label: "Al-Quran", icon: Book },
  { href: "/hadith", label: "Hadith", icon: BookOpen },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md hover:bg-accent transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
            role="button"
          />
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-border z-50 shadow-lg">
            <nav className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {menuItems.map(({ href, label, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-foreground hover:bg-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
