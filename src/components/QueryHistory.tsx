'use client';

import { History, Trash2, Calendar, Database, Play } from 'lucide-react';

interface HistoryItem {
    id: string;
    question: string;
    sql: string;
    timestamp: string;
    database: string;
}

interface QueryHistoryProps {
    history: HistoryItem[];
    onClear: () => void;
    onRunAgain: (question: string) => void;
}

export default function QueryHistory({ history, onClear, onRunAgain }: QueryHistoryProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 8px'
            }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{
                        background: 'rgba(37, 99, 235, 0.1)',
                        padding: 12,
                        borderRadius: 14
                    }}>
                        <History size={24} color="#2563eb" />
                    </div>
                    <div>
                        <h2 style={{
                            margin: 0,
                            fontSize: 24,
                            fontWeight: 800,
                            color: '#0f172a'
                        }}>
                            Query Timeline
                        </h2>
                        <p style={{
                            margin: '4px 0 0',
                            fontSize: 10,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            color: '#64748b'
                        }}>
                            Previous Inquiries
                        </p>
                    </div>
                </div>

                {history.length > 0 && (
                    <button
                        onClick={onClear}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            fontSize: 10,
                            fontWeight: 800,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            padding: '8px 14px',
                            borderRadius: 999,
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            color: '#ef4444',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                            e.currentTarget.style.border = '1px solid rgba(239, 68, 68, 0.3)';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                            e.currentTarget.style.border = '1px solid rgba(239, 68, 68, 0.2)';
                        }}
                    >
                        <Trash2 size={14} />
                        Clear
                    </button>
                )}
            </div>

            {/* History List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {history.map(item => (
                    <div
                        key={item.id}
                        style={{
                            background: 'white',
                            border: '1px solid rgba(203, 213, 225, 0.5)',
                            borderRadius: 20,
                            padding: 24,
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02)'
                        }}
                        onMouseOver={e => e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.05)'}
                        onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.02)'}
                    >
                        {/* Meta */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 12,
                            marginBottom: 16
                        }}>
                            <MetaBadge icon={<Calendar size={12} />} text={new Date(item.timestamp).toLocaleString()} />
                            <MetaBadge icon={<Database size={12} />} text={item.database} />
                        </div>

                        {/* Question */}
                        <p style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: '#0f172a',
                            lineHeight: 1.4,
                            marginBottom: 20
                        }}>
                            “{item.question}”
                        </p>

                        {/* SQL */}
                        <div style={{
                            position: 'relative',
                            background: '#f8fafc',
                            borderRadius: 14,
                            border: '1px solid rgba(203, 213, 225, 0.5)',
                            padding: 16,
                            fontFamily: 'monospace',
                            fontSize: 12,
                            color: '#1e3a8a',
                            overflowX: 'auto'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 10,
                                right: 14,
                                fontSize: 9,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                color: '#94a3b8',
                                fontWeight: 700
                            }}>
                                SQL
                            </div>
                            <code>{item.sql}</code>
                        </div>

                        {/* Action */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: 20
                        }}>
                            <button
                                onClick={() => onRunAgain(item.question)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '10px 18px',
                                    borderRadius: 14,
                                    background: 'linear-gradient(to right, #1e3a8a, #3b82f6)',
                                    color: 'white',
                                    fontSize: 12,
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    border: 'none',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)'
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(37, 99, 235, 0.3)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(37, 99, 235, 0.2)';
                                }}
                            >
                                <Play size={14} fill="currentColor" />
                                Run Again
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {history.length === 0 && (
                    <div style={{
                        padding: 80,
                        textAlign: 'center',
                        borderRadius: 24,
                        border: '2px dashed rgba(203, 213, 225, 0.5)',
                        background: 'rgba(248, 250, 252, 1)'
                    }}>
                        <div style={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'white',
                            border: '1px solid rgba(203, 213, 225, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
                        }}>
                            <History size={40} color="#cbd5e1" />
                        </div>
                        <h3 style={{
                            fontSize: 22,
                            fontWeight: 800,
                            color: '#475569',
                            marginBottom: 12
                        }}>
                            No History Yet
                        </h3>
                        <p style={{
                            fontSize: 14,
                            color: '#94a3b8',
                            maxWidth: 360,
                            margin: '0 auto'
                        }}>
                            Your executed queries will appear here for quick access and re-execution.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

/* Helper */
function MetaBadge({ icon, text }: { icon: any; text: string }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: '#64748b',
            background: 'rgba(241, 245, 249, 1)',
            padding: '6px 10px',
            borderRadius: 10,
            border: '1px solid rgba(203, 213, 225, 0.5)'
        }}>
            {icon}
            {text}
        </div>
    );
}
