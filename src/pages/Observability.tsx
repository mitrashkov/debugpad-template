import React from 'react';
import { 
  Eye, 
  Activity, 
  Zap, 
  Search, 
  Filter, 
  Download, 
  Terminal, 
  Cpu, 
  Database,
  Layers,
  Network
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { cn } from '../lib/utils';

const data = [
  { time: '10:00', cpu: 45, mem: 60, net: 20 },
  { time: '10:05', cpu: 52, mem: 62, net: 25 },
  { time: '10:10', cpu: 85, mem: 75, net: 60 },
  { time: '10:15', cpu: 78, mem: 72, net: 45 },
  { time: '10:20', cpu: 92, mem: 85, net: 80 },
  { time: '10:25', cpu: 65, mem: 70, net: 35 },
];

const Observability = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Observability</h1>
          <p className="text-muted text-sm mt-1">Deep runtime tracing and distributed system observability.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Traces
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Search className="w-4 h-4" /> Trace Explorer
          </button>
        </div>
      </div>

      {/* Node Topology Map (Abstracted) */}
      <div className="card relative h-64 overflow-hidden bg-white/2 border-white/10 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full animate-pulse-soft" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/10 rounded-full animate-pulse-soft" />
        </div>
        
        <div className="relative flex gap-12">
          {[
            { name: 'Gateway', icon: Network, status: 'bg-success' },
            { name: 'Core Engine', icon: Cpu, status: 'bg-success' },
            { name: 'Data Layer', icon: Database, status: 'bg-warning' },
            { name: 'Auth Node', icon: Layers, status: 'bg-success' },
          ].map((node, i) => (
            <div key={i} className="flex flex-col items-center gap-3 group">
              <div className="relative">
                <div className="w-16 h-16 bg-surface border border-white/10 rounded-sm flex items-center justify-center group-hover:border-white/40 transition-all">
                  <node.icon className="w-8 h-8 text-white/60 group-hover:text-white transition-colors" />
                </div>
                <div className={cn("absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-bg", node.status)} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted group-hover:text-white transition-colors">{node.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Metrics Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-success" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Distributed Resource Metrics</h3>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-[10px] text-muted uppercase font-bold">CPU</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-[10px] text-muted uppercase font-bold">Memory</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-[10px] text-muted uppercase font-bold">Network</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#14151a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="cpu" stroke="#ffffff" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="mem" stroke="#00ff00" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="net" stroke="#ffcc00" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Trace Stream */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Live Trace Stream</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Active</span>
            </div>
          </div>
          <div className="space-y-3 overflow-auto max-h-[400px] pr-2">
            {[
              { id: 'tr-9921', method: 'GET', path: '/api/v1/partitions', status: 200, time: '12ms' },
              { id: 'tr-9922', method: 'POST', path: '/api/v1/handshake', status: 201, time: '142ms' },
              { id: 'tr-9923', method: 'GET', path: '/api/v1/topology', status: 500, time: '2400ms' },
              { id: 'tr-9924', method: 'PUT', path: '/api/v1/memory', status: 200, time: '45ms' },
              { id: 'tr-9925', method: 'GET', path: '/api/v1/health', status: 200, time: '8ms' },
              { id: 'tr-9926', method: 'DELETE', path: '/api/v1/cache', status: 204, time: '15ms' },
            ].map((trace) => (
              <div key={trace.id} className="card bg-white/5 p-3 hover:border-white/20 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[8px] font-bold px-1.5 py-0.5 rounded-sm",
                      trace.method === 'GET' ? 'bg-success/20 text-success' : 
                      trace.method === 'POST' ? 'bg-warning/20 text-warning' : 'bg-white/10 text-white'
                    )}>{trace.method}</span>
                    <span className="text-[10px] font-mono text-white/80">{trace.path}</span>
                  </div>
                  <span className={cn(
                    "text-[10px] font-mono",
                    trace.status >= 400 ? 'text-danger' : 'text-success'
                  )}>{trace.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-mono text-muted uppercase tracking-widest">{trace.id}</span>
                  <span className="text-[10px] font-mono text-muted">{trace.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Observability;
