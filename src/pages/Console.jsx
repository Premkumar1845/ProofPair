import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function Console({
  myEndpoints,
  handleAddEndpoint,
  handleDeleteEndpoint,
  newEpName,
  setNewEpName,
  newEpRoute,
  setNewEpRoute,
  newEpTarget,
  setNewEpTarget,
  newEpPrice,
  setNewEpPrice
}) {
  return (
    <section className="border-bottom-layout" style={{ backgroundColor: '#050505', padding: '40px 0' }}>
      <div className="container-custom">
        
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '8px' }}>
            Developer <span className="font-serif-italic" style={{ color: 'var(--fg-muted)' }}>Console</span>
          </h2>
          <p style={{ color: 'var(--fg-muted)', fontSize: '0.9rem' }}>
            Register new protected APIs, view call logs, and track Lovelace earnings in real-time.
          </p>
        </div>

        <div className="soldiff-grid border-layout" style={{ borderRadius: '8px', overflow: 'hidden' }}>
          
          {/* Left Side: Register new route form */}
          <div className="soldiff-col-5 border-right-layout" style={{ padding: '24px', backgroundColor: 'rgba(255,255,255,0.002)' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={18} /> Register Protected Route
            </h3>

            <form onSubmit={handleAddEndpoint} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--fg-muted)', display: 'block', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                  API Endpoint Name
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Scraper API" 
                  value={newEpName}
                  onChange={(e) => setNewEpName(e.target.value)}
                  required
                  style={{ width: '100%', backgroundColor: '#000', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px', color: '#fff', fontSize: '0.8rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--fg-muted)', display: 'block', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                  Proxy Path
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. /v1/scraper" 
                  value={newEpRoute}
                  onChange={(e) => setNewEpRoute(e.target.value)}
                  required
                  style={{ width: '100%', backgroundColor: '#000', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px', color: '#fff', fontSize: '0.8rem', outline: 'none', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--fg-muted)', display: 'block', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                  Target Backend URL
                </label>
                <input 
                  type="url" 
                  placeholder="e.g. https://my-app.com/api/data" 
                  value={newEpTarget}
                  onChange={(e) => setNewEpTarget(e.target.value)}
                  required
                  style={{ width: '100%', backgroundColor: '#000', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px', color: '#fff', fontSize: '0.8rem', outline: 'none', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--fg-muted)', display: 'block', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                  Cost per Call (ADA)
                </label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="0.1" 
                  value={newEpPrice}
                  onChange={(e) => setNewEpPrice(e.target.value)}
                  required
                  style={{ width: '100%', backgroundColor: '#000', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '10px', color: '#fff', fontSize: '0.8rem', outline: 'none', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ height: '40px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Plus size={16} /> Deploy Route
              </button>
            </form>
          </div>

          {/* Right Side: Active protected routes list */}
          <div className="soldiff-col-7" style={{ backgroundColor: 'rgba(255,255,255,0.001)' }}>
            <div className="border-bottom-layout" style={{ padding: '16px 24px', backgroundColor: 'rgba(255,255,255,0.005)' }}>
              <span className="font-mono-text" style={{ textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: '600' }}>Deployed Gateway Proxies</span>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {myEndpoints.map((ep) => (
                <div key={ep.id} style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.005)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>{ep.name}</span>
                      <span className="badge-verified" style={{ fontSize: '0.65rem' }}>{ep.priceAda} ADA/call</span>
                    </div>
                    <div className="font-mono-text" style={{ color: 'var(--fg-muted)', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div>Route: <span style={{ color: '#fff' }}>{ep.route}</span></div>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '280px' }}>Target: <span style={{ color: '#fff' }}>{ep.targetUrl}</span></div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>{ep.earnings} ADA</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--fg-muted)', textTransform: 'uppercase' }}>{ep.calls} Calls</div>
                    </div>

                    <button 
                      onClick={() => handleDeleteEndpoint(ep.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--accent-red)', cursor: 'pointer', opacity: 0.7 }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
