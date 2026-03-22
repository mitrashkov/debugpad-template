import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar
} from 'recharts';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Database, 
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const data = [
  { time: '00:00', load: 45, latency: 120, errors: 2 },
  { time: '04:00', load: 52, latency: 135, errors: 1 },
  { time: '08:00', load: 85, latency: 210, errors: 5 },
  { time: '12:00', load: 78, latency: 190, errors: 3 },
  { time: '16:00', load: 92, latency: 240, errors: 8 },
  { time: '20:00', load: 65, latency: 160, errors: 2 },
  { time: '23:59', load: 48, latency: 130, errors: 1 },
];

const Diagnostics = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Mission Control</h1>
          <p className="text-muted text-sm mt-1">Real-time system diagnostics and stress parameters.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-muted uppercase tracking-widest font-bold">Session ID</span>
            <span className="text-xs font-mono">TR-992-X-KINETIC</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-muted uppercase tracking-widest font-bold">Uptime</span>
            <span className="text-xs font-mono">142:12:04</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'System Load', value: '84.2%', icon: Cpu, trend: '+12%', color: 'text-white' },
          { label: 'Avg Latency', value: '142ms', icon: Clock, trend: '-4ms', color: 'text-success' },
          { label: 'Error Rate', value: '0.04%', icon: AlertTriangle, trend: '+0.01%', color: 'text-danger' },
          { label: 'Data Throughput', value: '1.2GB/s', icon: Database, trend: '+400MB', color: 'text-white' },
        ].map((stat, i) => (
          <div key={i} className="card group hover:border-white/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/5 rounded-sm">
                <stat.icon className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
              </div>
              <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5", stat.trend.startsWith('+') ? 'text-danger' : 'text-success')}>
                {stat.trend}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted uppercase tracking-widest font-bold">{stat.label}</span>
              <span className={cn("text-2xl font-display font-bold", stat.color)}>{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-success" />
              <h3 className="text-xs font-bold uppercase tracking-widest">System Stress Analysis</h3>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-[10px] text-muted uppercase font-bold">Load</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-[10px] text-muted uppercase font-bold">Latency</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff00" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00ff00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#14151a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="load" stroke="#ffffff" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={2} />
                <Area type="monotone" dataKey="latency" stroke="#00ff00" fillOpacity={1} fill="url(#colorLatency)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-warning" />
              Stress Test Parameters
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Neural Load', value: '84%', color: 'bg-white' },
                { label: 'Memory Pressure', value: '62%', color: 'bg-white' },
                { label: 'Thread Saturation', value: '91%', color: 'bg-danger' },
                { label: 'Network Congestion', value: '12%', color: 'bg-success' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-muted">{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all duration-1000", item.color)} 
                      style={{ width: item.value }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">System Health</h3>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset="37.7" className="text-success" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-display font-bold">90</span>
                  <span className="text-[8px] font-bold uppercase text-muted">Health Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest">System Intelligence Log</h3>
          <div className="flex gap-2">
            <span className="text-[10px] font-bold uppercase text-muted">Filter:</span>
            <span className="text-[10px] font-bold uppercase text-white border-b border-white">All Events</span>
          </div>
        </div>
        <div className="space-y-2 mono">
          {[
            { time: '14:22:01', type: 'INFO', msg: 'Neural partition validation sequence initiated.', color: 'text-muted' },
            { time: '14:22:05', type: 'WARN', msg: 'Latency spike detected in node-west-4 (240ms).', color: 'text-warning' },
            { time: '14:22:12', type: 'CRIT', msg: 'Memory overflow risk in partition 0x4F2A.', color: 'text-danger' },
            { time: '14:22:18', type: 'SUCC', msg: 'Auto-scaling protocol successfully deployed.', color: 'text-success' },
            { time: '14:22:25', type: 'INFO', msg: 'System equilibrium restored. Monitoring drift.', color: 'text-muted' },
          ].map((log, i) => (
            <div key={i} className="flex gap-4 py-1 border-b border-white/5 last:border-0">
              <span className="text-muted opacity-50">[{log.time}]</span>
              <span className={cn("font-bold w-12", log.color)}>{log.type}</span>
              <span className="text-white/80">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { cn } from '../lib/utils';
export default Diagnostics;
