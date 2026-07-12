import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Terminal, 
  LayoutDashboard, 
  BookOpen, 
  Wallet, 
  Fingerprint,
  Sun,
  Moon
} from 'lucide-react';
import { Magnet } from './ReactBitsComponents';

export default function Header({ 
  currentPage, 
  setCurrentPage, 
  connectedWallet, 
  walletBalance, 
  disconnectWallet, 
  setShowWalletModal,
  theme,
  toggleTheme
}) {
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabs = [
    { id: 'landing', label: 'Overview', icon: <Home size={12} /> },
    { id: 'sandbox', label: 'Sandbox', icon: <Terminal size={12} /> },
    { id: 'dashboard', label: 'Console', icon: <LayoutDashboard size={12} /> },
    { id: 'docs', label: 'Docs', icon: <BookOpen size={12} /> }
  ];

  // Synthesizes a premium mechanical toggle click sound effect
  const handleThemeToggle = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(750, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.08);

      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio context not allowed or supported:", e);
    }

    // Trigger state change
    toggleTheme();
  };

  return (
    <header 
      className="site-header-fixed"
      style={{
        top: isInIframe ? '48px' : '20px'
      }}
    >
      <div 
        className="floating-navbar-pill"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-color)', // Replaced yellow border with clean theme border
          borderRadius: '9999px',
          padding: '6px 12px',
          gap: '2px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)' // Flat clean shadow
        }}
      >
        {/* Theme-Adaptive Logo */}
        <div 
          onClick={() => setCurrentPage('landing')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '26px', 
            height: '26px', 
            cursor: 'pointer',
            marginRight: '8px',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img 
            src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'} 
            alt="C402 Logo" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              borderRadius: '50%'
            }} 
          />
        </div>

        {/* Dynamic Sliding Tabs */}
        {tabs.map((tab) => {
          const isActive = currentPage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                color: isActive ? 'var(--fg-color)' : 'var(--fg-muted)',
                fontSize: '0.76rem',
                fontWeight: isActive ? '600' : '400',
                padding: '6px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.25s ease',
                outline: 'none',
                zIndex: 10
              }}
            >
              {/* Sliding Hover Background Indicator */}
              {hoveredTab === tab.id && (
                <motion.div
                  layoutId="navbar-hover-glow"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'var(--badge-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '9999px',
                    zIndex: -1
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Seamless Active Glow Indicator */}
              {isActive && (
                <motion.div
                  layoutId="navbar-active-glow"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'var(--accent-green-bg)',
                    border: '1px solid var(--border-active)',
                    borderRadius: '9999px',
                    zIndex: -1
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}

              {React.cloneElement(tab.icon, {
                style: { 
                  color: isActive ? 'var(--accent-green)' : 'inherit',
                  transition: 'color 0.25s ease'
                }
              })}
              
              <span>{tab.label}</span>

              {isActive && (
                <span style={{ 
                  width: '4px', 
                  height: '4px', 
                  backgroundColor: 'var(--accent-green)', 
                  borderRadius: '50%'
                }} />
              )}
            </button>
          );
        })}

        {/* Vertical Divider */}
        <div style={{
          width: '1px',
          height: '18px',
          backgroundColor: 'var(--border-color)',
          margin: '0 6px'
        }} />

        {/* Connect Wallet Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 10 }}>
          {connectedWallet ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              backgroundColor: 'var(--accent-green-bg)', 
              border: '1px solid var(--border-active)',
              padding: '3px 10px', 
              borderRadius: '9999px' 
            }}>
              <span className="badge-verified" style={{ fontSize: '0.62rem', padding: '1px 5px', display: 'flex', alignItems: 'center', gap: '3px', borderRadius: '9999px' }}>
                <Wallet size={8} /> {connectedWallet.toUpperCase()}
              </span>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-numbers)', color: 'var(--fg-color)', fontWeight: '600' }}>
                {walletBalance} ADA
              </span>
              <button 
                onClick={disconnectWallet}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--accent-red)', 
                  fontSize: '0.7rem', 
                  cursor: 'pointer', 
                  fontWeight: '700',
                  padding: '2px 4px',
                  marginLeft: '2px'
                }}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <Magnet range={25}>
              <button 
                onClick={() => setShowWalletModal(true)} 
                className="btn-primary" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  padding: '5px 12px',
                  fontSize: '0.72rem',
                  borderRadius: '9999px',
                  height: '28px',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'none'
                }}
              >
                <Fingerprint size={11} /> 
                <span>{isInIframe ? 'Connect' : 'Connect Wallet'}</span>
              </button>
            </Magnet>
          )}
        </div>

        {/* Divider */}
        <div style={{
          width: '1px',
          height: '18px',
          backgroundColor: 'var(--border-color)',
          margin: '0 4px'
        }} />

        {/* Theme Switcher */}
        <Magnet range={20}>
          <button
            onClick={handleThemeToggle}
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              color: 'var(--fg-color)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              outline: 'none',
              padding: 0
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={12} color="var(--accent-green)" /> : <Moon size={12} color="var(--accent-green)" />}
          </button>
        </Magnet>

      </div>
    </header>
  );
}
