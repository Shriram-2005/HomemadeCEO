"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, PlayCircle, BookOpen, Star, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SellerAcademyPage() {
  const router = useRouter();

  const courses = [
    { title: "How to pack fragile items", duration: "5 mins", type: "Video" },
    { title: "Growing your audience with Shorts", duration: "10 mins", type: "Video" },
    { title: "Understanding FSSAI compliance", duration: "15 mins", type: "Article" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 pb-32 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Seller Academy</h1>
          <p className="text-sm text-muted-foreground font-medium">Learn how to grow your business</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-[2rem] p-8 text-white mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-purple-600/20"
      >
        <div>
          <h2 className="text-3xl font-bold mb-2">Masterclass: Sales</h2>
          <p className="text-purple-100 max-w-md">Join our latest masterclass to learn the secrets of scaling from 10 to 100 orders a day.</p>
          <button className="mt-6 bg-white text-purple-600 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
            <PlayCircle className="w-5 h-5" /> Start Learning
          </button>
        </div>
        <Trophy className="w-32 h-32 text-purple-300 opacity-80" />
      </motion.div>

      <h3 className="text-xl font-bold mb-4">Recommended Courses</h3>
      <div className="space-y-4">
        {courses.map((course, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-card border border-border/50 p-4 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              {course.type === "Video" ? <PlayCircle className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-base">{course.title}</h4>
              <p className="text-xs text-muted-foreground">{course.type} • {course.duration}</p>
            </div>
            <div className="text-yellow-500">
              <Star className="w-5 h-5 fill-yellow-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
