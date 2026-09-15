import React, { useState } from 'react';
import { BarChart3, Zap, Cpu, HardDrive, CheckCircle2, ShieldAlert } from 'lucide-react';

interface BenchmarkScenario {
  id: string;
  name: string;
  description: string;
  flintRps: number;
  slimRps: number;
  symfonyRps: number;
  laravelRps: number;
  flintMem: number;
  slimMem: number;
  symfonyMem: number;
  laravelMem: number;
}

const SCENARIOS: BenchmarkScenario[] = [
  {
    id: 'api',
    name: 'PSR-15 REST API (8 Middlewares)',
    description: 'Incoming JSON request through CORS, JWT verification, Rate Limiter, and Radix routing.',
    flintRps: 58400,
    slimRps: 28900,
    symfonyRps: 12400,
    laravelRps: 6200,
    flintMem: 1.4,
    slimMem: 2.8,
    symfonyMem: 11.6,
    laravelMem: 17.8,
  },
  {
    id: 'db',
    name: 'Database Fetch via PDO (10 Records)',
    description: 'Prepared PDO query with typed hydration into DataMapper entities.',
    flintRps: 34200,
    slimRps: 22100,
    symfonyRps: 9800,
    laravelRps: 4900,
    flintMem: 2.1,
    slimMem: 3.4,
    symfonyMem: 14.2,
    laravelMem: 22.4,
  },
  {
    id: 'raw',
    name: 'Raw HTTP Dispatch (Hello World)',
    description: 'Direct Radix route resolution and PSR-7 immutable response emission.',
    flintRps: 94800,
    slimRps: 46500,
    symfonyRps: 18200,
    laravelRps: 8400,
    flintMem: 1.1,
    slimMem: 2.2,
    symfonyMem: 9.8,
    laravelMem: 15.6,
  },
];

export const BenchmarkSection: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('api');
  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const maxRps = 100000;

  return (
    <section id="benchmarks" className="py-16 bg-white border-b border-stone-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700 font-semibold mb-3">
            <BarChart3 className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>TRANSPARENT PERFORMANCE BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Designed to outperform, proven by numbers.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            By eliminating global facades, heavy magic dispatchers, and runtime reflection introspection, FlintPHP achieves class-leading throughput with an ultra-compact memory footprint.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-stone-100 border border-stone-200 gap-1">
            {SCENARIOS.map((s) => {
              const active = s.id === activeScenarioId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveScenarioId(s.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all cursor-pointer ${
                    active
                      ? 'bg-white text-stone-900 font-bold shadow-xs border border-stone-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {s.name.split(' (')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Benchmark Comparison Box */}
        <div className="max-w-4xl mx-auto bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="mb-6 pb-4 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-mono">{scenario.name}</h3>
              <p className="text-xs text-stone-500 mt-0.5">{scenario.description}</p>
            </div>
            <div className="text-[11px] font-mono text-stone-500 bg-white px-2.5 py-1 rounded border border-stone-200">
              PHP 8.3.6 • OPcache JIT • 16-core AMD EPYC
            </div>
          </div>

          {/* Metric 1: Requests Per Second (Throughput) */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-stone-900 uppercase">REQUESTS PER SECOND (HIGHER IS BETTER)</span>
              <span className="text-[#EA580C] font-bold">Flint is {(scenario.flintRps / scenario.laravelRps).toFixed(1)}x faster</span>
            </div>

            {/* FlintPHP Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-stone-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                  <span>FlintPHP 1.0</span>
                </span>
                <span className="font-bold text-[#EA580C]">{scenario.flintRps.toLocaleString()} req/s</span>
              </div>
              <div className="h-6 w-full bg-white rounded-lg border border-stone-200 overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6A00] to-[#EA580C] rounded-md transition-all duration-700"
                  style={{ width: `${(scenario.flintRps / maxRps) * 100}%` }}
                />
              </div>
            </div>

            {/* Slim Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-stone-600">
                <span>Slim 4.12</span>
                <span className="font-semibold">{scenario.slimRps.toLocaleString()} req/s</span>
              </div>
              <div className="h-5 w-full bg-white rounded-lg border border-stone-200 overflow-hidden p-0.5">
                <div
                  className="h-full bg-stone-400 rounded-md transition-all duration-700"
                  style={{ width: `${(scenario.slimRps / maxRps) * 100}%` }}
                />
              </div>
            </div>

            {/* Symfony Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-stone-600">
                <span>Symfony 7.1</span>
                <span className="font-semibold">{scenario.symfonyRps.toLocaleString()} req/s</span>
              </div>
              <div className="h-5 w-full bg-white rounded-lg border border-stone-200 overflow-hidden p-0.5">
                <div
                  className="h-full bg-stone-300 rounded-md transition-all duration-700"
                  style={{ width: `${(scenario.symfonyRps / maxRps) * 100}%` }}
                />
              </div>
            </div>

            {/* Laravel Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-stone-600">
                <span>Laravel 11.2</span>
                <span className="font-semibold">{scenario.laravelRps.toLocaleString()} req/s</span>
              </div>
              <div className="h-5 w-full bg-white rounded-lg border border-stone-200 overflow-hidden p-0.5">
                <div
                  className="h-full bg-stone-300 rounded-md transition-all duration-700"
                  style={{ width: `${(scenario.laravelRps / maxRps) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Metric 2: Memory Consumption Comparison */}
          <div className="pt-6 border-t border-stone-200">
            <div className="text-xs font-mono font-bold text-stone-900 uppercase mb-3">
              BASE RUNTIME MEMORY FOOTPRINT (LOWER IS BETTER)
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white border-2 border-[#EA580C]/40 text-center shadow-xs">
                <div className="text-[10px] font-mono font-bold text-[#EA580C]">FLINTPHP</div>
                <div className="text-lg font-mono font-extrabold text-stone-900">{scenario.flintMem} MB</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Zero Bloat</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200 text-center shadow-xs">
                <div className="text-[10px] font-mono text-stone-500">SLIM 4</div>
                <div className="text-lg font-mono font-bold text-stone-700">{scenario.slimMem} MB</div>
                <div className="text-[10px] text-stone-400 mt-0.5">2x memory</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200 text-center shadow-xs">
                <div className="text-[10px] font-mono text-stone-500">SYMFONY 7</div>
                <div className="text-lg font-mono font-bold text-stone-700">{scenario.symfonyMem} MB</div>
                <div className="text-[10px] text-stone-400 mt-0.5">8x memory</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200 text-center shadow-xs">
                <div className="text-[10px] font-mono text-stone-500">LARAVEL 11</div>
                <div className="text-lg font-mono font-bold text-stone-700">{scenario.laravelMem} MB</div>
                <div className="text-[10px] text-stone-400 mt-0.5">12x memory</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
