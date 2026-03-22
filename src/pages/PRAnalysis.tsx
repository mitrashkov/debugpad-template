import React from 'react';
import { 
  GitPullRequest, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Filter,
  MoreHorizontal,
  Zap,
  Activity,
  FileCode
} from 'lucide-react';
import { cn } from '../lib/utils';

const PRAnalysis = () => {
  const prs = [
    { id: 'PR-1204', title: 'Optimize memory partition validation', author: 'hypex-dev', risk: 'Low', status: 'Analyzing', time: '12m ago' },
    { id: 'PR-1203', title: 'Refactor neural handshake protocol', author: 'arch-01', risk: 'High', status: 'Blocked', time: '1h ago' },
    { id: 'PR-1202', title: 'Fix thread concurrency bottleneck', author: 'dev-alpha', risk: 'Medium', status: 'Approved', time: '3h ago' },
    { id: 'PR-1201', title: 'Update system topology mapping', author: 'hypex-dev', risk: 'Low', status: 'Merged', time: '5h ago' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Kinetic Intel</h1>
          <p className="text-muted text-sm mt-1">Active PR stream and surgical intelligence report.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="btn-primary flex items-center gap-2">
            <GitPullRequest className="w-4 h-4" /> New Analysis
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PR Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Active Stream</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">4 Pull Requests</span>
          </div>
          <div className="space-y-3">
            {prs.map((pr) => (
              <div key={pr.id} className="card group hover:border-white/20 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-sm flex items-center justify-center",
                      pr.risk === 'High' ? 'bg-danger/10 text-danger' : 
                      pr.risk === 'Medium' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                    )}>
                      <GitPullRequest className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted">{pr.id}</span>
                        <h3 className="text-sm font-bold">{pr.title}</h3>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-muted flex items-center gap-1">
                          <img src={`https://picsum.photos/seed/${pr.author}/16/16`} className="w-4 h-4 rounded-full" referrerPolicy="no-referrer" />
                          {pr.author}
                        </span>
                        <span className="text-[10px] text-muted flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {pr.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Risk Level</span>
                      <span className={cn(
                        "text-xs font-bold",
                        pr.risk === 'High' ? 'text-danger' : 
                        pr.risk === 'Medium' ? 'text-warning' : 'text-success'
                      )}>{pr.risk}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Status</span>
                      <span className="text-xs font-bold text-white">{pr.status}</span>
                    </div>
                    <button className="p-2 text-muted hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Report */}
        <div className="space-y-6">
          <div className="card bg-white/5 border-white/10 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-4 h-4 text-warning" />
              <h3 className="text-xs font-bold uppercase tracking-widest">Intelligence Report</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">Risk Blast Radius</span>
                <div className="h-24 flex items-end gap-1">
                  {[40, 65, 30, 85, 45, 90, 55].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-white/10 rounded-t-sm hover:bg-white/20 transition-all" 
                      style={{ height: `${h}%` }} 
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[8px] font-bold uppercase text-muted">
                  <span>Core</span>
                  <span>Network</span>
                  <span>Memory</span>
                  <span>Thread</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-4 h-4 text-danger mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold">Critical Path Intersection</h4>
                    <p className="text-[10px] text-muted mt-1 leading-relaxed">
                      PR-1203 modifies the neural handshake which intersects with 4 critical system paths.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="w-4 h-4 text-success mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold">Performance Delta</h4>
                    <p className="text-[10px] text-muted mt-1 leading-relaxed">
                      PR-1204 expected to reduce memory partition latency by 14%.
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full btn-primary text-xs uppercase tracking-widest font-bold py-3 mt-4">
                Generate Full Audit
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-muted" />
              Delta Analysis
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Files Changed', value: '12' },
                { label: 'Insertions', value: '+420', color: 'text-success' },
                { label: 'Deletions', value: '-128', color: 'text-danger' },
                { label: 'Test Coverage', value: '94.2%' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-[10px] font-bold uppercase text-muted">{item.label}</span>
                  <span className={cn("text-xs font-mono font-bold", item.color || "text-white")}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PRAnalysis;
