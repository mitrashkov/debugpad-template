import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Code2, 
  ChevronRight, 
  Play, 
  Bug, 
  Layers, 
  GitBranch,
  Cpu,
  Terminal,
  FileCode,
  AlertCircle,
  Loader2,
  Box,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { getState, subscribe, type AnalysisState, type Issue } from '../lib/store';

const Debugger = () => {
  const [state, setLocalState] = useState<AnalysisState>(getState());
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribe((newState) => {
      setLocalState(newState);
      if (newState.analysisResults?.issues.length && !selectedIssue) {
        setSelectedIssue(newState.analysisResults.issues[0]);
      }
    });
    return unsubscribe;
  }, [selectedIssue]);

  const runDebuggerAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  // No repo selected
  if (!state.repoUrl) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <GitBranch className="w-8 h-8 text-muted" />
          </div>
          <h2 className="text-xl font-bold">No Repository Selected</h2>
          <p className="text-muted max-w-md">
            Enter a repository URL on the home page to start debugging.
          </p>
        </div>
      </div>
    );
  }

  // No analysis results yet
  if (!state.analysisResults && !isAnalyzing) {
    return (
      <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-lg">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <Bug className="w-8 h-8 text-warning" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Advanced Debugger</h2>
            <p className="text-muted text-sm">
              Run deep trace analysis on <span className="text-white font-mono">{state.repoUrl}</span> to identify execution bottlenecks, memory issues, and root causes.
            </p>
          </div>
          <button 
            onClick={runDebuggerAnalysis}
            className="btn-primary px-8 py-3 flex items-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4" />
            Start Debug Analysis
          </button>
        </div>
      </div>
    );
  }

  // Analyzing
  if (isAnalyzing) {
    return (
      <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-white/10 border-t-warning rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-warning animate-spin" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Running Debug Analysis</h2>
            <p className="text-muted text-sm font-mono">{state.repoUrl}</p>
          </div>
        </div>
      </div>
    );
  }

  const results = state.analysisResults;
  if (!results) return null;

  // Get the selected issue or first issue
  const currentIssue = selectedIssue || results.issues[0];

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-8 py-4 flex items-center justify-between bg-surface/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
            <GitBranch className="w-3 h-3 text-muted" />
            <span className="text-[10px] font-bold uppercase tracking-widest truncate max-w-xs">{state.repoUrl}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted" />
          <div className="flex items-center gap-2">
            <Bug className="w-4 h-4 text-warning" />
            <span className="text-xs font-mono">{results.issues.length} Issues Found</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={runDebuggerAnalysis}
            className="btn-secondary text-[10px] py-1.5 flex items-center gap-2"
          >
            <Play className="w-3 h-3" /> Re-Analyze
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Issue List Sidebar */}
        <div className="w-72 border-r border-border flex flex-col bg-surface/10">
          <div className="p-4 border-b border-border">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted">Issues</h3>
            <p className="text-xs text-muted mt-1">{results.issues.length} detected</p>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-2">
            {results.issues.map((issue) => (
              <div
                key={issue.id}
                onClick={() => setSelectedIssue(issue)}
                className={cn(
                  "p-3 rounded-sm cursor-pointer transition-all",
                  currentIssue?.id === issue.id 
                    ? "bg-white/10 border border-white/20" 
                    : "hover:bg-white/5 border border-transparent"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    issue.severity === 'critical' && "bg-danger",
                    issue.severity === 'high' && "bg-warning", 
                    issue.severity === 'medium' && "bg-white",
                    issue.severity === 'low' && "bg-success"
                  )} />
                  <span className="text-[10px] font-mono text-muted">{issue.id}</span>
                </div>
                <p className="text-xs font-medium line-clamp-2">{issue.title}</p>
                {issue.file && (
                  <p className="text-[10px] text-muted mt-1 font-mono truncate">{issue.file}</p>
                )}
              </div>
            ))}
            {results.issues.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="text-xs text-muted">No issues found</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-bg">
          {currentIssue ? (
            <>
              {/* Issue Detail Header */}
              <div className="border-b border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-muted">{currentIssue.id}</span>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                        currentIssue.severity === 'critical' && "bg-danger/20 text-danger",
                        currentIssue.severity === 'high' && "bg-warning/20 text-warning",
                        currentIssue.severity === 'medium' && "bg-white/10 text-white",
                        currentIssue.severity === 'low' && "bg-success/20 text-success"
                      )}>
                        {currentIssue.severity}
                      </span>
                      <span className="text-[10px] text-muted uppercase tracking-widest">{currentIssue.category}</span>
                    </div>
                    <h2 className="text-xl font-bold">{currentIssue.title}</h2>
                  </div>
                </div>
                <p className="text-sm text-muted">{currentIssue.description}</p>
                {currentIssue.file && (
                  <div className="flex items-center gap-2 mt-3 text-xs">
                    <FileCode className="w-4 h-4 text-muted" />
                    <span className="font-mono text-muted">{currentIssue.file}</span>
                    {currentIssue.line && (
                      <span className="font-mono text-warning">:{currentIssue.line}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Code Preview (placeholder) */}
              <div className="flex-1 overflow-auto p-8">
                <div className="card h-full">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-muted" />
                      <span className="text-xs font-mono text-muted">
                        {currentIssue.file || 'Source Code'}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted">AI Analysis Preview</span>
                  </div>
                  <div className="font-mono text-sm text-white/60 space-y-2">
                    <p className="text-muted">Select a file from your repository to view the code context for this issue.</p>
                    <p className="text-xs text-white/40 mt-4">Issue Location: {currentIssue.file || 'Unknown'}{currentIssue.line ? `:${currentIssue.line}` : ''}</p>
                  </div>
                </div>
              </div>

              {/* AI Analysis Panel */}
              <div className="h-48 border-t border-border bg-surface/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="w-4 h-4 text-success" />
                  <h3 className="text-[10px] font-bold uppercase tracking-widest">AI Analysis</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5" />
                    <p className="text-xs text-white/70 leading-relaxed">
                      Analyzing <span className="text-white font-bold">{currentIssue.category}</span> issue 
                      in {currentIssue.file || 'repository'}. 
                      Severity level: <span className={cn(
                        "font-bold",
                        currentIssue.severity === 'critical' && "text-danger",
                        currentIssue.severity === 'high' && "text-warning",
                        currentIssue.severity === 'medium' && "text-white",
                        currentIssue.severity === 'low' && "text-success"
                      )}>{currentIssue.severity}</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5" />
                    <p className="text-xs text-white/70 leading-relaxed">
                      {currentIssue.description}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Box className="w-12 h-12 text-muted mx-auto mb-4" />
                <p className="text-muted">Select an issue to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { CheckCircle2 } from 'lucide-react';
export default Debugger;
