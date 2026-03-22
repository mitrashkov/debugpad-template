/**
 * OpenRouter API Service
 * 
 * This module handles all AI API calls through OpenRouter.
 * API keys are stored locally in the browser (localStorage) and never transmitted to our servers.
 * All requests go directly from the user's browser to OpenRouter.
 */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';
const DEFAULT_MODEL = 'anthropic/claude-3.5-sonnet';

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterConfig {
  apiKey: string;
  model?: string;
  siteUrl?: string;
  appName?: string;
}

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
}

// Storage key for localStorage
const STORAGE_KEY = 'debugpad_openrouter_config';

/**
 * Save OpenRouter configuration to localStorage
 */
export function saveConfig(config: OpenRouterConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

/**
 * Load OpenRouter configuration from localStorage
 */
export function loadConfig(): OpenRouterConfig | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as OpenRouterConfig;
  } catch {
    return null;
  }
}

/**
 * Clear stored configuration
 */
export function clearConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Check if API is configured
 */
export function isConfigured(): boolean {
  const config = loadConfig();
  return !!config?.apiKey;
}

/**
 * Make a streaming chat completion request to OpenRouter
 */
export async function streamChatCompletion(
  messages: OpenRouterMessage[],
  callbacks: StreamCallbacks,
  config?: Partial<OpenRouterConfig>
): Promise<void> {
  const storedConfig = loadConfig();
  const effectiveConfig = { ...storedConfig, ...config };

  if (!effectiveConfig?.apiKey) {
    callbacks.onError(new Error('OpenRouter API key not configured. Please add your API key in Settings.'));
    return;
  }

  const model = effectiveConfig.model || DEFAULT_MODEL;

  try {
    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${effectiveConfig.apiKey}`,
        'HTTP-Referer': effectiveConfig.siteUrl || window.location.origin,
        'X-Title': effectiveConfig.appName || 'DebugPad',
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      throw new Error(error.error?.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            callbacks.onComplete();
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              callbacks.onChunk(content);
            }
          } catch {
            // Ignore malformed JSON in stream
          }
        }
      }
    }

    callbacks.onComplete();
  } catch (error) {
    callbacks.onError(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Make a non-streaming chat completion request
 */
export async function chatCompletion(
  messages: OpenRouterMessage[],
  config?: Partial<OpenRouterConfig>
): Promise<string> {
  const storedConfig = loadConfig();
  const effectiveConfig = { ...storedConfig, ...config };

  if (!effectiveConfig?.apiKey) {
    throw new Error('OpenRouter API key not configured. Please add your API key in Settings.');
  }

  const model = effectiveConfig.model || DEFAULT_MODEL;

  const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${effectiveConfig.apiKey}`,
      'HTTP-Referer': effectiveConfig.siteUrl || window.location.origin,
      'X-Title': effectiveConfig.appName || 'DebugPad',
    },
    body: JSON.stringify({
      model,
      messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
    throw new Error(error.error?.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

/**
 * Validate an API key by making a test request
 */
export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(`${OPENROUTER_API_URL}/auth/key`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get available models from OpenRouter
 */
export async function getAvailableModels(): Promise<Array<{ id: string; name: string; pricing?: { prompt: number; completion: number } }>> {
  try {
    const response = await fetch(`${OPENROUTER_API_URL}/models`);
    if (!response.ok) throw new Error('Failed to fetch models');
    const data = await response.json();
    return data.data.map((model: { id: string; name: string; pricing?: { prompt: number; completion: number } }) => ({
      id: model.id,
      name: model.name || model.id,
      pricing: model.pricing,
    }));
  } catch {
    // Return default models if fetch fails
    return [
      { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
      { id: 'openai/gpt-4o', name: 'GPT-4o' },
      { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini' },
      { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku' },
      { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B' },
    ];
  }
}
