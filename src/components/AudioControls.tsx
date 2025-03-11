import React, { useState } from 'react';

interface AudioControlsProps {
  audioUrl: string;
  ayahNumber: number;
  totalAyahs: number;
  qariName: string;
  surahName: string;
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onEnded: () => void;
  onError: () => void;
  onSeek: (ayahNumber: number) => void;
  nextAudioUrl?: string;
}

const AudioControls = ({
  audioUrl,
  ayahNumber,
  totalAyahs,
  qariName,
  surahName,
  isPlaying,
  audioRef,
  onPlayPause,
  onNext,
  onPrevious,
  onEnded,
  onError,
  onSeek,
  nextAudioUrl,
}: AudioControlsProps) => {
  const [volume, setVolume] = useState(1);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) {
      return (
        <path d="M3,9V15H7L12,20V4L7,9H3Z M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12Z" />
      );
    }
    if (volume < 0.5) {
      return (
        <path d="M5,9V15H9L14,20V4L9,9H5Z M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
      );
    }
    return (
      <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
    );
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const percent = (event.clientX - bounds.left) / bounds.width;
    const ayahNumber = Math.ceil(percent * totalAyahs);
    onSeek(ayahNumber);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-gradient-to-t from-black/95 to-black/75 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-2">
            {/* Progress Bar - Now at top */}
            <div 
              className="w-full group relative"
              onClick={handleProgressClick}
            >
              <div className="h-1.5 bg-gray-600/50 rounded-full overflow-hidden cursor-pointer 
                            hover:h-2 transition-all duration-200">
                <div 
                  className="h-full bg-[#ffd54f] group-hover:bg-[#ffd54f]/90 
                            transition-all duration-300 ease-out"
                  style={{ width: `${(ayahNumber / totalAyahs) * 100}%` }}
                />
              </div>
              {/* Hover preview */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 
                            px-2 py-1 rounded text-xs text-white opacity-0 
                            group-hover:opacity-100 transition-opacity">
                {ayahNumber}/{totalAyahs}
              </div>
            </div>

            {/* Controls and Info */}
            <div className="flex items-center justify-between gap-4 px-2">
              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[#ffd54f] font-medium truncate text-lg">
                  {surahName}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-400 text-sm truncate">{qariName}</p>
                  <span className="text-gray-600">•</span>
                  <p className="text-gray-400 text-sm">Ayah {ayahNumber}</p>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-6">
                <button 
                  onClick={onPrevious}
                  className="text-gray-400 hover:text-[#ffd54f] disabled:opacity-50 
                            transition-all duration-200 p-2"
                  disabled={ayahNumber <= 1}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19L5 12L12 5M19 19L12 12L19 5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <button 
                  onClick={onPlayPause}
                  className="bg-[#ffd54f] rounded-full p-3.5 hover:scale-105 
                            hover:bg-[#ffd54f]/90 active:scale-95
                            transition-all duration-200"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
                      <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
                      <path d="M8 5V19L19 12L8 5Z" />
                    </svg>
                  )}
                </button>

                <button 
                  onClick={onNext}
                  className="text-gray-400 hover:text-[#ffd54f] disabled:opacity-50 
                            transition-all duration-200 p-2"
                  disabled={ayahNumber >= totalAyahs}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5L19 12L12 19M5 5L12 12L5 19" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex-1 flex justify-end relative">
                <button 
                  className="text-gray-400 hover:text-[#ffd54f] transition-colors 
                            duration-200 p-2"
                  onClick={() => setIsVolumeOpen(!isVolumeOpen)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {getVolumeIcon()}
                  </svg>
                </button>

                {/* Volume Slider */}
                {isVolumeOpen && (
                  <div 
                    className="absolute bottom-full right-0 mb-2 p-2 bg-black/90 
                              rounded-lg backdrop-blur-sm"
                    onMouseLeave={() => setIsVolumeOpen(false)}
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-24 h-1 bg-gray-600 rounded-full appearance-none 
                                [&::-webkit-slider-thumb]:appearance-none 
                                [&::-webkit-slider-thumb]:h-3 
                                [&::-webkit-slider-thumb]:w-3 
                                [&::-webkit-slider-thumb]:rounded-full 
                                [&::-webkit-slider-thumb]:bg-[#ffd54f]
                                [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio
        src={audioUrl}
        className="hidden"
        autoPlay
        onEnded={onEnded}
        onError={onError}
        ref={audioRef}
      />
      {nextAudioUrl && (
        <audio
          className="hidden"
          preload="auto"
          src={nextAudioUrl}
        />
      )}
    </div>
  );
};

export default AudioControls;
