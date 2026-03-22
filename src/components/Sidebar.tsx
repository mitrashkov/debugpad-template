import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Terminal, 
  Activity, 
  GitPullRequest, 
  ShieldCheck, 
  Settings, 
  Cpu, 
  Zap,
  Search,
  Database,
  Eye
} from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Mission Control', path: '/diagnostics' },
    { icon: Terminal, label: 'Advanced Debugger', path: '/debugger' },
    { icon: Zap, label: 'Fix Engine', path: '/fix-engine' },
    { icon: Activity, label: 'Simulation Engine', path: '/simulation' },
    { icon: GitPullRequest, label: 'Kinetic Intel', path: '/pr-analysis' },
    { icon: Eye, label: 'Observability', path: '/observability' },
    { icon: ShieldCheck, label: 'Policy Dashboard', path: '/policy' },
    { icon: Database, label: 'Results & Ranking', path: '/results' },
  ];

  return (
    <aside className="w-64 border-r border-border h-screen flex flex-col bg-bg sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
          <Cpu className="w-5 h-5 text-bg" />
        </div>
        <span className="font-display font-bold text-lg tracking-tight uppercase">Kinetic</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "nav-item",
              isActive && "active"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-2 text-muted hover:text-white transition-all cursor-pointer">
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">System Settings</span>
        </div>
        <div className="mt-4 flex items-center gap-3 px-4">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
            <img 
              src="https://picsum.photos/seed/user/32/32" 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Hypex Dev</span>
            <span className="text-[10px] text-muted uppercase tracking-wider">Senior Architect</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
