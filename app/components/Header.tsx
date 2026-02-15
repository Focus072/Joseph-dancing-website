'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-700 bg-black sticky top-0 z-50">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Left: Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white bg-white flex items-center justify-center">
                <span className="text-black font-bold text-lg md:text-xl">J</span>
              </div>
            </a>
          </div>

          {/* Right: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className={`boiler-room-font text-sm uppercase transition-colors duration-200 relative ${
                pathname === '/' 
                  ? 'text-white'
                  : 'text-white hover:text-gray-300'
              }`}
            >
              Home
              {pathname === '/' && (
                <span className="absolute bottom-0 left-0 w-full h-px bg-white"></span>
              )}
            </a>
            <a 
              href="/highlights" 
              className={`boiler-room-font text-sm uppercase transition-colors duration-200 relative ${
                pathname === '/highlights' 
                  ? 'text-white'
                  : 'text-white hover:text-gray-300'
              }`}
            >
              Videos
              {pathname === '/highlights' && (
                <span className="absolute bottom-0 left-0 w-full h-px bg-white"></span>
              )}
            </a>
            <a 
              href="/pictures" 
              className={`boiler-room-font text-sm uppercase transition-colors duration-200 relative ${
                pathname === '/pictures' 
                  ? 'text-white'
                  : 'text-white hover:text-gray-300'
              }`}
            >
              Pictures
              {pathname === '/pictures' && (
                <span className="absolute bottom-0 left-0 w-full h-px bg-white"></span>
              )}
            </a>
            <a 
              href="/social" 
              className={`boiler-room-font text-sm uppercase transition-colors duration-200 relative ${
                pathname === '/social' 
                  ? 'text-white'
                  : 'text-white hover:text-gray-300'
              }`}
            >
              Social Media
              {pathname === '/social' && (
                <span className="absolute bottom-0 left-0 w-full h-px bg-white"></span>
              )}
            </a>
          </div>

          {/* Right: Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 boiler-room-font text-sm uppercase transition-colors ${
                  pathname === '/' 
                    ? 'text-white'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                Home
              </a>
              <a 
                href="/highlights" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 boiler-room-font text-sm uppercase transition-colors ${
                  pathname === '/highlights' 
                    ? 'text-white'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                Videos
              </a>
              <a 
                href="/pictures" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 boiler-room-font text-sm uppercase transition-colors ${
                  pathname === '/pictures' 
                    ? 'text-white'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                Pictures
              </a>
              <a 
                href="/social" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 boiler-room-font text-sm uppercase transition-colors ${
                  pathname === '/social' 
                    ? 'text-white'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                Social Media
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
