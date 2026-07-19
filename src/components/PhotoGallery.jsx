import React, { useState, useEffect, useRef } from 'react';
import { Play, Volume2, VolumeX, Maximize2, Film } from 'lucide-react';

// Desktop: 1440p WebM (23MB — tracked in git, great quality)
// Mobile:  MP4 phone version (6.7MB — also tracked in git)
const VIDEO_WEB    = '/gallery_video_web.webm';
const VIDEO_MOBILE = '/gallery_video_mobile.mp4';

export default function PhotoGallery() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setHeaderVisible(true), 100);
    setTimeout(() => setVisible(true), 200);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const videoSrc = isMobile ? VIDEO_MOBILE : VIDEO_WEB;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(cur);
    setProgress((cur / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * (videoRef.current.duration || 0);
  };

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative min-h-screen bg-brand-darker pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-start">

      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-brand-pink/6 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-gold/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div
          className="text-center mb-10 sm:mb-14"
          style={{
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(28px)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-pink/30 bg-brand-pink/8 mb-5">
            <Film size={13} className="text-brand-pink" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-brand-pink uppercase">Official Film</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            <span className="text-white">SIH 3.0 </span>
            <span className="bg-gradient-to-r from-brand-pink via-rose-300 to-brand-orange bg-clip-text text-transparent">
              Highlights
            </span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Relive the innovation, energy, and excellence of SISTec Innovation Hackathon 3.0.
          </p>
        </div>

        {/* ── Video Player ── */}
        <div
          ref={sectionRef}
          style={{
            transition: 'opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
          }}
        >
          {/* Outer glow wrapper */}
          <div className="relative rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-br from-brand-pink/40 via-brand-purple/20 to-brand-blue/30 shadow-[0_0_80px_rgba(236,72,153,0.18)]">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black group">

              {/* Video element */}
              <video
                ref={videoRef}
                src={videoSrc}
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                className="w-full object-cover"
                style={{
                  maxHeight: isMobile ? '78vh' : '68vh',
                  minHeight: '280px',
                  display: 'block',
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />

              {/* Gradient overlay (always visible at bottom) */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

              {/* Top controls – visible on hover */}
              <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-b from-black/60 to-transparent">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.18em] text-brand-pink uppercase mb-0.5">SISTec Innovation Hackathon</p>
                  <h2 className="text-white font-bold text-base sm:text-xl">SIH 3.0 — Official Highlights</h2>
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="p-2.5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/15 text-white/70 hover:text-white hover:bg-black/60 transition-all"
                >
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* Centre play button when paused */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center group/play"
                >
                  <div
                    className="flex items-center justify-center w-16 h-16 sm:w-22 sm:h-22 rounded-full text-white transition-all duration-300
                      group-hover/play:scale-110"
                    style={{
                      width: '72px', height: '72px',
                      background: 'linear-gradient(135deg, #ec4899, #f97316)',
                      boxShadow: '0 0 48px rgba(236,72,153,0.55), 0 0 100px rgba(236,72,153,0.2)',
                    }}
                  >
                    <Play size={28} fill="currentColor" className="ml-1.5" />
                  </div>
                </button>
              )}

              {/* Bottom control bar */}
              <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-4 sm:pb-5 opacity-0 group-hover:opacity-100 transition-all duration-300">

                {/* Progress bar */}
                <div
                  ref={progressRef}
                  className="w-full h-1 sm:h-1.5 rounded-full bg-white/20 cursor-pointer mb-3 relative overflow-hidden"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-pink to-brand-orange transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controls row */}
                <div className="flex items-center gap-3">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-pink/90 text-white hover:scale-110 hover:bg-brand-pink transition-all duration-200 shadow-[0_0_16px_rgba(236,72,153,0.4)]"
                  >
                    {isPlaying ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1"/>
                        <rect x="14" y="4" width="4" height="16" rx="1"/>
                      </svg>
                    ) : (
                      <Play size={16} fill="currentColor" className="ml-0.5" />
                    )}
                  </button>

                  {/* Time */}
                  <span className="text-white/60 text-xs font-mono tabular-nums">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>

                  <div className="flex-1" />

                  {/* Device badge */}
                  <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/8 border border-white/10 text-[11px] text-white/50 font-medium">
                    {isMobile ? '📱 Mobile' : '🖥️ Desktop'}
                  </span>

                  {/* Mute */}
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-white/15 text-white/60 hover:text-white hover:bg-black/50 transition-all"
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="hidden sm:flex p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-white/15 text-white/60 hover:text-white hover:bg-black/50 transition-all"
                  >
                    <Maximize2 size={15} />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Below-video strip */}
          <div className="mt-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
              <p className="text-brand-gray/60 text-xs">
                Auto-selects{' '}
                <span className="text-brand-pink font-semibold">
                  {isMobile ? 'mobile-optimised' : 'high-quality desktop'}
                </span>{' '}
                version
              </p>
            </div>
            <span className="text-brand-gray/30 text-xs hidden sm:block">SIH 3.0 © SISTec-R</span>
          </div>
        </div>

      </div>
    </section>
  );
}
