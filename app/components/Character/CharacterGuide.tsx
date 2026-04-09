"use client";

import React, { useEffect, useRef, useState, FormEvent } from 'react';
import { useCharacterGuide } from './useCharacterGuide';
import { poseImages } from './characterDialogue'; // No longer using dialogueMap static array

// ── Idle float: 2–3px vertical sine wave ─────────────────────────────────────
// ── Idle float: 2px vertical sine wave ─────────────────────────────────────
const FLOAT_AMPLITUDE = 2;     // px
const FLOAT_SPEED     = 0.0018; // radians per ms

export default function CharacterGuide() {
  const { currentPose, flipDirection, arrivedSection, isMoving } = useCharacterGuide();

  const containerRef  = useRef<HTMLDivElement>(null);
  const imgRef        = useRef<HTMLImageElement>(null);
  const floatRef      = useRef(0); // current float Y offset

  // Dialogue state 
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: "Hey, I'm Rohit's AI agent. Ask me about my experience or projects." }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleLeft, setBubbleLeft] = useState(false); // false = opens inward

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
        let pose = currentPose.current;
        if (loading) pose = 'think';
        const newSrc = poseImages[pose as keyof typeof poseImages] || poseImages.idle;
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

  // ── Auto toggle based on interactions ───────────────────────
  useEffect(() => {
    // Show bubble automatically when it hits a section, strictly aesthetic on init
    if (arrivedSection && messages.length === 1) {
      setShowBubble(true);
    }
  }, [arrivedSection]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMsg = { role: "user", content: inputText };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: `ERROR: ${data.error}` }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "ERROR_API_UNAVAILABLE" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position:      'fixed',
        bottom:        '40px',
        right:         '24px',
        zIndex:        50,
        width:         '120px',
        pointerEvents: 'auto',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        willChange:    'transform',
      }}
      onClick={() => !showBubble && setShowBubble(true)}
    >
      {/* ── Speech Bubble ───────────────────────────────────────────────── */}
      {showBubble && (
        <div
          style={{
            position:        'absolute',
            bottom:          '100%',
            marginBottom:    '12px',
            background:      'rgba(14, 14, 14, 0.95)',
            backdropFilter:  'blur(8px)',
            border:          '1px solid rgba(245,200,66,0.3)',
            borderTop:       '3px solid #F5C842',
            color:           '#e5e2e1',
            boxShadow:       '0 15px 40px rgba(0,0,0,0.6), 0 0 20px rgba(245,200,66,0.05)',
            padding:         '16px',
            fontFamily:      'monospace',
            width:           '320px',
            borderRadius:    '12px',
            left:            bubbleLeft ? '0' : 'auto',
            right:           bubbleLeft ? 'auto' : '0',
            marginLeft:      bubbleLeft ? '0' : undefined,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid rgba(245,200,66,0.15)', paddingBottom: '8px' }}>
            <span style={{ color: '#F5C842', letterSpacing: '0.1em', fontSize: '11px', fontWeight: 'bold' }}>RSP_AI_INTERFACE</span>
            <button 
               onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
               style={{ color: '#6b7280', background:'transparent', border: 'none', cursor: 'pointer', fontSize: '12px' }}>
               [X]
            </button>
          </div>

          {/* Messages */}
          <div className="retro-chat-scroll" style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '14px', paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ 
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                background: m.role === 'user' ? 'rgba(245,200,66,0.08)' : '#1c1b1b',
                border: m.role === 'user' ? '1px solid rgba(245,200,66,0.2)' : '1px solid rgba(59,74,69,0.3)',
                padding: '10px 14px',
                color: m.role === 'user' ? '#F5C842' : '#bacac4',
                maxWidth: '90%',
                fontSize: '12px',
                lineHeight: '1.5',
                borderRadius: m.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <span style={{ display: 'block', fontSize: '9px', marginBottom: '6px', opacity: 0.5, letterSpacing: '0.05em' }}>
                  {m.role === 'user' ? 'GUEST_USER' : 'RSP_AGENT'}
                </span>
                {m.content}
              </div>
            ))}
            {loading && <div className="animate-pulse" style={{ color: '#F5C842', fontSize: '11px', alignSelf: 'flex-start', padding: '10px', borderRadius: '12px 12px 12px 0', background: '#1c1b1b', border: '1px solid rgba(59,74,69,0.3)' }}>PROCESSING_QUERY...</div>}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{ display: 'flex', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', borderRadius: '6px' }}>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="ENTER_COMMAND..."
              style={{
                flexGrow: 1,
                background: '#131313',
                border: '1px solid rgba(245,200,66,0.3)',
                borderRight: 'none',
                color: '#e5e2e1',
                padding: '10px 12px',
                fontSize: '12px',
                outline: 'none',
                fontFamily: 'monospace',
                borderRadius: '6px 0 0 6px',
                transition: 'background 0.2s',
              }}
              onFocus={(e) => e.target.style.background = '#1c1b1b'}
              onBlur={(e) => e.target.style.background = '#131313'}
            />
            <button type="submit" style={{ 
              background: '#F5C842', 
              color: '#0e0e0e', 
              border: 'none', 
              padding: '0 16px', 
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              borderRadius: '0 6px 6px 0',
              transition: 'filter 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
            >
              SEND
            </button>
          </form>

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
