"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Loader2,
  RefreshCw,
  Clock,
  SkipForward,
} from "lucide-react";

const SPEEDS = [1, 1.25, 1.5, 2];
const HIDE_CONTROLS_AFTER_MS = 2500;

function formatTime(t: number): string {
  if (!Number.isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface CoursePlayerProps {
  src: string;
  poster?: string;
  title: string;
  eyebrow: string;
  duration?: string;
  endNote?: string;
  /** Short brand intro played before the lesson on the first play. */
  intro?: string;
  /** Start playing on page load. Browsers only allow this muted, so a "Turn on sound" button appears. */
  autoPlay?: boolean;
}

type FullscreenVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

export default function CoursePlayer({
  src,
  poster,
  title,
  eyebrow,
  duration,
  endNote,
  intro,
  autoPlay = false,
}: CoursePlayerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<FullscreenVideo>(null);
  const introRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // "metadata" fetches only the small index; switch to "auto" as soon as the
  // viewer shows intent (hover / focus / touch), so pressing play is instant.
  const [preload, setPreload] = useState<"metadata" | "auto">(autoPlay ? "auto" : "metadata");
  const [needsSound, setNeedsSound] = useState(false);
  // cover → (intro) → lesson
  const [phase, setPhase] = useState<"cover" | "intro" | "lesson">("cover");
  const started = phase === "lesson";
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speedIdx, setSpeedIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [scrubbing, setScrubbing] = useState(false);
  const [hover, setHover] = useState<{ x: number; time: number } | null>(null);

  const warmUp = useCallback(() => setPreload("auto"), []);

  // Smooth progress while playing (timeupdate alone fires only ~4x a second).
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      if (videoRef.current && !scrubbing) setCurrent(videoRef.current.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, scrubbing]);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === wrapRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setControlsVisible(false);
    }, HIDE_CONTROLS_AFTER_MS);
  }, []);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    introRef.current?.pause();
    setPhase("lesson");
    setEnded(false);
    setPreload("auto");
    v.play().catch(() => {
      // Blocked by the browser's sound rule: play muted and offer sound.
      v.muted = true;
      setNeedsSound(true);
      v.play().catch(() => setPlaying(false));
    });
    showControls();
  }, [showControls]);

  // First press: play the intro while the lesson keeps buffering underneath.
  const start = useCallback(() => {
    setPreload("auto");
    const i = introRef.current;
    if (!intro || !i) return play();
    setPhase("intro");
    i.currentTime = 0;
    i.play().catch(() => {
      i.muted = true;
      if (videoRef.current) videoRef.current.muted = true;
      setNeedsSound(true);
      i.play().catch(play);
    });
  }, [intro, play]);

  const turnOnSound = useCallback(() => {
    if (introRef.current) introRef.current.muted = false;
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      if (v.volume === 0) v.volume = 1;
    }
    setNeedsSound(false);
  }, []);

  // Shared links open straight into the video.
  const autoStarted = useRef(false);
  useEffect(() => {
    if (!autoPlay || autoStarted.current) return;
    autoStarted.current = true;
    start();
  }, [autoPlay, start]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (needsSound && !v.paused) return turnOnSound();
    if (v.paused) play();
    else v.pause();
  }, [play, needsSound, turnOnSound]);

  const seekBy = useCallback(
    (delta: number) => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = Math.min(Math.max(v.currentTime + delta, 0), v.duration || 0);
      setCurrent(v.currentTime);
      showControls();
    },
    [showControls],
  );

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.volume === 0) v.volume = 1;
  }, []);

  const toggleFullscreen = useCallback(() => {
    const wrap = wrapRef.current;
    const v = videoRef.current;
    if (!wrap || !v) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (wrap.requestFullscreen) {
      wrap.requestFullscreen().catch(() => v.webkitEnterFullscreen?.());
    } else {
      v.webkitEnterFullscreen?.(); // iPhone Safari
    }
  }, []);

  const cycleSpeed = useCallback(() => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    if (videoRef.current) videoRef.current.playbackRate = SPEEDS[next];
  }, [speedIdx]);

  // --- Progress bar (pointer + keyboard) ---
  const timeAtClientX = (clientX: number) => {
    const bar = barRef.current;
    const v = videoRef.current;
    if (!bar || !v || !v.duration) return { x: 0, time: 0 };
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    return { x: ratio * rect.width, time: ratio * v.duration };
  };

  const onBarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setScrubbing(true);
    const { time } = timeAtClientX(e.clientX);
    setCurrent(time);
    if (videoRef.current) videoRef.current.currentTime = time;
  };
  const onBarPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const pos = timeAtClientX(e.clientX);
    setHover(pos);
    if (scrubbing) {
      setCurrent(pos.time);
      if (videoRef.current) videoRef.current.currentTime = pos.time;
    }
  };
  const onBarPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setScrubbing(false);
  };
  const onBarKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, number> = { ArrowLeft: -5, ArrowRight: 5, PageDown: -30, PageUp: 30 };
    if (e.key in map) {
      e.preventDefault();
      e.stopPropagation();
      seekBy(map[e.key]);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      e.stopPropagation();
      if (videoRef.current) videoRef.current.currentTime = e.key === "Home" ? 0 : total;
    }
  };

  // --- Keyboard shortcuts on the player ---
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (phase !== "lesson") {
      if (e.key === "Escape" && phase === "intro") play();
      return;
    }
    const tag = (e.target as HTMLElement).tagName;
    const onControl = tag === "BUTTON" || tag === "INPUT";
    switch (e.key) {
      case " ":
      case "k":
        if (onControl && e.key === " ") return;
        e.preventDefault();
        togglePlay();
        break;
      case "ArrowLeft":
      case "j":
        if (onControl && tag === "INPUT") return;
        e.preventDefault();
        seekBy(e.key === "j" ? -10 : -5);
        break;
      case "ArrowRight":
      case "l":
        if (onControl && tag === "INPUT") return;
        e.preventDefault();
        seekBy(e.key === "l" ? 10 : 5);
        break;
      case "m":
        toggleMute();
        break;
      case "f":
        toggleFullscreen();
        break;
    }
  };

  const progress = total ? (current / total) * 100 : 0;
  const bufferedPct = total ? (buffered / total) * 100 : 0;
  const chromeVisible = !playing || controlsVisible || scrubbing;

  const iconBtn =
    "inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white/90 hover:text-white hover:bg-white/15 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container";

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      role="region"
      aria-label={`Video player: ${title}`}
      onKeyDown={onKeyDown}
      onPointerEnter={warmUp}
      onFocus={warmUp}
      onTouchStart={warmUp}
      onPointerMove={() => started && showControls()}
      onPointerLeave={() => playing && setControlsVisible(false)}
      className={`group/player relative w-full aspect-video overflow-hidden bg-primary select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-container/50 ${
        fullscreen
          ? "rounded-none"
          : "rounded-2xl sm:rounded-3xl ring-1 ring-primary/10 shadow-[0_24px_60px_-20px_rgba(0,19,86,0.45)]"
      } ${started && playing && !chromeVisible ? "cursor-none" : ""}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload={preload}
        playsInline
        className="absolute inset-0 w-full h-full object-contain bg-black"
        onClick={started ? togglePlay : undefined}
        onDoubleClick={toggleFullscreen}
        onPlay={() => setPlaying(true)}
        onPause={() => {
          setPlaying(false);
          setControlsVisible(true);
        }}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onCanPlay={() => setWaiting(false)}
        onEnded={() => {
          setEnded(true);
          setPlaying(false);
        }}
        onError={() => setFailed(true)}
        onLoadedMetadata={(e) => setTotal(e.currentTarget.duration)}
        onDurationChange={(e) => setTotal(e.currentTarget.duration)}
        onTimeUpdate={(e) => !playing && setCurrent(e.currentTarget.currentTime)}
        onProgress={(e) => {
          const b = e.currentTarget.buffered;
          if (b.length) setBuffered(b.end(b.length - 1));
        }}
        onVolumeChange={(e) => {
          setMuted(e.currentTarget.muted);
          setVolume(e.currentTarget.volume);
          if (!e.currentTarget.muted) setNeedsSound(false);
        }}
      />

      {/* Brand intro, played once before the lesson */}
      {intro && (
        <video
          ref={introRef}
          src={intro}
          preload={preload}
          playsInline
          aria-hidden="true"
          onEnded={play}
          onError={play}
          className={`absolute inset-0 z-[15] w-full h-full object-contain bg-primary transition-opacity duration-300 ${
            phase === "intro" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      )}
      {phase === "intro" && (
        <button
          type="button"
          onClick={play}
          className="absolute z-20 bottom-4 right-4 sm:bottom-6 sm:right-6 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-sm font-semibold hover:bg-black/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container"
        >
          Skip intro
          <SkipForward className="w-4 h-4" />
        </button>
      )}

      {needsSound && phase !== "cover" && (
        <button
          type="button"
          onClick={turnOnSound}
          className="absolute z-30 top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white text-primary text-sm font-bold shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-secondary-container hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container"
        >
          <VolumeX className="w-4 h-4" />
          Turn on sound
        </button>
      )}

      {/* Cover screen before the first play */}
      {phase === "cover" && (
        <button
          type="button"
          onClick={start}
          aria-label={`Play ${title}`}
          className="absolute inset-0 z-20 w-full h-full text-left cursor-pointer group/cover focus-visible:outline-none"
        >
          {poster && (
            <Image
              src={poster}
              alt=""
              fill
              preload
              sizes="(min-width: 1280px) 860px, (min-width: 1024px) 66vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover/cover:scale-[1.02]"
            />
          )}
          <div className="absolute inset-0 bg-primary/10 transition-colors duration-300 group-hover/cover:bg-primary/5" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/85 to-transparent" />

          <span className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex items-center justify-center">
              <span className="relative flex items-center justify-center w-16 h-16 sm:w-[76px] sm:h-[76px] rounded-full bg-secondary-container text-white shadow-[0_12px_32px_-6px_rgba(252,133,58,0.6)] ring-8 ring-white/40 transition-transform duration-200 group-hover/cover:scale-105 group-active/cover:scale-95 group-focus-visible/cover:ring-4 group-focus-visible/cover:ring-white/70">
                <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
              </span>
            </span>
          </span>

          {/* The cover image already shows the title, so only the label and length go here. */}
          <span className="absolute left-0 right-0 bottom-0 p-4 sm:p-6 flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em]">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
              {eyebrow}
            </span>
            {duration && (
              <span className="inline-flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                {duration}
              </span>
            )}
          </span>
        </button>
      )}

      {/* Buffering spinner */}
      {started && waiting && !ended && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <Loader2 className="w-12 h-12 text-white/90 motion-safe:animate-spin" aria-label="Loading" />
        </div>
      )}

      {/* Load error */}
      {failed && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-primary/95 text-white text-center p-6">
          <p className="font-display font-bold text-lg">This video could not load.</p>
          <p className="text-sm text-white/70">Check your connection and refresh the page.</p>
        </div>
      )}

      {/* End screen */}
      {ended && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-primary/85 backdrop-blur-sm text-white text-center p-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary-container">Video complete</p>
          <p className="font-display font-bold text-xl sm:text-2xl max-w-md">{endNote ?? "Thanks for watching."}</p>
          <button
            type="button"
            onClick={() => {
              if (videoRef.current) videoRef.current.currentTime = 0;
              play();
            }}
            className="mt-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary font-semibold text-sm hover:bg-secondary-container hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Watch again
          </button>
        </div>
      )}

      {/* Control bar */}
      {started && !ended && (
        <div
          className={`absolute inset-x-0 bottom-0 z-10 transition-opacity duration-200 ${
            chromeVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

          <div className="relative px-3 sm:px-5 pt-10 pb-2 sm:pb-3">
            {/* Progress */}
            <div
              ref={barRef}
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(total)}
              aria-valuenow={Math.round(current)}
              aria-valuetext={`${formatTime(current)} of ${formatTime(total)}`}
              onPointerDown={onBarPointerDown}
              onPointerMove={onBarPointerMove}
              onPointerUp={onBarPointerUp}
              onPointerLeave={() => setHover(null)}
              onKeyDown={onBarKeyDown}
              className="group/bar relative h-5 flex items-center cursor-pointer touch-none focus-visible:outline-none"
            >
              <div className="relative w-full h-1 group-hover/bar:h-1.5 group-focus-visible/bar:h-1.5 transition-[height] duration-150 rounded-full bg-white/25 overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-white/35 rounded-full" style={{ width: `${bufferedPct}%` }} />
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-secondary-container to-[#ffa66b]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(252,133,58,0.45)] transition-transform duration-150 ${
                  scrubbing ? "scale-110" : "scale-0 group-hover/bar:scale-100 group-focus-visible/bar:scale-100"
                }`}
                style={{ left: `${progress}%` }}
              />
              {hover && (
                <div
                  className="absolute bottom-6 -translate-x-1/2 px-2 py-1 rounded-md bg-primary text-white text-[11px] font-semibold tabular-nums pointer-events-none"
                  style={{ left: hover.x }}
                >
                  {formatTime(hover.time)}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button type="button" onClick={togglePlay} className={iconBtn} aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
              </button>
              <button type="button" onClick={() => seekBy(-10)} className={iconBtn} aria-label="Back 10 seconds">
                <RotateCcw className="w-[18px] h-[18px]" />
              </button>
              <button type="button" onClick={() => seekBy(10)} className={iconBtn} aria-label="Forward 10 seconds">
                <RotateCw className="w-[18px] h-[18px]" />
              </button>

              <div className="flex items-center group/vol">
                <button type="button" onClick={toggleMute} className={iconBtn} aria-label={muted ? "Unmute" : "Mute"}>
                  {muted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  aria-label="Volume"
                  onChange={(e) => {
                    const v = videoRef.current;
                    if (!v) return;
                    v.volume = Number(e.target.value);
                    v.muted = v.volume === 0;
                  }}
                  className="hidden sm:block w-0 opacity-0 group-hover/vol:w-20 group-hover/vol:opacity-100 focus-visible:w-20 focus-visible:opacity-100 transition-all duration-200 accent-secondary-container cursor-pointer"
                />
              </div>

              <span className="ml-1.5 sm:ml-3 text-white/90 text-xs sm:text-sm font-medium tabular-nums whitespace-nowrap">
                {formatTime(current)} <span className="text-white/50">/ {formatTime(total)}</span>
              </span>

              <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
                <button
                  type="button"
                  onClick={cycleSpeed}
                  className="h-8 min-w-11 px-2.5 rounded-full text-white text-xs font-bold tabular-nums bg-white/10 hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container"
                  aria-label={`Playback speed ${SPEEDS[speedIdx]}x. Change speed`}
                >
                  {SPEEDS[speedIdx]}×
                </button>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className={iconBtn}
                  aria-label={fullscreen ? "Exit full screen" : "Full screen"}
                >
                  {fullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
