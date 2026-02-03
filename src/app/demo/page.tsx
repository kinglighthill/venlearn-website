"use client";

import { useState } from "react";
import { Play, ArrowRight, ExternalLink, X } from "lucide-react";

const demoVideos = [
  {
    title: "Getting Started with Venlearn Editor",
    thumbnail: "/thumbnails/editor.jpg",
    duration: "5:30",
    color: "from-indigo-500 to-purple-600",
    videoLink: "https://www.youtube.com/embed/ulg4bjQQJi0",
  },
  {
    title: "Venlearn Admin Overview",
    thumbnail: "/thumbnails/admin.jpg",
    duration: "12:15",
    color: "from-cyan-400 to-blue-500",
    videoLink: "https://www.youtube.com/embed/ulg4bjQQJi0",
  },
  {
    title: "Student Assessment Walkthrough",
    thumbnail: "/thumbnails/student.jpg",
    duration: "8:45",
    color: "from-emerald-400 to-teal-500",
    videoLink: "https://www.youtube.com/embed/ulg4bjQQJi0",
  },
];

function VideoModal({ isOpen, onClose, videoLink, title }: { isOpen: boolean; onClose: () => void; videoLink: string; title: string }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10"
        >
          <X size={20} />
        </button>
        <iframe
          className="w-full h-full"
          src={`${videoLink}?autoplay=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default function DemoPage() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);

  return (
    <div className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-sm font-semibold mb-4 border border-blue-100">
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
          Product Walkthroughs
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          See VenLearn in Action
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl">
          Watch deep-dive tutorials and feature overviews to understand how VenLearn can transform your educational institution.
        </p>
      </div>

      {/* Featured Video - The Big Player */}
      <div className="mb-20">
        <div
          onClick={() => setIsPlayingFeatured(true)}
          className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200 bg-white group cursor-pointer"
        >
          {isPlayingFeatured ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/ulg4bjQQJi0?autoplay=1"
              title="VenLearn Platform Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              {/* Placeholder Gradient Content */}
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">

                {/* Play Button */}
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 z-10">
                  <Play className="fill-brand-primary stroke-brand-primary ml-1" size={32} />
                </div>

                {/* Abstract bg */}
                <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]"></div>
              </div>

              {/* UI Overlays */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent transition-opacity group-hover:opacity-0 duration-300">
                <h2 className="text-2xl font-bold text-white mb-2">VenLearn Platform Tour: From Zero to Hero</h2>
                <p className="text-white/80 font-medium">A comprehensive 10-minute guide to setting up your first institution.</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* More Videos Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">More Videos</h2>
          <a
            href="https://youtube.com/@venlearn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-brand-primary hover:text-blue-700 transition-colors text-sm font-bold"
          >
            View all on YouTube <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoVideos.map((video, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => setActiveVideo(index)}
            >
              {/* Thumbnail */}
              <div className={`relative aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-100 shadow-sm border border-slate-200 transition-transform duration-300 group-hover:-translate-y-1`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Play className="fill-slate-900 stroke-slate-900 ml-0.5" size={16} />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors">{video.title}</h3>
              <div className="flex items-center gap-2 mt-2 text-brand-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                Watch Now <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Overlay */}
      <VideoModal
        isOpen={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        videoLink={activeVideo !== null ? demoVideos[activeVideo].videoLink : ""}
        title={activeVideo !== null ? demoVideos[activeVideo].title : ""}
      />

      {/* Youtube Link Featuret */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Visit our YouTube Channel</h3>
          <p className="text-slate-500">Subscribe for weekly tips, new feature announcements, and success stories from other institutions using VenLearn.</p>
        </div>
        <a href="https://www.youtube.com/@venlearn" target="_blank" className="px-8 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-lg active:scale-95 flex items-center gap-2">
          Open YouTube <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
}
