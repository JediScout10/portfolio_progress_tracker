"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useCharacterGuide } from './useCharacterGuide';
import { dialogueMap, poseImages } from './characterDialogue';

export default function CharacterGuide() {
  const { currentX, currentPose, flipDirection, arrivedSection } = useCharacterGuide();
  
  const characterRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const [displayedText, setDisplayedText] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  // Sync DOM with Refs avoiding React re-renders for smooth movement
  useEffect(() => {
    let animationFrameId: number;
    const syncDOM = () => {
      if (characterRef.current) {
        characterRef.current.style.transform = `translateX(${currentX.current}px)`;
      }
      if (imgRef.current) {
        const newSrc = poseImages[currentPose.current] || poseImages.idle;
        if (imgRef.current.getAttribute('data-pose') !== currentPose.current) {
          imgRef.current.src = newSrc;
          imgRef.current.setAttribute('data-pose', currentPose.current);
        }
        imgRef.current.style.transform = `scaleX(${flipDirection.current})`;
      }
      animationFrameId = requestAnimationFrame(syncDOM);
    };
    
    animationFrameId = requestAnimationFrame(syncDOM);
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentX, currentPose, flipDirection]);

  // Dialogue typing animation
  useEffect(() => {
    if (!arrivedSection) {
      setShowBubble(false);
      setDisplayedText("");
      return;
    }

    const fullText = dialogueMap[arrivedSection];
    if (!fullText) return;

    setShowBubble(true);
    let i = 0;
    setDisplayedText("");

    const typingInterval = setInterval(() => {
      setDisplayedText(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(typingInterval);
      }
    }, 50);

    const hideTimeout = setTimeout(() => {
      setShowBubble(false);
    }, 4000 + (fullText.length * 50));

    return () => {
      clearInterval(typingInterval);
      clearTimeout(hideTimeout);
    };
  }, [arrivedSection]);

  // Fix 1: Dynamically determine bubble alignment based on character's X position
  const bubbleAlign = typeof window !== 'undefined' && currentX.current > window.innerWidth * 0.6 ? 'right' : 'left';

  return (
    <div 
      ref={characterRef}
      style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        zIndex: 50,
        width: '120px',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        willChange: 'transform'
      }}
    >
      {showBubble && (
        <div 
          style={{
            position: 'absolute',
            bottom: '100%',
            marginBottom: '20px',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            color: '#00ffcc',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #00ffcc',
            boxShadow: '0 0 15px rgba(0, 255, 204, 0.3)',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.4',
            whiteSpace: 'pre-wrap',
            width: 'max-content',
            maxWidth: '250px',
            textAlign: 'left',
            left: bubbleAlign === 'left' ? '0' : 'auto',
            right: bubbleAlign === 'right' ? '0' : 'auto',
          }}
        >
          {displayedText}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: bubbleAlign === 'left' ? '45px' : 'auto',
            right: bubbleAlign === 'right' ? '45px' : 'auto',
            borderWidth: '6px 6px 0',
            borderStyle: 'solid',
            borderColor: '#00ffcc transparent transparent transparent'
          }}></div>
        </div>
      )}
      
      <img 
        ref={imgRef}
        src="/static/character_idle.png"
        alt="Portfolio Guide"
        style={{
          width: '120px',
          height: '200px',
          objectFit: 'contain',
          transformOrigin: 'center bottom',
          transition: 'transform 0.1s linear'
        }}
      />
    </div>
  );
}
