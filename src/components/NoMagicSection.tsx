import React, { useState } from 'react';
import { XCircle, CheckCircle2, Sliders, Shield, Code, Zap } from 'lucide-react';

export const NoMagicSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'facades' | 'state' | 'discovery' | 'testing'>('facades');

  const comparisons = {
    facades: {
      title: 'Facades vs Explicit Injection',
      magicTitle: 'Traditional Magic (Facades)',
      magicCode: `// Magic static call hides real singleton instance
use Illuminate\\Support\\Facades\\Cache;

class UserAnalytics
{
    public function getMetrics()
    {
        // Untestable without mock framework overrides
        return Cache::get('metrics');
    }
}`,
      magicCaveat: 'Hidden dependencies, tight coupling, impossible to reason about without IDE plugins.',
      flintTitle: 'FlintPHP (Explicit Dependency Injection)',
      flintCode: `use FlintPHP\\Framework\\Cache\\CacheInterface;

final class UserAnalytics
{
    // Explicit constructor dependency
    public function __construct(
        private readonly CacheInterface $cache,
    ) {}

    public function getMetrics(): array
    {
        // 100% testable by passing any Cache implementation
        return $this->cache->get('metrics', []);
    }
}`,
      flintAdvantage: 'Explicit contract, pure object-oriented PHP, testable in zero milliseconds.',
    },
    state: {
      title: 'Global State vs Immutable Requests',
      magicTitle: 'Traditional Magic (Global State)',
      magicCode: `// Request mutates global helper or superglobals
$userId = request()->input('user_id');

// Hidden mutations bleed across concurrent requests
app()->instance('tenant_id', 42);`,
      magicCaveat: 'Global state leaks memory in Swoole, RoadRunner, FrankenPHP, and worker loops.',
      flintTitle: 'FlintPHP (Immutable HTTP Foundations)',
      flintCode: `use FlintPHP\\Framework\\Http\\Request;
use FlintPHP\\Framework\\Http\\Response;

// Request is pure immutable value passed directly to handler
public function handle(Request $request): Response
{
    $body = json_decode($request->body(), true);
        $userId = (int) ($body['user_id'] ?? 0);
    
    // Concurrency-safe, worker-friendly, zero ambient mutations
    return Response::json(['user_id' => $userId]);
}`,
      flintAdvantage: 'Native compatibility with FrankenPHP, RoadRunner, Swoole, and PHP-FPM.',
    },
    discovery: {
      title: 'Auto-Discovery vs Explicit Wiring',
      magicTitle: 'Traditional Magic (Auto-Discovery)',
      magicCode: `// Scans filesystem, reads directory annotations,
// magically registers events without you knowing where
// or in what order they execute!`,
      magicCaveat: 'Unpredictable startup order, difficult debugging, heavy reflection overhead.',
      flintTitle: 'FlintPHP (Composable Bootstrappers)',
      flintCode: `// Explicit composition root in public/index.php
$app->bootstrapWith([
    DatabaseBootstrapper::class,
    SecurityBootstrapper::class,
    RouteBootstrapper::class,
]);`,
      flintAdvantage: 'Deterministic execution order, zero scanning latency, readable call stack.',
    },
    testing: {
      title: 'Mockery Overrides vs Plain PHP Unit Tests',
      magicTitle: 'Traditional Magic (Complex Mocking)',
      magicCode: `// Requires complex framework boots and mock monkey-patching
$this->withoutMiddleware();
Cache::shouldReceive('get')->once()->andReturn([]);`,
      magicCaveat: 'Fragile mock setups that break on minor framework version updates.',
      flintTitle: 'FlintPHP (Instant Standard Tests)',
      flintCode: `use PHPUnit\\Framework\\TestCase;

final class UserAnalyticsTest extends TestCase
{
    public function test_metrics(): void
    {
        $cache = new InMemoryCache(['metrics' => ['active' => 10]]);
        $analytics = new UserAnalytics($cache);

        $this->assertEquals(['active' => 10], $analytics->getMetrics());
    }
}`,
      flintAdvantage: 'Standard PHPUnit test with zero framework harness overhead.',
    },
  };

  const current = comparisons[activeTab];

  return (
    <section id="no-magic" className="py-16 sm:py-24 border-b border-stone-200 bg-stone-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-xs font-mono text-orange-600 font-semibold mb-4 shadow-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>CORE PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 mb-4">
            Less magic. <span className="text-orange-600">More control.</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            FlintPHP intentionally rejects the conventions of the past decade that sacrificed engineering clarity for superficial brevity.
          </p>
        </div>

        {/* High-Level Comparison Pillars (Modular Boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* What FlintPHP Intentionally Avoids */}
          <div className="p-6 rounded-2xl bg-white border border-red-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center border border-red-200">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">What FlintPHP Intentionally Avoids</h3>
                <span className="text-xs text-red-600 font-mono font-medium">Anti-Patterns in Modern APIs</span>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-stone-600">
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-mono font-bold shrink-0">✕</span>
                <span><strong className="text-stone-900">No Facades:</strong> No static aliases masquerading as functions while mutating hidden objects.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-mono font-bold shrink-0">✕</span>
                <span><strong className="text-stone-900">No Global State:</strong> No ambient singletons leaking cross-request data in async runtimes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-mono font-bold shrink-0">✕</span>
                <span><strong className="text-stone-900">No Automatic Discovery:</strong> No scanning filesystem directories or guessing registration orders.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-mono font-bold shrink-0">✕</span>
                <span><strong className="text-stone-900">No Hidden Behavior:</strong> No magic properties, magic methods, or phantom runtime monkey patches.</span>
              </li>
            </ul>
          </div>

          {/* What FlintPHP Does Instead */}
          <div className="p-6 rounded-2xl bg-white border border-orange-200 shadow-xs ring-1 ring-orange-500/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-200">
                <CheckCircle2 className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">What FlintPHP Does Instead</h3>
                <span className="text-xs text-orange-600 font-mono font-semibold">Explicit Architecture</span>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-stone-600">
              <li className="flex items-start gap-2.5">
                <span className="text-orange-600 font-mono font-bold shrink-0">✓</span>
                <span><strong className="text-stone-900">Explicit Dependencies:</strong> Constructor-injected interfaces cleanly defined and type-checked.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-600 font-mono font-bold shrink-0">✓</span>
                <span><strong className="text-stone-900">Composable Components:</strong> Modular units assembled through deterministic bootstrappers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-600 font-mono font-bold shrink-0">✓</span>
                <span><strong className="text-stone-900">Predictable Behavior:</strong> Step through with Xdebug effortlessly; no mysterious interception layers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-600 font-mono font-bold shrink-0">✓</span>
                <span><strong className="text-stone-900">Pure Testability:</strong> Instantiate classes directly in unit tests with zero mocking frameworks needed.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Deep-Dive Tabs (Card Window) */}
        <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm">
          {/* Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-stone-50 border-b border-stone-200">
            <button
              type="button"
              onClick={() => setActiveTab('facades')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'facades'
                  ? 'bg-orange-600 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              Facades vs Injection
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('state')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'state'
                  ? 'bg-orange-600 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              Global State vs Immutability
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('discovery')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'discovery'
                  ? 'bg-orange-600 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              Auto-Discovery vs Bootstrappers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('testing')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'testing'
                  ? 'bg-orange-600 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              Mocking vs Unit Tests
            </button>
          </div>

          {/* Comparison Split Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
            {/* Left: Traditional Magic */}
            <div className="p-5 sm:p-6 bg-stone-50/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-red-600 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  {current.magicTitle}
                </span>
                <span className="text-[11px] text-stone-500 font-mono">Magic / Hidden State</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-900 border border-red-900/30 font-mono text-xs text-stone-300 overflow-x-auto mb-3 shadow-inner">
                <pre>{current.magicCode}</pre>
              </div>
              <div className="text-xs text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200 font-sans">
                ⚠ {current.magicCaveat}
              </div>
            </div>

            {/* Right: FlintPHP Explicit Composition */}
            <div className="p-5 sm:p-6 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-orange-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {current.flintTitle}
                </span>
                <span className="text-[11px] text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                  FlintPHP Native
                </span>
              </div>
              <div className="p-4 rounded-xl bg-stone-900 border border-orange-500/30 font-mono text-xs text-stone-100 overflow-x-auto mb-3 shadow-inner">
                <pre>{current.flintCode}</pre>
              </div>
              <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 font-sans font-medium">
                ✓ {current.flintAdvantage}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
