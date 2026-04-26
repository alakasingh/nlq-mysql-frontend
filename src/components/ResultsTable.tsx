import { QueryResult } from '@/lib/api';
import { Table as TableIcon, Code, Download, ExternalLink } from 'lucide-react';

interface ResultsTableProps {
    results: QueryResult | null;
}

export default function ResultsTable({ results }: ResultsTableProps) {
    if (!results) return null;

    const { sql, results: dataObj } = results;
    const columns = dataObj?.columns || [];
    const data = dataObj?.data || [];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

            {/* SQL BLOCK */}
            {sql && (
                <div style={{
                    borderRadius: 18,
                    border: '1px solid rgba(203, 213, 225, 0.5)',
                    background: 'rgba(248, 250, 252, 1)',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px 20px',
                        background: 'rgba(241, 245, 249, 1)',
                        borderBottom: '1px solid rgba(203, 213, 225, 0.5)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            fontSize: 11,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            fontWeight: 800,
                            color: '#3b82f6'
                        }}>
                            <Code size={14} />
                            Generated SQL
                        </div>

                        <button
                            onClick={() => navigator.clipboard.writeText(sql)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                fontSize: 11,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                color: '#64748b',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'color 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.color = '#0f172a'}
                            onMouseOut={e => e.currentTarget.style.color = '#64748b'}
                        >
                            Copy
                            <ExternalLink size={12} />
                        </button>
                    </div>

                    <pre style={{
                        margin: 0,
                        padding: 20,
                        fontFamily: 'monospace',
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: '#0f172a',
                        background: 'white',
                        overflowX: 'auto'
                    }}>
                        {sql}
                    </pre>
                </div>
            )}

            {/* RESULTS TABLE */}
            <div style={{
                borderRadius: 20,
                border: '1px solid rgba(203, 213, 225, 0.5)',
                background: 'white',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '18px 22px',
                    borderBottom: '1px solid rgba(203, 213, 225, 0.5)',
                    background: 'rgba(248, 250, 252, 1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                            padding: 10,
                            borderRadius: 12,
                            background: 'rgba(37, 99, 235, 0.1)'
                        }}>
                            <TableIcon size={22} color="#2563eb" />
                        </div>
                        <div>
                            <div style={{
                                fontSize: 18,
                                fontWeight: 900,
                                color: '#0f172a'
                            }}>
                                Query Result
                            </div>
                            <div style={{
                                fontSize: 11,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                color: '#64748b'
                            }}>
                                {data.length} rows
                            </div>
                        </div>
                    </div>

                    <button style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#64748b',
                        transition: 'color 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.color = '#0f172a'}
                    onMouseOut={e => e.currentTarget.style.color = '#64748b'}
                    >
                        <Download size={18} />
                    </button>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto', maxHeight: '60vh' }}>
                    {data.length > 0 ? (
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: 13
                        }}>
                            <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                                <tr style={{ background: 'rgba(241, 245, 249, 1)' }}>
                                    {columns.map(col => (
                                        <th key={col} style={{
                                            padding: '14px 18px',
                                            textAlign: 'left',
                                            fontSize: 11,
                                            letterSpacing: 2,
                                            textTransform: 'uppercase',
                                            fontWeight: 800,
                                            color: '#475569',
                                            borderBottom: '1px solid rgba(203, 213, 225, 0.5)'
                                        }}>
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i} style={{
                                        borderBottom: '1px solid rgba(241, 245, 249, 1)',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
                                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        {columns.map(col => (
                                            <td key={col} style={{
                                                padding: '14px 18px',
                                                color: row[col] == null
                                                    ? '#94a3b8'
                                                    : '#0f172a',
                                                fontFamily: 'monospace'
                                            }}>
                                                {row[col] ?? 'NULL'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{
                            padding: 80,
                            textAlign: 'center',
                            color: '#94a3b8'
                        }}>
                            <TableIcon size={48} style={{ margin: '0 auto', color: '#cbd5e1' }} />
                            <div style={{
                                marginTop: 16,
                                fontSize: 18,
                                fontWeight: 900,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                color: '#475569'
                            }}>
                                Empty Result
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
