import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, Copy, Check, RotateCcw, Sparkles } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: string[];
  timestamp: string;
}

const PRESET_COMMANDS = [
  'php flint route:list',
  'php flint make:controller Api/OrderController --api',
  'php flint db:migrate --pretend',
  'php flint benchmark:run',
  'php flint list',
];

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'php flint --version',
      output: [
        '\x1b[38;5;208mFlintPHP Framework\x1b[0m version \x1b[32m1.0.0 (Stable)\x1b[0m (PHP 8.3.6 CLI - Zend Engine v4.3.6)',
        'Environment: \x1b[36mproduction\x1b[0m | Debug: \x1b[33mfalse\x1b[0m | Timezone: \x1b[37mUTC\x1b[0m',
        'Type \x1b[1;37m"php flint list"\x1b[0m to view all available commands, or click any chip above.',
      ],
      timestamp: '00:00:01',
    },
  ]);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const time = new Date().toTimeString().split(' ')[0];
    let res: string[] = [];

    switch (trimmed.toLowerCase()) {
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'help':
      case 'php flint --help':
      case 'php flint -h':
        res = [
          '\x1b[1;37mFlintPHP Console Tool\x1b[0m',
          'Usage: php flint <command> [options] [arguments]',
          '',
          'Available Commands:',
          '  \x1b[32mroute:list\x1b[0m           List all registered routes and middleware stacks',
          '  \x1b[32mmake:controller\x1b[0m      Generate a strictly-typed PSR-15 HTTP controller',
          '  \x1b[32mmake:migration\x1b[0m       Generate a deterministic SQL migration file',
          '  \x1b[32mdb:migrate\x1b[0m            Run pending schema migrations against PDO connection',
          '  \x1b[32mbenchmark:run\x1b[0m         Run high-resolution router and DI container micro-benchmarks',
          '  \x1b[32mserve\x1b[0m                 Start local PHP development server with hot-reload',
          '  \x1b[32mcache:clear\x1b[0m           Purge compiled container and route cache artifacts',
        ];
        break;

      case 'php flint list':
        res = [
          '\x1b[38;5;208mFlintPHP Framework Console\x1b[0m v1.0.0',
          '',
          '\x1b[33mRouting & HTTP:\x1b[0m',
          '  \x1b[32mroute:list\x1b[0m             Inspect route table and assigned middleware',
          '  \x1b[32mroute:cache\x1b[0m            Cache routes into static PHP array for O(1) boot',
          '',
          '\x1b[33mCode Generators:\x1b[0m',
          '  \x1b[32mmake:controller\x1b[0m        Create a new PSR-15 RequestHandlerInterface controller',
          '  \x1b[32mmake:middleware\x1b[0m        Create an explicit PSR-15 MiddlewareInterface',
          '  \x1b[32mmake:entity\x1b[0m            Create a OrmManager entity with typed readonly properties',
          '  \x1b[32mmake:repository\x1b[0m        Create a typed repository with PDO prepared statements',
          '',
          '\x1b[33mDatabase:\x1b[0m',
          '  \x1b[32mdb:migrate\x1b[0m             Execute pending migrations within atomic transactions',
          '  \x1b[32mdb:rollback\x1b[0m            Rollback the last batch of database migrations',
          '  \x1b[32mdb:seed\x1b[0m                Populate database using deterministic seeders',
          '',
          '\x1b[33mDiagnostics:\x1b[0m',
          '  \x1b[32mbenchmark:run\x1b[0m          Execute 100,000 iterations of router dispatching',
          '  \x1b[32mcontainer:check\x1b[0m        Validate full DI graph for unresolvable dependencies',
        ];
        break;

      case 'php flint route:list':
        res = [
          '+--------+-------------------------------+-----------------------------------+--------------------------------+',
          '| \x1b[1;37mMethod\x1b[0m | \x1b[1;37mURI Pattern\x1b[0m                   | \x1b[1;37mTarget Controller / Action\x1b[0m        | \x1b[1;37mMiddleware Pipeline\x1b[0m            |',
          '+--------+-------------------------------+-----------------------------------+--------------------------------+',
          '| \x1b[32mGET\x1b[0m    | /api/v1/health                | App\\Controllers\\HealthController  | [CorsMiddleware]               |',
          '| \x1b[32mGET\x1b[0m    | /api/v1/users                 | App\\Controllers\\UserController@idx| [Cors, RateLimit, AuthGuard]   |',
          '| \x1b[33mPOST\x1b[0m   | /api/v1/users                 | App\\Controllers\\UserController@crt| [Cors, RateLimit, AuthGuard]   |',
          '| \x1b[32mGET\x1b[0m    | /api/v1/users/{id:[0-9]+}     | App\\Controllers\\UserController@shw| [Cors, AuthGuard]              |',
          '| \x1b[34mPUT\x1b[0m    | /api/v1/users/{id:[0-9]+}     | App\\Controllers\\UserController@upd| [Cors, AuthGuard, CsrfCheck]   |',
          '| \x1b[31mDELETE\x1b[0m | /api/v1/users/{id:[0-9]+}     | App\\Controllers\\UserController@del| [Cors, AuthGuard, CsrfCheck]   |',
          '| \x1b[33mPOST\x1b[0m   | /api/v1/auth/login            | App\\Controllers\\AuthController@lgn| [Cors, RateLimit:5/min]        |',
          '+--------+-------------------------------+-----------------------------------+--------------------------------+',
          'Total registered routes: \x1b[32m7 routes\x1b[0m (Routes cached in \x1b[36m0.014ms\x1b[0m)',
        ];
        break;

      case 'php flint make:controller api/ordercontroller --api':
      case 'php flint make:controller ordercontroller --api':
        res = [
          '\x1b[32m✓ Controller created successfully:\x1b[0m',
          '  → \x1b[36msrc/Controllers/Api/OrderController.php\x1b[0m',
          '',
          '\x1b[90m// Interface: Psr\\Http\\Server\\RequestHandlerInterface',
          '// Type Coverage: 100% PHP 8.2+ Typed Parameters',
          '// Zero static facades. Injected dependencies: OrderRepository, EventDispatcher\x1b[0m',
          '',
          '\x1b[33mNext step:\x1b[0m Register route in \x1b[37mconfig/routes.php\x1b[0m:',
          '  \x1b[38;5;208m$routes->get(\'/api/v1/orders\', [OrderController::class, \'index\']);\x1b[0m',
        ];
        break;

      case 'php flint db:migrate --pretend':
        res = [
          '\x1b[36mPretending to run migrations (Simulation Mode):\x1b[0m',
          '',
          '\x1b[32m[2026_09_14_000001_create_users_table]\x1b[0m',
          '  \x1b[90mCREATE TABLE `users` (',
          '    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,',
          '    `uuid` CHAR(36) NOT NULL UNIQUE,',
          '    `email` VARCHAR(255) NOT NULL UNIQUE,',
          '    `password_hash` VARCHAR(255) NOT NULL,',
          '    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP',
          '  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\x1b[0m',
          '',
          '\x1b[32m[2026_09_14_000002_create_orders_table]\x1b[0m',
          '  \x1b[90mCREATE TABLE `orders` (',
          '    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,',
          '    `user_id` BIGINT UNSIGNED NOT NULL,',
          '    `total_cents` INT UNSIGNED NOT NULL,',
          '    `status` ENUM(\'pending\',\'paid\',\'shipped\') NOT NULL DEFAULT \'pending\',',
          '    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE',
          '  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\x1b[0m',
          '',
          '\x1b[32m✓ 2 migrations validated.\x1b[0m Execution time: \x1b[36m0.003s\x1b[0m (0 errors, 0 lock contentions)',
        ];
        break;

      case 'php flint benchmark:run':
        res = [
          '\x1b[38;5;208mFlintPHP Verified Performance Benchmark Suite\x1b[0m',
          'Platform: AMD EPYC 7763 16-Core | Linux 6.8 | PHP 8.3.8 OPcache=1 JIT=1205',
          '----------------------------------------------------------------------',
          '1. Raw HTTP Dispatch (No-I/O Route Match + PSR-7 Response):',
          '   Throughput: \x1b[32m15,240 req/sec\x1b[0m | Avg: \x1b[36m0.065 ms\x1b[0m | P99: \x1b[36m0.120 ms\x1b[0m (10.0× vs Laravel)',
          '',
          '2. Single DB Query (Prepared PDO + Typed OrmManager Hydration):',
          '   Throughput: \x1b[32m5,540 req/sec\x1b[0m  | Avg: \x1b[36m0.180 ms\x1b[0m | P99: \x1b[36m0.350 ms\x1b[0m (5.6× vs Symfony)',
          '',
          '3. Production REST API (8 Middlewares: CORS, HMAC, JWT, RateLimit):',
          '   Throughput: \x1b[32m11,800 req/sec\x1b[0m | Avg: \x1b[36m0.084 ms\x1b[0m | P99: \x1b[36m0.170 ms\x1b[0m (2.2× vs Slim 4)',
          '',
          '4. Kernel Base Memory Footprint:',
          '   Flint Kernel Base: \x1b[32m1.4 MB\x1b[0m  (Slim: 3.2 MB | Symfony: 11.4 MB | Laravel: 16.8 MB)',
          '----------------------------------------------------------------------',
          '\x1b[32m✓ Benchmark complete:\x1b[0m \x1b[1;37mFlint is up to 10× faster\x1b[0m than reflection-based frameworks.',
        ];
        break;

      case 'php flint serve':
      case 'php flint serve --port=8000':
        res = [
          '\x1b[38;5;208mFlintPHP Development Server\x1b[0m started at \x1b[32mhttp://127.0.0.1:8000\x1b[0m',
          'Document root is: \x1b[36m/var/www/flint-app/public\x1b[0m',
          'Press Ctrl+C to stop the server.',
          '',
          '\x1b[90m[2026-09-14 19:22:10] 127.0.0.1:52134 [200]: GET /api/v1/health in 0.18ms\x1b[0m',
          '\x1b[90m[2026-09-14 19:22:11] 127.0.0.1:52135 [200]: GET /api/v1/users in 0.42ms\x1b[0m',
        ];
        break;

      default:
        res = [
          `\x1b[31mCommand not recognized:\x1b[0m "${trimmed}"`,
          'Try: \x1b[32mphp flint route:list\x1b[0m or \x1b[32mphp flint list\x1b[0m or \x1b[32mhelp\x1b[0m',
        ];
        break;
    }

    setHistory((prev) => [...prev, { command: trimmed, output: res, timestamp: time }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  // Helper to render ANSI-like color codes in terminal output
  const renderAnsiText = (text: string) => {
    // Simple parser for ANSI escape sequences used in simulated outputs
    const parts = text.split(/(\x1b\[[0-9;]*m)/g);
    let currentColor = 'text-stone-300';

    return parts.map((part, i) => {
      if (part.startsWith('\x1b[')) {
        if (part.includes('32m')) currentColor = 'text-emerald-400 font-semibold';
        else if (part.includes('38;5;208m') || part.includes('33m')) currentColor = 'text-[#FF8C38] font-bold';
        else if (part.includes('36m')) currentColor = 'text-sky-300 font-mono';
        else if (part.includes('31m')) currentColor = 'text-rose-400 font-bold';
        else if (part.includes('34m')) currentColor = 'text-blue-400 font-bold';
        else if (part.includes('90m')) currentColor = 'text-stone-400';
        else if (part.includes('1;37m')) currentColor = 'text-white font-bold';
        else if (part.includes('0m')) currentColor = 'text-stone-300 font-normal';
        return null;
      }
      return (
        <span key={i} className={currentColor}>
          {part}
        </span>
      );
    });
  };

  const copyAllOutput = () => {
    const text = history
      .map((h) => `$ ${h.command}\n${h.output.map((l) => l.replace(/\x1b\[[0-9;]*m/g, '')).join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-16 bg-white border-b border-stone-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700 font-semibold mb-3">
            <TerminalIcon className="w-3.5 h-3.5 text-orange-600" />
            <span>INTERACTIVE CLI ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Try the Flint Console right now.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Flint ships with a lightning-fast CLI tool with zero external baggage. Test commands, inspect route tables, and run simulated micro-benchmarks in this interactive example.
          </p>
        </div>

        {/* Quick-Run Command Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs font-mono text-stone-500 mr-1 select-none">TRY COMMAND:</span>
          {PRESET_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-xs font-mono text-stone-700 hover:text-stone-900 border border-stone-200 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Play className="w-3 h-3 text-orange-600" />
              <span>{cmd}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => executeCommand('clear')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-xs font-mono text-stone-500 hover:text-stone-700 border border-stone-200 transition-all cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>clear</span>
          </button>
        </div>

        {/* Terminal Container: Box-in-Box styling */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0F0E0D] border border-stone-800 shadow-xl overflow-hidden font-mono text-xs sm:text-sm">
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1A1816] border-b border-stone-800 select-none">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
              <span className="ml-2 text-xs text-stone-400 font-medium">
                flint-terminal — php 8.3-cli (zsh)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-stone-500 hidden sm:inline">Press Enter to run</span>
              <button
                type="button"
                onClick={copyAllOutput}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800/80 hover:bg-stone-700 text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
                title="Copy terminal output"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Content Screen */}
          <div className="p-4 sm:p-6 min-h-[340px] max-h-[480px] overflow-y-auto space-y-4 leading-relaxed font-mono">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-stone-300">
                  <span className="text-orange-600 font-bold">➜</span>
                  <span className="text-sky-400 font-semibold">flint-app</span>
                  <span className="text-stone-500 font-bold">$</span>
                  <span className="text-white font-medium">{item.command}</span>
                  <span className="text-[10px] text-stone-600 ml-auto select-none">[{item.timestamp}]</span>
                </div>
                <div className="pl-5 text-stone-300 whitespace-pre-wrap font-mono text-xs sm:text-xs">
                  {item.output.map((line, lIdx) => (
                    <div key={lIdx}>{renderAnsiText(line)}</div>
                  ))}
                </div>
              </div>
            ))}

            {/* Active Command Input Line */}
            <div className="flex items-center gap-2 pt-2 text-stone-200">
              <span className="text-orange-600 font-bold select-none">➜</span>
              <span className="text-sky-400 font-semibold select-none">flint-app</span>
              <span className="text-stone-500 font-bold select-none">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. php flint route:list) and press Enter..."
                className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs sm:text-sm placeholder:text-stone-600"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Status Footer */}
          <div className="px-4 py-2 bg-[#141210] border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-500 select-none">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Sandbox Ready</span>
              </span>
              <span>•</span>
              <span>Memory: 1.38 MB</span>
            </div>
            <div className="flex items-center gap-1 text-orange-600">
              <Sparkles className="w-3 h-3" />
              <span>Flint CLI v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
