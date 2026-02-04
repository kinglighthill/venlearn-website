'use client'
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
    {
        name: "Free",
        description: "Perfect for getting started with basic features",
        price: 0,
        minStudents: "Up to 5 students",
        features: [
            { name: "CBT System", included: true },
            { name: "Reporting (Basic)", included: true },
            { name: "AI Credits (0)", included: true },
            { name: "SMS Credits (0)", included: true },
        ],
    },
    {
        name: "Starter",
        description: "Ideal for small educational institutions",
        price: 5,
        minStudents: "Minimum of 100 students",
        features: [
            { name: "CBT System", included: true },
            { name: "Reporting (Basic)", included: true },
            { name: "AI Credits (500k)", included: true },
            { name: "SMS Credits (1k)", included: true },
        ],
    },
    {
        name: "Basic",
        description: "Enhanced features for growing organizations",
        price: 10,
        minStudents: "Minimum of 100 students",
        features: [
            { name: "CBT System", included: true },
            { name: "Reporting (Advanced)", included: true },
            { name: "Library Access", included: true },
            { name: "Content as a Service (2)", included: true },
            { name: "Venlearn Subdomain", included: true },
            { name: "AI Credits (1M)", included: true },
            { name: "SMS Credits (2k)", included: true },
        ],
    },
    {
        name: "Professional",
        description: "Advanced capabilities for established institutions",
        price: 15,
        minStudents: "Minimum of 100 students",
        features: [
            { name: "CBT System", included: true },
            { name: "Reporting (Advanced)", included: true },
            { name: "Library Access", included: true },
            { name: "Content as a Service (5)", included: true },
            { name: "Venlearn Subdomain", included: true },
            { name: "Custom Domain", included: true },
            { name: "Venlearn Mobile App", included: true },
            { name: "Backup", included: true },
            { name: "Priority Support", included: true },
            { name: "AI Credits (1.5M)", included: true },
            { name: "SMS Credits (3k)", included: true },
        ],
        highlight: true,
    },
    {
        name: "Enterprise",
        description: "Full customization and dedicated support",
        price: "Contact Sales",
        subtext: "Custom pricing based on your needs",
        minStudents: "Any number of Students",
        features: [
            { name: "CBT System", included: true },
            { name: "Reporting (Advanced)", included: true },
            { name: "Library Access", included: true },
            { name: "Content as a Service (Unlimited)", included: true },
            { name: "Venlearn Subdomain", included: true },
            { name: "Custom Domain", included: true },
            { name: "Venlearn Mobile App", included: true },
            { name: "Backup", included: true },
            { name: "Dedicated Android & iOS App", included: true },
            { name: "Priority Support", included: true },
            { name: "AI Credits (2M)", included: true },
            { name: "SMS Credits (4k)", included: true },
        ],
    },
];

const featureComparison = [
    {
        category: "Features",
        rows: [
            { name: "Minimum students", free: "5", starter: "100", basic: "100", pro: "100", ent: "Any number" },
            { name: "CBT System", free: true, starter: true, basic: true, pro: true, ent: true },
            { name: "Reporting", free: "Basic", starter: "Basic", basic: "Advanced", pro: "Advanced", ent: "Advanced" },
            { name: "AI Credits", free: "0", starter: "500k", basic: "1M", pro: "1.5M", ent: "2M" },
            { name: "SMS Credits", free: "0", starter: "1k", basic: "2k", pro: "3k", ent: "4k" },
            { name: "Library Access", free: false, starter: false, basic: true, pro: true, ent: true },
            { name: "Content as a Service", free: false, starter: false, basic: "2", pro: "5", ent: "Unlimited" },
            { name: "Venlearn Subdomain", free: false, starter: false, basic: true, pro: true, ent: true },
            { name: "Custom Domain", free: false, starter: false, basic: false, pro: true, ent: true },
            { name: "Venlearn Mobile App", free: false, starter: false, basic: false, pro: true, ent: true },
            { name: "Backup", free: false, starter: false, basic: false, pro: true, ent: true },
            { name: "Priority Support", free: false, starter: false, basic: false, pro: true, ent: true },
            { name: "Dedicated Android & iOS App", free: false, starter: false, basic: false, pro: false, ent: true },
        ],
    },
];

export default function PricingClient() {
    return (
        <div className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brand-primary">
                    Choose Your Perfect Plan
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-8">
                    Empower your educational institution with our comprehensive eLearning, CBT system and advanced features
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="flex overflow-x-auto gap-6 mb-24 py-8 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative rounded-3xl p-6 border flex flex-col transition-all duration-300 min-w-[300px] md:min-w-[320px] snap-center ${plan.highlight
                            ? "border-brand-primary bg-blue-50/50 dark:bg-blue-900/20 shadow-xl shadow-blue-500/10"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg"
                            }`}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-primary text-xs font-bold uppercase tracking-wider rounded-full text-white shadow-lg">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6 text-center">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs min-h-[40px]">{plan.description}</p>
                        </div>

                        <div className="mb-6 text-center">
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {typeof plan.price === 'number' ? `₦${plan.price}k` : plan.price}
                                </span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm">
                                    {typeof plan.price === 'number' ? `/student/year` : ''}
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Per student annually</p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 text-center mb-6">
                            <span className="text-slate-600 dark:text-slate-300 text-xs font-semibold">{plan.minStudents}</span>
                        </div>

                        <div className="space-y-4 flex-1">
                            {plan.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-start gap-3">
                                    <div className={`mt-0.5 ${feature.included ? "text-emerald-500" : "text-slate-300"}`}>
                                        {feature.included ? <Check size={16} /> : <X size={16} />}
                                    </div>
                                    <span className={`text-sm ${feature.included ? "text-slate-700 dark:text-slate-200 font-medium" : "text-slate-400 dark:text-slate-500"}`}>
                                        {feature.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Feature Comparison */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700">
                <div className="p-8 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Detailed Feature Comparison</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-center mt-2">Compare all features across our plans</p>
                </div>

                <div className="overflow-x-auto" id="pricing-table">
                    <table className="w-full min-w-[800px]">
                        <thead>
                            <tr className="bg-white dark:bg-slate-800">
                                <th className="p-6 text-left text-slate-900 dark:text-white font-bold w-1/4">Features</th>
                                {plans.map(plan => (
                                    <th key={plan.name} className={`p-6 text-center font-bold ${plan.highlight ? "text-brand-primary" : "text-slate-700 dark:text-slate-300"
                                        }`}>
                                        {plan.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {featureComparison[0].rows.map((row, index) => (
                                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="p-6 text-slate-900 dark:text-white font-medium">{row.name}</td>

                                    {[row.free, row.starter, row.basic, row.pro, row.ent].map((val, i) => (
                                        <td key={i} className="p-6 text-center text-slate-600 text-sm">
                                            {val === true ? (
                                                <div className="flex justify-center text-emerald-500"><Check size={20} className="stroke-[3]" /></div>
                                            ) : val === false ? (
                                                <div className="flex justify-center text-slate-200"><X size={20} className="stroke-[3]" /></div>
                                            ) : (
                                                <span className="font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full text-xs">{val}</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
