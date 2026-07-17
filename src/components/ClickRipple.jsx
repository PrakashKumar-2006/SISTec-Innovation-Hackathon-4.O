import React, { useState, useEffect } from 'react';

export default function ClickRipple() {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleTap = (e) => {
      // Ignore right clicks
      if (e.button === 2) return;

      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev, newRipple]);
    };

    window.addEventListener('pointerdown', handleTap);
    return () => window.removeEventListener('pointerdown', handleTap);
  }, []);

  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        >
          {/* Inner Glow Core */}
          <span
            className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-brand-cyan/20 border border-brand-cyan/60 shadow-[0_0_10px_rgba(0,229,255,0.4)] animate-ripple-inner"
            onAnimationEnd={() => removeRipple(ripple.id)}
          />
          {/* Outer Ripple Wave */}
          <span
            className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-2 border-brand-purple/40 shadow-[0_0_15px_rgba(123,63,242,0.3)] animate-ripple-outer"
          />
        </div>
      ))}
    </div>
  );
}
