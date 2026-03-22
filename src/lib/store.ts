/**
 * Global State Store for DebugPad
 * Simple state management without external libraries
 */

export interface AnalysisState {
  repoUrl: string;
  selectedModel: string;
  isAnalyzing: boolean;
  analysisResults: AnalysisResults | null;
}

export interface AnalysisResults {
  healthScore: number;
  issues: Issue[];
  stats: {
    systemLoad: number;
    avgLatency: number;
    errorRate: number;
    dataThroughput: string;
  };
}

export interface Issue {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  description: string;
  file?: string;
  line?: number;
}

// Initial state
let state: AnalysisState = {
  repoUrl: '',
  selectedModel: '',
  isAnalyzing: false,
  analysisResults: null,
};

// Listeners for state changes
const listeners: Set<(state: AnalysisState) => void> = new Set();

/**
 * Subscribe to state changes
 */
export function subscribe(listener: (state: AnalysisState) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Get current state
 */
export function getState(): AnalysisState {
  return { ...state };
}

/**
 * Update state
 */
export function setState(updates: Partial<AnalysisState>): void {
  state = { ...state, ...updates };
  listeners.forEach(listener => listener(state));
}

/**
 * Set repository URL
 */
export function setRepoUrl(url: string): void {
  setState({ repoUrl: url });
}

/**
 * Set selected AI model
 */
export function setSelectedModel(model: string): void {
  setState({ selectedModel: model });
}

/**
 * Reset all state
 */
export function resetState(): void {
  state = {
    repoUrl: '',
    selectedModel: '',
    isAnalyzing: false,
    analysisResults: null,
  };
  listeners.forEach(listener => listener(state));
}

/**
 * Available models from benchmark results
 * Ranked by average score from debugpad_benchmark.py
 */
export const AVAILABLE_MODELS = [
  {
    id: 'nvidia/llama-3.1-nemotron-70b-instruct',
    name: 'Nemotron Super',
    provider: 'NVIDIA',
    description: 'BEST OVERALL - Score: 0.896 | Top in Code Analysis & Fix Generation',
    tier: 'flagship',
    contextLength: '128K tokens',
    speed: 'Quality',
    benchmarkScore: 0.896,
    isBest: true,
  },
  {
    id: 'minimax/minimax-m2.5',
    name: 'MiniMax M2.5',
    provider: 'MiniMax',
    description: 'Score: 0.860 | Top in Security & Simulation',
    tier: 'flagship',
    contextLength: '128K tokens',
    speed: 'Quality',
    benchmarkScore: 0.860,
    isBest: false,
  },
  {
    id: 'arcee-ai/trinity-large',
    name: 'Trinity Large',
    provider: 'Arcee',
    description: 'Score: 0.798 | Fast & Reliable',
    tier: 'large',
    contextLength: '128K tokens',
    speed: 'Fast',
    benchmarkScore: 0.798,
    isBest: false,
  },
  {
    id: 'openai/gpt-oss-120b',
    name: 'GPT-OSS 120B',
    provider: 'OpenAI',
    description: 'Score: 0.621 | Top in Reasoning (0.993)',
    tier: 'large',
    contextLength: '128K tokens',
    speed: 'Slow',
    benchmarkScore: 0.621,
    isBest: false,
  },
  {
    id: 'stepfun/step-3.5-flash',
    name: 'Step 3.5 Flash',
    provider: 'StepFun',
    description: 'Score: 0.328 | Budget Option',
    tier: 'efficient',
    contextLength: '128K tokens',
    speed: 'Slow',
    benchmarkScore: 0.328,
    isBest: false,
  },
  {
    id: 'qwen/qwen3-next',
    name: 'Qwen3 Next',
    provider: 'Qwen',
    description: 'Score: 0.000 | Ultra Fast (2.4s)',
    tier: 'efficient',
    contextLength: '128K tokens',
    speed: 'Ultra Fast',
    benchmarkScore: 0,
    isBest: false,
  },
  {
    id: 'qwen/qwen3-coder',
    name: 'Qwen3 Coder',
    provider: 'Qwen',
    description: 'Score: 0.000 | Coding Specialist',
    tier: 'efficient',
    contextLength: '128K tokens',
    speed: 'Ultra Fast',
    benchmarkScore: 0,
    isBest: false,
  },
] as const;

export type ModelTier = 'flagship' | 'large' | 'efficient';
