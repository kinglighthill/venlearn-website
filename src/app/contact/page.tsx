"use client";

import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-bold mb-6">Let&apos;s <span className="gradient-text">Talk</span></h1>
          <p className="text-slate-400 text-lg mb-12">
            Interested in deploying VenLearn for your institution? Get in touch with our sales team for a custom viewing and quote.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Email Us</h3>
                <p className="text-slate-400">info@venlearn.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl glass border border-white/10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">First Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-500" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Last Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-500" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Email Address</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-500" placeholder="john@university.edu" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none placeholder:text-slate-500" placeholder="Tell us about your needs..." />
            </div>

            <button type="submit" className="w-full py-4 rounded-xl bg-indigo-500 font-bold text-white hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
