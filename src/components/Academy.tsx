/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Construction } from 'lucide-react';
import FerrisWheel from './FerrisWheel';

export default function Academy() {
  return (
    <div className="relative min-h-screen pt-32 pb-16 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ferris Wheel */}
      <div className="absolute left-[5%] top-[10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] opacity-25 md:opacity-50 z-0">
        <FerrisWheel />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl w-full text-center bg-white/45 dark:bg-[#0d0d15]/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-brand-charcoal/10 dark:border-white/10 shadow-xl dark:shadow-2xl"
      >
        <div className="inline-flex items-center justify-center p-4 bg-brand-charcoal/5 dark:bg-white/5 rounded-full border border-brand-charcoal/10 dark:border-white/10 text-brand-accent-coral shadow-inner mb-6">
          <GraduationCap className="w-8 h-8" />
        </div>

        <h1 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-brand-charcoal mb-4">
          The Academy
        </h1>
        
        <p className="font-serif italic text-lg md:text-xl text-brand-accent-sage tracking-wide mb-8">
          "Deep reflection as a structured discipline."
        </p>

        <div className="divider w-24 h-[1px] bg-brand-accent-coral/30 mx-auto mb-8" />

        <div className="space-y-4">
          <h2 className="font-sans font-medium text-xs tracking-[0.2em] text-brand-accent-coral uppercase mb-2">
            Status: Under Construction
          </h2>
          <p className="text-brand-charcoal/70 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Our instructional pathways, modular psychological workshops, and training courses for researchers are currently entering active development.
          </p>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-charcoal/50">
          <Construction className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
          <span>NUASPECT // ACADEMY 1.0.0</span>
        </div>
      </motion.div>
    </div>
  );
}
