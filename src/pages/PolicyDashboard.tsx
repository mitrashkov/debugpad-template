import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Plus,
  ShieldAlert,
  FileText,
  UserCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

const PolicyDashboard = () => {
  const policies = [
    { id: 'POL-001', name: 'Memory Isolation Protocol', status: 'Enforced', risk: 'Critical', lastAudit: '2h ago' },
    { id: 'POL-002', name: 'Neural Handshake Validation', status: 'Enforced', risk: 'High', lastAudit: '5h ago' },
    { id: 'POL-003', name: 'Cross-Node Data Encryption', status: 'Warning', risk: 'Medium', lastAudit: '12h ago' },
    { id: 'POL-004', name: 'Admin Access Control', status: 'Enforced', risk: 'Critical', lastAudit: '1d ago' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Policy Dashboard</h1>
          <p className="text-muted text-sm mt-1">Съответствие на системата, правила за сигурност и управление на достъпа.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Search className="w-4 h-4" /> Audit Logs
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Policy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Policy List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Active Policies</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">{policies.length} Active</span>
          </div>
          <div className="space-y-3">
            {policies.map((policy) => (
              <div key={policy.id} className="card group hover:border-white/20 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-sm flex items-center justify-center",
                      policy.status === 'Enforced' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    )}>
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted">{policy.id}</span>
                        <h3 className="text-sm font-bold">{policy.name}</h3>
                      </div>
                      <span className="text-[10px] text-muted uppercase tracking-widest font-bold mt-1 block">Last Audit: {policy.lastAudit}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Risk Level</span>
                      <span className={cn(
                        "text-xs font-bold",
                        policy.risk === 'Critical' ? 'text-danger' : 
                        policy.risk === 'High' ? 'text-warning' : 'text-success'
                      )}>{policy.risk}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Status</span>
                      <span className={cn(
                        "text-xs font-bold",
                        policy.status === 'Enforced' ? 'text-success' : 'text-warning'
                      )}>{policy.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Overview */}
        <div className="space-y-6">
          <div className="card bg-white/5 border-white/10 p-6">
            <div className="flex items-center gap-2 mb-6">
              <ShieldAlert className="w-4 h-4 text-danger" />
              <h3 className="text-xs font-bold uppercase tracking-widest">Security Posture</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center py-4">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset="75.4" className="text-success" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-display font-bold">80%</span>
                    <span className="text-[8px] font-bold uppercase text-muted">Compliance</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-muted" />
                    <span className="text-[10px] font-bold uppercase text-muted">Encryption</span>
                  </div>
                  <span className="text-[10px] font-bold text-success">Active</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3 h-3 text-muted" />
                    <span className="text-[10px] font-bold uppercase text-muted">MFA Enforcement</span>
                  </div>
                  <span className="text-[10px] font-bold text-success">100%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-muted" />
                    <span className="text-[10px] font-bold uppercase text-muted">Open Vulnerabilities</span>
                  </div>
                  <span className="text-[10px] font-bold text-danger">2</span>
                </div>
              </div>

              <button className="w-full btn-primary text-xs uppercase tracking-widest font-bold py-3 mt-4">
                Run Compliance Scan
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted" />
              Governance Report
            </h3>
            <p className="text-[10px] text-muted leading-relaxed mb-4">
              Last system-wide audit completed on Mar 22, 2026. No critical breaches detected. 2 minor policy deviations identified in node-west-4.
            </p>
            <button className="w-full btn-secondary text-[10px] uppercase tracking-widest font-bold py-2">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDashboard;
