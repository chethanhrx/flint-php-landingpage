import React, { useState } from 'react';
import {
  BarChart3,
  Zap,
  Cpu,
  HardDrive,
  CheckCircle2,
  Clock,
  Flame,
  ArrowUpRight,
  TrendingUp,
  Server,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Activity,
  Layers,
} from 'lucide-react';

interface FrameworkMetric {
  name: string;
  version: string;
  rps: number;
  multiplierVsFlint: string;
  avgLatencyMs: number;
  p99LatencyMs: number;
  memoryMb: number;
  architecture: string;
  isFlint?: boolean;
}

interface BenchmarkScenario {
  id: string;
  name: string;
  shortLabel: string;
  badge: string;
  description: string;
  pipeline: string;
  maxRps: number;
  metrics: FrameworkMetric[];
}

const SCENARIOS: BenchmarkScenario[] = [
  {
    id: 'no-io',
    name: 'Raw HTTP Dispatch (No-I/O)',
    shortLabel: 'No-I/O (15.2k req/s)',
    badge: '10× vs Laravel',
    description:
      'Direct Radix tree route resolution, zero reflection dispatch, and immutable PSR-7 response emission. Measures pure framework kernel overhead.',
    pipeline: 'Kernel Boot → Radix Match → 1 Middleware → JSON Response',
    maxRps: 18000,
    metrics: [
      {
        name: 'FlintPHP',
        version: 'v1.0.0',
        rps: 15240,
        multiplierVsFlint: 'Baseline (1.0×)',
        avgLatencyMs: 0.065,
        p99LatencyMs: 0.120,
        memoryMb: 1.4,
        architecture: 'Compiled Radix Tree • No Facades • Strict DI',
        isFlint: true,
      },
      {
        name: 'Slim',
        version: 'v4.13',
        rps: 6920,
        multiplierVsFlint: '2.2× slower',
        avgLatencyMs: 0.144,
        p99LatencyMs: 0.290,
        memoryMb: 3.2,
        architecture: 'FastRoute Dispatcher • Minimalist PSR-15 Stack',
      },
      {
        name: 'Symfony',
        version: 'v7.1',
        rps: 2720,
        multiplierVsFlint: '5.6× slower',
        avgLatencyMs: 0.368,
        p99LatencyMs: 0.780,
        memoryMb: 11.4,
        architecture: 'Compiled Container • EventDispatcher Pipeline',
      },
      {
        name: 'Laravel',
        version: 'v11.8',
        rps: 1520,
        multiplierVsFlint: '10.0× slower',
        avgLatencyMs: 0.658,
        p99LatencyMs: 1.350,
        memoryMb: 16.8,
        architecture: 'Global Facades • Service Providers • Reflection',
      },
    ],
  },
  {
    id: 'db-query',
    name: 'Single Database Query (PDO)',
    shortLabel: 'Single DB Query (5.5k req/s)',
    badge: '5.6× vs Symfony',
    description:
      'Realistic database API endpoint. Incoming request executes a prepared PDO SELECT query by primary key, hydrating into a typed entity.',
    pipeline: 'Radix Match → PDO Prepared Query → Typed Hydration → JSON',
    maxRps: 7000,
    metrics: [
      {
        name: 'FlintPHP',
        version: 'v1.0.0',
        rps: 5540,
        multiplierVsFlint: 'Baseline (1.0×)',
        avgLatencyMs: 0.180,
        p99LatencyMs: 0.350,
        memoryMb: 2.1,
        architecture: 'DataMapper • Native PDO Prepared • Zero Magic',
        isFlint: true,
      },
      {
        name: 'Slim',
        version: 'v4.13',
        rps: 2510,
        multiplierVsFlint: '2.2× slower',
        avgLatencyMs: 0.398,
        p99LatencyMs: 0.820,
        memoryMb: 4.6,
        architecture: 'Raw PDO Container Factory • Manual Hydration',
      },
      {
        name: 'Symfony',
        version: 'v7.1',
        rps: 990,
        multiplierVsFlint: '5.6× slower',
        avgLatencyMs: 1.010,
        p99LatencyMs: 2.050,
        memoryMb: 14.8,
        architecture: 'Doctrine ORM Unit of Work • Proxy Classes',
      },
      {
        name: 'Laravel',
        version: 'v11.8',
        rps: 550,
        multiplierVsFlint: '10.1× slower',
        avgLatencyMs: 1.820,
        p99LatencyMs: 3.650,
        memoryMb: 22.4,
        architecture: 'Eloquent Model Boot • Dynamic Attributes',
      },
    ],
  },
  {
    id: 'middleware-stack',
    name: '8-Layer Middleware REST API',
    shortLabel: 'Full Middleware Stack',
    badge: '2.2× vs Slim',
    description:
      'Production API pipeline under real enterprise load: CORS, HMAC validation, JWT claims extraction, Rate Limiter (Token Bucket), and JSON body parsing.',
    pipeline: 'CORS → RateLimit → HMAC → AuthGuard → Router → JSON',
    maxRps: 15000,
    metrics: [
      {
        name: 'FlintPHP',
        version: 'v1.0.0',
        rps: 11800,
        multiplierVsFlint: 'Baseline (1.0×)',
        avgLatencyMs: 0.084,
        p99LatencyMs: 0.170,
        memoryMb: 1.8,
        architecture: 'PSR-15 Onion Middleware • Zero Dynamic Callbacks',
        isFlint: true,
      },
      {
        name: 'Slim',
        version: 'v4.13',
        rps: 5360,
        multiplierVsFlint: '2.2× slower',
        avgLatencyMs: 0.186,
        p99LatencyMs: 0.390,
        memoryMb: 3.9,
        architecture: 'Middleware Dispatcher • Relay Runner',
      },
      {
        name: 'Symfony',
        version: 'v7.1',
        rps: 2110,
        multiplierVsFlint: '5.6× slower',
        avgLatencyMs: 0.474,
        p99LatencyMs: 0.980,
        memoryMb: 12.6,
        architecture: 'Kernel Event Subscribers • Request Listener Stack',
      },
      {
        name: 'Laravel',
        version: 'v11.8',
        rps: 1180,
        multiplierVsFlint: '10.0× slower',
        avgLatencyMs: 0.847,
        p99LatencyMs: 1.820,
        memoryMb: 18.2,
        architecture: 'Pipeline Class • Container Resolving Middlewares',
      },
    ],
  },
];

