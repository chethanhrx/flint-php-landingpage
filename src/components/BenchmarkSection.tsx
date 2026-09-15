import React, { useState } from 'react';
import { Activity, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

const LaravelLogo: React.FC<{className?: string}> = ({ className }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z"/>
  </svg>
);

const SlimLogo: React.FC<{className?: string}> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm3.8 17.5c-1.2.9-2.7 1.3-4.3 1.3-3.6 0-6.1-2.3-6.1-5.7 0-3.3 2.4-5.6 5.8-5.6 1.6 0 3 .4 4 1.1l-1.2 2c-.8-.5-1.7-.8-2.7-.8-1.8 0-3 .9-3 2.5 0 1.5 1 2.3 2.6 2.3 1 0 2-.3 3-.9l1.9 3.8z"/>
  </svg>
);

export const BenchmarkSection: React.FC = () => {
  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <section id="benchmarks" className="py-24 border-t border-stone-800 bg-stone-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(234,88,12,0.3),transparent)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context & Methodology */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-900 border border-stone-800 text-xs font-mono text-orange-600 font-semibold mb-6 self-start">
              <Activity className="w-3.5 h-3.5" />
              <span>PERFORMANCE BENCHMARK</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Uncompromising speed.
            </h2>
            
            <p className="text-lg text-stone-400 leading-relaxed mb-10">
              FlintPHP prioritizes absolute minimal kernel overhead. Measured locally against leading frameworks on identical simple plaintext endpoints.
            </p>

            {/* Methodology Context Block */}
            <div className="p-5 rounded-2xl bg-[#0c0a09] border border-stone-800/80 shadow-inner space-y-5">
              {/* Scenario A: Production-like */}
              <div>
                <div className="text-sm font-semibold text-stone-300 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  Scenario A: Nginx + PHP-FPM
                </div>
                <ul className="text-sm font-mono text-stone-500 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-semibold">FlintPHP:</span>
                    <span className="text-stone-300">~15,200 req/s</span>
                    <span className="text-stone-600">(no I/O)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500 font-semibold">FlintPHP:</span>
                    <span className="text-stone-300">~5,500 req/s</span>
                    <span className="text-stone-600">(single DB query)</span>
                  </li>
                </ul>
              </div>

              {/* Scenario B: Comparative */}
              <div className="pt-4 border-t border-stone-800/50">
                <div className="text-sm font-semibold text-stone-300 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-stone-500" />
                  Scenario B: PHP Built-in Server (Comparative)
                </div>
                <ul className="text-sm font-mono text-stone-500 space-y-1.5">
                  <li>• Concurrency: 50, identical simple plaintext endpoints</li>
                  <li className="pt-1">
                    <span className="text-orange-500">FlintPHP:</span> 3,964 req/s · P95 14 ms
                  </li>
                  <li>
                    <span className="text-stone-400">Slim 4:</span> 1,908 req/s · P95 28 ms
                  </li>
                  <li>
                    <span className="text-stone-400">Laravel 11:</span> 307 req/s · P95 187 ms
                  </li>
                </ul>
              </div>

              <p className="text-xs text-stone-600 pt-2 border-t border-stone-800/50 leading-relaxed">
                All results are environment-dependent. Scenario B uses the PHP built-in server for framework-to-framework comparison.
                Scenario A represents a more production-like stack. Neither guarantees universal production performance.
              </p>
            </div>
          </div>

          {/* Right Column: Vertical Benchmark Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* FlintPHP Card (#1) */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-[#111] border border-orange-600/30 shadow-[0_0_40px_-15px_rgba(234,88,12,0.15)] flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between group z-10 transition-transform">
              <div className="flex items-start sm:items-center gap-4 z-10">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-900 border border-stone-800 shrink-0 overflow-hidden">
                  <img src="/flint1.png" alt="FlintPHP" className="w-7 h-7 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-bold text-white">FlintPHP</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/20">Fastest</span>
                  </div>
                  <div className="text-xs font-medium text-stone-400">2.08&times; Slim &bull; 12.9&times; Laravel</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:items-end z-10 mt-1 sm:mt-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">3,964</span>
                  <span className="text-sm sm:text-base font-semibold text-stone-500">req/s</span>
                </div>
                <div className="text-sm font-mono text-stone-400 mt-1">P95 14 ms</div>
              </div>

              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] font-black text-white/[0.02] pointer-events-none select-none">
                #1
              </div>
            </div>

            {/* Slim Card (#2) */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-black border border-stone-800/80 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between group z-10 hover:border-stone-700 transition-colors">
              <div className="flex items-start sm:items-center gap-4 z-10">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-stone-900/50 border border-stone-800/80 shrink-0">
                  <SlimLogo className="w-6 h-6 text-stone-300" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-300">Slim 4</h3>
                </div>
              </div>
              
              <div className="flex flex-col sm:items-end z-10 mt-1 sm:mt-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-300">1,908</span>
                  <span className="text-sm font-semibold text-stone-600">req/s</span>
                </div>
                <div className="text-sm font-mono text-stone-500 mt-1">P95 28 ms</div>
              </div>

              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] font-black text-white/[0.02] pointer-events-none select-none">
                #2
              </div>
            </div>

            {/* Laravel Card (#3) */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-black border border-stone-800/80 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between group z-10 hover:border-stone-700 transition-colors">
              <div className="flex items-start sm:items-center gap-4 z-10">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-stone-900/50 border border-stone-800/80 shrink-0">
                  <LaravelLogo className="w-6 h-6 text-[#FF2D20]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-300">Laravel 11</h3>
                </div>
              </div>
              
              <div className="flex flex-col sm:items-end z-10 mt-1 sm:mt-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-300">307</span>
                  <span className="text-sm font-semibold text-stone-600">req/s</span>
                </div>
                <div className="text-sm font-mono text-stone-500 mt-1">P95 187 ms</div>
              </div>

              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[120px] font-black text-white/[0.02] pointer-events-none select-none">
                #3
              </div>
            </div>

            {/* Reproduction UI */}
            <div className="mt-4 pt-4">
              <button
                type="button"
                onClick={() => setShowMethodology(!showMethodology)}
                className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-stone-900/30 border border-stone-800 text-xs font-mono text-stone-400 hover:text-stone-200 hover:bg-stone-900/60 transition-colors cursor-pointer select-none"
                aria-expanded={showMethodology}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span className="font-bold text-stone-300">BENCHMARK REPRODUCTION</span>
                </div>
                <div className="flex items-center gap-1.5 text-orange-500">
                  <span>{showMethodology ? 'Hide setup' : 'View reproducible test setup'}</span>
                  {showMethodology ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {showMethodology && (
                <div className="mt-3 p-5 rounded-xl bg-[#0c0a09] border border-stone-800 font-mono text-xs text-stone-400 space-y-4 text-left">
                  <p>Because FlintPHP is distributed as a minimal library, to reproduce these results you must bootstrap a simple <code className="text-orange-400">public/index.php</code> routing to a plaintext response.</p>
                  
                  <div className="p-4 bg-black border border-stone-800 rounded-lg space-y-3 relative overflow-hidden group">
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold text-stone-500 mb-2">
                      <span>bash</span>
                    </div>
                    <pre className="text-stone-300 text-[11px] leading-relaxed overflow-x-auto">
                      <code>{`mkdir flint-bench && cd flint-bench
composer require flintphp/framework

mkdir public
cat << 'PHP' > public/index.php
<?php
require __DIR__.'/../vendor/autoload.php';

$app = new \\FlintPHP\\Framework\\Foundation\\Application(dirname(__DIR__));
$app->router()->get('/text', fn() => new \\FlintPHP\\Framework\\Http\\Response('Hello'));

$kernel = $app->container()->get(\\FlintPHP\\Framework\\Http\\Kernel::class);
$request = \\FlintPHP\\Framework\\Http\\Request::fromGlobals();

$kernel->handle($request)->send();
PHP

# Run the server in the background
php -S localhost:8000 -t public/ &

# Benchmark with wrk
wrk -t4 -c50 -d10s http://localhost:8000/text`}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
