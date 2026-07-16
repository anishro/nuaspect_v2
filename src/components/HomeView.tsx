/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { HelpCircle, Sparkles, Send, Heart, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import AssessmentQuiz from './AssessmentQuiz';
import Logo from './Logo';
import Doodle from './Doodle';
import { googleSources } from '../config/googleSources';

export default function HomeView() {
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [doodleInquiryIndex, setDoodleInquiryIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const { actionUrl: newsletterActionUrl, emailEntryId: newsletterEmailEntryId } = googleSources.newsletter;
  const newsletterConfigured = !!(newsletterActionUrl && newsletterEmailEntryId);
  const expectingNewsletterResponseRef = useRef(false);

  // Proximity/Hover 3D tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid inertia
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 180, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 180, mass: 0.5 });

  // Map mouse positions to premium 3D rotations (tilt)
  const rotateX = useTransform(smoothY, [-150, 150], [15, -15]);
  const rotateY = useTransform(smoothX, [-150, 150], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Doodle Inquiry phrases (changes playfully as user drags/clicks the doodle)
  const doodlePhrases = [
    {
      bubble: "Have an uncomfortable question hugging you?",
      tagline: "WE MIND EVERYTHING. WE DISCUSS EVERYTHING."
    },
    {
      bubble: "Do you explore yourself out of curiosity, or out of fear?",
      tagline: "REFLECT ON THE SOURCE."
    },
    {
      bubble: "What silent agreement with yourself are you waiting to break?",
      tagline: "EVERY SYSTEM CAN BE RECONFIGURED."
    },
    {
      bubble: "Are you keeping busy to build something, or to escape?",
      tagline: "PAUSE TO LISTEN."
    }
  ];

  const cycleDoodlePhrase = () => {
    setDoodleInquiryIndex((prev) => (prev + 1) % doodlePhrases.length);
  };

  // Questions that linger content
  const lingeringQuestions = [
    "When did you last change your mind about something you thought was certain?",
    "What are you avoiding by staying busy?",
    "Is the version of you that others see – accurate?",
    "Are your patterns protecting you – or just familiar?",
    "What truths are you not quite ready to act on yet?",
    "What would you do differently if no one was watching?",
    "Do you rest, or do you simply stop working?",
    "Who were you before the world had opinions about you?",
    "Is the discomfort you feel growing pains or wearing thin?"
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    if (!newsletterConfigured) {
      // No Form wired up yet — fall back to a cosmetic-only confirmation so the
      // pill still feels alive during local development / before setup.
      e.preventDefault();
      if (contactEmail.trim()) {
        setContactSubmitted(true);
        setTimeout(() => {
          setContactSubmitted(false);
          setContactEmail('');
        }, 5000);
      }
      return;
    }
    // Let the form submit natively (POSTing into the Google Form via the hidden
    // iframe below); just flag that we're expecting that iframe to load next.
    expectingNewsletterResponseRef.current = true;
  };

  const handleNewsletterIframeLoad = () => {
    if (!expectingNewsletterResponseRef.current) return;
    expectingNewsletterResponseRef.current = false;
    setContactSubmitted(true);
    setContactEmail('');
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  return (
    <div className="relative w-full z-10 px-4 md:px-8 space-y-28 md:space-y-40 pb-24">
      
      {/* 1. HERO INTRO SECTION */}
      <section id="hero" className="min-h-[90vh] flex flex-col items-center justify-center pt-24 text-center relative">
        <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
          
          {/* Logo container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-28 h-28 relative flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] bg-brand-cream-light/95 dark:bg-black/40 backdrop-blur-md rounded-full p-2.5 border border-brand-charcoal/15 dark:border-white/10 shadow-lg"
          >
            <Logo
              className="w-full h-full object-contain select-none transition-transform hover:scale-105 duration-300 text-brand-accent-coral"
            />
          </motion.div>

          {/* Title and Subtitle */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontFamily: 'Times New Roman' }}
              className="text-6xl md:text-8xl tracking-tight text-brand-charcoal font-light"
            >
              Nu<span style={{ color: '#cf7e65' }}>Aspect</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-serif italic text-lg md:text-2xl text-brand-accent-sage max-w-2xl mx-auto leading-relaxed"
            >
              A space where introspection meets intelligence.<br />
              <span className="text-brand-accent-coral/95 font-light">Where reflection becomes direction.</span>
            </motion.p>
          </div>

          {/* Explore Anchor point */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex flex-col items-center gap-1.5 pt-8 cursor-pointer group"
            onClick={() => {
              document.getElementById('who-we-are')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-xs font-mono tracking-[0.2em] text-brand-charcoal/50 group-hover:text-brand-charcoal transition-colors">EXPLORE</span>
            <div className="relative flex justify-center items-center w-5 h-5">
              <span className="absolute w-2.5 h-2.5 bg-brand-accent-coral rounded-full animate-ping opacity-60" />
              <span className="w-1.5 h-1.5 bg-brand-accent-coral rounded-full" />
            </div>
            {/* Fine dashed vector line trailing downwards */}
            <div className="h-16 w-[1px] border-l border-dashed border-brand-charcoal/30 group-hover:border-brand-accent-coral/60 transition-colors" />
          </motion.div>
        </div>
      </section>

      {/* 2. WHO WE ARE & PSYCHOLOGICAL ECOSYSTEM */}
      <section id="who-we-are" className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-12">
        
        {/* Subtitle tag */}
        <div className="lg:col-span-3 flex flex-col space-y-2 border-l border-brand-accent-coral pl-4">
          <span className="font-mono text-xs tracking-widest text-brand-accent-coral font-bold">// WHO WE ARE</span>
          <span className="font-serif text-2xl italic text-brand-accent-sage">The foundation</span>
        </div>

        {/* Content body copy */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight tracking-tight text-brand-charcoal">
            A different kind of <br />
            <span className="font-medium">psychological ecosystem</span>
          </h2>
          
          <p className="font-serif text-lg text-brand-charcoal/80 leading-relaxed font-light">
            NuAspect exists at the intersection of <span className="font-semibold text-brand-accent-coral border-b border-brand-accent-coral/20">clinical rigour</span> and <span className="font-semibold text-brand-accent-sage border-b border-brand-accent-sage/20">human curiosity</span>. 
            We believe that understanding yourself – deeply, honestly, without shortcuts – is the most consequential work a person can do. Our platform is built for those who are willing to sit with uncomfortable questions long enough to hear their own answers.
          </p>

          <p className="text-sm text-brand-charcoal/70 leading-relaxed font-sans mt-4">
            We are practitioners, researchers, and builders. We think in systems. We work with individuals who have earned their clinical understanding through direct lived experience, not just credentials.
          </p>
        </div>

        {/* Dynamic Side stats display */}
        <div className="lg:col-span-3 space-y-8 pt-4 lg:pt-0">
          <div className="bg-brand-charcoal/5 dark:bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-brand-charcoal/15 dark:border-white/10 shadow-lg space-y-1">
            <span className="font-serif text-4xl font-light text-brand-accent-coral">08</span>
            <div 
              style={{ color: '#727349' }}
              className="text-xs font-mono font-bold tracking-wider uppercase"
            >
              Introspective Pathways
            </div>
            <p 
              style={{ color: '#727349' }}
              className="text-xs pt-1 font-medium"
            >
              Designed by systems therapists
            </p>
          </div>

          <div 
            className="bg-brand-charcoal/5 dark:bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-brand-charcoal/15 dark:border-[#e79c71]/20 shadow-lg space-y-1 text-brand-accent-coral dark:text-[#e79c71]"
          >
            <span className="font-serif text-4xl font-light">∞</span>
            <div className="text-xs font-mono font-bold tracking-wider uppercase">Questions Worth Retrying</div>
            <p className="text-xs pt-1 font-medium opacity-90">Introspective loops updated daily</p>
          </div>
        </div>
      </section>

      {/* 3. QUESTIONS THAT LINGER (Interactive network grid) */}
      <section id="questions-mesh" className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="font-mono text-xs tracking-[0.25em] text-brand-accent-coral uppercase font-bold">Inquiries & Contemplations</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-brand-charcoal">
            Questions That Linger
          </h2>
          <p className="text-sm text-brand-charcoal/60 max-w-md mx-auto">
            Hover or touch cards to witness silent reflections.
          </p>
        </div>

        {/* Grid layout of original reflection cards */}
        <div className="relative w-full z-10">
          
          {/* Subtle absolute vector connection pattern background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dot-grid" width="40" height="40" patternUnits="userSpaceOnUse" x="0" y="0">
                  <circle cx="2" cy="2" r="1" fill="currentColor" className="text-brand-charcoal dark:text-white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-grid)" />
            </svg>
          </div>

          {/* Desktop view: Grid layout without technical node metrics tags */}
          <div className="relative z-10 hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {lingeringQuestions.map((q, idx) => {
              const hoverDotClass = idx < 5 ? "group-hover:bg-brand-accent-coral" : "group-hover:bg-brand-accent-sage";
              return (
                <motion.div
                  key={`question-${idx}`}
                  id={`lingering-card-${idx}`}
                  animate={{
                    scale: [1, 1.02, 1],
                    borderColor: [
                      "rgba(207, 126, 101, 0.15)",
                      "rgba(207, 126, 101, 0.75)",
                      "rgba(207, 126, 101, 0.15)"
                    ],
                    boxShadow: [
                      "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                      "0 15px 30px -4px rgba(207, 126, 101, 0.25), 0 6px 15px -2px rgba(207, 126, 101, 0.15)",
                      "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.5
                  }}
                  whileHover={{ y: -6, scale: 1.05, transition: { duration: 0.2 } }}
                  className="bg-white/40 dark:bg-black/30 hover:bg-white dark:hover:bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-brand-charcoal/10 dark:border-white/10 shadow-md hover:shadow-brand-accent-coral/25 hover:border-brand-accent-coral transition-all duration-300 flex flex-col justify-between group min-h-[170px] cursor-help"
                >
                  <p className="font-serif text-sm sm:text-base text-brand-charcoal dark:text-white/90 leading-relaxed font-semibold my-auto">
                    "{q}"
                  </p>

                  <div className="border-t border-brand-charcoal/10 dark:border-white/5 mt-4 pt-3 flex justify-between items-center text-[9px] font-mono tracking-widest text-brand-charcoal/40 dark:text-white/40">
                    <span>INTELLECTUAL FRAME</span>
                    <span className={`w-1.5 h-1.5 rounded-full bg-brand-charcoal/20 dark:bg-white/20 duration-300 transition-colors ${hoverDotClass}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile view: Carousel layout */}
          <div className="block md:hidden relative w-full max-w-sm mx-auto z-10">
            <div className="relative overflow-visible px-4 py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`carousel-card-${carouselIndex}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-white/40 dark:bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-brand-charcoal/10 dark:border-white/10 shadow-md min-h-[170px] flex flex-col justify-between group"
                >
                  <p className="font-serif text-base text-brand-charcoal dark:text-white/90 leading-relaxed font-semibold my-auto">
                    "{lingeringQuestions[carouselIndex]}"
                  </p>

                  <div className="border-t border-brand-charcoal/10 dark:border-white/5 mt-4 pt-3 flex justify-between items-center text-[9px] font-mono tracking-widest text-brand-charcoal/40 dark:text-white/40">
                    <span>INTELLECTUAL FRAME</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent-coral" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls below */}
              <div className="flex justify-between items-center mt-6 px-1">
                <button
                  type="button"
                  onClick={() => setCarouselIndex((prev) => (prev - 1 + lingeringQuestions.length) % lingeringQuestions.length)}
                  className="p-2 rounded-full bg-[#a75454] text-white hover:bg-[#a75454]/90 transition-colors shadow-sm"
                  aria-label="Previous question"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Dots indicators */}
                <div className="flex gap-1.5">
                  {lingeringQuestions.map((_, i) => (
                    <button
                      key={`dot-${i}`}
                      type="button"
                      onClick={() => setCarouselIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === carouselIndex ? 'w-4 bg-brand-accent-coral' : 'bg-brand-charcoal/20 dark:bg-white/20'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCarouselIndex((prev) => (prev + 1) % lingeringQuestions.length)}
                  className="p-2 rounded-full bg-[#a75454] text-white hover:bg-[#a75454]/90 transition-colors shadow-sm"
                  aria-label="Next question"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTELLECTUAL ASSESSMENT SCREEN */}
      <section id="assessment-block" className="max-w-5xl mx-auto scroll-mt-24">
        {!assessmentStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-8 md:p-16 rounded-3xl bg-brand-cream-light/65 dark:bg-[#0d0d15]/85 backdrop-blur-xl border border-brand-charcoal/15 dark:border-white/10 shadow-xl dark:shadow-2xl shadow-black/5 space-y-8 flex flex-col items-center relative overflow-hidden"
          >
            {/* Soft backdrop blur accent */}
            <div className="absolute w-[400px] h-[400px] bg-brand-accent-coral/5 rounded-full top-[-150px] left-[-150px] filter blur-3xl pointer-events-none" />

            {/* Logo positioned directly above the heading */}
            <div className="w-[142px] h-[142px] relative flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] bg-brand-cream-light/95 dark:bg-black/40 backdrop-blur-md rounded-full p-2 border border-brand-charcoal/10 dark:border-white/5 shadow-md">
              <Logo className="w-[120px] h-[120px] object-contain select-none" />
            </div>

            <div className="space-y-4 max-w-2xl">
              <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal dark:text-white leading-tight">
                Intellectual Assessment
              </h2>
            </div>

            <div className="font-mono text-xs text-brand-charcoal/75 dark:text-white/60 flex gap-4 uppercase tracking-widest border-t border-brand-charcoal/15 dark:border-white/10 pt-4 w-full justify-center">
              <span>⏱️ ~3 minutes</span>
              <span>•</span>
              <span>📋 10 questions</span>
            </div>

            <button
              id="assessment-begin-btn"
              onClick={() => setAssessmentStarted(true)}
              className="px-8 py-4 bg-brand-charcoal text-brand-cream dark:bg-white dark:text-black hover:bg-brand-accent-coral hover:text-white rounded-full text-sm font-sans tracking-widest font-bold uppercase transition-all duration-300 shadow-lg shadow-black/10 dark:shadow-black/20 hover:shadow-brand-accent-coral/20 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span>Begin Assessment</span>
              <span>→</span>
            </button>
          </motion.div>
        ) : (
          <AssessmentQuiz />
        )}
      </section>

      {/* 5. TACTILE DOODLE PLAYGROUND */}
      <section id="doodle-playground" className="max-w-md mx-auto p-8 relative overflow-hidden flex flex-col items-center justify-center">
        
        {/* Subtle grid base in playground */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        {/* Tactile drag bounding box */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-[300px] relative overflow-hidden flex flex-col items-center justify-center pt-6"
          style={{ perspective: "1000px" }}
        >

          {/* Connected Floating Speech Bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={doodleInquiryIndex}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 left-4 right-4 z-30 bg-brand-cream-light/95 dark:bg-[#12121d]/95 backdrop-blur-md border border-brand-charcoal/10 dark:border-white/10 py-3 px-4 rounded-2xl shadow-xl text-center flex flex-col gap-1 cursor-pointer"
              onClick={cycleDoodlePhrase}
              style={{
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
              }}
            >
              {/* Little quote bubble tip */}
              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-cream-light dark:bg-[#12121d] border-r border-b border-brand-charcoal/10 dark:border-white/10 rotate-45" />
              
              <span className="font-serif italic text-xs md:text-sm text-brand-charcoal dark:text-white font-semibold leading-relaxed">
                "{doodlePhrases[doodleInquiryIndex].bubble}"
              </span>
              <span className="text-[8px] font-mono tracking-wider text-brand-accent-coral font-bold uppercase">
                {doodlePhrases[doodleInquiryIndex].tagline}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Motion-Reactive Doodle Container */}
          <motion.div
            onClick={cycleDoodlePhrase}
            className="w-40 h-40 absolute bottom-4 cursor-pointer select-none z-10 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
          >
            {/* Reactive tilt wrapper */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              whileHover={{
                scale: 1.1,
                filter: "brightness(1.05) drop-shadow(0 12px 24px rgba(0,0,0,0.2))",
                transition: { duration: 0.3 }
              }}
              className="w-full h-full flex items-center justify-center transition-all duration-300"
            >
              {/* Doodle Graphic - person with companion dog */}
              <Doodle
                className="w-full h-full object-contain select-none pointer-events-none"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. WRITE TO NUASPECT EMAIL PILL */}
      <section id="write-portal" className="max-w-lg mx-auto text-center space-y-6">
        <div className="space-y-2">
          <p 
            style={{ color: '#cf7e65' }}
            className="font-serif italic text-base font-semibold"
          >
            Intrigued by our clinical ecosystem?
          </p>
          <span 
            style={{ color: '#cf7e65' }}
            className="font-mono text-xs tracking-widest uppercase font-medium"
          >
            Stay Synchronized
          </span>
        </div>

        <form
          onSubmit={handleContactSubmit}
          action={newsletterConfigured ? newsletterActionUrl : undefined}
          method={newsletterConfigured ? 'POST' : undefined}
          target={newsletterConfigured ? 'newsletter-form-target' : undefined}
          className="flex p-1 bg-brand-cream-light dark:bg-white/5 backdrop-blur-md rounded-full border border-brand-charcoal/25 dark:border-white/10 w-full shadow-lg focus-within:border-brand-accent-coral transition-colors"
        >
          <input
            id="newsletter-email"
            type="email"
            name={newsletterConfigured ? newsletterEmailEntryId : undefined}
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="Your email address"
            style={{ color: '#cf7e65' }}
            className="flex-1 bg-transparent px-5 py-3 text-sm focus:outline-hidden font-sans placeholder:text-[#c9bb9f] focus:outline-none"
            required
            disabled={contactSubmitted}
          />
          <button
            id="newsletter-submit-btn"
            type="submit"
            disabled={contactSubmitted}
            className={`px-5 py-3 rounded-full font-mono text-xs tracking-wider transition-all shrink-0 uppercase font-bold flex items-center gap-1.5 cursor-pointer ${
              contactSubmitted
                ? 'bg-brand-accent-sage text-white'
                : 'bg-brand-charcoal text-brand-cream dark:bg-white dark:text-black hover:bg-brand-accent-coral hover:text-white shadow-xs'
            }`}
          >
            {contactSubmitted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 animate-bounce" />
                <span>Subscribed</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Write to Us</span>
              </>
            )}
          </button>
        </form>

        {newsletterConfigured && (
          <iframe
            name="newsletter-form-target"
            title="newsletter-form-target"
            className="hidden"
            onLoad={handleNewsletterIframeLoad}
          />
        )}

        <AnimatePresence>
          {contactSubmitted && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-mono text-brand-accent-sage"
            >
              {newsletterConfigured ? 'Alignment processed. Check your inbox for a note from us.' : 'Alignment processed. We will write to you soon.'}
            </motion.p>
          )}
        </AnimatePresence>
      </section>

      {/* FOOTER */}
      <footer className="pt-8 border-t border-brand-charcoal/5 dark:border-white/5 text-center text-xs font-mono text-brand-charcoal/40 dark:text-white/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <div style={{ color: '#cf7e65' }}>
          © 2026 NUASPECT. ALL INTELLECTUAL AND CLINICAL RESERVES SECURED.
        </div>
        <div 
          style={{ color: '#cf7e65' }}
          className="flex gap-4 items-center justify-center"
        >
          <a href="#" className="hover:text-brand-accent-coral transition-colors">PRIVACY CODE</a>
          <span>•</span>
          <a href="#" className="hover:text-brand-accent-coral transition-colors">SYSTEM AUDITS</a>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-brand-accent-coral">
          <span>COMPOSED WITH</span>
          <Heart className="w-3 h-3 fill-brand-accent-coral" />
        </div>
      </footer>
    </div>
  );
}
