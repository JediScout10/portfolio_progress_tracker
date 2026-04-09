import { useEffect, useRef, useState } from 'react';
import { poseMap } from './characterDialogue';

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'certs', 'contact'];

export function useCharacterGuide() {
  const currentX = useRef(0);
  const targetX = useRef(0);
  const flipDirection = useRef(1); // 1 for right, -1 for left
  const currentPose = useRef('idle');
  
  const activeSectionRef = useRef('hero');
  const arrivedSectionRef = useRef('');
  
  // State only used to trigger the speech bubble re-render once arrived
  const [arrivedSection, setArrivedSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            activeSectionRef.current = id;
            
            const index = SECTION_IDS.indexOf(id);
            const total = SECTION_IDS.length;
            const percentage = total > 1 ? index / (total - 1) : 0.5;
            
            const screenW = window.innerWidth;
            const characterWidth = 120;
            const padding = 20;
            const minX = padding;
            const maxX = screenW - characterWidth - padding;
            
            targetX.current = minX + percentage * (maxX - minX);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Fix 2: Initial hero greeting on first load
    const timer = setTimeout(() => {
      if (arrivedSectionRef.current === '') {
        arrivedSectionRef.current = 'hero';
        setArrivedSection('hero');
      }
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const dx = targetX.current - currentX.current;
      const velocity = Math.abs(dx);
      
      if (velocity > 1) {
        // Moving state
        currentX.current += dx * 0.03; // Lerp
        flipDirection.current = dx > 0 ? 1 : -1;
        currentPose.current = 'walk';
        
        if (arrivedSectionRef.current !== '') {
          arrivedSectionRef.current = '';
          setArrivedSection('');
        }
      } else {
        // Arrived state
        currentX.current = targetX.current;
        currentPose.current = poseMap[activeSectionRef.current] || 'idle';
        
        if (arrivedSectionRef.current !== activeSectionRef.current) {
          arrivedSectionRef.current = activeSectionRef.current;
          setArrivedSection(activeSectionRef.current);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return { currentX, currentPose, flipDirection, arrivedSection };
}
