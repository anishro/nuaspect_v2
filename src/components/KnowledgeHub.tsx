/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Construction, ArrowUpRight, AlertTriangle, X } from 'lucide-react';
import FerrisWheel from './FerrisWheel';
import { useGoogleSheet } from '../lib/googleSheets';
import { googleSources } from '../config/googleSources';
import { KnowledgeHubArticle } from '../types';

/** Splits a Sheet cell's article text into paragraphs on blank lines, falling back to single line breaks. */
function splitParagraphs(body: string): string[] {
  const normalized = body.replace(/\r\n/g, '\n').trim();
  if (!normalized) return [];
  const byBlankLine = normalized.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (byBlankLine.length > 1) return byBlankLine;
  return normalized.split('\n').map((p) => p.trim()).filter(Boolean);
}

function mapArticleRecord(record: Record<string, string>, index: number): KnowledgeHubArticle | null {
  const title = record['title'];
  if (!title) return null;
  return {
    id: `${index}-${title}`,
    title,
    category: record['category'] || 'General',
    summary: record['summary'] || '',
    body: splitParagraphs(record['body'] || record['summary'] || ''),
    link: record['link'] || undefined,
    date: record['date'] || undefined,
  };
}

export default function KnowledgeHub() {
  const { data: articles, loading, error, unconfigured } = useGoogleSheet<KnowledgeHubArticle>(
    googleSources.knowledgeHub.endpointUrl,
    mapArticleRecord
  );
  const [openArticle, setOpenArticle] = useState<KnowledgeHubArticle | null>(null);

  const showFallback = unconfigured || (!loading && !error && articles.length === 0);

  return (
    <div className="relative min-h-screen pt-32 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Dynamic Background Ferris Wheel */}
      <div className="absolute right-[-10%] bottom-[-5%] w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] opacity-40 md:opacity-100 z-0 pointer-events-none">
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
          <BookOpen className="w-8 h-8" />
        </div>

        <h1 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-brand-charcoal mb-4">
          Knowledge Hub
        </h1>

        <p className="font-serif italic text-lg md:text-xl text-brand-accent-sage tracking-wide mb-8">
          "Where intellect connects with understanding."
        </p>

        <div className="divider w-24 h-[1px] bg-brand-accent-coral/30 mx-auto" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-3xl bg-brand-charcoal/5 dark:bg-white/5 border border-brand-charcoal/10 dark:border-white/10 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="max-w-xl mx-auto text-center bg-brand-cream-light/65 dark:bg-[#0d0d15]/85 backdrop-blur-xl p-8 rounded-3xl border border-brand-charcoal/15 dark:border-white/10 shadow-xl space-y-3">
            <AlertTriangle className="w-6 h-6 text-brand-accent-coral mx-auto" />
            <p className="text-brand-charcoal/70 text-sm">
              We couldn't load the latest resources right now. Please check back shortly.
            </p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, idx) => (
              <motion.button
                key={article.id}
                type="button"
                onClick={() => setOpenArticle(article)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group text-left bg-brand-cream-light/65 dark:bg-[#0d0d15]/85 backdrop-blur-xl p-6 md:p-7 rounded-3xl border border-brand-charcoal/15 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-brand-accent-coral/40 transition-all duration-300 flex flex-col hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-accent-sage font-bold bg-brand-accent-sage/10 py-1 px-2.5 rounded-full inline-block">
                    {article.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-brand-charcoal/40 dark:text-white/40 group-hover:text-brand-accent-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-medium text-brand-charcoal dark:text-white leading-snug mb-2">
                  {article.title}
                </h3>

                {article.summary && (
                  <p className="text-sm text-brand-charcoal/70 dark:text-white/60 leading-relaxed mb-3">
                    {article.summary}
                  </p>
                )}

                {article.date && (
                  <span className="mt-auto pt-2 text-[10px] font-mono tracking-widest text-brand-charcoal/40 dark:text-white/40 uppercase">
                    {article.date}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        )}

        {showFallback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl w-full mx-auto text-center bg-brand-cream-light/65 dark:bg-[#0d0d15]/85 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-brand-charcoal/15 dark:border-white/10 shadow-xl dark:shadow-2xl"
          >
            <div className="space-y-4">
              <h2 className="font-sans font-medium text-xs tracking-[0.2em] text-brand-accent-coral uppercase mb-2">
                Status: Under Construction
              </h2>
              <p className="text-brand-charcoal/70 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                Our central warehouse of clinical psychological assessments, mental frameworks, and cognitive patterns is being carefully curated. We will return soon with interactive guides.
              </p>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-charcoal/50">
              <Construction className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              <span>NUASPECT // RELEASE 1.0.4</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Full article reader overlay */}
      <AnimatePresence>
        {openArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 md:p-8 bg-brand-charcoal/40 dark:bg-black/60 backdrop-blur-sm overflow-y-auto"
            onClick={() => setOpenArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl my-8 md:my-0 max-h-[85vh] overflow-y-auto bg-brand-cream-light/95 dark:bg-[#0d0d15]/95 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-brand-charcoal/15 dark:border-white/10 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpenArticle(null)}
                aria-label="Close article"
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-brand-charcoal/5 dark:bg-white/5 hover:bg-brand-charcoal/10 dark:hover:bg-white/10 text-brand-charcoal dark:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-accent-sage font-bold bg-brand-accent-sage/10 py-1 px-2.5 rounded-full inline-block mb-4">
                {openArticle.category}
              </span>

              <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-charcoal dark:text-white leading-tight mb-2 pr-8">
                {openArticle.title}
              </h2>

              {openArticle.date && (
                <span className="block text-[10px] font-mono tracking-widest text-brand-charcoal/40 dark:text-white/40 uppercase mb-6">
                  {openArticle.date}
                </span>
              )}

              <div className="divider w-16 h-[1px] bg-brand-accent-coral/30 mb-6" />

              <div className="space-y-4">
                {openArticle.body.map((paragraph, i) => (
                  <p key={i} className="font-sans text-sm md:text-base text-brand-charcoal/80 dark:text-white/75 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {openArticle.link && (
                <a
                  href={openArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-brand-charcoal text-brand-cream dark:bg-white dark:text-black hover:bg-brand-accent-coral hover:text-white transition-all"
                >
                  <span>View External Source</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
