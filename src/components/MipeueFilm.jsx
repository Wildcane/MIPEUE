import React, { useRef, useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Film,
  Sparkles,
} from 'lucide-react';

const REELS = [
  {
    id: 'shortfilm',
    titulo: 'MIPEUE FILM — SHORTFILM OFICIAL',
    subtitulo: 'Mitos nocturnos, identidad y calle nicaragüense',
    duracionLabel: '01:04',
    src: '/assets/video/mipeue-film.mp4',
    poster: '/assets/video/mipeue-film-poster.jpg',
    descripcion:
      'Cortometraje editorial para el Mini Drop de Octubre. Una exploración visual donde las leyendas del Cadejo y La Cegua habitan la estética urbana contemporánea de Nicaragua.',
  },
  {
    id: 'drop-teaser',
    titulo: 'MINI DROP OCTUBRE — REEL DE CAMPAÑA',
    subtitulo: 'Presentación visual de las 4 piezas de colección',
    duracionLabel: '00:10',
    src: '/assets/video/hero-drop.mp4',
    poster: '/assets/video/hero-drop-poster.jpg',
    descripcion:
      'Teaser oficial de apertura del catálogo de octubre con las siluetas en movimiento y atmósfera nocturna de la marca.',
  },
];

export default function MipeueFilm() {
  const videoRef = useRef(null);
  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('01:04');

  const activeReel = REELS[activeReelIdx];

  const formatSeconds = (sec) => {
    if (!sec || Number.isNaN(sec)) return '00:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleRestart = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play();
    setIsPlaying(true);
  };

  const handleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) {
      v.requestFullscreen();
    } else if (v.webkitRequestFullscreen) {
      v.webkitRequestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
    setCurrentTime(formatSeconds(v.currentTime));
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setDuration(formatSeconds(v.duration));
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    v.currentTime = ratio * v.duration;
    setProgress(ratio * 100);
  };

  const handleSelectReel = (idx) => {
    setActiveReelIdx(idx);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('00:00');
    setDuration(REELS[idx].duracionLabel);
  };

  return (
    <section
      id="mipeue-film"
      aria-label="Sección Cinematográfica MiPEUE Film"
      className="relative w-full border-t border-cream/15 bg-forest py-20 sm:py-28"
    >
      {/* Subtle Pine Ambient Backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, #153d35 0%, #0e3831 75%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Header Row */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cream/25 bg-pine/70 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cream">
              <Film className="h-3.5 w-3.5" />
              <span>SHORTFILM · CINE DE MARCA</span>
            </div>
            <h2 className="font-editorial-title text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl">
              MiPEUE FILM
            </h2>
            <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-cream/85 sm:text-base">
              {activeReel.descripcion}
            </p>
          </div>

          {/* Reel Switcher */}
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-cream/20 bg-black/25 p-1.5">
            {REELS.map((reel, idx) => {
              const active = idx === activeReelIdx;
              return (
                <button
                  key={reel.id}
                  type="button"
                  onClick={() => handleSelectReel(idx)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-all ${
                    active
                      ? 'bg-cream text-forest font-bold'
                      : 'text-cream/75 hover:bg-cream/10 hover:text-white'
                  }`}
                >
                  <span>{idx === 0 ? 'Shortfilm (01:04)' : 'Teaser Drop (00:10)'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nocturnal Widescreen Cinema Container */}
        <div className="group relative overflow-hidden rounded-2xl border border-cream/25 bg-slate shadow-[0_32px_70px_rgba(0,0,0,0.65)]">
          {/* Top Cinema Frame Bar */}
          <div className="flex items-center justify-between border-b border-cream/15 bg-black/45 px-4 py-2.5 sm:px-6">
            <div className="flex items-center gap-2.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  isPlaying ? 'bg-cream animate-pulse' : 'bg-cream/40'
                }`}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/90">
                {activeReel.titulo}
              </span>
            </div>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-cream/65 sm:inline">
              16:9 WIDESCREEN · AUDIO ORIGINAL
            </span>
          </div>

          {/* Video Viewport */}
          <div className="relative aspect-video w-full bg-black">
            <video
              ref={videoRef}
              key={activeReel.src}
              src={activeReel.src}
              poster={activeReel.poster}
              playsInline
              preload="metadata"
              onClick={togglePlay}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              className="h-full w-full cursor-pointer object-contain"
            />

            {/* Big Center Play Button Overlay when Paused */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Reproducir MiPEUE Film"
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 hover:bg-black/30 focus:outline-none"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cream bg-cream/95 text-forest shadow-2xl transition-transform duration-300 hover:scale-110 sm:h-24 sm:w-24">
                  <Play className="ml-1 h-8 w-8 fill-forest sm:h-10 sm:w-10" />
                </div>
                <span className="mt-4 rounded-full border border-cream/35 bg-black/65 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cream">
                  Reproducir Corto Oficial
                </span>
              </button>
            )}
          </div>

          {/* Clean Custom Player Controls */}
          <div className="border-t border-cream/15 bg-black/65 px-4 py-3.5 backdrop-blur-md sm:px-6">
            {/* Interactive Scrubber */}
            <div
              role="slider"
              tabIndex={0}
              aria-label="Progreso del video"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              onClick={handleSeek}
              className="group/bar mb-3 flex h-2 w-full cursor-pointer items-center rounded-full bg-cream/20"
            >
              <div
                className="relative h-full rounded-full bg-cream transition-all duration-100"
                style={{ width: `${progress}%` }}
              >
                <span className="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover/bar:opacity-100" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Left Transport Controls */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-forest transition-colors hover:bg-white"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3.5 w-3.5 fill-forest" />
                      <span>Pausa</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-forest" />
                      <span>Play</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  aria-label="Reiniciar video"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-cream hover:bg-cream/10"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-cream hover:bg-cream/10"
                >
                  {isMuted ? (
                    <VolumeX className="h-3.5 w-3.5" />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5" />
                  )}
                </button>

                <span className="ml-1 font-mono text-xs tabular-nums text-cream/85">
                  {currentTime} <span className="text-cream/40">/</span> {duration}
                </span>
              </div>

              {/* Right Subtitle & Fullscreen */}
              <div className="flex items-center gap-3">
                <span className="hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/70 md:inline-flex">
                  <Sparkles className="h-3 w-3 text-cream" />
                  {activeReel.subtitulo}
                </span>

                <button
                  type="button"
                  onClick={handleFullscreen}
                  aria-label="Pantalla completa"
                  className="inline-flex items-center gap-1.5 rounded-full border border-cream/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cream transition-colors hover:border-cream hover:bg-cream/10"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Pantalla Completa</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
