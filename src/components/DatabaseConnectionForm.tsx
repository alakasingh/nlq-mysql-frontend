'use client';
import { useState, useEffect } from 'react';
import { Database, Server, User, Key, Save, Loader2 } from 'lucide-react';
import { DatabaseConfig } from '@/lib/api';

interface DatabaseConnectionFormProps {
  onConnect: (config: DatabaseConfig) => void;
  isLoading: boolean;
}

export default function DatabaseConnectionForm({ onConnect, isLoading }: DatabaseConnectionFormProps) {
  const [config, setConfig] = useState<DatabaseConfig>({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
  });

  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(config);
  };

  

  // Common styles with mobile responsiveness
  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(203, 213, 225, 0.5)',
    borderRadius: isMobile ? '16px' : '24px',
    padding: isMobile ? '1.5rem' : '2rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
    overflowY: 'auto',
    maxHeight: isMobile ? 'none' : '80vh',
    scrollBehavior: 'smooth',
    width: '100%',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: isMobile ? '0.875rem 1rem 0.875rem 2.75rem' : '0.75rem 1rem 0.75rem 3rem',
    borderRadius: '12px',
    background: '#f8fafc',
    border: '1px solid #cbd5e1',
    color: '#0f172a',
    fontSize: isMobile ? '16px' : '0.875rem', // Prevents zoom on iOS
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: isMobile ? '11px' : '10px',
    fontWeight: 700,
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: '6px',
    display: 'block',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: isMobile ? '0.6rem' : '0.85rem',
    borderRadius: isMobile ? '14px' : '20px',
    background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    color: 'white',
    fontWeight: 900,
    fontSize: isMobile ? '0.85rem' : '1rem', // 👈 smaller text on mobile
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isMobile ? '0.3rem' : '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)',
  };


  const panelStyle: React.CSSProperties = {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(203, 213, 225, 0.5)',
    borderRadius: isMobile ? '16px' : '24px',
    padding: isMobile ? '1.5rem' : '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
    overflowY: 'auto',
    maxHeight: isMobile ? 'auto' : '80vh',
    scrollBehavior: 'smooth',
    marginBottom: isMobile ? '1.5rem' : '0',
    minHeight: isMobile ? 'auto' : '400px',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '1.5rem' : '2rem',
    maxWidth: '1200px',
    margin: isMobile ? '2rem auto' : '4rem auto',
    padding: isMobile ? '0 1rem' : '0 1rem',
    overflow: 'hidden',
  };

  

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
  };

  return (
    <div style={containerStyle}>
      {/* Left Panel */}
      {!isMobile && (
        <div style={{ ...panelStyle, display: isMobile ? 'none' : 'block' }}>
          <div
            style={{     
              display: 'inline-flex',
              padding: isMobile ? '1.25rem' : '1.5rem',
              borderRadius: isMobile ? '20px' : '24px',
              background: 'rgba(37, 99, 235, 0.1)',
              marginBottom: isMobile ? '1rem' : '1.5rem',
              border: '1px solid rgba(37, 99, 235, 0.2)',
            }}
            
          >
            <Database size={isMobile ? 40 : 48} color="#2563eb" />
          </div>
          <h1
            style={{
              fontSize: isMobile ? '1.875rem' : '2.5rem',
              fontWeight: 800,
              color: '#0f172a',
              textAlign: 'center',
              marginBottom: isMobile ? '0.75rem' : '1rem',
              lineHeight: '1.2',
            }}
          >
            Database Gateway
          </h1>
          <p
            style={{
              color: '#475569',
              fontSize: isMobile ? '0.9375rem' : '1rem',
              textAlign: 'center',
              lineHeight: '1.6',
              maxWidth: isMobile ? '100%' : '80%',
            }}
          >
            Connect securely to your MySQL instance to start querying and analyzing data instantly.
          </p>
        </div>
      )}
      {/* Right Panel - Form */}
      <div style={{ flex: 1 }}>
        <div style={cardStyle}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={gridStyle}>
              {/* Host */}
              <div>
                <label style={labelStyle}>Host Address</label>
                <div style={{ position: 'relative' }}>
                  <Server
                    size={isMobile ? 18 : 20}
                    color="#64748b"
                    style={{
                      position: 'absolute',
                      left: isMobile ? '0.875rem' : '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                  <input
                    type="text"
                    name="host"
                    value={config.host}
                    onChange={handleChange}
                    placeholder="localhost"
                    required
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Database */}
              <div>
                <label style={labelStyle}>Target Database</label>
                <div style={{ position: 'relative' }}>
                  <Database
                    size={isMobile ? 18 : 20}
                    color="#64748b"
                    style={{
                      position: 'absolute',
                      left: isMobile ? '0.875rem' : '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                  <input
                    type="text"
                    name="database"
                    value={config.database}
                    onChange={handleChange}
                    placeholder="production_db"
                    required
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Username */}
            <div>
              <label style={labelStyle}>Username</label>
              <div style={{ position: 'relative' }}>
                <User
                  size={isMobile ? 18 : 20}
                  color="#64748b"
                  style={{
                    position: 'absolute',
                    left: isMobile ? '0.875rem' : '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                <input
                  type="text"
                  name="user"
                  value={config.user}
                  onChange={handleChange}
                  placeholder="admin"
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Access Password</label>
              <div style={{ position: 'relative' }}>
                <Key
                  size={isMobile ? 18 : 20}
                  color="#64748b"
                  style={{
                    position: 'absolute',
                    left: isMobile ? '0.875rem' : '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                <input
                  type="password"
                  name="password"
                  value={config.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              disabled={isLoading} 
              style={buttonStyle}
              onMouseOver={e => { if(!isLoading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 25px rgba(37, 99, 235, 0.3)'; }}}
              onMouseOut={e => { if(!isLoading) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(37, 99, 235, 0.2)'; }}}
            >
              {isLoading ? <Loader2 size={isMobile ? 22 : 24} className="animate-spin" /> : <Save size={isMobile ? 22 : 24} />}
              <span>{isLoading ? 'Verifying...' : 'Establish Connection'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}