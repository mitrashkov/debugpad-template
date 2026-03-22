import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Code2, 
  Sparkles,
  History,
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { cn } from '../lib/utils';

const FixEngine = () => {
  const [selectedFix, setSelectedFix] = useState(0);

  const fixes = [
    {
      id: 'FIX-001',
      title: 'Optimize Memory Partitioning',
      description: 'Implement worker-based offloading for large memory maps to prevent main thread blocking.',
      impact: 'High',
      confidence: '94%',
      status: 'Ready',
      diff: `
- const leaks = await analyzer.detectLeaks(partition.memoryMap);
+ const leaks = await workerPool.exec('detectLeaks', [partition.memoryMap]);
      `.trim()
    },
    {
      id: 'FIX-002',
      title: 'Resolve Thread Race Condition',
      description: 'Add mutex locking to the neural handshake sequence to prevent data corruption during high concurrency.',
      impact: 'Critical',
      confidence: '88%',
      status: 'Ready',
      diff: `
- await handshake.init();
+ await mutex.runExclusive(async () => {
+   await handshake.init();
+ });
      `.trim()
    },
    {
      id: 'FIX-003',
      title: 'Update Topology Mapping',
      description: 'Sync system topology with latest node-west-4 configuration changes.',
      impact: 'Medium',
      confidence: '99%',
      status: 'Applied',
      diff: `
- const nodes = await fetchNodes('node-west-3');
+ const nodes = await fetchNodes('node-west-4');
      `.trim()
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Fix Engine</h1>
          <p className="text-muted text-sm mt-1">AI-driven automated repair and surgical code optimization.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <History className="w-4 h-4" /> Fix History
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Scan for Fixes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Fix List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Available Fixes</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">{fixes.length} Identified</span>
          </div>
          <div className="space-y-3">
            {fixes.map((fix, i) => (
              <div 
                key={fix.id} 
                onClick={() => setSelectedFix(i)}
                className={cn(
                  "card group cursor-pointer transition-all",
                  selectedFix === i ? "border-white/40 bg-white/5" : "hover:border-white/20"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      fix.status === 'Applied' ? 'bg-success' : 'bg-warning animate-pulse'
                    )} />
                    <span className="text-[10px] font-mono text-muted">{fix.id}</span>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5",
                    fix.impact === 'Critical' ? 'text-danger' : fix.impact === 'High' ? 'text-warning' : 'text-success'
                  )}>
                    {fix.impact} Impact
                  </span>
                </div>
                <h3 className="text-sm font-bold mb-1">{fix.title}</h3>
                <p className="text-[10px] text-muted line-clamp-2 leading-relaxed">{fix.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fix Detail & Diff */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-white/2 border-white/10 p-8 min-h-[500px] flex flex-col">
            <div className="flex items-start justify-between mb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold uppercase tracking-tight">{fixes[selectedFix].title}</h2>
                  <div className="px-2 py-0.5 bg-success/10 border border-success/20 rounded-sm">
                    <span className="text-[10px] font-bold text-success uppercase tracking-widest">{fixes[selectedFix].confidence} Confidence</span>
                  </div>
                </div>
                <p className="text-muted text-sm max-w-xl leading-relaxed">
                  {fixes[selectedFix].description}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-muted uppercase tracking-widest font-bold">Target Module</span>
                <span className="text-xs font-mono">src/core/memory.ts</span>
              </div>
            </div>

            <div className="flex-1 bg-bg border border-white/5 rounded-sm overflow-hidden flex flex-col">
              <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-3 h-3 text-muted" />
                  <span className="text-[10px] font-mono text-muted">Surgical Diff Analysis</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-danger/20 border border-danger/40" />
                    <span className="text-[8px] font-bold uppercase text-muted">Removed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success/20 border border-success/40" />
                    <span className="text-[8px] font-bold uppercase text-muted">Added</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6 font-mono text-xs leading-relaxed overflow-auto">
                <pre className="space-y-1">
                  {fixes[selectedFix].diff.split('\n').map((line, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "px-2 py-0.5 rounded-sm",
                        line.startsWith('-') ? "bg-danger/10 text-danger" : 
                        line.startsWith('+') ? "bg-success/10 text-success" : "text-white/60"
                      )}
                    >
                      {line}
                    </div>
                  ))}
                </pre>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  Policy Validated
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                  <Terminal className="w-4 h-4 text-white" />
                  Dry Run Passed
                </div>
              </div>
              <button className={cn(
                "btn-primary px-12 py-4 flex items-center gap-2",
                fixes[selectedFix].status === 'Applied' && "opacity-50 cursor-not-allowed"
              )}>
                {fixes[selectedFix].status === 'Applied' ? 'Fix Applied' : 'Apply Surgical Fix'} 
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixEngine;
