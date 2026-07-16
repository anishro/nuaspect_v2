/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Construction, Send, CheckCircle2 } from 'lucide-react';
import FerrisWheel from './FerrisWheel';
import { googleSources } from '../config/googleSources';

export default function Contact() {
  const { actionUrl, nameEntryId, emailEntryId, messageEntryId } = googleSources.contactForm;
  const isConfigured = !!(actionUrl && nameEntryId && emailEntryId && messageEntryId);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const expectingResponseRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    expectingResponseRef.current = true;
  };

  const handleIframeLoad = () => {
    if (!expectingResponseRef.current) return;
    expectingResponseRef.current = false;
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="relative min-h-screen pt-32 pb-16 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ferris Wheel */}
      <div className="absolute right-[-5%] top-[5%] w-[65vw] h-[65vw] max-w-[550px] max-h-[550px] opacity-35 z-0 pointer-events-none">
        <FerrisWheel />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl w-full text-center bg-brand-cream-light/65 dark:bg-[#0d0d15]/85 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-brand-charcoal/15 dark:border-white/10 shadow-xl dark:shadow-2xl"
      >
        <div className="inline-flex items-center justify-center p-4 bg-brand-charcoal/5 dark:bg-white/5 rounded-full border border-brand-charcoal/10 dark:border-white/10 text-brand-accent-coral shadow-inner mb-6">
          <Mail className="w-8 h-8" />
        </div>

        <h1 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-brand-charcoal mb-4">
          Contact Us
        </h1>

        <p className="font-serif italic text-lg md:text-xl text-brand-accent-sage tracking-wide mb-8">
          "Reach out to begin your reflection."
        </p>

        <div className="divider w-24 h-[1px] bg-brand-accent-coral/30 mx-auto mb-8" />

        {isConfigured ? (
          <>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  ref={formRef}
                  action={actionUrl}
                  method="POST"
                  target="contact-form-target"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 text-left max-w-md mx-auto"
                >
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-mono tracking-widest uppercase text-brand-charcoal/60 dark:text-white/50">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name={nameEntryId}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-brand-charcoal/5 dark:bg-white/5 border border-brand-charcoal/15 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-accent-coral transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-mono tracking-widest uppercase text-brand-charcoal/60 dark:text-white/50">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name={emailEntryId}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-brand-charcoal/5 dark:bg-white/5 border border-brand-charcoal/15 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-accent-coral transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-mono tracking-widest uppercase text-brand-charcoal/60 dark:text-white/50">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name={messageEntryId}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                      className="w-full bg-brand-charcoal/5 dark:bg-white/5 border border-brand-charcoal/15 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-accent-coral transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 px-6 py-3 bg-brand-charcoal text-brand-cream dark:bg-white dark:text-black hover:bg-brand-accent-coral hover:text-white rounded-full text-sm font-sans tracking-widest font-bold uppercase transition-all duration-300 shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 py-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-brand-accent-sage" />
                  <p className="text-brand-charcoal dark:text-white/90 font-sans text-sm">
                    Message received. We'll write back to you soon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hidden iframe target so the Google Form POST doesn't navigate away from the page */}
            <iframe
              name="contact-form-target"
              title="contact-form-target"
              className="hidden"
              onLoad={handleIframeLoad}
            />
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="font-sans font-medium text-xs tracking-[0.2em] text-brand-accent-coral uppercase mb-2">
              Status: Under Construction
            </h2>
            <p className="text-brand-charcoal/70 text-sm md:text-base leading-relaxed max-w-md mx-auto">
              Our secure patient intake portal and general inbox are currently undergoing privacy compliance audits. We will open communication lines shortly.
            </p>
            <div className="pt-4 inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-charcoal/50">
              <Construction className="w-4 h-4 animate-spin" style={{ animationDuration: '9s' }} />
              <span>NUASPECT // PRIVACY SECURE</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
