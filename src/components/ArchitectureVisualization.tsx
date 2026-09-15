import React, { useState } from 'react';
import {
  Layers,
  Settings,
  Box,
  Share2,
  Filter,
  Cpu,
  Terminal,
  ShieldCheck,
  Database,
  CheckCircle,
  ArrowDown,
  Info,
} from 'lucide-react';

export const ArchitectureVisualization: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const stages = [
    {
      id: 0,
      name: 'Application',
      subtitle: 'Composition Root',
      icon: Layers,
      summary: 'Initializes runtime environment, sets basePath, and registers lifecycle bootstrappers.',
      input: 'Server environment + directory paths',
      output: 'Configured Application instance',
      codeSnippet: `$app = new Application(dirname(__DIR__));\n$app->bootstrapWith([...]);`,
      detail: 'The application is instantiated in public/index.php. It does not carry global state; instead it acts as the top-level assembly point.',
    },
    {
      id: 1,
      name: 'Configuration',
      subtitle: 'Immutable Config Bag',
      icon: Settings,
      summary: 'Reads typed configuration files into an immutable repository; validates environment variables.',
      input: '.env files and config/*.php arrays',
      output: 'FlintPHP\\Framework\\Config\\ConfigRepository (Read-Only)',
      codeSnippet: `return [\n    'db' => env('DB_DSN', 'pgsql:host=localhost;dbname=flint'),\n    'security' => ['hashing_cost' => 12],\n];`,
      detail: 'Configuration values are read once and frozen. Changing configuration at runtime is strictly disallowed.',
    },
    {
      id: 2,
      name: 'Container',
      subtitle: 'PSR-11 Dependency Injection',
      icon: Box,
      summary: 'Instantiates services with constructor auto-reflection; resolves concrete interface implementations.',
      input: 'Class names and interface bindings',
      output: 'Fully wired objects with strict type guarantees',
      codeSnippet: `$container->singleton(Connection::class, fn($c) => new Connection(...));\n$container->bind(UserRepository::class, SqlUserRepository::class);`,
      detail: 'No magic facades. Classes receive their collaborators explicitly through constructor arguments.',
    },
    {
      id: 3,
      name: 'Router',
      subtitle: 'Hash-Map Engine',
      icon: Share2,
      summary: 'Matches incoming HTTP method and URI path against compiled hash-maps and regex patterns with microsecond latency.',
      input: 'HTTP Method (GET/POST/PUT) + URI Path',
      output: 'RouteMatch (Handler + Parameters + Route Middlewares)',
      codeSnippet: `$router->get('/api/users/{id}', [UserController::class, 'show'], middleware: [RateLimitMiddleware::class]);`,
      detail: 'Evaluates regex constraints and type casts (e.g. {id}) before handing over to the middleware pipeline.',
    },
    {
      id: 4,
      name: 'Middleware',
      subtitle: 'Middleware Pipeline',
      icon: Filter,
      summary: 'Processes incoming request through layers: Security Headers, CORS, Rate Limiting, Authentication.',
      input: 'Request',
      output: 'Processed Request or Early Response',
      codeSnippet: `public function process(Request $req, callable $next): Response {\n    // pre-processing\n    $res = $next($req);\n    // post-processing\n    return $res->withHeader('X-Security', 'Enforced');\n}`,
      detail: 'Standard onion architecture: each middleware can inspect the request, pass it deeper, or terminate early.',
    },
    {
      id: 5,
      name: 'Kernel',
      subtitle: 'Request Lifecycle Coordinator',
      icon: Cpu,
      summary: 'Dispatches request to matched controller, wraps execution in exception handlers, and emits RFC 7807 on errors.',
      input: 'Request + Pipeline',
      output: 'Immutable Response',
      codeSnippet: `$kernel = $app->container()->get(Kernel::class);\n$response = $kernel->handle($request);\n$response->send();`,
      detail: 'Handles uncaught exceptions uniformly, converts errors to structured JSON, and coordinates clean termination.',
    },
    {
      id: 6,
      name: 'Controller',
      subtitle: 'Domain Action Handler',
      icon: Terminal,
      summary: 'Pure PHP class receiving injected dependencies and typed request data; returns a Response object.',
      input: 'Request + Route Params',
      output: 'FlintPHP\\Framework\\Http\\Response::json(...)',
      codeSnippet: `final class OrderController {\n    public function __construct(private readonly OrderService $orders) {}\n    public function store(Request $req): Response { ... }\n}`,
      detail: 'Thin, focused controllers with zero base class lock-in. Ideal for clean domain-driven architecture.',
    },
    {
      id: 7,
      name: 'Validation / DB / Auth',
      subtitle: 'Explicit Domain Primitives',
      icon: ShieldCheck,
      summary: 'Schema validators verify payloads, PDO handles atomic transactions, and security policies check roles.',
      input: 'Domain entities & request attributes',
      output: 'Persisted entities & verified permissions',
      codeSnippet: `$validator->validate($data, ['email' => [new Email()]]);\n$db->transaction(fn($pdo) => $repo->save($entity));`,
      detail: 'Composed explicitly where needed — no hidden hooks or spooky database triggers.',
    },
  ];

  const current = stages[activeStep];

  return (
    <section id="architecture" className="py-16 sm:py-24 border-b border-stone-200 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs font-mono text-orange-600 font-semibold mb-3">
            <span>EXPLICIT COMPOSITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
            How a request flows through FlintPHP.
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Every step in the lifecycle is deterministic, observable, and explicitly composed. Click any node in the pipeline to inspect its exact inputs, outputs, and PHP implementation.
          </p>
        </div>

        {/* Pipeline Flow Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Stepper Pipeline (Boxed Cards) */}
          <div className="lg:col-span-5 space-y-2 relative">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStep === idx;

              return (
                <div key={stage.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-stone-50 border-orange-600 shadow-xs ring-1 ring-orange-600/20'
                        : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors border ${
                          isActive
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-stone-100 text-stone-600 border-stone-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${isActive ? 'text-stone-900' : 'text-stone-800'}`}>
                            {stage.name}
                          </span>
                          <span className="text-[10px] font-mono text-stone-500 px-1.5 py-0.5 rounded bg-stone-100 border border-stone-200 font-medium">
                            Step {stage.id + 1}
                          </span>
                        </div>
                        <span className="text-xs text-stone-500">{stage.subtitle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-orange-600" />
                      )}
                    </div>
                  </button>

                  {/* Connecting Arrow */}
                  {idx < stages.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="w-3.5 h-3.5 text-stone-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Inspector Card */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="rounded-2xl bg-stone-50 border border-stone-200 p-6 shadow-sm space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-stone-200 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-orange-600 font-semibold mb-1">
                    <span>STAGE 0{current.id + 1}</span>
                    <span>•</span>
                    <span>{current.subtitle}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900">{current.name}</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-mono text-emerald-700 font-medium shadow-xs">
                  Explicit Composition
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-sm text-stone-700 leading-relaxed">
                {current.summary}
              </p>

              {/* Input / Output Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block mb-1">Input Contract</span>
                  <span className="text-xs font-mono text-orange-600 font-semibold">{current.input}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-mono text-stone-500 uppercase block mb-1">Output Contract</span>
                  <span className="text-xs font-mono text-emerald-700 font-semibold">{current.output}</span>
                </div>
              </div>

              {/* Framework Implementation Snippet */}
              <div>
                <span className="text-xs font-mono text-stone-600 block mb-2 font-medium">PHP Implementation</span>
                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 font-mono text-xs text-stone-100 overflow-x-auto shadow-inner">
                  <pre className="text-stone-200">{current.codeSnippet}</pre>
                </div>
              </div>

              {/* Architectural Insight */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 shadow-xs">
                <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{current.detail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
