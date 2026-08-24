// src/useElementOnScreen.js
import { useState, useEffect, useRef } from 'react';

const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const callback = (entries) => {
      const [entry] = entries;
      // entry.isIntersecting es true cuando el elemento entra en la vista
      setIsVisible(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(callback, options);
    
    // Guardamos la referencia actual para la limpieza
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      // Limpieza al desmontar el componente
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

export default useElementOnScreen;