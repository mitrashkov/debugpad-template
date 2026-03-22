import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Terminal, 
  Activity, 
  GitPullRequest, 
  ShieldCheck, 
  Settings, 
  Eye
} from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Mission Control', path: '/diagnostics' },
    { icon: Terminal, label: 'Advanced Debugger', path: '/debugger' },
    { icon: Activity, label: 'Simulation Engine', path: '/simulation' },
    { icon: GitPullRequest, label: 'Kinetic Intel', path: '/pr-analysis' },
    { icon: Eye, label: 'Observability', path: '/observability' },
    { icon: ShieldCheck, label: 'Policy Dashboard', path: '/policy' },
  ];

  return (
    <aside className="w-64 border-r border-border h-screen flex flex-col bg-bg sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-sm overflow-hidden">
          <img src="/logo.svg" alt="DebugPad" className="w-full h-full object-contain" />
        </div>
        <span className="font-display font-bold text-lg tracking-tight">DebugPad</span>
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
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            "nav-item",
            isActive && "active"
          )}
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">System Settings</span>
        </NavLink>
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
            <span className="text-xs font-semibold">Karavelov</span>
            <span className="text-[10px] text-muted uppercase tracking-wider">Senior Architect</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
