/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Waves, Construction } from 'lucide-react';
import FerrisWheel from './FerrisWheel';

export default function Wavspectra() {
  return (
    <div className="relative min-h-screen pt-32 pb-16 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ferris Wheel */}
      <div className="absolute right-[10%] top-[15%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] opacity-30 z-0">
        <FerrisWheel />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl w-full text-center bg-brand-cream-light/65 dark:bg-[#0d0d15]/85 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-brand-charcoal/15 dark:border-white/10 shadow-xl dark:shadow-2xl"
      >
        <div className="inline-flex items-center justify-center p-4 bg-brand-charcoal/5 dark:bg-white/5 rounded-full border border-brand-charcoal/10 dark:border-white/10 text-brand-accent-coral shadow-inner mb-6">
          <Waves className="w-8 h-8 animate-pulse" />
        </div>

        <h1 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-brand-charcoal mb-4">
          WavSpectra
        </h1>
        
        <p className="font-serif italic text-lg md:text-xl text-brand-accent-sage tracking-wide mb-8">
          "The resonance of psychological wave patterns."
        </p>

        <div className="divider w-24 h-[1px] bg-brand-accent-coral/30 mx-auto mb-8" />

        <div className="space-y-4">
          <h2 className="font-sans font-medium text-xs tracking-[0.2em] text-brand-accent-coral uppercase mb-2">
            Status: Under Construction
          </h2>
          <p className="text-brand-charcoal/70 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Our audio feedback, biometric vibration trackers, and auditory meditation waves are currently undergoing deep algorithmic verification.
          </p>
        </div>

        {/* Mock wave anim for Wavspectra aesthetic */}
        <div className="flex justify-center items-center gap-1.5 my-6 h-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-brand-accent-coral/60 rounded-full animate-pulse"
              style={{
                height: `${20 + Math.sin(i) * 20}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1.2s'
              }}
            />
          ))}
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-charcoal/50">
          <Construction className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
          <span>NUASPECT // WAV 0.4.1</span>
        </div>
      </motion.div>
    </div>
  );
}
