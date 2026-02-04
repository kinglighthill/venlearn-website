import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-bold">
                V
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">VenLearn</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
              The complete proctoring ecosystem. Secure, reliable, and easy to use
              desktop applications for modern examinations.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/features" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors font-medium">Features</Link></li>
              <li><Link href="/download" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors font-medium">Downloads</Link></li>
              <li><Link href="/pricing" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors font-medium">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors font-medium">Contact</Link></li>
              <li><Link href="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors font-medium">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} Veracone Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
              All Systems Operational
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
