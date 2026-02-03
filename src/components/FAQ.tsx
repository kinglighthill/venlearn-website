"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How can I get Started?",
    answer: "Getting started is easy! Simply download the app for your device (Mac or Windows), create an account, and start using our free plan instantly."
  },
  {
    question: "Does the app work offline?",
    answer: "Yes, VenLearn allows you to download exams and content for offline use. You only need an internet connection to sync your progress and results."
  },
  {
    question: "Does VenLearn work on all devices?",
    answer: "Currently, we support Windows and macOS desktops. A dedicated mobile app for Android and iOS is coming soon to the Basic and above plans."
  },
  {
    question: "Are VenLearn Content Up to date?",
    answer: "Absolutely. Our content team updates the question bank and educational materials weekly to ensure alignment with the latest curriculum and examination standards."
  },
  {
    question: "What about recommended novels and Syllabus?",
    answer: "We include summaries and practice questions for all recommended novels and strictly follow the official syllabus for UTME, WASSCE, and other exams."
  },
  {
    question: "Do I need to pay to be able to use the App?",
    answer: "No, you can start with our Free plan which gives you access to a limited set of questions and features. Upgrade anytime to unlock the full potential."
  },
  {
    question: "What should I do if I encounter issues?",
    answer: "Our support team is available 24/7. You can reach out via the 'Help & Support' section in the app or email us at support@venlearn.com."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mb-6 flex justify-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-medium">
                 <HelpCircle size={14} className="text-slate-500" />
                 <span>FAQ&apos;s</span>
              </div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
            >
              Frequently Asked Questions
            </motion.h2>
         </div>

         <div className="space-y-4">
            {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl bg-slate-50 overflow-hidden"
                >
                    <button
                      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-100 transition-colors"
                    >
                        <span className="font-bold text-slate-900 text-lg">{faq.question}</span>
                        <div className={`w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                            {activeIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                    </button>
                    
                    <AnimatePresence>
                        {activeIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 pt-0 text-slate-600 leading-relaxed font-medium">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
         </div>

      </div>
    </section>
  );
}
