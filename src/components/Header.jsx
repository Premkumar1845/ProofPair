import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Terminal, 
  LayoutDashboard, 
  BookOpen, 
  Wallet, 
  Fingerprint
} from 'lucide-react';
import { Magnet } from './ReactBitsComponents';

export default function Header({ 
  currentPage, 
  setCurrentPage, 
  connectedWallet, 
  walletBalance, 
  disconnectWallet, 
  setShowWalletModal 
}) {
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabs = [
    { id: 'landing', label: 'Overview', icon: <Home size={12} /> },
    { id: 'sandbox', label: 'Sandbox', icon: <Terminal size={12} /> },
    { id: 'dashboard', label: 'Console', icon: <LayoutDashboard size={12} /> },
    { id: 'docs', label: 'Docs', icon: <BookOpen size={12} /> }
  ];

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
          backgroundColor: 'rgba(8, 8, 10, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(16, 185, 129, 0.2)', // Glowing green accent outline border
          borderRadius: '9999px',
          padding: '6px 12px',
          gap: '2px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(16, 185, 129, 0.08)' // Radial backdrop shadow
        }}
      >
        {/* Logo Icon */}
        <div 
          onClick={() => setCurrentPage('landing')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '26px', 
            height: '26px', 
            backgroundColor: '#fff', 
            borderRadius: '50%', 
            cursor: 'pointer',
            marginRight: '8px',
            boxShadow: '0 0 12px rgba(255,255,255,0.3)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(180deg) scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}
        >
          <Terminal size={12} color="#000" strokeWidth={2.5} />
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
                color: isActive ? '#fff' : 'var(--fg-muted)',
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
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
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
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
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
                  borderRadius: '50%', 
                  boxShadow: '0 0 6px var(--accent-green)' 
                }} />
              )}
            </button>
          );
        })}

        {/* Vertical Divider */}
        <div style={{
          width: '1px',
          height: '18px',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          margin: '0 6px'
        }} />

        {/* Connect Wallet Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 10 }}>
          {connectedWallet ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              backgroundColor: 'rgba(16,185,129,0.06)', 
              border: '1px solid rgba(16,185,129,0.2)',
              padding: '3px 10px', 
              borderRadius: '9999px' 
            }}>
              <span className="badge-verified" style={{ fontSize: '0.62rem', padding: '1px 5px', display: 'flex', alignItems: 'center', gap: '3px', borderRadius: '9999px' }}>
                <Wallet size={8} /> {connectedWallet.toUpperCase()}
              </span>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#fff', fontWeight: '600' }}>
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
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 2px 10px rgba(16,185,129,0.2)'
                }}
              >
                <Fingerprint size={11} /> 
                <span>{isInIframe ? 'Connect' : 'Connect Wallet'}</span>
              </button>
            </Magnet>
          )}
        </div>
      </div>
    </header>
  );
}
