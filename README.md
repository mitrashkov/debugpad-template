<div align="center">
  <img src="/logo.svg" alt="DebugPad Logo" width="120" />
  <h1>DebugPad</h1>
  <p>AI-Native Software Intelligence System</p>
</div>

---

DebugPad is an open-source AI-native software intelligence platform that:
- Understands code, systems, and binaries
- Reasons about behavior, not just syntax
- Simulates real-world failures and attacks
- Identifies root causes
- Generates fixes
- Prioritizes decisions

## Features

- **Surgical Debugging** - Deep trace analysis and root cause identification
- **Kinetic Intel** - Real-time PR risk assessment
- **Fix Engine** - AI-driven automated code repair
- **Simulation Engine** - Stress test logic models before deployment
- **Observability** - Full system monitoring and analysis

## Getting Started

### Prerequisites

- Node.js 18+
- OpenRouter API key (get one at [openrouter.ai](https://openrouter.ai))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/debugpad.git
   cd debugpad
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

DebugPad uses **your own** OpenRouter API key. We never see or store your keys.

1. Sign up at [openrouter.ai](https://openrouter.ai) to get an API key
2. Add your key in the Settings page or via `.env.local`
3. Choose your preferred AI model from OpenRouter's catalog

## Security & Privacy

- **Your API keys are yours** - We never collect, store, or transmit your API keys
- **Local-first** - All code analysis happens locally
- **No telemetry** - We don't track your usage or code
- **Open source** - Full transparency, audit the code yourself

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**DebugPad doesn't tell you what might be wrong. It shows you what will happen.**
