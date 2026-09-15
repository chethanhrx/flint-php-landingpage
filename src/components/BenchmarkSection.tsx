import React, { useState } from 'react';
import { Activity, ShieldCheck, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export const BenchmarkSection: React.FC = () => {
  const [showMethodology, setShowMethodology] = useState(false);
  
  
  

  

  return (
    <section id="benchmarks" className="py-24 border-t border-stone-800 bg-stone-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-orange-600/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-900 border border-stone-800 text-xs font-mono text-orange-600 font-semibold mb-6">
            <Activity className="w-3.5 h-3.5" />
            <span>MEASURED LOCALLY WITH PHP BUILT-IN SERVER, CONCURRENCY 50</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Performance Measurements
          </h2>
          <p className="text-lg text-stone-400 max-w-2xl leading-relaxed">
            FlintPHP prioritizes low kernel overhead. Here is how it compares on a simple plaintext endpoint.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl bg-black border border-stone-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="space-y-6">
            {/* FlintPHP Bar */}
            <div className="group">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-orange-600">FLINTPHP</span>
                <span className="text-white text-base">3,964 RPS</span>
              </div>
              <div className="h-4 w-full bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-orange-600 to-orange-400 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* Slim Bar */}
            <div className="group">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-stone-400">SLIM 4</span>
                <span className="text-stone-300">1,908 RPS</span>
              </div>
              <div className="h-4 w-full bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-stone-600 rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>

            {/* Laravel Bar */}
            <div className="group">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-stone-400">LARAVEL 11</span>
                <span className="text-stone-300">307 RPS</span>
              </div>
              <div className="h-4 w-full bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-stone-600 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-stone-800">
            <button
              type="button"
              onClick={() => setShowMethodology(!showMethodology)}
              className="w-full flex items-center justify-between text-xs font-mono text-stone-400 hover:text-stone-200 transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-stone-300">BENCHMARK REPRODUCTION</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#FF8C38]">
                <span>{showMethodology ? 'Hide methodology' : 'View reproducible test setup'}</span>
                {showMethodology ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showMethodology && (
              <div className="mt-4 p-5 rounded-2xl bg-stone-950 border border-stone-800 font-mono text-xs text-stone-400 space-y-4">
                <div className="space-y-4">
                  <p>These numbers represent local measurements on a standard development machine using <code className="text-orange-400">wrk</code> against the PHP built-in server.</p>
                  <p>Because FlintPHP is distributed as a library rather than a heavy skeleton, to reproduce these results you must bootstrap a minimal <code className="text-orange-400">public/index.php</code> routing to a plaintext response.</p>
                  <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl space-y-2 text-stone-300">
                    <p className="text-emerald-400 font-bold mb-1">Reproduction steps:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-1 text-stone-400">
                      <li><code className="text-stone-300">composer require chethanhrx/flintphp</code></li>
                      <li>Create an entrypoint returning a simple <code className="text-stone-300">Response('Hello')</code></li>
                      <li><code className="text-stone-300">php -S localhost:8000 -t public/</code></li>
                      <li><code className="text-stone-300">wrk -t4 -c50 -d10s http://localhost:8000/text</code></li>
                    </ol>
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
