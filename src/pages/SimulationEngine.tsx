import React, { useState } from 'react';
import { 
  Activity, 
  Zap, 
  Play, 
  Square, 
  RefreshCw, 
  ShieldAlert, 
  Cpu, 
  Database,
  BarChart3,
  Clock
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { cn } from '../lib/utils';

const data = [
  { step: 1, load: 20, success: 100 },
  { step: 2, load: 45, success: 100 },
  { step: 3, load: 75, success: 98 },
  { step: 4, load: 95, success: 85 },
  { step: 5, load: 120, success: 60 },
  { step: 6, load: 150, success: 20 },
  { step: 7, load: 180, success: 5 },
];

const SimulationEngine = () => {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Simulation Engine</h1>
          <p className="text-muted text-sm mt-1">Stress test logic models and predict system failure points.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={cn(
              "btn-primary flex items-center gap-2 px-8",
              isRunning ? "bg-danger text-white hover:bg-danger/90" : "bg-white text-bg"
            )}
          >
            {isRunning ? <><Square className="w-4 h-4" /> Stop Simulation</> : <><Play className="w-4 h-4" /> Initiate Stress Test</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Simulation Controls */}
        <div className="card space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-warning" />
            Test Parameters
          </h3>
          
          <div className="space-y-4">
            {[
              { label: 'Concurrent Users', value: '10,000', min: '1k', max: '100k' },
              { label: 'Request Frequency', value: '500ms', min: '10ms', max: '2s' },
              { label: 'Data Payload Size', value: '2.4MB', min: '100kb', max: '50MB' },
              { label: 'Failure Injection', value: 'Enabled', type: 'toggle' },
            ].map((param, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-muted">{param.label}</span>
                  <span className="text-white">{param.value}</span>
                </div>
                {param.type !== 'toggle' ? (
                  <div className="h-1 bg-white/5 rounded-full relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-3 h-3 bg-white rounded-full border-2 border-bg cursor-pointer" />
                  </div>
                ) : (
                  <div className="w-10 h-5 bg-success/20 border border-success/40 rounded-full relative cursor-pointer">
                    <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-success rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-border">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-4">Target Nodes</h4>
            <div className="space-y-2">
              {['node-west-4', 'node-east-2', 'gateway-alpha'].map((node) => (
                <div key={node} className="flex items-center gap-3 p-2 bg-white/5 rounded-sm border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-[10px] font-mono text-white/80">{node}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Simulation Data */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card flex flex-col items-center justify-center py-8 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Failure Probability</span>
              <span className="text-4xl font-display font-bold text-danger">14.2%</span>
              <span className="text-[10px] text-muted mt-2 uppercase tracking-widest">Critical Threshold: 20%</span>
            </div>
            <div className="card flex flex-col items-center justify-center py-8 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Max Throughput</span>
              <span className="text-4xl font-display font-bold text-white">842 req/s</span>
              <span className="text-[10px] text-muted mt-2 uppercase tracking-widest">Peak Load Detected</span>
            </div>
            <div className="card flex flex-col items-center justify-center py-8 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Resource Exhaustion</span>
              <span className="text-4xl font-display font-bold text-warning">82m</span>
              <span className="text-[10px] text-muted mt-2 uppercase tracking-widest">Est. Time to OOM</span>
            </div>
          </div>

          <div className="card h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-success" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Load vs Success Rate</h3>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-[10px] text-muted uppercase font-bold">Load Intensity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-danger" />
                  <span className="text-[10px] text-muted uppercase font-bold">Success Rate</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff4444" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ff4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="step" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#14151a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="load" stroke="#ffffff" fillOpacity={0} strokeWidth={2} />
                  <Area type="monotone" dataKey="success" stroke="#ff4444" fillOpacity={1} fill="url(#colorSuccess)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Logs */}
      <div className="card bg-surface/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest">Simulation Event Stream</h3>
          <div className="flex items-center gap-2">
            <RefreshCw className={cn("w-3 h-3 text-muted", isRunning && "animate-spin")} />
            <span className="text-[10px] font-bold uppercase text-muted">Live Stream</span>
          </div>
        </div>
        <div className="space-y-2 mono text-[12px]">
          {[
            { time: '00:01:22', event: 'LOAD_STEP_3', msg: 'Increasing concurrent users to 5,000. Latency stable at 140ms.', color: 'text-success' },
            { time: '00:02:45', event: 'LOAD_STEP_5', msg: 'Memory pressure detected on node-west-4. GC activity increased.', color: 'text-warning' },
            { time: '00:03:12', event: 'FAILURE_INJECT', msg: 'Simulating node-east-2 disconnect. Failover protocol initiated.', color: 'text-danger' },
            { time: '00:03:45', event: 'RECOVERY', msg: 'Failover successful. Traffic rerouted to node-west-4.', color: 'text-success' },
          ].map((log, i) => (
            <div key={i} className="flex gap-4 py-1 border-b border-white/5 last:border-0">
              <span className="text-muted opacity-50">[{log.time}]</span>
              <span className={cn("font-bold w-24", log.color)}>{log.event}</span>
              <span className="text-white/80">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulationEngine;
