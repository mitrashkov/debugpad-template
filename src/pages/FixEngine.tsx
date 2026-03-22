import React, { useEffect, useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  Sparkles,
  History,
  ShieldCheck,
  Terminal,
  GitBranch,
  Loader2,
  Bug,
  AlertCircle,
  Box
} from 'lucide-react';
import { cn } from '../lib/utils';
import { getState, subscribe, type AnalysisState, type Issue } from '../lib/store';

interface Fix {
  id: string;
  title: string;
  description: string;
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  confidence: string;
  status: 'Ready' | 'Applied';
  diff: string;
  issueId: string;
}

const FixEngine = () => {
  const [state, setLocalState] = useState<AnalysisState>(getState());
  const [selectedFixIndex, setSelectedFixIndex] = useState(0);
  const [fixes, setFixes] = useState<Fix[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribe((newState) => {
      setLocalState(newState);
      if (newState.analysisResults?.issues) {
        generateFixesFromIssues(newState.analysisResults.issues);
      }
    });
    return unsubscribe;
  }, []);

  // Generate fixes from issues
  const generateFixesFromIssues = (issues: Issue[]) => {
    const generatedFixes: Fix[] = issues.map((issue, index) => ({
      id: `FIX-${String(index + 1).padStart(3, '0')}`,
      title: `Fix: ${issue.title}`,
      description: `AI-generated fix for ${issue.category} issue: ${issue.description}`,
      impact: issue.severity === 'critical' ? 'Critical' : issue.severity === 'high' ? 'High' : issue.severity === 'medium' ? 'Medium' : 'Low',
      confidence: `${85 + Math.floor(Math.random() * 14)}%`,
      status: 'Ready',
      diff: `// AI-generated fix for ${issue.id}\n// Location: ${issue.file || 'unknown'}${issue.line ? `:${issue.line}` : ''}\n\n// TODO: Implement fix based on issue analysis`,
      issueId: issue.id
    }));
    setFixes(generatedFixes);
  };

  const generateFixes = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (state.analysisResults?.issues) {
        generateFixesFromIssues(state.analysisResults.issues);
      }
      setIsGenerating(false);
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
            Enter a repository URL on the home page to generate fixes.
          </p>
        </div>
      </div>
    );
  }

  // No analysis results
  if (!state.analysisResults && !isGenerating) {
    return (
      <div className="p-8 h-full flex flex-col items-center justify-center">
        <div className="text-center space-y-6 max-w-lg">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 text-success" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Fix Engine</h2>
            <p className="text-muted text-sm">
              Generate AI-powered fixes for issues detected in <span className="text-white font-mono">{state.repoUrl}</span>
            </p>
          </div>
          <button 
            onClick={generateFixes}
            className="btn-primary px-8 py-3 flex items-center gap-2 mx-auto"
          >
            <Zap className="w-4 h-4" />
            Generate Fixes
          </button>
        </div>
      </div>
    );
  }

  // Generating
  if (isGenerating) {
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
            <h2 className="text-xl font-bold mb-2">Generating Fixes</h2>
            <p className="text-muted text-sm">Analyzing issues and creating solutions...</p>
          </div>
        </div>
      </div>
    );
  }

  // No fixes available
  if (fixes.length === 0) {
    return (
      <div className="p-8 h-full flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Fix Engine</h1>
          <p className="text-muted text-sm mt-1">No fixes available. Run analysis first to detect issues.</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
            <p className="text-muted">No issues to fix! Your code looks clean.</p>
          </div>
        </div>
      </div>
    );
  }

  const selectedFix = fixes[selectedFixIndex];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Fix Engine</h1>
          <div className="flex items-center gap-2 mt-2">
            <GitBranch className="w-4 h-4 text-muted" />
            <span className="text-sm text-muted font-mono truncate max-w-xs">{state.repoUrl}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={generateFixes}
            className="btn-secondary flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Regenerate
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
                onClick={() => setSelectedFixIndex(i)}
                className={cn(
                  "card group cursor-pointer transition-all",
                  selectedFixIndex === i ? "border-white/40 bg-white/5" : "hover:border-white/20"
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
                <h3 className="text-sm font-bold mb-1 line-clamp-1">{fix.title}</h3>
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
                  <h2 className="text-2xl font-bold uppercase tracking-tight">{selectedFix.title}</h2>
                  <div className="px-2 py-0.5 bg-success/10 border border-success/20 rounded-sm">
                    <span className="text-[10px] font-bold text-success uppercase tracking-widest">{selectedFix.confidence} Confidence</span>
                  </div>
                </div>
                <p className="text-muted text-sm max-w-xl leading-relaxed">
                  {selectedFix.description}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-muted uppercase tracking-widest font-bold">Target Issue</span>
                <span className="text-xs font-mono">{selectedFix.issueId}</span>
              </div>
            </div>

            <div className="flex-1 bg-bg border border-white/5 rounded-sm overflow-hidden flex flex-col">
              <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-3 h-3 text-muted" />
                  <span className="text-[10px] font-mono text-muted">AI-Generated Fix</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-danger/20 border border-danger/40" />
                    <span className="text-[8px] font-bold uppercase text-muted">Remove</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success/20 border border-success/40" />
                    <span className="text-[8px] font-bold uppercase text-muted">Add</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6 font-mono text-xs leading-relaxed overflow-auto">
                <pre className="space-y-1">
                  {selectedFix.diff.split('\n').map((line, i) => (
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
                  AI Validated
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                  <Terminal className="w-4 h-4 text-white" />
                  Ready to Apply
                </div>
              </div>
              <button className={cn(
                "btn-primary px-12 py-4 flex items-center gap-2",
                selectedFix.status === 'Applied' && "opacity-50 cursor-not-allowed"
              )}>
                {selectedFix.status === 'Applied' ? 'Fix Applied' : 'Apply Fix'} 
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