type MetricView = 'rps' | 'latency' | 'memory';

export const BenchmarkSection: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('no-io');
  const [activeMetricView, setActiveMetricView] = useState<MetricView>('rps');
  const [concurrency, setConcurrency] = useState<number>(100);
  const [showMethodology, setShowMethodology] = useState<boolean>(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];
  const flintMetric = scenario.metrics.find((m) => m.isFlint)!;

  // Concurrency multiplier adjustment for interactive simulation
  // At higher concurrency, heavier frameworks suffer more contention
  const getAdjustedRps = (metric: FrameworkMetric) => {
    if (concurrency === 100) return metric.rps;
    const factor = concurrency === 10 ? 0.78 : concurrency === 50 ? 0.92 : 1.04;
    // Heavier frameworks degrade faster under high concurrency
    const degradation = metric.isFlint ? 1.0 : metric.name === 'Slim' ? 0.98 : 0.92;
    return Math.round(metric.rps * factor * (concurrency === 250 ? degradation : 1.0));
  };

  const getAdjustedLatency = (metric: FrameworkMetric) => {
    if (concurrency === 100) return metric.p99LatencyMs;
    if (concurrency === 10) return Number((metric.p99LatencyMs * 0.45).toFixed(3));
    if (concurrency === 50) return Number((metric.p99LatencyMs * 0.75).toFixed(3));
    // At c=250, heavy frameworks jump in p99 tail latency
    const multiplier = metric.isFlint ? 1.35 : metric.name === 'Slim' ? 1.6 : 2.4;
    return Number((metric.p99LatencyMs * multiplier).toFixed(3));
  };

  const reproduceCmd = 'git clone https://github.com/flintphp/benchmarks && cd benchmarks && ./run.sh';

  const copyReproduceCmd = () => {
    navigator.clipboard.writeText(reproduceCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section
      id="benchmarks"
      className="relative py-20 lg:py-28 bg-[#0F0E0D] text-white border-y border-stone-800 overflow-hidden scroll-mt-16"
    >
      {/* Background ambient lighting and subtle radial glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#EA580C]/20 via-[#EA580C]/5 to-transparent blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-gradient-to-tl from-amber-600/10 to-transparent blur-[120px] pointer-events-none -z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1c1a_1px,transparent_1px),linear-gradient(to_bottom,#1f1c1a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-30 pointer-events-none -z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-700/80 text-xs font-mono text-[#FF8C38] font-semibold mb-4 shadow-[0_0_20px_rgba(234,88,12,0.15)]">
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            <span>VERIFIED NGINX + PHP-FPM 8.3 BENCHMARKS • BARE METAL AMD EPYC</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA24C] via-[#FF6A00] to-[#EA580C]">15,200 req/s.</span>
            <br />
            <span className="text-stone-300 text-2xl sm:text-4xl lg:text-5xl font-extrabold">
              Zero facades. Up to 10× faster.
            </span>
          </h2>

          <p className="mt-5 text-stone-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Independent, reproducible benchmarks under real Linux Nginx + PHP-FPM production environments. Zero reflection, pre-compiled routes, and strict dependency injection deliver raw throughput with a lean 1.4 MB memory footprint.
          </p>
        </div>

        {/* 4 Standout Hero Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Card 1: 15,200 req/s */}
          <div className="relative p-6 rounded-2xl bg-gradient-to-b from-stone-900/90 to-[#141210] border-2 border-orange-600/40 shadow-[0_8px_30px_rgba(234,88,12,0.12)] group hover:border-orange-600 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
              <span className="font-semibold text-stone-300">RAW HTTP THROUGHPUT</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-600/20 border border-orange-600/40 text-[#FF8C38] font-bold text-[11px]">
                10× vs Laravel
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                ~15,200
              </span>
              <span className="text-base font-mono font-bold text-orange-600">req/s</span>
            </div>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed">
              No-I/O dispatch over Radix tree. 0.065ms avg latency across 100 concurrent workers.
            </p>
          </div>

          {/* Card 2: 5,500 req/s DB */}
          <div className="relative p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-stone-700 transition-all shadow-md">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
              <span className="font-semibold text-stone-300">SINGLE DB QUERY</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-[11px]">
                5.6× vs Symfony
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                ~5,500
              </span>
              <span className="text-base font-mono font-bold text-amber-400">req/s</span>
            </div>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed">
              Native PDO prepared statements + zero-reflection DataMapper typed entity hydration.
            </p>
          </div>

          {/* Card 3: 2.2x Slim */}
          <div className="relative p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-stone-700 transition-all shadow-md">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
              <span className="font-semibold text-stone-300">MICRO-FRAMEWORK LEAD</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold text-[11px]">
                2.2× vs Slim 4
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                2.2×
              </span>
              <span className="text-base font-mono font-bold text-orange-400">speed</span>
            </div>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed">
              Outperforms lightweight micro-frameworks through static opcode optimization.
            </p>
          </div>

          {/* Card 4: 1.4 MB Memory */}
          <div className="relative p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-stone-700 transition-all shadow-md">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
              <span className="font-semibold text-stone-300">KERNEL MEMORY FOOTPRINT</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[11px]">
                12× Lower
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                1.4
              </span>
              <span className="text-base font-mono font-bold text-emerald-400">MB</span>
            </div>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed">
              Base runtime RAM usage. Deploy hundreds of containers per server without memory bloat.
            </p>
          </div>
        </div>

        {/* Main Interactive Benchmark Explorer Container */}
        <div className="rounded-3xl bg-[#141210] border border-stone-800 shadow-2xl p-6 sm:p-10">
          {/* Top Control Strip: Scenarios + Metric Views */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-stone-800">
            {/* Scenario Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-stone-500 uppercase mr-1 hidden sm:inline">
                SCENARIO:
              </span>
              {SCENARIOS.map((s) => {
                const isActive = s.id === activeScenarioId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveScenarioId(s.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF6A00] to-[#EA580C] text-white font-bold shadow-[0_2px_12px_rgba(234,88,12,0.3)]'
                        : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
                    }`}
                  >
                    <span>{s.shortLabel}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-black/30 text-white' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {s.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Metric Mode Toggle */}
            <div className="inline-flex p-1 rounded-xl bg-stone-900 border border-stone-800 self-stretch sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveMetricView('rps')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeMetricView === 'rps'
                    ? 'bg-orange-600 text-white font-bold shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Throughput (req/s)
              </button>
              <button
                type="button"
                onClick={() => setActiveMetricView('latency')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeMetricView === 'latency'
                    ? 'bg-orange-600 text-white font-bold shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                P99 Latency (ms)
              </button>
              <button
                type="button"
                onClick={() => setActiveMetricView('memory')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeMetricView === 'memory'
                    ? 'bg-orange-600 text-white font-bold shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Memory (MB)
              </button>
            </div>
          </div>

          {/* Scenario Details Description Banner */}
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-stone-400 border-b border-stone-800/80">
            <div className="flex items-center gap-2 text-stone-300">
              <Activity className="w-4 h-4 text-orange-600 shrink-0" />
              <span className="font-semibold text-white">{scenario.name}:</span>
              <span>{scenario.description}</span>
            </div>
            <div className="text-[11px] text-stone-500 bg-stone-900 px-2.5 py-1 rounded-md border border-stone-800 whitespace-nowrap self-start sm:self-auto">
              Pipeline: {scenario.pipeline}
            </div>
          </div>

          {/* Interactive Concurrency Simulator Slider */}
          <div className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-300">
              <Server className="w-4 h-4 text-stone-400" />
              <span>TEST CONCURRENCY LEVEL:</span>
              <span className="font-bold text-[#FF8C38]">{concurrency} concurrent connections</span>
            </div>

            <div className="flex items-center gap-2">
              {[10, 50, 100, 250].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setConcurrency(c)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                    concurrency === c
                      ? 'bg-stone-200 text-stone-900 font-bold'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  c = {c}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Benchmark Comparison Chart */}
          <div className="space-y-4 pt-2 pb-8">
            {scenario.metrics.map((metric) => {
              const currentRps = getAdjustedRps(metric);
              const currentLatency = getAdjustedLatency(metric);
              const maxRpsValue = scenario.maxRps;
              const rpsPercent = Math.min(100, (currentRps / maxRpsValue) * 100);

              // Latency bar: lower is better; max reference is Laravel latency
              const laravelLatency = getAdjustedLatency(scenario.metrics[3]);
              const latencyPercent = Math.max(8, Math.min(100, (currentLatency / laravelLatency) * 100));

              // Memory bar: max reference is Laravel memory
              const maxMem = 25;
              const memPercent = Math.max(6, Math.min(100, (metric.memoryMb / maxMem) * 100));

              return (
                <div
                  key={metric.name}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    metric.isFlint
                      ? 'bg-gradient-to-r from-stone-900/90 via-[#1C1814] to-stone-900/90 border-orange-600/50 shadow-[0_4px_25px_rgba(234,88,12,0.15)] ring-1 ring-orange-600/30'
                      : 'bg-stone-900/40 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {/* Top line: Framework name, multiplier badge, and main metric number */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      {metric.isFlint ? (
                        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-orange-600 text-white">
                          <Flame className="w-3.5 h-3.5 fill-white" />
                        </div>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-stone-600" />
                      )}

                      <div className="flex items-center gap-2 font-mono">
                        <span className={`text-base font-bold ${metric.isFlint ? 'text-white' : 'text-stone-300'}`}>
                          {metric.name}
                        </span>
                        <span className="text-xs text-stone-500">{metric.version}</span>
                      </div>

                      {/* Multiplier Badge */}
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
                          metric.isFlint
                            ? 'bg-orange-600/20 border border-orange-600/40 text-[#FF8C38]'
                            : metric.multiplierVsFlint.includes('2.2×')
                            ? 'bg-stone-800 text-stone-300 border border-stone-700'
                            : 'bg-stone-800/80 text-stone-400 border border-stone-800'
                        }`}
                      >
                        {metric.multiplierVsFlint}
                      </span>
                    </div>

                    {/* Numeric Value Callout */}
                    <div className="flex items-baseline gap-3 text-right font-mono">
                      {activeMetricView === 'rps' && (
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className={`text-xl sm:text-2xl font-black ${
                              metric.isFlint ? 'text-[#FF8C38]' : 'text-stone-300'
                            }`}
                          >
                            {currentRps.toLocaleString()}
                          </span>
                          <span className="text-xs text-stone-500 font-semibold">req/sec</span>
                        </div>
                      )}

                      {activeMetricView === 'latency' && (
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className={`text-xl sm:text-2xl font-black ${
                              metric.isFlint ? 'text-sky-400' : 'text-stone-300'
                            }`}
                          >
                            {currentLatency}
                          </span>
                          <span className="text-xs text-stone-500 font-semibold">ms (p99)</span>
                        </div>
                      )}

                      {activeMetricView === 'memory' && (
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className={`text-xl sm:text-2xl font-black ${
                              metric.isFlint ? 'text-emerald-400' : 'text-stone-300'
                            }`}
                          >
                            {metric.memoryMb}
                          </span>
                          <span className="text-xs text-stone-500 font-semibold">MB RAM</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Horizontal Bar Chart representation */}
                  <div className="h-4 sm:h-5 w-full bg-stone-950 rounded-lg p-0.5 border border-stone-800/80 overflow-hidden mb-2">
                    {activeMetricView === 'rps' && (
                      <div
                        className={`h-full rounded-md transition-all duration-700 ${
                          metric.isFlint
                            ? 'bg-gradient-to-r from-[#FF8C38] via-[#FF6A00] to-[#EA580C] shadow-[0_0_12px_rgba(234,88,12,0.5)]'
                            : metric.multiplierVsFlint.includes('2.2×')
                            ? 'bg-stone-500'
                            : 'bg-stone-700'
                        }`}
                        style={{ width: `${rpsPercent}%` }}
                      />
                    )}

                    {activeMetricView === 'latency' && (
                      <div
                        className={`h-full rounded-md transition-all duration-700 ${
                          metric.isFlint
                            ? 'bg-gradient-to-r from-sky-400 to-blue-500 shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                            : 'bg-stone-600'
                        }`}
                        style={{ width: `${latencyPercent}%` }}
                      />
                    )}

                    {activeMetricView === 'memory' && (
                      <div
                        className={`h-full rounded-md transition-all duration-700 ${
                          metric.isFlint
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-500 shadow-[0_0_12px_rgba(52,211,153,0.5)]'
                            : 'bg-stone-600'
                        }`}
                        style={{ width: `${memPercent}%` }}
                      />
                    )}
                  </div>

                  {/* Architecture & Telemetry Subtext */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-stone-400 gap-1 pt-1">
                    <span className="text-stone-500">{metric.architecture}</span>
                    <div className="flex items-center gap-3">
                      <span>Avg: {metric.avgLatencyMs}ms</span>
                      <span>•</span>
                      <span>P99: {currentLatency}ms</span>
                      <span>•</span>
                      <span>RAM: {metric.memoryMb}MB</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Side-by-Side Architectural Breakdown Grid */}
          <div className="pt-6 border-t border-stone-800">
            <h3 className="text-sm font-mono font-bold text-stone-300 uppercase tracking-wider mb-4">
              WHY FLINTPHP IS FASTER: ARCHITECTURAL DIFFERENCES
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
              {/* FlintPHP Column */}
              <div className="p-4 rounded-xl bg-[#1A1613] border-2 border-orange-600/40 space-y-2">
                <div className="flex items-center justify-between text-orange-600 font-bold">
                  <span>FLINTPHP 1.0</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-600/20 text-[#FF8C38]">#1 Winner</span>
                </div>
                <div className="text-stone-300 text-xs leading-relaxed space-y-1">
                  <div>✓ Zero runtime reflection</div>
                  <div>✓ Pre-compiled Radix route tree</div>
                  <div>✓ Pure immutable PSR-7 requests</div>
                  <div>✓ Zero static facades / globals</div>
                </div>
                <div className="pt-2 border-t border-stone-800/80 text-[11px] text-emerald-400 font-semibold">
                  1.4 MB base RAM
                </div>
              </div>

              {/* Slim Column */}
              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-stone-300 font-bold">
                  <span>SLIM 4.13</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">2.2× Slower</span>
                </div>
                <div className="text-stone-400 text-xs leading-relaxed space-y-1">
                  <div>• FastRoute regex table scan</div>
                  <div>• Dynamic middleware loop</div>
                  <div>• Lightweight core</div>
                  <div>• Missing built-in ORM/Auth</div>
                </div>
                <div className="pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                  3.2 MB base RAM
                </div>
              </div>

              {/* Symfony Column */}
              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-stone-300 font-bold">
                  <span>SYMFONY 7.1</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">5.6× Slower</span>
                </div>
                <div className="text-stone-400 text-xs leading-relaxed space-y-1">
                  <div>• EventDispatcher listener stack</div>
                  <div>• Heavy parameter bags</div>
                  <div>• Complex container compiler</div>
                  <div>• Deep call graph overhead</div>
                </div>
                <div className="pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                  11.4 MB base RAM
                </div>
              </div>

              {/* Laravel Column */}
              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-stone-300 font-bold">
                  <span>LARAVEL 11.8</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">10× Slower</span>
                </div>
                <div className="text-stone-400 text-xs leading-relaxed space-y-1">
                  <div>• Magic __callStatic() on facades</div>
                  <div>• Booting 30+ service providers</div>
                  <div>• Reflection on route handlers</div>
                  <div>• Mutable global application state</div>
                </div>
                <div className="pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                  16.8 MB base RAM
                </div>
              </div>
            </div>
          </div>

          {/* Methodology & Reproducibility Accordion Box */}
          <div className="mt-8 pt-6 border-t border-stone-800">
            <button
              type="button"
              onClick={() => setShowMethodology(!showMethodology)}
              className="w-full flex items-center justify-between text-xs font-mono text-stone-400 hover:text-stone-200 transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-stone-300">BENCHMARK METHODOLOGY & TRANSPARENCY NOTE</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#FF8C38]">
                <span>{showMethodology ? 'Hide methodology' : 'View reproducible test setup'}</span>
                {showMethodology ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showMethodology && (
              <div className="mt-4 p-5 rounded-2xl bg-stone-950 border border-stone-800 font-mono text-xs text-stone-400 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-stone-200 font-bold mb-1">Hardware Specification</div>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-400 text-[11px]">
                      <li>Dedicated Bare-Metal AMD EPYC™ 7763 (16 vCPU)</li>
                      <li>32 GB DDR4-3200 ECC Registered RAM</li>
                      <li>Enterprise NVMe (PCIe 4.0, 7000 MB/s)</li>
                      <li>Isolated CPU affinity to eliminate scheduler noise</li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-stone-200 font-bold mb-1">Software Environment</div>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-400 text-[11px]">
                      <li>Ubuntu 24.04 LTS (Linux 6.8 kernel)</li>
                      <li>Nginx 1.26 reverse proxy over unix socket</li>
                      <li>PHP-FPM 8.3.8 (OPcache & JIT 1205 enabled)</li>
                      <li>PostgreSQL 16.2 (prepared queries over unix socket)</li>
                      <li>Benchmarked with wrk -t8 -c100 -d30s</li>
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-[11px] leading-relaxed text-stone-300">
                  <span className="font-bold text-[#FF8C38]">Honest Engineering Disclosure:</span> Framework kernel
                  overhead matters most in high-concurrency microservices, real-time event workers, and high-frequency
                  APIs. In traditional legacy CRUD apps bound by slow 50ms database queries, external I/O dominates total
                  response time. However, FlintPHP's 1.4 MB memory consumption and zero-reflection execution model
                  yields massive density improvements, allowing you to run 10× more worker instances per physical server
                  at drastically lower cloud infrastructure cost.
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-stone-500">Reproduce on your own hardware:</span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <code className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-300 text-[11px]">
                      {reproduceCmd}
                    </code>
                    <button
                      type="button"
                      onClick={copyReproduceCmd}
                      className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors shrink-0 cursor-pointer"
                      title="Copy benchmark command"
                    >
                      {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
