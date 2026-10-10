"use client";

import React from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { PlayCircle, Lock, Star, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CEOAcademyPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;
  const router = useRouter();

  const dummyVideos = [
    {
      id: 1,
      title: "How to Source Quality Ingredients",
      duration: "12:45",
      locked: false,
      progress: 100,
      thumbnail: "bg-blue-500/20",
    },
    {
      id: 2,
      title: "Pricing Your Homemade Products",
      duration: "18:20",
      locked: false,
      progress: 45,
      thumbnail: "bg-purple-500/20",
    },
    {
      id: 3,
      title: "Taking Perfect Photos with Your Phone",
      duration: "15:10",
      locked: true,
      progress: 0,
      thumbnail: "bg-indigo-500/20",
    },
    {
      id: 4,
      title: "Packaging for Safe Delivery",
      duration: "22:05",
      locked: true,
      progress: 0,
      thumbnail: "bg-pink-500/20",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2 flex items-center gap-3">
          <PlayCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          {t.academy}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {t.academyDesc} Watch these free blueprint videos to learn how to launch your own successful store.
        </p>
      </div>

      {/* Featured Video Player (Dummy) */}
      <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden mb-12 shadow-xl relative group cursor-pointer border border-border/50">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-purple-900/40 flex items-center justify-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
            <PlayCircle className="w-10 h-10 text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-2xl font-bold text-white mb-1">Pricing Your Homemade Products</h2>
          <p className="text-blue-200">Module 2 • 18:20</p>
          
          <div className="w-full h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-blue-500 w-[45%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Course Modules */}
      <div>
        <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-[#FFD700]" />
          Course Modules
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dummyVideos.map((video) => (
            <div 
              key={video.id}
              className={`flex gap-4 p-4 rounded-2xl border transition-all ${
                video.locked 
                  ? "bg-muted/30 border-border/30 opacity-75" 
                  : "bg-background border-border/50 hover:border-blue-500/50 hover:shadow-md cursor-pointer"
              }`}
            >
              {/* Thumbnail */}
              <div className={`w-32 h-24 rounded-xl shrink-0 relative overflow-hidden flex items-center justify-center ${video.thumbnail}`}>
                {video.locked ? (
                  <Lock className="w-8 h-8 text-muted-foreground/50" />
                ) : video.progress === 100 ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                ) : (
                  <PlayCircle className="w-8 h-8 text-blue-500" />
                )}
                
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center flex-1 py-1">
                <h4 className={`font-bold line-clamp-2 leading-tight mb-1 ${video.locked ? "text-muted-foreground" : "text-foreground"}`}>
                  {video.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-auto">Module {video.id}</p>
                
                {!video.locked && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${video.progress === 100 ? "bg-green-500" : "bg-blue-500"}`}
                        style={{ width: `${video.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground shrink-0">
                      {video.progress}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
