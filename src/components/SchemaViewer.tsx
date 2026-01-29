import { Table, Layout, ChevronRight, Hash, Folder, Box } from 'lucide-react';
import { useState } from 'react';

interface SchemaViewerProps {
    schema: any | null;
}

export default function SchemaViewer({ schema }: SchemaViewerProps) {
    const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({});

    if (!schema) return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-20">
            <Box size={40} className="mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                Connect database to<br />explore structure
            </p>
        </div>
    );

    const toggleTable = (tableName: string) => {
        setExpandedTables(prev => ({
            ...prev,
            [tableName]: !prev[tableName]
        }));
    };

    const tables = Object.entries(schema).map(([name, columns]: [string, any]) => ({
        name,
        columns: Array.isArray(columns) ? columns : []
    }));

    return (
        <div className="h-full flex flex-col py-2">
            <div className="flex-grow overflow-y-auto custom-scrollbar px-2">
                <div className="space-y-1">
                    {tables.map((table) => (
                        <div key={table.name} className="flex flex-col">
                            <button
                                onClick={() => toggleTable(table.name)}
                                className={`flex items-center gap-2 w-full p-2.5 rounded-lg transition-all text-left group
                                    ${expandedTables[table.name] ? 'bg-white/5' : 'hover:bg-white/[0.03]'}
                                `}
                            >
                                <ChevronRight
                                    size={14}
                                    className={`text-muted-foreground transition-transform duration-200 
                                        ${expandedTables[table.name] ? 'rotate-90 text-primary' : ''}
                                    `}
                                />
                                <Folder
                                    size={16}
                                    className={`${expandedTables[table.name] ? 'text-primary' : 'text-primary/40'} transition-colors`}
                                />
                                <span className={`text-[11px] font-bold tracking-tight transition-colors
                                    ${expandedTables[table.name] ? 'text-white' : 'text-white/60 group-hover:text-white/90'}
                                `}>
                                    {table.name}
                                </span>
                            </button>

                            {expandedTables[table.name] && (
                                <div className="ml-6 mt-1 space-y-0.5 border-l border-white/5 pl-2 animate-in slide-in-from-left-1 duration-200">
                                    {table.columns.map((col: any) => (
                                        <div
                                            key={col.column}
                                            className="flex items-center justify-between p-2 rounded-md hover:bg-white/[0.03] group/item transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Hash size={12} className="text-muted-foreground/30 group-hover/item:text-primary/40 transition-colors" />
                                                <span className="text-[10px] font-mono text-white/40 group-hover/item:text-white/80 transition-colors tracking-tighter">
                                                    {col.column}
                                                </span>
                                            </div>
                                            <span className="text-[8px] font-black text-white/10 group-hover/item:text-primary/40 uppercase tracking-widest transition-colors">
                                                {col.type}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
