'use client';

import { Settings, Globe, Shield, Activity, Palette } from 'lucide-react';

export default function SettingsView() {
    return (
        <div className="space-y-12">
         
        </div>
    );
}

function ThemeCard({ label, active, locked }: { label: string, active?: boolean, locked?: boolean }) {
    return (
        <div className={`p-4 rounded-xl border text-center transition-all ${active ? 'border-primary bg-primary/10 shadow-[0_0_10px_var(--primary-glow)]' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
            } ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <p className={`text-sm font-bold ${active ? 'text-primary' : 'text-slate-700'}`}>{label}</p>
            {locked && <p className="text-[10px] text-slate-500 mt-1 uppercase">Pro Feature</p>}
        </div>
    );
}
