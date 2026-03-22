import React, { useEffect, useState } from 'react';
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
  FileCode,
  GitBranch,
  AlertCircle,
  Box,
  Sparkles,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { getState, subscribe, type AnalysisState, type Issue } from '../lib/store';

interface PR {
  id: string;
  title: string;
  author: string;
  risk: 'High' | 'Medium' | 'Low';
  status: string;
  time: string;
  filesChanged: number;
  insertions: number;
  deletions: number;
}

const PRAnalysis = () => {
  const [state, setLocalState] = useState<AnalysisState>(getState());
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prs, setPrs] = useState<PR[]>([]);

  useEffect(() => {
    const unsubscribe = subscribe((newState) => {
      setLocalState(newState);
      if (newState.analysisResults?.issues) {
        generatePRsFromIssues(newState.analysisResults.issues);
      }
    });
    return unsubscribe;
  }, []);

  // Generate PRs from issues for demo purposes
  const generatePRsFromIssues = (issues: Issue[]) => {
    const generatedPRs: PR[] = issues.slice(0, 4).map((issue, index) => ({
      id: `PR-${1204 - index}`,
      title: issue.title,
      author: 'debugpad-ai',
      risk: issue.severity === 'critical' ? 'High' : issue.severity === 'high' ? 'High' : issue.severity === 'medium' ? 'Medium' : 'Low',
      status: index === 0 ? 'Analyzing' : index === 1 ? 'Blocked' : 'Ready',
      time: index === 0 ? '12m ago' : index === 1 ? '1h ago' : index === 2 ? '3h ago' : '5h ago',
      filesChanged: 1 + Math.floor(Math.random() * 10),
      insertions: 10 + Math.floor(Math.random() * 500),
      deletions: Math.floor(Math.random() * 200)
    }));
    setPrs(generatedPRs);
  };

  const analyzePRs = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      if (state.analysisResults?.issues) {
        generatePRsFromIssues(state.analysisResults.issues);
      }
      setIsAnalyzing(false);
    }, 1500);
  };

  // No repo selected
  if (!state.repoUrl) {
    return (
      <div className="p-8 h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <GitBranch className="w-8 h-8 text-muted" />
          </div>
          <h2 className="text-xl font-bold">No Repository Selected</h2>
          <p className="text-muted max-w-md">
            Enter a repository URL on the home page to analyze pull requests.
          </p>
        </div>
      </div>
    );
  }

  // No analysis yet
  if (prs.length === 0 && !isAnalyzing) {
    return (
      <div className="p-8 h-full flex flex-col items-center justify-center">
        <div className="text-center space-y-6 max-w-lg">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <GitPullRequest className="w-8 h-8 text-success" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">PR Analysis</h2>
            <p className="text-muted text-sm">
              Analyze pull requests for <span className="text-white font-mono">{state.repoUrl}</span> to detect risks and generate intelligence reports.
            </p>
          </div>
          <button 
            onClick={analyzePRs}
            className="btn-primary px-8 py-3 flex items-center gap-2 mx-auto"
          >
            <Sparkles className="w-4 h-4" />
            Analyze PRs
          </button>
        </div>
      </div>
    );
  }

  // Analyzing
  if (isAnalyzing) {
    return (
      <div className="p-8 h-full flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-white/10 border-t-success rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-success animate-spin" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Analyzing PRs</h2>
            <p className="text-muted text-sm">Scanning for risks and generating intelligence...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">PR Analysis</h1>
          <div className="flex items-center gap-2 mt-2">
            <GitBranch className="w-4 h-4 text-muted" />
            <span className="text-sm text-muted font-mono truncate max-w-xs">{state.repoUrl}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={analyzePRs}
            className="btn-primary flex items-center gap-2"
          >
            <GitPullRequest className="w-4 h-4" /> Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PR Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Active Stream</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">{prs.length} Pull Requests</span>
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
                          <Box className="w-4 h-4" />
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
            {prs.length === 0 && (
              <div className="card text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                <p className="text-muted">No pending pull requests</p>
              </div>
            )}
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">Risk Distribution</span>
                <div className="h-24 flex items-end gap-1">
                  {[40, 65, 30, prs.filter(p => p.risk === 'High').length * 20 + 20, 45, prs.length * 15, 55].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-white/10 rounded-t-sm hover:bg-white/20 transition-all" 
                      style={{ height: `${Math.min(h, 100)}%` }} 
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
                    <h4 className="text-xs font-bold">Risk Analysis</h4>
                    <p className="text-[10px] text-muted mt-1 leading-relaxed">
                      {prs.filter(p => p.risk === 'High').length} high-risk PRs detected requiring attention.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="w-4 h-4 text-success mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold">Activity</h4>
                    <p className="text-[10px] text-muted mt-1 leading-relaxed">
                      {prs.length} active pull requests in the last 24 hours.
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full btn-primary text-xs uppercase tracking-widest font-bold py-3 mt-4">
                Generate Full Report
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
                { label: 'PRs Analyzed', value: prs.length.toString() },
                { label: 'High Risk', value: prs.filter(p => p.risk === 'High').length.toString(), color: 'text-danger' },
                { label: 'Medium Risk', value: prs.filter(p => p.risk === 'Medium').length.toString(), color: 'text-warning' },
                { label: 'Low Risk', value: prs.filter(p => p.risk === 'Low').length.toString(), color: 'text-success' },
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
