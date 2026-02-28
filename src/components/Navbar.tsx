import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, Briefcase, Sparkles, User, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { setStep } = useApp();

  const navItems = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/career', label: 'Khám phá nghề', icon: Briefcase },
    { path: '/entertainment', label: 'Góc giải trí', icon: Sparkles },
    { path: '/profile', label: 'Hồ sơ', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link 
              to="/" 
              onClick={() => setStep(0)}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-orange-700 transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-stone-900 tracking-tight">Career<span className="text-orange-600">Coach</span></span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => item.path === '/' && setStep(0)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive(item.path) 
                      ? 'text-orange-600' 
                      : 'text-stone-600 hover:text-orange-600'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-stone-200 shadow-lg md:hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-16" />
    </>
  );
};
