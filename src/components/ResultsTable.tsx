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
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px 20px',
                        background: 'rgba(255,255,255,0.04)',
                        borderBottom: '1px solid rgba(255,255,255,0.08)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            fontSize: 11,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            fontWeight: 800,
                            color: '#818cf8'
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
                                color: 'rgba(255,255,255,0.6)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                            }}
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
                        color: '#e5e7eb',
                        background: '#020617',
                        overflowX: 'auto'
                    }}>
                        {sql}
                    </pre>
                </div>
            )}

            {/* RESULTS TABLE */}
            <div style={{
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '18px 22px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                            padding: 10,
                            borderRadius: 12,
                            background: 'rgba(99,102,241,0.15)'
                        }}>
                            <TableIcon size={22} color="#818cf8" />
                        </div>
                        <div>
                            <div style={{
                                fontSize: 18,
                                fontWeight: 900,
                                color: '#fff'
                            }}>
                                Query Result
                            </div>
                            <div style={{
                                fontSize: 11,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.4)'
                            }}>
                                {data.length} rows
                            </div>
                        </div>
                    </div>

                    <button style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'rgba(255,255,255,0.6)'
                    }}>
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
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                                    {columns.map(col => (
                                        <th key={col} style={{
                                            padding: '14px 18px',
                                            textAlign: 'left',
                                            fontSize: 11,
                                            letterSpacing: 2,
                                            textTransform: 'uppercase',
                                            fontWeight: 800,
                                            color: 'rgba(255,255,255,0.4)',
                                            borderBottom: '1px solid rgba(255,255,255,0.08)'
                                        }}>
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i} style={{
                                        borderBottom: '1px solid rgba(255,255,255,0.06)'
                                    }}>
                                        {columns.map(col => (
                                            <td key={col} style={{
                                                padding: '14px 18px',
                                                color: row[col] == null
                                                    ? 'rgba(255,255,255,0.3)'
                                                    : '#e5e7eb',
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
                            color: 'rgba(255,255,255,0.35)'
                        }}>
                            <TableIcon size={48} />
                            <div style={{
                                marginTop: 16,
                                fontSize: 18,
                                fontWeight: 900,
                                letterSpacing: 2,
                                textTransform: 'uppercase'
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
