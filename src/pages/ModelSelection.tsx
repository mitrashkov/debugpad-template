import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Zap, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Clock,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Trophy,
  BarChart3
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { AVAILABLE_MODELS, setRepoUrl, setSelectedModel, getState, type ModelTier } from '../lib/store';
import { isConfigured } from '../lib/openrouter';

const ModelSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTier, setSelectedTier] = useState<ModelTier | 'all'>('all');
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [isStarting, setIsStarting] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');

  useEffect(() => {
    setHasApiKey(isConfigured());
    const state = getState();
    
    // Get repo URL from state or navigation state
    const url = state.repoUrl || (location.state as { repoUrl?: string })?.repoUrl;
    
    if (!url) {
      // No repo URL, go back to entry
      navigate('/');
      return;
    }
    
    setRepoUrl(url);
    
    // Default to best model (Nemotron Super)
    if (!selectedModelId) {
      const bestModel = AVAILABLE_MODELS.find(m => m.isBest);
      setSelectedModelId(bestModel?.id || AVAILABLE_MODELS[0].id);
    }
  }, [navigate, location.state]);

  const filteredModels = selectedTier === 'all' 
    ? AVAILABLE_MODELS 
    : AVAILABLE_MODELS.filter(m => m.tier === selectedTier);

  const tiers = [
    { id: 'all', label: 'All Models', icon: Layers },
    { id: 'flagship', label: 'Flagship', icon: Sparkles },
    { id: 'large', label: 'Large', icon: Zap },
    { id: 'efficient', label: 'Efficient', icon: Clock },
  ] as const;

  const handleStartAnalysis = async () => {
    if (!selectedModelId || !hasApiKey) return;
    
    setIsStarting(true);
    
    // Save selections to global state
    setSelectedModel(selectedModelId);
    
    // Simulate brief loading
    await new Promise(r => setTimeout(r, 500));
    
    // Navigate to diagnostics - analysis will auto-start there
    navigate('/diagnostics');
  };

  const handleGoBack = () => {
    navigate('/', { state: { repoUrl } });
  };

  const selectedModel = AVAILABLE_MODELS.find(m => m.id === selectedModelId);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
        <div className="scanline" />
      </div>

      <div className="w-full max-w-4xl z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <button 
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-muted hover:text-white transition-all text-xs font-bold uppercase tracking-widest mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Repository
          </button>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <Cpu className="w-3 h-3 text-success" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Step 2 of 2</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tighter">
            Select AI Model
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            Choose the intelligence engine for analyzing{' '}
            <span className="text-white font-mono text-sm">{repoUrl || 'your repository'}</span>
          </p>
        </div>

        {/* No API Key Warning */}
        {!hasApiKey && (
          <div className="bg-warning/10 border border-warning/20 rounded-sm p-4 flex items-start gap-3 max-w-2xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-white/80">
                <span className="font-bold">API key required.</span> You need to configure your OpenRouter API key before starting analysis.
              </p>
              <button 
                onClick={() => navigate('/settings')}
                className="mt-2 text-xs text-warning hover:underline"
              >
                Configure in Settings →
              </button>
            </div>
          </div>
        )}

        {/* Tier Filter */}
        <div className="flex items-center justify-center gap-2">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all",
                selectedTier === tier.id
                  ? "bg-white text-bg"
                  : "bg-white/5 text-muted hover:text-white hover:bg-white/10"
              )}
            >
              <tier.icon className="w-3 h-3" />
              {tier.label}
            </button>
          ))}
        </div>

        {/* Model Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              onClick={() => setSelectedModelId(model.id)}
              className={cn(
                "card cursor-pointer transition-all hover:border-white/20 relative",
                selectedModelId === model.id
                  ? "border-white/40 bg-white/5 ring-1 ring-white/20"
                  : "border-white/5 bg-white/2",
                model.isBest && "border-warning/30 bg-warning/5"
              )}
            >
              {/* Best Model Badge */}
              {model.isBest && (
                <div className="absolute -top-2 -right-2 px-2 py-1 bg-warning rounded-sm flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-bg" />
                  <span className="text-[10px] font-bold text-bg uppercase">Best</span>
                </div>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
                  model.tier === 'flagship' && "bg-warning/20 text-warning",
                  model.tier === 'large' && "bg-white/10 text-white",
                  model.tier === 'efficient' && "bg-success/20 text-success"
                )}>
                  {model.tier}
                </div>
                {selectedModelId === model.id && (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                )}
              </div>

              <h3 className="text-lg font-bold mb-2">{model.name}</h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                {model.description}
              </p>

              {/* Benchmark Score Bar */}
              {'benchmarkScore' in model && model.benchmarkScore > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-muted">Benchmark Score</span>
                    <span className="font-bold text-white">{model.benchmarkScore.toFixed(3)}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        model.isBest ? "bg-warning" : "bg-white/40"
                      )}
                      style={{ width: `${(model.benchmarkScore / 0.896) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-[10px] text-muted">
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {model.contextLength}
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {model.speed}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Model Info */}
        {selectedModel && (
          <div className="card bg-white/5 border-white/10 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-muted uppercase tracking-widest">Selected Model</span>
                <p className="text-lg font-bold">{selectedModel.name}</p>
                <p className="text-xs text-muted">{selectedModel.id}</p>
              </div>
              <button
                onClick={handleStartAnalysis}
                disabled={!hasApiKey || isStarting}
                className={cn(
                  "btn-primary flex items-center gap-2 px-8 py-4",
                  (!hasApiKey || isStarting) && "opacity-50 cursor-not-allowed"
                )}
              >
                {isStarting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    Start Analysis
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-[10px] text-muted">
            <BarChart3 className="w-3 h-3" />
            <span>Benchmark results from 13 real debugging tasks</span>
          </div>
          <p className="text-[10px] text-muted">
            Models ranked by average score. Nemotron Super leads with 0.896.
          </p>
        </div>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-8 left-8 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted">DebugPad v0.1.0</span>
        </div>
      </div>
    </div>
  );
};

export default ModelSelection;
