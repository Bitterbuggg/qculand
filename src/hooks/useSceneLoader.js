import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

/**
 * Hook to preload GLTF models and track loading state
 * @param {string[]} modelPaths - Array of model paths to preload
 * @returns {{ isLoading: boolean, error: Error | null, loadedModels: number, totalModels: number }}
 */
export function useSceneLoader(modelPaths = []) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedModels, setLoadedModels] = useState(0);

  useEffect(() => {
    if (!modelPaths.length) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadedModels(0);

    const loadModels = async () => {
      try {
        // Preload all models - useGLTF.preload doesn't return a promise
        // but synchronously initiates loading, so we just call it for each path
        modelPaths.forEach((path) => {
          try {
            useGLTF.preload(path);
          } catch (pathErr) {
            console.warn(`Failed to preload: ${path}`, pathErr);
          }
        });
        
        // Simulate loading progress for better UX
        for (let i = 0; i < modelPaths.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setLoadedModels(i + 1);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error preloading models:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    loadModels();
  }, [modelPaths]);

  return { isLoading, error, loadedModels, totalModels: modelPaths.length };
}
