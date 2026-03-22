import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Save, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Shield,
  Eye,
  EyeOff,
  Cpu
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useOpenRouterConfig } from '../hooks/useOpenRouterConfig';
import { validateApiKey, getAvailableModels } from '../lib/openrouter';

const DEFAULT_MODELS = [
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
  { id: 'openai/gpt-4o', name: 'GPT-4o' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini' },
  { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku' },
  { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B' },
];

const Settings = () => {
  const { config, hasConfig, updateConfig, removeConfig } = useOpenRouterConfig();
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('anthropic/claude-3.5-sonnet');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [models, setModels] = useState(DEFAULT_MODELS);
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  // Load existing config
  useEffect(() => {
    if (config) {
      setApiKey(config.apiKey || '');
      setSelectedModel(config.model || 'anthropic/claude-3.5-sonnet');
    }
  }, [config]);

  // Fetch available models
  useEffect(() => {
    setIsLoadingModels(true);
    getAvailableModels().then(fetchedModels => {
      if (fetchedModels.length > 0) {
        setModels(fetchedModels);
      }
      setIsLoadingModels(false);
    });
  }, []);

  const handleSave = async () => {
    if (!apiKey.trim()) return;

    setIsValidating(true);
    setValidationStatus('idle');

    const isValid = await validateApiKey(apiKey.trim());

    if (isValid) {
      updateConfig({
        apiKey: apiKey.trim(),
        model: selectedModel,
        siteUrl: window.location.origin,
        appName: 'DebugPad',
      });
      setValidationStatus('success');
    } else {
      setValidationStatus('error');
    }

    setIsValidating(false);
  };

  const handleRemove = () => {
    removeConfig();
    setApiKey('');
    setValidationStatus('idle');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold uppercase tracking-tighter">System Settings</h1>
        <p className="text-muted text-sm mt-1">Конфигуриране на AI доставчик и предпочитания за сигурност.</p>
      </div>

      {/* API Configuration Card */}
      <div className="card space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="p-2 bg-white/5 rounded-sm">
            <Key className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">AI Provider Configuration</h2>
            <p className="text-[10px] text-muted uppercase tracking-widest">OpenRouter API Settings</p>
          </div>
          {hasConfig && (
            <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-success/10 border border-success/20 rounded-sm">
              <CheckCircle2 className="w-3 h-3 text-success" />
              <span className="text-[10px] font-bold text-success uppercase tracking-widest">Configured</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* API Key Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
              OpenRouter API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-or-v1-..."
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 pr-24 text-sm focus:outline-none focus:border-white/20 transition-all font-mono"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted hover:text-white transition-colors"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-muted">
              Get your API key at{' '}
              <a 
                href="https://openrouter.ai/keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:underline inline-flex items-center gap-1"
              >
                openrouter.ai/keys <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
              AI Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-white/20 transition-all appearance-none cursor-pointer"
              disabled={isLoadingModels}
            >
              {models.map((model) => (
                <option key={model.id} value={model.id} className="bg-surface">
                  {model.name}
                </option>
              ))}
            </select>
            {isLoadingModels && (
              <p className="text-[10px] text-muted">Loading available models...</p>
            )}
          </div>

          {/* Validation Status */}
          {validationStatus !== 'idle' && (
            <div className={cn(
              "flex items-center gap-2 p-3 rounded-sm",
              validationStatus === 'success' ? 'bg-success/10 border border-success/20' : 'bg-danger/10 border border-danger/20'
            )}>
              {validationStatus === 'success' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-xs text-success">API key validated successfully!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-danger" />
                  <span className="text-xs text-danger">Invalid API key. Please check and try again.</span>
                </>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={!apiKey.trim() || isValidating}
              className={cn(
                "btn-primary flex items-center gap-2",
                (!apiKey.trim() || isValidating) && "opacity-50 cursor-not-allowed"
              )}
            >
              {isValidating ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Configuration
                </>
              )}
            </button>
            
            {hasConfig && (
              <button
                onClick={handleRemove}
                className="btn-secondary flex items-center gap-2 text-danger hover:text-danger"
              >
                <Trash2 className="w-4 h-4" />
                Remove Key
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="card bg-white/5 border-white/5">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-success/10 rounded-sm shrink-0">
            <Shield className="w-5 h-5 text-success" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold">Your Keys, Your Control</h3>
            <p className="text-[10px] text-muted leading-relaxed">
              DebugPad stores your API key locally in your browser's storage. 
              Your key never leaves your device - we don't have servers that see your key or your code. 
              All AI requests go directly from your browser to OpenRouter.
            </p>
            <ul className="text-[10px] text-muted space-y-1 mt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-success" />
                Key stored locally in browser
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-success" />
                Direct browser-to-OpenRouter requests
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-success" />
                No telemetry or tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-success" />
                Open source - audit the code yourself
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="card space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="p-2 bg-white/5 rounded-sm">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">System Preferences</h2>
            <p className="text-[10px] text-muted uppercase tracking-widest">DebugPad Behavior</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <span className="text-sm font-medium">Auto-analyze on open</span>
              <p className="text-[10px] text-muted mt-1">Automatically start analysis when opening a file</p>
            </div>
            <div className="w-10 h-5 bg-white/10 border border-white/20 rounded-full relative cursor-pointer">
              <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-white rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <span className="text-sm font-medium">Show confidence scores</span>
              <p className="text-[10px] text-muted mt-1">Display AI confidence ratings on suggestions</p>
            </div>
            <div className="w-10 h-5 bg-success/20 border border-success/40 rounded-full relative cursor-pointer">
              <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-success rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <span className="text-sm font-medium">Stream responses</span>
              <p className="text-[10px] text-muted mt-1">Show AI responses as they generate</p>
            </div>
            <div className="w-10 h-5 bg-success/20 border border-success/40 rounded-full relative cursor-pointer">
              <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-success rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="text-center pt-8 border-t border-border">
        <p className="text-[10px] text-muted uppercase tracking-widest">
          DebugPad v0.1.0 — Open Source Software Intelligence
        </p>
        <p className="text-[10px] text-muted mt-2">
          <a href="https://github.com/debugpad/debugpad" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            GitHub
          </a>
          {' · '}
          <a href="https://debugpad.io/docs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Documentation
          </a>
          {' · '}
          <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Powered by OpenRouter
          </a>
        </p>
      </div>
    </div>
  );
};

export default Settings;
