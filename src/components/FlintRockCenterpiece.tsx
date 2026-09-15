import React, { useState } from 'react';
import { Cpu, Copy, Check, Terminal, Layers, ShieldCheck, Zap, ArrowRight, Code2 } from 'lucide-react';

interface SubsystemInfo {
  id: string;
  name: string;
  label: string;
  badge: string;
  highlight: string;
  spec: string;
  codeSnippet: string;
}

const SUBSYSTEMS: SubsystemInfo[] = [
  {
    id: 'router',
    name: 'Router',
    label: 'Router',
    badge: 'O(1) Hash-Map',
    highlight: 'Static hash-map route resolution with optimized sequential regex fallback.',
    spec: 'Constant-time path traversal with reflection-assisted handler parameter conversion.',
    codeSnippet: `$router->get('/v1/metrics/{id}', [MetricsController::class, 'show'], middleware: [AuthGuardMiddleware::class]);`,
  },
  {
    id: 'psr15',
    name: 'Middleware Pipeline',
    label: 'Middleware',
    badge: 'Zero Magic',
    highlight: 'Pure immutable request/response pipeline. No global state bleed in FrankenPHP or RoadRunner.',
    spec: 'Built with explicit composition and strict immutability.',
    codeSnippet: `public function process(Request $request, callable $next): Response
{
    $token = $request->header('X-API-Key');
    return $next($request->withAttribute('auth', $token));
}`,
  },
  {
    id: 'di',
    name: 'Strict DI Container',
    label: 'Container',
    badge: 'PSR-11',
    highlight: 'Constructor dependency injection with reflection-assisted autowiring and zero static facades.',
    spec: 'PSR-11 compliant container with singleton caching, aliases, and auto-wiring.',
    codeSnippet: `final class OrderService
{
    public function __construct(
        private readonly OrderRepository $repo,
        private readonly PaymentGateway $gateway,
    ) {}
}`,
  },
  {
    id: 'security',
    name: 'Password Hashing & Security Headers',
    label: 'Security',
    badge: 'PASSWORD_DEFAULT',
    highlight: 'Password hashing using PASSWORD_DEFAULT (Argon2id or Bcrypt) and configurable security headers.',
    spec: 'Built-in security headers middleware with X-Frame-Options, CSP, and HSTS support.',
    codeSnippet: `$hashedPassword = $hasher->hash($plainText);
$isValid = $hasher->verify($plainText, $hashedPassword);`,
  },
];

export const FlintRockCenterpiece: React.FC = () => {
  const [activeSubsystemId, setActiveSubsystemId] = useState<string>('router');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const activeSubsystem = SUBSYSTEMS.find((s) => s.id === activeSubsystemId) || SUBSYSTEMS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSubsystem.codeSnippet).catch(() => alert('Copy failed — select the code manually.'));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Precision Engineered Card */}
      <div className="relative rounded-2xl bg-white border border-stone-200 shadow-sm p-6 overflow-hidden">
        {/* Subtle grid pattern inside card */}
        <div className="absolute inset-0 bg-grid-boxes-faint opacity-50 pointer-events-none" />

        {/* Ambient Warm Spark Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-600/8 blur-[80px] pointer-events-none" />

        {/* Header HUD: Official Symbol & Live Telemetry Badge */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600" />
            </span>
            <span className="text-xs font-mono font-bold text-stone-900 uppercase tracking-wider">
              FlintPHP v1.0.0
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              Stable
            </span>
          </div>

          <div className="text-[11px] font-mono text-stone-500 font-medium">
            PHP 8.2+ STRICT
          </div>
        </div>

        {/* Center Emblem Visual: Crisp FlintPHP Logo Framed with Metric Context */}
        <div className="relative z-10 my-3 flex flex-col items-center justify-center p-4 select-none">
          <div className="relative transition-transform duration-300 hover:scale-[1.02]">
            <img
              src="/flintphp-rock.svg"
              alt="Official FlintPHP Emblem"
              className="w-36 h-36 sm:w-40 sm:h-40 object-contain drop-shadow-md"
            />
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs font-mono font-bold text-stone-800">
              EXPLICIT COMPOSITION KERNEL
            </span>
            <p className="text-[11px] text-stone-500 max-w-xs mx-auto mt-0.5">
              Fast path routing • Immutable HTTP Primitives • Strict constructor injection
            </p>
          </div>
        </div>

        {/* Interactive Architecture Subsystem Tabs */}
        <div className="relative z-10 pt-4 border-t border-stone-200 mb-4">
          <div className="text-[11px] font-mono text-stone-500 mb-2 flex items-center justify-between">
            <span className="font-semibold text-stone-700">INSPECT KERNEL SUBSYSTEM:</span>
            <span className="text-[10px] text-stone-400">Click to view implementation</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
            {SUBSYSTEMS.map((sub) => {
              const isSelected = activeSubsystemId === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setActiveSubsystemId(sub.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-orange-600 text-white font-bold shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* Subsystem Code & Architecture Box */}
          <div className="p-3.5 rounded-xl bg-stone-900 text-stone-200 font-mono text-xs border border-stone-800 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-orange-600" />
                <span className="font-bold text-white">{activeSubsystem.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-600/20 text-[#FF8C38] border border-orange-600/30 font-semibold">
                  {activeSubsystem.badge}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                  title="Copy code snippet"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <pre className="text-[11px] leading-relaxed text-stone-300 overflow-x-auto py-1">
              <code>{activeSubsystem.codeSnippet}</code>
            </pre>

            <div className="pt-2 border-t border-stone-800/80 text-[11px] text-stone-400 flex items-start gap-1.5">
              <span className="text-orange-600 font-bold">↳</span>
              <span>{activeSubsystem.spec}</span>
            </div>
          </div>
        </div>

        {/* Bottom Production Telemetry HUD: Real Benchmarks */}
        <div className="relative z-10 grid grid-cols-4 gap-2 pt-3 border-t border-stone-200 text-center">
          <div className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-center">
            <div className="text-xs font-mono font-bold text-stone-900">15.2k</div>
            <div className="text-[10px] text-stone-500 font-medium">req/s (No I/O)</div>
          </div>
          <div className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-center">
            <div className="text-xs font-mono font-bold text-stone-900">2.2&times;</div>
            <div className="text-[10px] text-stone-500 font-medium">vs Slim</div>
          </div>
          <div className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-center">
            <div className="text-xs font-mono font-bold text-stone-900">5.6&times;</div>
            <div className="text-[10px] text-stone-500 font-medium">vs Symfony</div>
          </div>
          <div className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-center">
            <div className="text-xs font-mono font-bold text-orange-600">~10&times;</div>
            <div className="text-[10px] text-stone-500 font-medium">vs Laravel</div>
          </div>
        </div>
      </div>
    </div>
  );
};
