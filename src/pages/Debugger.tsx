import React from 'react';
import { 
  Search, 
  Code2, 
  ChevronRight, 
  Play, 
  Bug, 
  Layers, 
  GitBranch,
  Cpu,
  Terminal
} from 'lucide-react';
import { cn } from '../lib/utils';

const Debugger = () => {
  const code = `
async function validatePartition(partitionId: string) {
  const partition = await db.partitions.get(partitionId);
  
  if (!partition) {
    throw new Error("Partition not found");
  }

  // Check for memory leaks
  const leaks = await analyzer.detectLeaks(partition.memoryMap);
  
  if (leaks.length > 0) {
    logger.warn(\`Detected \${leaks.length} potential leaks\`);
    return { status: "unstable", leaks };
  }

  return { status: "healthy", leaks: [] };
}
  `.trim();

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <div className="border-b border-border px-8 py-4 flex items-center justify-between bg-surface/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
            <GitBranch className="w-3 h-3 text-muted" />
            <span className="text-[10px] font-bold uppercase tracking-widest">main</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted" />
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-muted" />
            <span className="text-xs font-mono">src/core/memory.ts</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary text-[10px] py-1.5 flex items-center gap-2">
            <Search className="w-3 h-3" /> Find Usages
          </button>
          <button className="btn-primary text-[10px] py-1.5 flex items-center gap-2">
            <Play className="w-3 h-3" /> Run Analysis
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor Area */}
        <div className="flex-1 flex flex-col border-r border-border bg-bg">
          <div className="flex-1 overflow-auto p-8 font-mono text-[14px] leading-relaxed relative">
            <div className="absolute left-0 top-0 w-12 h-full bg-white/2 border-r border-white/5 flex flex-col items-center py-8 text-muted/30 select-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="h-6">{i + 1}</div>
              ))}
            </div>
            <div className="pl-8">
              <pre className="text-white/80">
                {code.split('\n').map((line, i) => (
                  <div key={i} className={cn(
                    "h-6 hover:bg-white/5 transition-colors px-2 rounded-sm",
                    i === 11 && "bg-danger/10 border-l-2 border-danger"
                  )}>
                    {line}
                  </div>
                ))}
              </pre>
            </div>
          </div>
          
          {/* Terminal / AI Reasoning */}
          <div className="h-64 border-t border-border bg-surface/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-success" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">AI Reasoning Engine</h3>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5" />
                <p className="text-xs text-white/70 leading-relaxed">
                  Analyzing <span className="text-white font-bold">validatePartition</span> execution flow. 
                  Potential bottleneck identified at line 12. The <span className="text-white font-bold">analyzer.detectLeaks</span> 
                  call is blocking the main thread for large memory maps.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5" />
                <p className="text-xs text-white/70 leading-relaxed">
                  Recommendation: Implement worker-based offloading or chunked processing for the memory map analysis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Diagnostics */}
        <div className="w-80 flex flex-col bg-surface/20">
          <div className="p-6 border-b border-border">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-muted">Execution Context</h3>
            <div className="space-y-4">
              <div className="card bg-white/5 p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold uppercase text-muted">Call Stack</span>
                  <span className="text-[10px] font-mono text-success">4 Layers</span>
                </div>
                <div className="space-y-1 text-[10px] font-mono">
                  <div className="text-white">validatePartition()</div>
                  <div className="text-muted">processRequest()</div>
                  <div className="text-muted">handleIncoming()</div>
                  <div className="text-muted">main()</div>
                </div>
              </div>

              <div className="card bg-white/5 p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold uppercase text-muted">Variables</span>
                  <Bug className="w-3 h-3 text-danger" />
                </div>
                <div className="space-y-1 text-[10px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted">partitionId</span>
                    <span className="text-warning">"p-992-x"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">leaks.length</span>
                    <span className="text-danger">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-auto">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-muted">Dependency Graph</h3>
            <div className="space-y-3">
              {[
                { name: 'db.partitions', status: 'Healthy', icon: Layers },
                { name: 'analyzer.detectLeaks', status: 'High Latency', icon: Activity },
                { name: 'logger.warn', status: 'Healthy', icon: Terminal },
              ].map((dep, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-sm transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <dep.icon className="w-3 h-3 text-muted" />
                    <span className="text-[10px] font-bold uppercase tracking-tight">{dep.name}</span>
                  </div>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    dep.status === 'Healthy' ? 'bg-success' : 'bg-warning'
                  )} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Activity } from 'lucide-react';
export default Debugger;
