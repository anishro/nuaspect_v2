/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, RotateCcw, BookOpen, CheckCircle2, HelpCircle } from 'lucide-react';
import { assessmentQuestions, getAdviceForScore } from '../questions';

export default function AssessmentQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isFinalScreen, setIsFinalScreen] = useState(false);

  const currentQuestion = assessmentQuestions[currentIdx];

  const handleSelectOption = (key: string) => {
    setSelectedKey(key);
  };

  const handleNext = () => {
    if (selectedKey === null) return;

    const updatedAnswers = [...userAnswers, selectedKey];
    setUserAnswers(updatedAnswers);

    if (currentIdx < assessmentQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedKey(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedKey(null);
    setUserAnswers([]);
    setIsFinished(false);
    setIsFinalScreen(false);
  };

  // Score Calculations
  const correctCount = assessmentQuestions.reduce((acc, q, idx) => {
    return acc + (userAnswers[idx] === q.correctKey ? 1 : 0);
  }, 0);

  const incorrectCategories = assessmentQuestions
    .filter((q, idx) => userAnswers[idx] !== q.correctKey)
    .map(q => q.category);

  const adviceResult = getAdviceForScore(correctCount, incorrectCategories);

  return (
    <div className="w-full max-w-3xl mx-auto bg-brand-cream-light/65 dark:bg-[#0d0d15]/85 backdrop-blur-xl rounded-3xl border border-brand-charcoal/15 dark:border-white/10 shadow-lg dark:shadow-2xl shadow-black/10 p-6 md:p-10 relative overflow-hidden">
      
      {/* Absolute Decorative Blob (Assessment Accent) */}
      <div className="absolute top-[-30px] right-[-30px] w-64 h-64 bg-brand-accent-coral/5 rounded-full filter blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="question-box"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 md:space-y-5"
          >
            {/* Header progress info */}
            <div className="flex justify-between items-center text-xs font-mono tracking-wider text-brand-charcoal/60 border-b border-brand-charcoal/10 pb-4">
              <span className="uppercase text-brand-accent-coral font-semibold">Intellectual Clinical Assessment</span>
              <span>
                QUESTION {currentIdx + 1} OF {assessmentQuestions.length}
              </span>
            </div>

            {/* Custom Progress Bar */}
            <div className="w-full h-[3px] bg-brand-charcoal/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-brand-accent-sage to-brand-accent-coral"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIdx + 1) / assessmentQuestions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Text */}
            <div className="space-y-1.5 py-0">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-accent-sage font-bold bg-brand-accent-sage/10 py-1 px-2.5 rounded-full inline-block">
                {currentQuestion.category}
              </span>
              <h2 className="font-serif text-lg md:text-xl text-brand-charcoal dark:text-white/90 font-medium leading-relaxed tracking-tight pt-1 whitespace-pre-line">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Choices list */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedKey === opt.key;
                return (
                  <button
                    key={opt.key}
                    id={`quiz-option-${opt.key}`}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full text-left p-3.5 md:p-4 rounded-xl border text-sm md:text-base transition-all duration-300 flex items-start gap-3 cursor-pointer group hover:-translate-y-0.5 ${
                      isSelected
                        ? 'bg-brand-accent-coral/10 border-brand-accent-coral text-brand-charcoal dark:text-white shadow-xs'
                        : 'bg-brand-charcoal/5 dark:bg-white/5 border-brand-charcoal/5 dark:border-white/5 text-brand-charcoal/80 dark:text-white/80 hover:bg-brand-charcoal/10 dark:hover:bg-white/10 hover:border-brand-charcoal/15 dark:hover:border-white/20 hover:text-brand-charcoal dark:hover:text-white hover:shadow-xs'
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full border text-xs font-mono font-bold flex items-center justify-center transition-colors duration-300 ${
                        isSelected
                          ? 'bg-brand-accent-coral border-brand-accent-coral text-white'
                          : 'border-brand-charcoal/20 dark:border-white/20 text-brand-charcoal/50 dark:text-white/50 group-hover:border-brand-charcoal dark:group-hover:border-white group-hover:text-brand-charcoal dark:group-hover:text-white'
                      }`}
                    >
                      {opt.key.toUpperCase()}
                    </span>
                    <span className="font-sans leading-relaxed pt-0.5">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center pt-4">
              <span className="text-xs font-mono text-brand-charcoal/40 dark:text-white/40 italic">
                *Select an answer to progress
              </span>
              <button
                id="assessment-btn-next"
                onClick={handleNext}
                disabled={selectedKey === null}
                className={`px-6 py-3 rounded-full font-serif flex items-center gap-2 tracking-wide transition-all duration-300 cursor-pointer ${
                  selectedKey !== null
                    ? 'bg-brand-charcoal text-brand-cream dark:bg-white dark:text-black hover:bg-brand-accent-coral hover:text-white hover:shadow-lg'
                    : 'bg-brand-charcoal/10 dark:bg-white/5 text-brand-charcoal/40 dark:text-white/30 cursor-not-allowed'
                }`}
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : !isFinalScreen ? (
          <motion.div
            key="assessment-score"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6 md:space-y-8"
          >
            <div className="text-xs font-mono tracking-widest text-brand-accent-coral uppercase font-bold">
              Cognitive Formulation Score
            </div>

            {/* Large Score Indicator */}
            <div className="relative inline-flex flex-col items-center justify-center p-8 bg-brand-charcoal/5 dark:bg-white/5 rounded-full border-2 border-brand-accent-coral/20 shadow-inner w-36 h-36">
              <span className="font-serif text-5xl font-light text-brand-accent-coral">{correctCount}</span>
              <span className="text-xs font-mono tracking-widest text-brand-charcoal/50 dark:text-white/50 uppercase select-none mt-1">out of 13</span>
            </div>

            {/* Clinical Feedback and Guidance Tier */}
            <div className="space-y-4 max-w-xl mx-auto">
              <span className="text-sm font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-brand-accent-sage/10 text-brand-accent-sage">
                {adviceResult.scoreRange}
              </span>
              <p className="text-brand-charcoal dark:text-white/90 text-sm md:text-base leading-relaxed font-sans text-center">
                {adviceResult.generalAdvice}
              </p>
            </div>



            <div className="divider w-32 h-[1px] bg-brand-accent-coral/20 mx-auto" />

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                id="assessment-btn-reset"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 border border-brand-charcoal/25 dark:border-white/20 text-brand-charcoal dark:text-white bg-brand-charcoal/5 dark:bg-white/5 hover:bg-brand-charcoal/10 dark:hover:bg-white/5 rounded-full text-sm font-sans tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RETRY ASSESSMENT</span>
              </button>
              <button
                id="assessment-btn-continue"
                onClick={() => setIsFinalScreen(true)}
                className="w-full sm:w-auto px-6 py-3 bg-brand-charcoal text-brand-cream dark:bg-white dark:text-black hover:bg-brand-accent-coral hover:text-white rounded-full text-sm font-sans tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/10 dark:shadow-black/40 hover:shadow-brand-accent-coral/15"
              >
                <span>CONTINUE</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="assessment-final-thankyou"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6 py-6"
          >
            {/* The peach glass marble / floating glass orb shown in video */}
            <div className="relative flex justify-center mb-6">
              {/* Spinning/floating glow under the sphere */}
              <div className="absolute w-24 h-6 bg-brand-accent-coral/10 rounded-full filter blur-md bottom-1 animate-pulse" />
              
              {/* Premium Peach/Orange Glass Sphere with glass shadow and specular highlights */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 3, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-accent-coral via-orange-300 to-rose-200 border border-white/60 shadow-xl relative overflow-hidden flex items-center justify-center"
                style={{
                  boxShadow: 'inset -8px -8px 24px rgba(0,0,0,0.15), inset 8px 8px 16px rgba(255,255,255,0.7), 0 12px 28px rgba(208, 123, 101, 0.4)'
                }}
              >
                {/* Specular Highlight glare */}
                <div className="absolute top-1.5 left-3 w-6 h-3 bg-white/70 rounded-full filter blur-[0.5px] rotate-[-15deg]" />
                <div className="absolute bottom-2 right-4 w-4 h-4 bg-orange-100/30 rounded-full filter blur-[1px]" />
              </motion.div>
            </div>

            <h3 className="font-serif text-3xl md:text-4xl text-[#ebebeb] font-light leading-snug">
              We'll have something for you soon.<br />
              <span className="font-medium text-[#fffdef]">Till then, you are doing great.</span>
            </h3>

            <p className="font-serif italic text-lg text-brand-accent-sage tracking-wider">
              "Reflection is its own form of progress."
            </p>

            <div className="divider w-24 h-[1px] bg-[#cd8362] mx-auto py-2" />

            <div className="flex justify-center gap-3">
              <button
                id="assessment-btn-finish"
                onClick={handleReset}
                className="px-6 py-2.5 bg-brand-charcoal/5 dark:bg-white/5 hover:bg-brand-charcoal/10 dark:hover:bg-white/10 text-brand-charcoal dark:text-white font-sans text-xs tracking-widest uppercase rounded-full border border-brand-charcoal/10 dark:border-white/10 transition-all cursor-pointer"
              >
                Restart Schedulers
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
