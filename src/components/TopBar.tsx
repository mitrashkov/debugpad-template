import React from 'react';
import { Search, Bell, Command, Terminal } from 'lucide-react';

const TopBar = () => {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Search system logs, PRs, or traces..." 
            className="w-full bg-white/5 border border-white/10 rounded-sm py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-white/20 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="text-[10px] bg-white/10 px-1 rounded-sm text-muted">⌘</kbd>
            <kbd className="text-[10px] bg-white/10 px-1 rounded-sm text-muted">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-success/10 border border-success/20 rounded-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-bold text-success uppercase tracking-widest">System Online</span>
        </div>

        <div className="h-8 w-px bg-border mx-2" />

        <button className="p-2 text-muted hover:text-white transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full border border-bg" />
        </button>

        <button className="flex items-center gap-2 px-4 py-1.5 bg-white text-bg rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-all">
          <Terminal className="w-3 h-3" />
          Run Trace
        </button>
      </div>
    </header>
  );
};

export default TopBar;
