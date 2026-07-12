import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ==========================================
// 1. ShinyText (Glossy moving linear gradient)
// ==========================================
export function ShinyText({ text, speed = 2, className = "", style = {} }) {
  const customStyle = {
    backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 70%)',
    backgroundSize: '200% 100%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block',
    animation: `shiny-sweep ${speed}s linear infinite`,
    ...style
  };

  return (
    <span className={`shiny-text-component ${className}`} style={customStyle}>
      {text}
    </span>
  );
}

// ==========================================
// 2. DecryptedText (Hacker scramble decryption)
// ==========================================
export function DecryptedText({ text, speed = 50, delay = 0, hoverScramble = true, className = "", style = {} }) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+?';
  const [displayText, setDisplayText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const runDecryption = () => {
      animationRef.current = setInterval(() => {
        if (index >= text.length) {
          clearInterval(animationRef.current);
          setDisplayText(text);
          return;
        }

        const currentText = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < index) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        setDisplayText(currentText);
        index += 1;
      }, speed);
    };

    const timeout = setTimeout(runDecryption, delay);
    return () => {
      clearTimeout(timeout);
      clearInterval(animationRef.current);
    };
  }, [text, speed, delay, isHovered]);

  const handleMouseEnter = () => {
    if (hoverScramble) {
      setIsHovered(prev => !prev);
    }
  };

  return (
    <span 
      className={className} 
      style={{ fontFamily: 'var(--font-mono)', ...style }}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
}

// ==========================================
// 3. BlurText (Sequential blur fade-in letters)
// ==========================================
export function BlurText({ text, delay = 0.05, className = "", style = {} }) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay
      }
    }
  };

  const childVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0, y: 10 },
    visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.span 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', ...style }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', marginRight: '0.25em', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, j) => (
            <motion.span 
              key={j} 
              variants={childVariants} 
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

// ==========================================
// 4. SpotlightCard (Radial spotlight hover card)
// ==========================================
export function SpotlightCard({ children, className = "", style = {}, spotlightColor = 'rgba(255,255,255,0.06)' }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = () => setIsFocused(true);
  const handleMouseLeave = () => setIsFocused(false);

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {isFocused && (
        <div 
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            zIndex: 1,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

// ==========================================
// 5. SplitText (Slide up words animation)
// ==========================================
export function SplitText({ text, className = "", style = {} }) {
  const words = text.split(' ');

  return (
    <span className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', overflow: 'hidden', ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
          <motion.span
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ==========================================
// 6. Magnet (Cursor pull force attraction)
// ==========================================
export function Magnet({ children, range = 60, className = "" }) {
  const magnetRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!magnetRef.current) return;
    const rect = magnetRef.current.getBoundingClientRect();
    const elementX = rect.left + rect.width / 2;
    const elementY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - elementX;
    const distanceY = e.clientY - elementY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      // Pull element toward cursor proportionately
      x.set(distanceX * 0.35);
      y.set(distanceY * 0.35);
    } else {
      // Snap back to origin
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={magnetRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: dx, y: dy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
