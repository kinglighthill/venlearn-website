"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

// Example screens array - you can pass any array of images
const screens = [
  { id: 1, title: "Server", image: "/images/server-mockup.png", color: "bg-orange-100" },
  { id: 2, title: "Manager", image: "/images/manager-mockup.png", color: "bg-blue-100" },
  { id: 3, title: "Manager", image: "/images/manager-mockup-2.png", color: "bg-purple-100" },
  { id: 4, title: "Editor", image: "/images/editor-mockup.png", color: "bg-green-100" },
  { id: 5, title: "Client", image: "/images/client-mockup.png", color: "bg-pink-100" },
];

interface Screen {
  id: number;
  title: string;
  image?: string;
  color: string;
}

interface ExploreScreensProps {
  screens?: Screen[];
  autoPlayInterval?: number;
}

export default function ExploreScreens({
  screens: customScreens = screens,
  autoPlayInterval = 4000
}: ExploreScreensProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % customScreens.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, customScreens.length, autoPlayInterval]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prevIndex) => (prevIndex + 1) % customScreens.length);
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prevIndex) => (prevIndex - 1 + customScreens.length) % customScreens.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  // Get the indices for prev, current, and next screens (circular)
  const getPrevIndex = () => (activeIndex - 1 + customScreens.length) % customScreens.length;
  const getNextIndex = () => (activeIndex + 1) % customScreens.length;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-medium">
            <User size={14} className="text-slate-500" />
            <span>User interface</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
        >
          Explore Product
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg max-w-2xl mx-auto mb-16"
        >
          Checkout our App&apos;s beautiful user interface <br /> and user experience in pictures
        </motion.p>

        {/* Carousel Container */}
        <div className="relative h-[600px] flex items-center justify-center">

          {/* Previous Screen (Left) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`prev-${activeIndex}`}
              initial={{ opacity: 0, x: -200, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 0.4, x: -320, scale: 0.75, rotateY: -15 }}
              exit={{ opacity: 0, x: -200, scale: 0.7 }}
              transition={{ duration: 0.5 }}
              className="absolute z-0 w-[850px] cursor-pointer"
              onClick={goToPrev}
              style={{ transformStyle: 'preserve-3d', marginTop: '8px' }}
            >
              <ScreenCard screen={customScreens[getPrevIndex()]} isSide />
            </motion.div>
          </AnimatePresence>

          {/* Next Screen (Right) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`next-${activeIndex}`}
              initial={{ opacity: 0, x: 200, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 0.4, x: 320, scale: 0.75, rotateY: 15 }}
              exit={{ opacity: 0, x: 200, scale: 0.7 }}
              transition={{ duration: 0.5 }}
              className="absolute z-0 w-[850px] cursor-pointer"
              onClick={goToNext}
              style={{ transformStyle: 'preserve-3d', marginTop: '8px' }}
            >
              <ScreenCard screen={customScreens[getNextIndex()]} isSide />
            </motion.div>
          </AnimatePresence>

          {/* Center Screen (Main) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`center-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-[900px]"
            >
              <ScreenCard screen={customScreens[activeIndex]} isCenter />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-4 z-20 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group hover:bg-slate-50"
            aria-label="Previous screen"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-slate-900" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 z-20 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group hover:bg-slate-50"
            aria-label="Next screen"
          >
            <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-slate-900" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {customScreens.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                  ? 'w-8 bg-slate-900'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              aria-label={`Go to screen ${index + 1}`}
            />
          ))}
        </div>

        {/* Screen Title */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-6 text-2xl font-semibold text-slate-900"
          >
            {customScreens[activeIndex].title}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}

// Screen Card Component
function ScreenCard({ screen, isCenter = false, isSide = false }: {
  screen: Screen;
  isCenter?: boolean;
  isSide?: boolean;
}) {
  return (
    <div className={`rounded-xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-3 ${isCenter ? 'ring-2 ring-slate-900/10' : ''
      }`}>
      <div className="bg-white rounded-lg overflow-hidden" style={{
        aspectRatio: isSide ? '16/10.15' : '16/10'
      }}>
        {/* Fake Browser Header */}
        <div className="h-8 bg-slate-900 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Content Body */}
        {screen.image ? (
          <div className="relative w-full h-[calc(100%-2rem)]">
            <Image
              src={screen.image}
              alt={screen.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="p-8 h-[calc(100%-2rem)] bg-slate-50 flex gap-4">
            {/* Sidebar */}
            <div className="w-16 h-full flex flex-col gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-lg ${i === 1 ? 'bg-orange-500' : 'bg-slate-200'
                    }`}
                />
              ))}
            </div>
            {/* Main Area */}
            <div className="flex-1 space-y-4">
              <div className={`h-32 rounded-xl ${screen.color} w-full`} />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 rounded-xl bg-blue-100" />
                <div className="h-24 rounded-xl bg-purple-100" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}