import React, { useState } from 'react';
import { 
  Terminal, 
  Search, 
  ChevronRight, 
  Cpu, 
  Zap, 
  ShieldCheck,
  ArrowRight,
  Code2,
  Globe,
  Github
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const EntryPortal = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      navigate('/diagnostics');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
        <div className="scanline" />
      </div>

      <div className="w-full max-w-2xl z-10 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
            <Zap className="w-3 h-3 text-success" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">System Intelligence v4.0</span>
          </div>
          <h1 className="text-6xl font-bold tracking-tighter uppercase">
            Debug<span className="text-white/40">Pad</span>
          </h1>
          <p className="text-muted text-lg max-w-lg mx-auto leading-relaxed">
            The digital surgeon for your codebase. Connect your repository to initiate deep surgical diagnostics and AI-driven root cause analysis.
          </p>
        </div>

        <form onSubmit={handleConnect} className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-sm blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200"></div>
            <div className="relative flex items-center bg-surface border border-white/10 rounded-sm overflow-hidden">
              <div className="pl-4 pr-2 text-muted">
                <Globe className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter repository URL or deployment endpoint..." 
                className="flex-1 bg-transparent py-5 px-4 text-white focus:outline-none font-mono text-sm"
              />
              <button 
                type="submit"
                className="bg-white text-bg px-8 py-5 font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all flex items-center gap-2"
              >
                Initiate <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 pt-4">
            <button className="flex items-center gap-2 text-muted hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
              <Github className="w-4 h-4" /> Connect GitHub
            </button>
            <div className="w-px h-4 bg-white/10" />
            <button className="flex items-center gap-2 text-muted hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
              <Terminal className="w-4 h-4" /> Local CLI
            </button>
          </div>
        </form>

        <div className="grid grid-cols-3 gap-6 pt-12">
          {[
            { label: 'Surgical Debugging', icon: Cpu, desc: 'Deep trace analysis and memory partition validation.' },
            { label: 'Kinetic Intel', icon: ShieldCheck, desc: 'Real-time PR risk assessment and delta analysis.' },
            { label: 'Simulation Engine', icon: Zap, desc: 'Stress test your logic models before deployment.' },
          ].map((feature, i) => (
            <div key={i} className="card bg-white/2 border-white/5 p-6 space-y-3 hover:bg-white/5 transition-all">
              <div className="p-2 bg-white/5 w-fit rounded-sm">
                <feature.icon className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest">{feature.label}</h3>
              <p className="text-[10px] text-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-8 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Engine: Kinetic-v4</span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Uptime: 99.99%</span>
      </div>
    </div>
  );
};

export default EntryPortal;
