import { useEffect, useRef, useState } from 'react';
import { poseMap, SECTION_IDS } from './characterDialogue';

const ALLOWED_SECTIONS = ['hero', 'stack', 'work', 'contact'];

export function useCharacterGuide() {
  const currentPose   = useRef('idle');
  const activeSectionRef   = useRef('hero');
  const [arrivedSection, setArrivedSection] = useState<string>('');

  // ── Intersection observer: update pose and dialogue instantly ──────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;

          if (activeSectionRef.current === id) return;
          if (!ALLOWED_SECTIONS.includes(id)) return;

          activeSectionRef.current = id;
          
          // Instantly update pose mapping and trigger dialogue
          currentPose.current = poseMap[id] || 'talk';
          
          setArrivedSection(''); // Refresh re-render mechanism for bubble
          setTimeout(() => {
            setArrivedSection(id);
          }, 50); // slight ms gap helps state refresh bubble
        });
      },
      { threshold: 0.4, rootMargin: '-60px 0px 0px 0px' }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const helloTimer = setTimeout(() => {
      if (activeSectionRef.current === 'hero') {
        currentPose.current = poseMap['hero'] || 'wave';
        setArrivedSection('hero');
      }
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(helloTimer);
    };
  }, []);

  return { 
    currentPose, 
    arrivedSection, 
    // Return dummy values for unused moving physics
    isMoving: { current: false }, 
    flipDirection: { current: -1 } 
  };
}
