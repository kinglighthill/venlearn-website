"use client";

import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";

const testimonials = [
  {
    initial: "W",
    name: "Wisdom",
    text: "This app entails everything for UTME App than any other app out there. The way they arrange their subjects is quite exceptional. Love ur app and thank me later.",
    rating: 5,
    color: "bg-orange-500",
  },
  {
    initial: "AJ",
    name: "Anita Jogho",
    text: "This is wonderful app, it has past questions and CORRECT answers, I don't have purchase any jamb text now cos I have this amazing app, not to mention it has it's own literature texts...",
    rating: 5,
    color: "bg-blue-500",
  },
  {
    initial: "VB",
    name: "Victor Bolu",
    text: "I highly recommend this App to every student preparing for jamb but hates carrying books(past questions) around.... even tho I registered late, one impressive thing about this app is that it has all the O' Level exams...",
    rating: 5,
    color: "bg-indigo-500",
  },
  {
    initial: "EE",
    name: "Emmanuella Emman...",
    text: "Ok this App is one of it's kind because it's features are just so amazing, the fun part is I get to study anything anywhere, so amazing. I had to give it stars cause it's worth it...",
    rating: 5,
    color: "bg-purple-500",
  },
  {
    initial: "CK",
    name: "Chukwuma Kingsley",
    text: "Best CBT app I've used so far. The interface is clean and user friendly. It really helped me prepare for my exams.",
    rating: 5,
    color: "bg-green-500",
  },
    {
    initial: "TB",
    name: "Tosin Boluwaduro",
    text: "It's a great app. The best I've come across. I must say, they offer excellent service, there are no buggy ads, very smooth experience.",
    rating: 5,
    color: "bg-pink-500",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
         <div className="text-center mb-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mb-6 flex justify-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-medium">
                 <MessageSquare size={14} className="text-slate-500" />
                 <span>Our Testimonials</span>
              </div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
            >
              User Reviews and Feedback
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-lg max-w-2xl mx-auto"
            >
              See how VenLearn has transformed users&apos; <br /> performance and experience
            </motion.p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />

                    <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-lg`}>
                            {t.initial}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">{t.name}</h4>
                            <div className="flex text-orange-400 gap-0.5">
                                {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                            </div>
                        </div>
                        <div className="ml-auto text-6xl font-serif text-slate-100 leading-none -mt-4">”</div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed text-sm relative z-10">
                        {t.text}
                    </p>
                </motion.div>
            ))}
         </div>

      </div>
    </section>
  );
}
