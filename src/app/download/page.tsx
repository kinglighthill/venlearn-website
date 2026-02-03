"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const downloads = [
  {
    name: "VenLearn Suite",
    version: "v1.0.0",
    size: "139 MB",
    type: "server",
    icon: "/images/icons/server.png",
    description: "All in one proctoring solution",
    platforms: [
      {
        slug: "windows",
        name: "Windows",
        icon: "/images/icons/windows.avif",
        available: true
      },
      {
        slug: "linux",
        name: "Linux",
        icon: "/images/icons/linux2.png",
        available: false
      },
      {
        slug: "mac",
        name: "Mac",
        icon: "/images/icons/mac.svg",
        available: false
      }
    ]
  },
  {
    name: "VenLearn Server",
    version: "v1.0.0",
    size: "53 MB",
    type: "server",
    icon: "/images/icons/server.png",
    description: "Centralized exam management core",
    platforms: [
      {
        slug: "windows",
        name: "Windows",
        icon: "/images/icons/windows.avif",
        available: true
      },
      {
        slug: "linux",
        name: "Linux",
        icon: "/images/icons/linux2.png",
        available: false
      },
      {
        slug: "mac",
        name: "Mac",
        icon: "/images/icons/mac.svg",
        available: false
      }
    ]
  },
  {
    name: "VenLearn Manager",
    version: "v1.0.0",
    size: "26 MB",
    type: "admin",
    icon: "/images/icons/manager.png",
    description: "Administration & proctoring dashboard",
    platforms: [
      {
        slug: "windows",
        name: "Windows",
        icon: "/images/icons/windows.avif",
        available: true
      },
      {
        slug: "linux",
        name: "Linux",
        icon: "/images/icons/linux2.png",
        available: false
      },
      {
        slug: "mac",
        name: "Mac",
        icon: "/images/icons/mac.svg",
        available: false
      }
    ]
  },
  {
    name: "VenLearn Editor",
    version: "v1.0.0",
    size: "31 MB",
    type: "editor",
    icon: "/images/icons/editor.png",
    description: "Rich content creation tool",
    platforms: [
      {
        slug: "windows",
        name: "Windows",
        icon: "/images/icons/windows.avif",
        available: true
      },
      {
        slug: "linux",
        name: "Linux",
        icon: "/images/icons/linux2.png",
        available: false
      },
      {
        slug: "mac",
        name: "Mac",
        icon: "/images/icons/mac.svg",
        available: false
      }
    ]
  },
  {
    name: "VenLearn Client",
    version: "v1.0.0",
    size: "26 MB",
    type: "client",
    icon: "/images/icons/client.png",
    description: "Secure student exam interface",
    platforms: [
      {
        slug: "windows",
        name: "Windows",
        icon: "/images/icons/windows.avif",
        available: true
      },
      {
        slug: "mac",
        name: "Mac",
        icon: "/images/icons/mac.svg",
        available: false
      },
      {
        slug: "linux",
        name: "Linux",
        icon: "/images/icons/linux2.png",
        available: false
      },
      {
        slug: "android",
        name: "Android",
        icon: "/images/icons/android.svg",
        available: false
      },
      {
        slug: "ios",
        name: "iOS",
        icon: "/images/icons/ios.avif",
        available: false
      }
    ]
  },
];

export default function DownloadPage() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
          Get <span className="text-brand-primary">VenLearn</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Download the latest version of the VenLearn suite. Currently available for Windows, with other platforms support coming soon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {downloads.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-3xl bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
          >
            <div className="w-24 h-24 mb-6 relative drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Image
                src={item.icon}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>

            <h3 className="text-xl font-bold mb-2 text-slate-900">{item.name}</h3>
            <p className="text-slate-500 text-sm mb-4 min-h-[40px]">{item.description}</p>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-8 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
              <span className="font-semibold text-slate-600">{item.version}</span>
              <span>•</span>
              <span>{item.size}</span>
            </div>

            <div className="mt-auto space-y-3 w-full">
              {
                item.platforms.map((platform, i) => platform.available ? (
                  <button key={platform.slug}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors shadow-lg shadow-slate-900/10 active:scale-95"
                  >
                    <div className="relative w-[18px] h-[18px]">
                      <Image src={platform.icon} alt={platform.name} fill className="object-contain" />
                    </div>
                    Download for {platform.name}
                  </button>
                ) : (
                  <div className="relative group/mac cursor-not-allowed">
                    <button
                      disabled
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-50 text-slate-400 text-sm font-semibold border border-slate-100"
                    >
                      <div className="relative w-[18px] h-[18px] grayscale opacity-60">
                        <Image src={platform.icon} alt={platform.name} fill className="object-contain" />
                      </div>
                      {platform.name}
                    </button>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/mac:opacity-100 transition-opacity bg-slate-900/80 rounded-xl">
                      <span className="text-white text-xs font-medium">Coming Soon</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
