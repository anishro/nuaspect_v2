/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, HelpCircle, Sun, Moon } from 'lucide-react';
import { PageView, NavItem } from './types';

// Import Views
import HomeView from './components/HomeView';
import KnowledgeHub from './components/KnowledgeHub';
import Academy from './components/Academy';
import Wavspectra from './components/Wavspectra';
import AboutTheTeam from './components/AboutTheTeam';
import Contact from './components/Contact';

// Import Global Ferris Wheel for background
import FerrisWheel from './components/FerrisWheel';
import Logo from './components/Logo';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('HELLO');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<PageView | null>(null);

  // Theme support
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme-preference');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Default to Dark mode as preferred by the user
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navItems: NavItem[] = [
    { id: 'HELLO', label: 'HELLO' },
    { id: 'KNOWLEDGE_HUB', label: 'KNOWLEDGE HUB' },
    { id: 'ACADEMY', label: 'THE ACADEMY' },
    { id: 'WAVSPECTRA', label: 'WAVSPECTRA' },
    { id: 'ABOUT_THE_TEAM', label: 'ABOUT THE TEAM' }
  ];

  const handleNavClick = (id: PageView) => {
    setCurrentView(id);
    setMobileMenuOpen(false);
    
    // Smoothly scroll to top when changing views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'HELLO':
        return <HomeView />;
      case 'KNOWLEDGE_HUB':
        return <KnowledgeHub />;
      case 'ACADEMY':
        return <Academy />;
      case 'WAVSPECTRA':
        return <Wavspectra />;
      case 'ABOUT_THE_TEAM':
        return <AboutTheTeam />;
      case 'CONTACT':
        return <Contact />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal relative flex flex-col font-sans selection:bg-brand-accent-coral/20 select-none transition-colors duration-300">
      
      {/* 1. SEAMLESS REVOLVING FERRIS WHEEL BACKGROUND */}
      {/* Positioned on the right side of the screen as seen in the video mockup */}
      <div className="fixed right-[-25%] sm:right-[-15%] md:right-[-10%] bottom-[-10%] w-[100vw] h-[100vw] max-w-[900px] max-h-[900px] pointer-events-none select-none z-0 overflow-hidden opacity-85 dark:opacity-100">
        <FerrisWheel />
      </div>

      {/* Decorative auxiliary background blur nodes */}
      <div className="fixed left-[-10%] top-[20%] w-[400px] h-[400px] rounded-full bg-brand-accent-sage/3 pointer-events-none select-none filter blur-3xl z-0" />
      <div className="fixed right-[30%] top-[-5%] w-[350px] h-[350px] rounded-full bg-brand-accent-coral/2 pointer-events-none select-none filter blur-3xl z-0" />

      {/* 2. GLASSMORPHIC TOP NAVBAR */}
      <header className="fixed top-6 left-4 right-4 md:left-8 md:right-8 z-50 flex justify-center">
        <nav 
          id="main-navbar"
          className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-4 rounded-full bg-white/40 dark:bg-black/30 backdrop-blur-md border border-brand-charcoal/10 dark:border-white/10 shadow-lg dark:shadow-2xl transition-all duration-300"
          style={{
            boxShadow: theme === 'dark' 
              ? '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)'
              : '0 8px 32px 0 rgba(46, 39, 34, 0.06), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4)'
          }}
        >
          {/* Logo Brand Trigger */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick('HELLO')}
            className="flex items-center gap-2.5 cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 relative flex items-center justify-center bg-brand-cream-light dark:bg-white/5 rounded-full p-1 border border-brand-charcoal/15 dark:border-white/10 shadow-xs group-hover:shadow-md transition-all">
              <Logo className="w-full h-full object-contain" />
            </div>
            <span className="font-serif text-xl font-medium tracking-tight text-brand-charcoal dark:text-white hover:text-brand-accent-coral transition-colors duration-300">
              NuAspect
            </span>
          </div>

          {/* Desktop Navigation Link Toggles */}
          <div className="hidden lg:flex items-center gap-1 bg-brand-charcoal/5 dark:bg-black/25 p-1 rounded-full border border-brand-charcoal/5 dark:border-white/5">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono font-bold tracking-widest transition-colors duration-300 cursor-pointer ${
                    isActive ? 'text-white' : 'text-brand-charcoal/60 dark:text-white/60 hover:text-brand-charcoal dark:hover:text-white'
                  }`}
                >
                  {/* Sliding Background Bullet Capsule on active and hovered tabs */}
                  {(isActive || hoveredTab === item.id) && (
                    <motion.span
                      layoutId="nav-capsule"
                      className={`absolute inset-0 rounded-full z-[-1] ${
                        isActive 
                          ? 'bg-brand-accent-coral shadow-md' 
                          : 'bg-brand-charcoal/5 dark:bg-white/5 backdrop-blur-xs'
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls Container */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-brand-charcoal/10 dark:border-white/10 bg-brand-charcoal/5 dark:bg-white/5 text-brand-charcoal dark:text-white hover:bg-brand-charcoal/10 dark:hover:bg-white/10 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center shadow-xs"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-brand-gold" /> : <Moon className="w-4 h-4 text-brand-accent-coral" />}
            </button>

            {/* Desktop CONTACT Button Trigger */}
            <div className="hidden lg:block">
              <button
                id="nav-btn-contact"
                onClick={() => handleNavClick('CONTACT')}
                className={`px-6 py-2 rounded-full text-xs font-mono font-bold tracking-widest border transition-all duration-300 shadow-xs cursor-pointer flex items-center gap-1.5 ${
                  currentView === 'CONTACT'
                    ? 'bg-brand-charcoal text-brand-cream border-brand-charcoal dark:bg-white dark:border-white dark:text-black font-extrabold hover:bg-brand-accent-coral hover:border-brand-accent-coral dark:hover:bg-brand-accent-coral dark:hover:border-brand-accent-coral dark:hover:text-white hover:text-white'
                    : 'bg-brand-accent-coral border-brand-accent-coral text-white hover:bg-brand-charcoal hover:border-brand-charcoal dark:hover:bg-white dark:hover:border-white dark:hover:text-black shadow-brand-accent-coral/15 hover:shadow-white/25'
                }`}
              >
                <span>CONTACT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button Trigger */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-brand-charcoal/5 dark:hover:bg-white/5 text-brand-charcoal dark:text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* 3. MOBILE MENU OVERLAY (Glassmorphic Slide-down) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            className="fixed top-24 left-4 right-4 z-40 lg:hidden p-6 rounded-3xl bg-brand-cream-light/95 dark:bg-[#0d0d15]/95 backdrop-blur-xl border border-brand-charcoal/10 dark:border-white/10 shadow-xl flex flex-col gap-3"
            style={{
              boxShadow: theme === 'dark' ? '0 20px 40px rgba(0,0,0,0.5)' : '0 20px 40px rgba(46,39,34,0.1)'
            }}
          >
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-5 py-3 rounded-2xl text-xs font-mono font-semibold tracking-widest transition-all ${
                    isActive 
                      ? 'bg-brand-accent-coral/10 text-brand-accent-coral font-bold border-l-4 border-brand-accent-coral'
                      : 'text-brand-charcoal/70 dark:text-white/70 hover:bg-brand-charcoal/5 dark:hover:bg-white/5 hover:text-brand-charcoal dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="h-[1px] bg-brand-charcoal/10 dark:bg-white/5 my-2" />
            <button
              id="mobile-nav-contact"
              onClick={() => handleNavClick('CONTACT')}
              className={`w-full text-center py-3.5 rounded-2xl text-xs font-mono font-bold tracking-widest border transition-all ${
                currentView === 'CONTACT'
                  ? 'bg-brand-charcoal border-brand-charcoal text-brand-cream dark:bg-white dark:border-white dark:text-black'
                  : 'bg-brand-accent-coral border-brand-accent-coral text-white hover:bg-white'
              }`}
            >
              CONTACT US
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MAIN BODY CONTAINER */}
      <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto pt-4 flex flex-col justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex-1"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
