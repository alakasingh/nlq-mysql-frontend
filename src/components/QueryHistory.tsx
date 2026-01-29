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
                        background: 'rgba(99,102,241,0.15)',
                        padding: 12,
                        borderRadius: 14
                    }}>
                        <History size={24} color="#818cf8" />
                    </div>
                    <div>
                        <h2 style={{
                            margin: 0,
                            fontSize: 24,
                            fontWeight: 800,
                            color: '#fff'
                        }}>
                            Query Timeline
                        </h2>
                        <p style={{
                            margin: '4px 0 0',
                            fontSize: 10,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            color: '#94a3b8'
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
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.25)',
                            color: '#f87171',
                            cursor: 'pointer'
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
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 20,
                            padding: 24,
                            transition: 'all 0.3s ease'
                        }}
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
                            color: '#fff',
                            lineHeight: 1.4,
                            marginBottom: 20
                        }}>
                            “{item.question}”
                        </p>

                        {/* SQL */}
                        <div style={{
                            position: 'relative',
                            background: '#020617',
                            borderRadius: 14,
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: 16,
                            fontFamily: 'monospace',
                            fontSize: 12,
                            color: '#a5b4fc',
                            overflowX: 'auto'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 10,
                                right: 14,
                                fontSize: 9,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.2)'
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
                                    background: '#6366f1',
                                    color: '#020617',
                                    fontSize: 12,
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    border: 'none'
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
                        border: '2px dashed rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.02)'
                    }}>
                        <div style={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        }}>
                            <History size={40} color="rgba(255,255,255,0.2)" />
                        </div>
                        <h3 style={{
                            fontSize: 22,
                            fontWeight: 800,
                            color: 'rgba(255,255,255,0.25)',
                            marginBottom: 12
                        }}>
                            No History Yet
                        </h3>
                        <p style={{
                            fontSize: 14,
                            color: 'rgba(148,163,184,0.5)',
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
            color: '#94a3b8',
            background: 'rgba(255,255,255,0.05)',
            padding: '6px 10px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.08)'
        }}>
            {icon}
            {text}
        </div>
    );
}
