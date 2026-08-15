"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Headphones, Volume2, VolumeX, Sparkles } from "lucide-react";

interface AudioBriefingPlayerProps {
  duration: string;
  title: string;
}

export default function AudioBriefingPlayer({ duration, title }: AudioBriefingPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<"1x" | "1.5x" | "2x">("1x");
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const increment = playbackSpeed === "1x" ? 0.8 : playbackSpeed === "1.5x" ? 1.2 : 1.6;
          return prev + increment;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const toggleSpeed = () => {
    if (playbackSpeed === "1x") setPlaybackSpeed("1.5x");
    else if (playbackSpeed === "1.5x") setPlaybackSpeed("2x");
    else setPlaybackSpeed("1x");
  };

  return (
    <div className="w-full rounded-2xl bg-surface-container/90 border border-surface-dim/80 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Play Button & Title */}
        <div className="flex items-center gap-3.5 flex-grow">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-container hover:scale-105 active:scale-95 transition-all shadow-md flex-shrink-0 cursor-pointer"
            aria-label={isPlaying ? "Pause audio briefing" : "Play audio briefing"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white text-white" />
            ) : (
              <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
            )}
          </button>

          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider mb-0.5">
              <Headphones className="w-3.5 h-3.5" />
              <span>Executive Audio Briefing</span>
              <span className="text-[10px] text-text-muted px-1.5 py-0.5 rounded bg-surface-pure border border-surface-dim">
                {duration}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-on-surface truncate">
              {title}
            </p>
          </div>
        </div>

        {/* Controls & Waveform animation */}
        <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-dim/40">
          {/* Animated sound wave bars when playing */}
          <div className="flex items-center gap-1 h-5 px-2">
            {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50].map((height, idx) => (
              <div
                key={idx}
                className="w-1 bg-primary/70 rounded-full transition-all duration-200"
                style={{
                  height: isPlaying ? `${Math.max(20, (height * (progress % 10 + 1)) / 10)}%` : "25%",
                  opacity: isPlaying ? 1 : 0.4,
                }}
              />
            ))}
          </div>

          {/* Speed Toggle */}
          <button
            onClick={toggleSpeed}
            className="px-2.5 py-1 rounded-lg bg-surface-pure hover:bg-surface-subtle border border-surface-dim text-xs font-bold text-primary transition-colors cursor-pointer"
          >
            {playbackSpeed}
          </button>

          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg text-text-muted hover:text-primary transition-colors cursor-pointer"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3.5 w-full bg-surface-dim/60 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-secondary-container h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
