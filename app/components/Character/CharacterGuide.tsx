"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useCharacterGuide } from './useCharacterGuide';
import { dialogueMap, poseImages } from './characterDialogue';

// ── Idle float: 2–3px vertical sine wave ─────────────────────────────────────
// ── Idle float: 2px vertical sine wave ─────────────────────────────────────
const FLOAT_AMPLITUDE = 2;     // px
const FLOAT_SPEED     = 0.0018; // radians per ms

export default function CharacterGuide() {
  const { currentPose, flipDirection, arrivedSection, isMoving } = useCharacterGuide();

  const containerRef  = useRef<HTMLDivElement>(null);
  const imgRef        = useRef<HTMLImageElement>(null);
  const floatRef      = useRef(0); // current float Y offset

  // Dialogue state — only updated on arrival, not per frame
  const [displayedText, setDisplayedText] = useState('');
  const [showBubble,    setShowBubble]    = useState(false);
  const [bubbleLeft,    setBubbleLeft]    = useState(false); // false = bubble opens left (inwards)

  // ── RAF: sync position + idle float + pose ──────────────────────────────────
  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;

      // Float sine
      floatRef.current += FLOAT_SPEED * dt;
      const floatY = !isMoving.current ? Math.sin(floatRef.current) * FLOAT_AMPLITUDE : 0;

      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(${floatY}px)`;
      }

      if (imgRef.current) {
        const pose   = currentPose.current;
        const newSrc = poseImages[pose] || poseImages.idle;
        const prevPose = imgRef.current.getAttribute('data-pose');

        if (prevPose !== pose) {
          // Crossfade — opacity drop then swap
          imgRef.current.style.opacity = '0';
          setTimeout(() => {
            if (imgRef.current) {
              imgRef.current.src = newSrc;
              imgRef.current.setAttribute('data-pose', pose);
              imgRef.current.style.opacity = '1';
            }
          }, 200);
        }

        // Horizontal flip based on movement direction
        imgRef.current.style.transform = `scaleX(${flipDirection.current})`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [currentPose, flipDirection]);

  // ── Dialogue: starts only after arrivedSection fires ───────────────────────
  useEffect(() => {
    if (!arrivedSection) {
      setShowBubble(false);
      setDisplayedText('');
      return;
    }

    const fullText = dialogueMap[arrivedSection];
    if (!fullText) return;

    // Reset
    setDisplayedText('');
    setShowBubble(true);

    // Typing effect — instant reveal, no flicker
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 28);

    // Auto-hide after reading time (min 4s + typing time)
    const readTime  = Math.max(4000, fullText.length * 60);
    const hideTimer = setTimeout(() => setShowBubble(false), readTime);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, [arrivedSection]);

  return (
    <div
      ref={containerRef}
      style={{
        position:      'fixed',
        bottom:        '40px',
        right:         '24px',
        zIndex:        50,
        width:         '120px',
        pointerEvents: 'none',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        willChange:    'transform',
      }}
    >
      {/* ── Speech Bubble ───────────────────────────────────────────────── */}
      {showBubble && (
        <div
          style={{
            position:        'absolute',
            bottom:          '100%',
            marginBottom:    '12px',
            // Monolith palette
            background:      '#1c1b1b',
            border:          '1px solid rgba(245,200,66,0.3)',
            color:           '#e5e2e1',
            boxShadow:       '0 10px 30px rgba(0,0,0,0.4)',
            borderRadius:    '6px',
            padding:         '12px 14px',
            fontFamily:      'monospace',
            fontSize:        '13px',
            lineHeight:      '1.5',
            whiteSpace:      'pre-wrap',
            width:           'max-content',
            maxWidth:        '240px',
            // Auto flip: open toward center of screen
            left:  bubbleLeft ? '0'    : 'auto',
            right: bubbleLeft ? 'auto' : '0',
            // Keep inside viewport with margin
            marginLeft: bubbleLeft ? '0' : undefined,
            minWidth:   '160px',
          }}
        >
          {/* Accent top bar */}
          <div style={{
            height:     '2px',
            background: 'rgba(245,200,66,0.4)',
            marginBottom: '8px',
            borderRadius: '2px',
          }} />

          {displayedText}

          {/* Tail pointer */}
          <div style={{
            position:    'absolute',
            bottom:      '-7px',
            left:        bubbleLeft ? '24px' : 'auto',
            right:       bubbleLeft ? 'auto' : '24px',
            width:       0,
            height:      0,
            borderLeft:  '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop:   '7px solid rgba(245,200,66,0.3)',
          }} />
        </div>
      )}

      {/* ── Character Sprite ────────────────────────────────────────────── */}
      <img
        ref={imgRef}
        src="/static/character_idle.png"
        data-pose="idle"
        alt="Portfolio Guide"
        style={{
          width:           '120px',
          height:          '200px',
          objectFit:       'contain',
          transformOrigin: 'center bottom',
          // Opacity transition for crossfade on pose change
          transition:      'opacity 0.2s ease, transform 0.1s linear',
        }}
      />
    </div>
  );
}
