import React from 'react';
import { 
  Database, 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Download, 
  Cpu, 
  Zap,
  Activity,
  Award
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';

const data = [
  { name: 'Kinetic-v4', score: 98, latency: 12, throughput: 1200 },
  { name: 'Legacy-v3', score: 75, latency: 45, throughput: 850 },
  { name: 'Alpha-Test', score: 92, latency: 18, throughput: 1100 },
  { name: 'Beta-Branch', score: 88, latency: 22, throughput: 1050 },
  { name: 'Stable-v2', score: 82, latency: 35, throughput: 900 },
];

const ResultsRanking = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Results & Ranking</h1>
          <p className="text-muted text-sm mt-1">Референтни стойности за производителност на системата и исторически данни за класиране.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Data
          </button>
          <button className="btn-primary flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Run Benchmark
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaderboard */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-warning" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Performance Benchmark Scores</h3>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-[10px] text-muted uppercase font-bold">Efficiency Score</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} width={100} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#14151a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Bar dataKey="score" radius={[0, 2, 2, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#ffffff' : 'rgba(255,255,255,0.2)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest">Detailed Ranking Table</h3>
              <div className="flex gap-2">
                <Search className="w-4 h-4 text-muted" />
                <Filter className="w-4 h-4 text-muted" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-muted">
                    <th className="pb-4">Rank</th>
                    <th className="pb-4">Model Name</th>
                    <th className="pb-4">Latency</th>
                    <th className="pb-4">Throughput</th>
                    <th className="pb-4">Score</th>
                    <th className="pb-4">Trend</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-mono">
                  {data.map((item, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/2 group transition-all">
                      <td className="py-4 text-muted">#{i + 1}</td>
                      <td className="py-4 font-bold text-white">{item.name}</td>
                      <td className="py-4 text-muted">{item.latency}ms</td>
                      <td className="py-4 text-muted">{item.throughput} req/s</td>
                      <td className="py-4 font-bold text-white">{item.score}</td>
                      <td className="py-4">
                        {i === 0 ? (
                          <TrendingUp className="w-4 h-4 text-success" />
                        ) : i === 1 ? (
                          <TrendingDown className="w-4 h-4 text-danger" />
                        ) : (
                          <Activity className="w-4 h-4 text-muted" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Performer Card */}
        <div className="space-y-6">
          <div className="card bg-white/5 border-white/10 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <Award className="w-12 h-12 text-white/10" />
            </div>
            <div className="flex flex-col items-center space-y-4 relative z-10">
              <div className="w-20 h-20 bg-white text-bg rounded-sm flex items-center justify-center">
                <Zap className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Top Performer</span>
                <h2 className="text-2xl font-bold uppercase tracking-tight">Kinetic-v4</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full pt-4">
                <div className="card bg-white/5 p-3">
                  <span className="text-[8px] font-bold uppercase text-muted block mb-1">Efficiency</span>
                  <span className="text-lg font-bold">99.2%</span>
                </div>
                <div className="card bg-white/5 p-3">
                  <span className="text-[8px] font-bold uppercase text-muted block mb-1">Stability</span>
                  <span className="text-lg font-bold">99.9%</span>
                </div>
              </div>
              <button className="w-full btn-primary text-xs uppercase tracking-widest font-bold py-3 mt-4">
                View Performance Audit
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted" />
              Historical Drift
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Latency Drift', value: '-2.4%', trend: 'up' },
                { label: 'Resource Usage', value: '+1.2%', trend: 'down' },
                { label: 'Error Frequency', value: '-0.04%', trend: 'up' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase text-muted">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-xs font-bold",
                      item.trend === 'up' ? 'text-success' : 'text-danger'
                    )}>{item.value}</span>
                    {item.trend === 'up' ? <TrendingUp className="w-3 h-3 text-success" /> : <TrendingDown className="w-3 h-3 text-danger" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsRanking;
