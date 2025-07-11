// src/hooks/useSmoothScroll.js
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

function useSmoothScroll() {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // speed
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing function
      direction: 'vertical', // vertical or horizontal
      gestureDirection: 'vertical', // vertical or horizontal
      smooth: true,
      mouseMultiplier: 1, // scroll speed
      smoothTouch: false, // much better on mobile
      touchMultiplier: 2,
      infinite: false,
    });

    // 2. Setup the animation frame loop
    let animationFrameId = null;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // 3. Cleanup on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []); // Empty dependency array ensures this runs only once
}

export default useSmoothScroll;