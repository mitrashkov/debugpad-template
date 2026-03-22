import { useState, useEffect, useCallback } from 'react';
import { loadConfig, saveConfig, clearConfig, isConfigured, OpenRouterConfig } from '../lib/openrouter';

export function useOpenRouterConfig() {
  const [config, setConfig] = useState<OpenRouterConfig | null>(null);
  const [hasConfig, setHasConfig] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaded = loadConfig();
    setConfig(loaded);
    setHasConfig(isConfigured());
    setIsLoading(false);
  }, []);

  const updateConfig = useCallback((newConfig: OpenRouterConfig) => {
    saveConfig(newConfig);
    setConfig(newConfig);
    setHasConfig(!!newConfig.apiKey);
  }, []);

  const removeConfig = useCallback(() => {
    clearConfig();
    setConfig(null);
    setHasConfig(false);
  }, []);

  return {
    config,
    hasConfig,
    isLoading,
    updateConfig,
    removeConfig,
  };
}
