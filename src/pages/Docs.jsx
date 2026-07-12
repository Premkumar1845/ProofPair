import React from 'react';
import { BookOpen, Code, Copy, Check } from 'lucide-react';
import { developerSnippets } from '../c402Engine';

export default function Docs({ codeTab, setCodeTab, copied, handleCopy }) {
  return (
    <section className="border-bottom-layout" style={{ backgroundColor: '#050505', padding: '40px 0' }}>
      <div className="container-custom">
        
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '8px' }}>
            Developer <span className="font-serif-italic" style={{ color: 'var(--fg-muted)' }}>Documentation</span>
          </h2>
          <p style={{ color: 'var(--fg-muted)', fontSize: '0.9rem' }}>
            Reference guides, header challenges, and Aiken validator blueprints.
          </p>
        </div>

        <div className="soldiff-grid border-layout" style={{ borderRadius: '8px', overflow: 'hidden' }}>
          
          {/* Left Side: Text Documentation */}
          <div className="soldiff-col-6 border-right-layout" style={{ padding: '32px', backgroundColor: 'rgba(255,255,255,0.001)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <BookOpen size={16} style={{ color: 'var(--fg-muted)' }} />
              <span className="font-mono-text" style={{ textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: '600' }}>C402 Protocol Specification</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--fg-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>1. The Challenge Loop</h3>
                <p>
                  When a client requests a C402-protected API without an Authorization header, the proxy returns a challenge containing standard payment headers. The client wallet must construct a transaction matching these parameters:
                </p>
                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li><strong>X-C402-Price:</strong> Lovelaces required (e.g. 100000).</li>
                  <li><strong>X-C402-Address:</strong> Developer payout staking address.</li>
                  <li><strong>X-C402-Reference:</strong> Unique tracking UUID.</li>
                </ul>
              </div>

              <hr style={{ border: 'none', borderBottom: '1px solid var(--border-color)' }} />

              <div>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>2. Replay Mitigation</h3>
                <p>
                  Replay attacks are avoided by keeping a high-speed cached list of spent transaction hashes. When a transaction is submitted, the C402 gateway queries the Cardano ledger, validates the outputs, and logs it in the spent database index cache. Any retry of the same hash is blocked with an HTTP 401.
                </p>
              </div>

              <hr style={{ border: 'none', borderBottom: '1px solid var(--border-color)' }} />

              <div>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>3. Mempool Verification</h3>
                <p>
                  To bypass Cardano's block times (~20 seconds), C402 inspects the node mempool. Since transactions are deterministic under the eUTxO model, a transaction in the mempool is guaranteed to execute safely, allowing sub-second API authorization.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Code Blocks */}
          <div className="soldiff-col-6" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#09090b' }}>
            <div className="border-bottom-layout" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setCodeTab('javascript')}
                  className="font-mono-text"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: codeTab === 'javascript' ? '#fff' : 'var(--fg-muted)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: codeTab === 'javascript' ? '600' : '400',
                    borderBottom: codeTab === 'javascript' ? '1px solid #fff' : 'none',
                    paddingBottom: '4px'
                  }}
                >
                  c402_gateway.js
                </button>
                <button 
                  onClick={() => setCodeTab('aiken')}
                  className="font-mono-text"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: codeTab === 'aiken' ? '#fff' : 'var(--fg-muted)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: codeTab === 'aiken' ? '600' : '400',
                    borderBottom: codeTab === 'aiken' ? '1px solid #fff' : 'none',
                    paddingBottom: '4px'
                  }}
                >
                  c402_validator.ak
                </button>
              </div>

              <button 
                onClick={() => handleCopy(developerSnippets[codeTab])}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--fg-muted)', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem'
                }}
              >
                {copied ? <Check size={12} color="var(--accent-green)" /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <pre style={{ 
              flex: 1, 
              padding: '24px', 
              overflow: 'auto', 
              fontSize: '0.78rem',
              lineHeight: '1.6',
              fontFamily: 'var(--font-mono)',
              color: '#e4e4e7',
              backgroundColor: '#09090b'
            }}>
              <code>
                {developerSnippets[codeTab]}
              </code>
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
}
