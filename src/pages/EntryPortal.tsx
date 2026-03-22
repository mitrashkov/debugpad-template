import React, { useState, useEffect } from 'react';
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
  Github,
  Key,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { isConfigured } from '../lib/openrouter';
import { setRepoUrl } from '../lib/store';

const EntryPortal = () => {
  const [url, setUrl] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setHasApiKey(isConfigured());
  }, []);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      // Save URL to global state
      setRepoUrl(url);
      // Navigate to model selection
      navigate('/select-model');
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
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">DebugPad v0.1.0</span>
          </div>
          <h1 className="text-6xl font-bold tracking-tighter uppercase">
            Debug<span className="text-white/40">Pad</span>
          </h1>
          <p className="text-muted text-lg max-w-lg mx-auto leading-relaxed">
            Дигиталният хирург за вашия код. Свържете хранилището си за стартиране на дълбока диагностика и AI базиран root cause анализ.
          </p>
        </div>

        {/* API Key Warning */}
        {!hasApiKey && (
          <div className="bg-warning/10 border border-warning/20 rounded-sm p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-white/80">
                <span className="font-bold">AI функциите изискват конфигурация.</span> Добавете вашия OpenRouter API ключ в{' '}
                <button 
                  onClick={() => navigate('/settings')}
                  className="text-warning hover:underline inline-flex items-center gap-1"
                >
                  <Key className="w-3 h-3" /> Settings
                </button>{' '}
                за активиране на AI анализ.
              </p>
              <p className="text-[10px] text-muted mt-2">
                Your key stays on your device. We never see it. Get a free key at{' '}
                <a 
                  href="https://openrouter.ai/keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white"
                >
                  openrouter.ai/keys
                </a>
              </p>
            </div>
          </div>
        )}

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
                placeholder="Въведете URL на хранилище или deployment endpoint..." 
                className="flex-1 bg-transparent py-5 px-4 text-white focus:outline-none font-mono text-sm"
              />
              <button 
                type="submit"
                className="bg-white text-bg px-8 py-5 font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all flex items-center gap-2"
              >
                Старт <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 pt-4">
            <button className="flex items-center gap-2 text-muted hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
              <Github className="w-4 h-4" /> Свързване с GitHub
            </button>
            <div className="w-px h-4 bg-white/10" />
            <button className="flex items-center gap-2 text-muted hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
              <Terminal className="w-4 h-4" /> Локален CLI
            </button>
          </div>
        </form>

      </div>

      <div className="absolute bottom-8 left-8 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Engine: DebugPad-v0.1.0</span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Open Source</span>
      </div>
    </div>
  );
};

export default EntryPortal;
