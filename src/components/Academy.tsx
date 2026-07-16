/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Construction, AlertTriangle, PlayCircle } from 'lucide-react';
import FerrisWheel from './FerrisWheel';
import { useGoogleSheet } from '../lib/googleSheets';
import { googleSources } from '../config/googleSources';
import { AcademyCourse } from '../types';

/** Accepts a raw YouTube ID, a youtu.be link, or a full watch/embed URL and returns the video ID. */
function extractYouTubeId(input: string): string {
  const trimmed = input.trim();
  const patterns = [
    /(?:youtu\.be\/)([^?&/]+)/,
    /(?:youtube\.com\/watch\?v=)([^?&/]+)/,
    /(?:youtube\.com\/embed\/)([^?&/]+)/,
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }
  return trimmed;
}

function mapCourseRecord(record: Record<string, string>, index: number): AcademyCourse | null {
  const title = record['title'];
  const video = record['youtube'] || record['youtube id'] || record['video'] || record['link'];
  if (!title || !video) return null;
  return {
    id: `${index}-${title}`,
    title,
    category: record['category'] || 'Module',
    description: record['description'] || '',
    youtubeId: extractYouTubeId(video),
  };
}

export default function Academy() {
  const { data: courses, loading, error, unconfigured } = useGoogleSheet<AcademyCourse>(
    googleSources.academy.endpointUrl,
    mapCourseRecord
  );

  const showFallback = unconfigured || (!loading && !error && courses.length === 0);

  return (
    <div className="relative min-h-screen pt-32 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Background Ferris Wheel */}
      <div className="absolute left-[5%] top-[10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] opacity-25 md:opacity-50 z-0 pointer-events-none">
        <FerrisWheel />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl mx-auto text-center mb-12"
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

        <div className="divider w-24 h-[1px] bg-brand-accent-coral/30 mx-auto" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-3xl bg-brand-charcoal/5 dark:bg-white/5 border border-brand-charcoal/10 dark:border-white/10 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="max-w-xl mx-auto text-center bg-brand-cream-light/65 dark:bg-[#0d0d15]/85 backdrop-blur-xl p-8 rounded-3xl border border-brand-charcoal/15 dark:border-white/10 shadow-xl space-y-3">
            <AlertTriangle className="w-6 h-6 text-brand-accent-coral mx-auto" />
            <p className="text-brand-charcoal/70 text-sm">
              We couldn't load the course catalog right now. Please check back shortly.
            </p>
          </div>
        )}

        {!loading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-brand-cream-light/65 dark:bg-[#0d0d15]/85 backdrop-blur-xl rounded-3xl border border-brand-charcoal/15 dark:border-white/10 shadow-lg overflow-hidden flex flex-col"
              >
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${course.youtubeId}`}
                    title={course.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="p-6 space-y-2 flex-1 flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-accent-sage font-bold bg-brand-accent-sage/10 py-1 px-2.5 rounded-full inline-block w-fit">
                    {course.category}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-medium text-brand-charcoal dark:text-white leading-snug">
                    {course.title}
                  </h3>
                  {course.description && (
                    <p className="text-sm text-brand-charcoal/70 dark:text-white/60 leading-relaxed">
                      {course.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {showFallback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl w-full mx-auto text-center bg-white/45 dark:bg-[#0d0d15]/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-brand-charcoal/10 dark:border-white/10 shadow-xl dark:shadow-2xl"
          >
            <div className="inline-flex items-center justify-center p-3 bg-brand-charcoal/5 dark:bg-white/5 rounded-full border border-brand-charcoal/10 dark:border-white/10 text-brand-accent-coral shadow-inner mb-6">
              <PlayCircle className="w-6 h-6" />
            </div>
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
        )}
      </div>
    </div>
  );
}
