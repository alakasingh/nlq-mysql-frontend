'use client';

import { useState, useEffect } from 'react';
import DatabaseConnectionForm from '@/components/DatabaseConnectionForm';
import SchemaViewer from '@/components/SchemaViewer';
import QueryInterface from '@/components/QueryInterface';
import ResultsTable from '@/components/ResultsTable';
import QueryHistory from '@/components/QueryHistory';
import SettingsView from '@/components/Settings';
import { api, DatabaseConfig, QueryResult } from '@/lib/api';
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  AlertCircle,
  Database,
  LayoutDashboard,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Server,
  Cpu,
  Save,
  Loader2,
  Menu,
  X
} from 'lucide-react';

interface HistoryItem {
  id: string;
  question: string;
  sql: string;
  timestamp: string;
  database: string;
}

export default function DashboardPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const [dbCredentials, setDbCredentials] = useState<DatabaseConfig | null>(null);
  const [schema, setSchema] = useState<any | null>(null);
  const [queryResults, setQueryResults] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history
  useEffect(() => {
    const savedHistory = localStorage.getItem('nlq_query_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);

      // Auto-collapse sidebar on mobile and tablet
      if (width < 1024) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConnect = async (config: DatabaseConfig) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.connect(config);
      setSchema(data.schema);
      setDbCredentials(config);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
      setDbCredentials(null);
      setSchema(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunQuery = async (question: string) => {
    if (!dbCredentials || !schema) {
      setError("Please connect to a database first.");
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const results = await api.executeQuery(question, schema, dbCredentials);
      setQueryResults(results);

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        question,
        sql: results.sql,
        timestamp: new Date().toISOString(),
        database: dbCredentials.database
      };
      const updatedHistory = [newHistoryItem, ...history].slice(0, 50);
      setHistory(updatedHistory);
      localStorage.setItem('nlq_query_history', JSON.stringify(updatedHistory));

      // Close mobile menu after action
      if (isMobile) setIsMobileMenuOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query execution failed');
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('nlq_query_history');
  };

  const runAgain = (question: string) => {
    setActiveTab('dashboard');
    handleRunQuery(question);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (isMobile) setIsMobileMenuOpen(false);
  };

  // Inline Styles
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    background: 'linear-gradient(to bottom right, #020617, #0f172a, #020617)',
    color: 'white',
    position: 'relative',
    fontFamily: "'Inter', system-ui, sans-serif"
  };

  const mainStyle: React.CSSProperties = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '100%'
  };

  const mainContentStyle: React.CSSProperties = {
    flexGrow: 1,
    overflowY: 'auto',
    padding: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
    scrollBehavior: 'smooth'
  };

  const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    background: 'linear-gradient(180deg, #020617, #020617)',
    backdropFilter: 'blur(10px)',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isMobile ? '1rem' : isTablet ? '1rem 1.5rem' : '1rem 2rem',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    gap: '1rem'
  };

  const sidebarStyle: React.CSSProperties = {
    width: isMobile ? (isMobileMenuOpen ? '100%' : '0') : isCollapsed ? '70px' : '240px',
    height: '100vh',
    background: 'linear-gradient(180deg, #020617, #020617)',
    padding: isMobile ? (isMobileMenuOpen ? '1rem' : '0') : '1.5rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    position: isMobile ? 'fixed' : 'relative',
    top: 0,
    left: 0,
    zIndex: isMobile ? 100 : 'auto',
    borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.05)',
    boxShadow: isMobile && isMobileMenuOpen ? '2px 0 10px rgba(0,0,0,0.5)' : 'none'
  };

  const overlayStyle: React.CSSProperties = {
    display: isMobile && isMobileMenuOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    zIndex: 99,
    backdropFilter: 'blur(4px)'
  };

  const menuButton = (active: boolean): React.CSSProperties => ({
    background: active ? 'rgba(0,242,255,0.1)' : 'transparent',
    border: active ? '1px solid rgba(0,242,255,0.2)' : '1px solid transparent',
    borderRadius: '12px',
    color: active ? '#00f2ff' : '#94a3b8',
    padding: isMobile ? '1rem' : '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
    fontSize: isMobile ? '1.125rem' : '0.9375rem',
    textAlign: 'left',
    width: '100%',
    transition: 'all 0.2s ease',
    fontWeight: active ? 600 : 400,
    marginBottom: '0.5rem'
  });

  const collapseBtnStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    marginBottom: '2rem',
    padding: '0.5rem',
    display: isMobile ? 'none' : 'block'
  };

  const mobileMenuBtnStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '0.5rem',
    display: isMobile && dbCredentials ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: isMobile ? '1.5rem' : '2rem',
    padding: isMobile ? '0.5rem 0' : '0'
  };

  const connectionCardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: isMobile ? '0.75rem 1rem' : '0.5rem 1rem',
    borderRadius: '12px',
    fontSize: isMobile ? '0.8125rem' : '0.75rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes pulse {
            0%,100% { opacity:0.2; transform: scale(1); }
            50% { opacity:0.3; transform: scale(1.05); }
          }
          
          /* Custom scrollbar */
          *::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          *::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.02);
          }
          
          *::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.1);
            border-radius: 4px;
          }
          
          *::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.2);
          }

          /* Prevent horizontal scroll on mobile */
          body {
            overflow-x: hidden;
          }
        `}
      </style>

      {/* Mobile Overlay */}
      <div
        style={overlayStyle}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      {dbCredentials && (
        <aside style={sidebarStyle}>
          {/* Close button for mobile */}
          {isMobile && isMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                padding: '0.5rem',
                alignSelf: 'flex-end',
                marginBottom: '1rem'
              }}
            >
              <X size={24} />
            </button>
          )}

          {/* Collapse Button (Desktop/Tablet) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={collapseBtnStyle}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none' }}>
          <div style={logoStyle} >
            
            <Cpu size={isMobile ? 28 : 24} color="#00f2ff" />
            {(!isCollapsed || isMobile) && (
              <span style={{
                fontWeight: 800,
                fontSize: isMobile ? '1.375rem' : '1.2rem',
                color: 'white'
              }}>
                NLQ MySQL
              </span>
            )}
          </div>
          </a>

          {/* Menu */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <button
              onClick={() => handleTabChange('dashboard')}
              style={menuButton(activeTab === 'dashboard')}
            >
              <LayoutDashboard size={isMobile ? 24 : 20} />
              {(!isCollapsed || isMobile) && 'Dashboard'}
            </button>

            <button
              onClick={() => handleTabChange('queries')}
              style={menuButton(activeTab === 'queries')}
            >
              <HistoryIcon size={isMobile ? 24 : 20} />
              {(!isCollapsed || isMobile) && 'Query Log'}
            </button>
          </nav>

          <div style={{ flexGrow: 1 }} />

          <button
            onClick={() => handleTabChange('settings')}
            style={menuButton(activeTab === 'settings')}
          >
            <SettingsIcon size={isMobile ? 24 : 20} />
            {(!isCollapsed || isMobile) && 'Settings'}
          </button>
        </aside>
      )}

      {/* Main */}
      <div style={mainStyle}>
        {!dbCredentials ? (
          <div style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '1rem' : '2rem',
            overflowY: 'auto'
          }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
              <DatabaseConnectionForm onConnect={handleConnect} isLoading={isLoading} />
              {error && (
                <div style={{
                  background: 'rgba(255,0,0,0.1)',
                  border: '1px solid rgba(255,0,0,0.2)',
                  color: 'red',
                  padding: isMobile ? '0.875rem' : '1rem',
                  borderRadius: '12px',
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}>
                  <AlertCircle size={isMobile ? 18 : 20} /> {error}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <header style={headerStyle}>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                style={mobileMenuBtnStyle}
              >
                <Menu size={24} />
              </button>

              <h2 style={{
                fontSize: isMobile ? '0.6875rem' : isTablet ? '0.6875rem' : '0.75rem',
                fontWeight: 800,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {activeTab === 'dashboard' && 'Primary Analysis'}
                {activeTab === 'queries' && 'Query History'}
                {activeTab === 'settings' && 'Settings'}
              </h2>

              {dbCredentials && (
                <div style={connectionCardStyle}>
                  <Server size={isMobile ? 14 : 16} color="#00f2ff" />
                  {!isMobile && <span>{dbCredentials.host}</span>}
                </div>
              )}
            </header>

            <div style={mainContentStyle}>
              {error && (
                <div style={{
                  background: 'rgba(255,0,0,0.1)',
                  border: '1px solid rgba(255,0,0,0.2)',
                  color: 'red',
                  padding: isMobile ? '0.875rem' : '1rem',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  flexWrap: 'wrap'
                }}>
                  <AlertCircle size={isMobile ? 18 : 20} />
                  <span style={{ flex: 1, minWidth: '200px' }}>{error}</span>
                </div>
              )}

              {activeTab === 'dashboard' && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobile ? '1.5rem' : '2rem'
                }}>
                  <QueryInterface onRunQuery={handleRunQuery} isLoading={isLoading} />
                  {(queryResults || isLoading) && <ResultsTable results={queryResults} />}
                </div>
              )}

              {activeTab === 'queries' && (
                <QueryHistory
                  history={history}
                  onClear={clearHistory}
                  onRunAgain={runAgain}
                />
              )}

              {activeTab === 'settings' && <SettingsView />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}