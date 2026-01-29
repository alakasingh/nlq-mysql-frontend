'use client';

import { Settings, Globe, Shield, Activity, Palette } from 'lucide-react';

export default function SettingsView() {
    return (
        <div className="space-y-12">
            <div className="flex items-center gap-4 mb-10">
                <div className="bg-primary/20 p-2.5 rounded-xl">
                    <Settings className="text-primary" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Configuration</h2>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Workspace Settings</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card space-y-8 bg-white/[0.01]">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 text-white/40">
                        <Globe size={16} className="text-primary" />
                        Infrastructure
                    </h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">API Endpoint</label>
                            <input
                                type="text"
                                defaultValue="http://localhost:8000/api"
                                className="input w-full bg-black/40 h-12 text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Request Timeout (ms)</label>
                            <input
                                type="number"
                                defaultValue={30000}
                                className="input w-full bg-black/40 h-12 text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="card space-y-8 bg-white/[0.01]">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 text-white/40">
                        <Palette size={16} className="text-secondary" />
                        Visual Profile
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <ThemeCard label="IDE Dark" active />
                        <ThemeCard label="Data Blue" locked />
                        <ThemeCard label="Cyberpunk" locked />
                        <ThemeCard label="OLED Black" locked />
                    </div>
                </div>

                <div className="card col-span-1 md:col-span-2 space-y-8 bg-white/[0.01]">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 text-white/40">
                        <Shield size={16} className="text-green-500/50" />
                        Intelligence & Security
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-5 glass bg-white/[0.02] border-white/5 rounded-2xl">
                            <div>
                                <p className="text-sm font-black text-white uppercase tracking-tight">Recursive Query History</p>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Persist logs to local browser storage</p>
                            </div>
                            <div className="w-10 h-5 bg-primary/20 rounded-full relative border border-primary/20">
                                <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_var(--primary-glow)]" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-5 glass bg-white/[0.02] border-white/5 rounded-2xl">
                            <div>
                                <p className="text-sm font-black text-red-400 uppercase tracking-tight">Destructive Cleanup</p>
                                <p className="text-[10px] text-red-400/40 font-bold uppercase tracking-widest mt-0.5">Flush all local encryption keys and data</p>
                            </div>
                            <button className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-400/10 hover:bg-red-400/20 px-6 py-2.5 rounded-full border border-red-400/20 transition-all">
                                Perform Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ThemeCard({ label, active, locked }: { label: string, active?: boolean, locked?: boolean }) {
    return (
        <div className={`p-4 rounded-xl border text-center transition-all ${active ? 'border-primary bg-primary/10 shadow-[0_0_10px_var(--primary-glow)]' : 'border-white/5 bg-black/20 hover:border-white/10'
            } ${locked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
            <p className="text-sm font-bold">{label}</p>
            {locked && <p className="text-[10px] text-muted-foreground mt-1 uppercase">Pro Feature</p>}
        </div>
    );
}
