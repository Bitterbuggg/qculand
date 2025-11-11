import { useEffect, useRef, useState } from 'react';

/**
 * Hook to manage audio playback with proper cleanup
 * @param {string} audioPath - Path to the audio file
 * @param {Object} options - Audio options (loop, volume, autoplay)
 * @returns {{ play, pause, stop, isPlaying, error, setVolume }}
 */
export function useAudio(audioPath, options = {}) {
  const {
    loop = false,
    volume = 1.0,
    autoplay = false,
  } = options;

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize audio element
  useEffect(() => {
    if (!audioPath) return;

    try {
      const audio = new Audio(audioPath);
      audio.loop = loop;
      audio.volume = volume;
      audioRef.current = audio;

      // Event listeners
      const handleCanPlay = () => {
        setIsLoaded(true);
        setError(null);
        if (autoplay) {
          audio.play().catch((err) => {
            console.error('Audio autoplay failed:', err);
            setError(err);
          });
        }
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);
      const handleError = (e) => {
        console.error('Audio loading error:', e);
        setError(new Error('Failed to load audio'));
        setIsLoaded(false);
      };

      audio.addEventListener('canplaythrough', handleCanPlay);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      // Cleanup
      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlay);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        
        // Stop and release audio
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        audio.load();
        audioRef.current = null;
      };
    } catch (err) {
      console.error('Error initializing audio:', err);
      setError(err);
    }
  }, [audioPath, loop, volume, autoplay]);

  const play = () => {
    if (audioRef.current && isLoaded) {
      audioRef.current.play().catch((err) => {
        console.error('Play failed:', err);
        setError(err);
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const setVolume = (newVolume) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  };

  return {
    play,
    pause,
    stop,
    isPlaying,
    isLoaded,
    error,
    setVolume,
  };
}

/**
 * Hook to manage multiple audio tracks
 * @param {Object} audioMap - Map of audio keys to paths
 * @returns {{ playAudio, stopAudio, stopAll, currentlyPlaying }}
 */
export function useAudioManager(audioMap = {}) {
  const audioRefs = useRef({});
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);

  useEffect(() => {
    // Initialize all audio elements
    Object.entries(audioMap).forEach(([key, path]) => {
      if (!audioRefs.current[key]) {
        const audio = new Audio(path);
        audio.addEventListener('play', () => {
          setCurrentlyPlaying(prev => [...prev, key]);
        });
        audio.addEventListener('pause', () => {
          setCurrentlyPlaying(prev => prev.filter(k => k !== key));
        });
        audio.addEventListener('ended', () => {
          setCurrentlyPlaying(prev => prev.filter(k => k !== key));
        });
        audioRefs.current[key] = audio;
      }
    });

    // Cleanup all audio on unmount
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        audio.load();
      });
      audioRefs.current = {};
    };
  }, [audioMap]);

  const playAudio = (key, options = {}) => {
    const audio = audioRefs.current[key];
    if (!audio) {
      console.warn(`Audio key "${key}" not found`);
      return;
    }

    if (options.loop !== undefined) audio.loop = options.loop;
    if (options.volume !== undefined) audio.volume = options.volume;
    
    audio.play().catch((err) => {
      console.error(`Failed to play audio "${key}":`, err);
    });
  };

  const stopAudio = (key) => {
    const audio = audioRefs.current[key];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const stopAll = () => {
    Object.values(audioRefs.current).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    setCurrentlyPlaying([]);
  };

  return {
    playAudio,
    stopAudio,
    stopAll,
    currentlyPlaying,
  };
}
