import React, { useState } from 'react';
import { Network, Play, CheckCircle2, ShieldCheck, Zap, ArrowRight, CornerDownRight, Server } from 'lucide-react';

interface RouteDefinition {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  pattern: string;
  controller: string;
  action: string;
  middleware: string[];
  regexExplanation: string[];
}

const REGISTERED_ROUTES: RouteDefinition[] = [
  {
    method: 'GET',
    pattern: '/api/v1/users',
    controller: 'App\\Controllers\\Api\\UserController',
    action: 'index',
    middleware: ['CorsMiddleware', 'RateLimiter', 'AuthGuard'],
    regexExplanation: ['Static token match: "api"', 'Static token match: "v1"', 'Static token match: "users"'],
  },
  {
    method: 'GET',
    pattern: '/api/v1/users/{id}',
    controller: 'App\\Controllers\\Api\\UserController',
    action: 'show',
    middleware: ['CorsMiddleware', 'AuthGuard'],
    regexExplanation: ['Static token match: "api"', 'Static token match: "v1"', 'Static token match: "users"', 'Parameter captured: id'],
  },
  {
    method: 'POST',
    pattern: '/api/v1/users/{id}/posts',
    controller: 'App\\Controllers\\Api\\PostController',
    action: 'store',
    middleware: ['CorsMiddleware', 'AuthGuard', 'JsonBodyValidator'],
    regexExplanation: ['Static token match: "api"', 'Static token match: "v1"', 'Static token match: "users"', 'Parameter captured: id', 'Static token match: "posts"'],
  },
  {
    method: 'GET',
    pattern: '/health',
    controller: 'App\\Controllers\\HealthController',
    action: 'status',
    middleware: ['CorsMiddleware'],
    regexExplanation: ['Static root token match: "health"'],
  },
];

export const RouteMatcherSandbox: React.FC = () => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [path, setPath] = useState('/api/v1/users/428');
  const [activePreset, setActivePreset] = useState(1);

  const findMatch = () => {
    for (const route of REGISTERED_ROUTES) {
      if (route.method !== method) continue;
      
      let paramNames: string[] = [];
      let regexPattern = route.pattern.replace(/{([a-zA-Z0-9_]+)}/g, (_, name) => {
        paramNames.push(name);
        return `([^/]+)`;
      });
      
      const regex = new RegExp(`^${regexPattern}$`);
      const match = path.match(regex);
      
      if (match) {
        const params: Record<string, string> = {};
        paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        
        return {
          route,
          params,
          timeMs: (Math.random() * 0.02 + 0.01).toFixed(3),
        };
      }
    }
    return null;
  };

  const match = findMatch();

  const handleSelectPreset = (idx: number, m: 'GET' | 'POST', p: string) => {
    setActivePreset(idx);
    setMethod(m);
    setPath(p);
  };

  return (
    <section id="routing" className="py-16 bg-stone-50 border-b border-stone-200 bg-grid-boxes-faint scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-mono text-stone-700 font-semibold mb-3 shadow-xs">
            <Network className="w-3.5 h-3.5 text-orange-600" />
            <span>ROUTING ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            O(1) hash-map dispatching for static routes.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            FlintPHP resolves static incoming URIs in constant O(1) time using a hash-map, with sequential dynamic regex fallback. Test the interactive example below.
          </p>
        </div>

        {/* Interactive Sandbox Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-stone-200 mb-6">
            <span className="text-xs font-mono font-bold text-stone-700">TEST PRESET REQUESTS:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSelectPreset(0, 'GET', '/api/v1/users')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activePreset === 0
                    ? 'bg-orange-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                GET /api/v1/users
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset(1, 'GET', '/api/v1/users/428')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activePreset === 1
                    ? 'bg-orange-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                GET /api/v1/users/428
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset(2, 'POST', '/api/v1/users/99/posts')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activePreset === 2
                    ? 'bg-orange-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                POST /api/v1/users/99/posts
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset(3, 'GET', '/health')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activePreset === 3
                    ? 'bg-orange-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                GET /health
              </button>
            </div>
          </div>

          {/* Request Input Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200 mb-6">
            {/* Method Select */}
            <select
              value={method}
              onChange={(e) => {
                setMethod(e.target.value as 'GET' | 'POST' | 'PUT' | 'DELETE');
                setActivePreset(-1);
              }}
              className="w-full sm:w-28 px-3 py-2 rounded-lg bg-white border border-stone-200 font-mono font-bold text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-orange-600 shadow-xs cursor-pointer"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>

            {/* Path Input */}
            <div className="flex-1 w-full relative">
              <input
                type="text"
                value={path}
                onChange={(e) => {
                  setPath(e.target.value);
                  setActivePreset(-1);
                }}
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-stone-200 font-mono text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-orange-600 shadow-xs"
                placeholder="/api/v1/..."
              />
            </div>
          </div>

          {/* Match Results Display */}
          {match ? (
            <div className="space-y-6">
              {/* Top Banner: Success Match */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ROUTE MATCHED IN {match.timeMs}ms</span>
                  <span className="text-emerald-500">•</span>
                  <span>Match Strategy: Regex</span>
                </div>
                <div className="text-emerald-700">
                  Status: <span className="font-bold">200 OK</span> (Immutable Response)
                </div>
              </div>

              {/* Grid: Route Breakdown & Dispatched Handler */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Card: Dispatched Handler & Parameters */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 flex items-center justify-between">
                    <span>DISPATCH TARGET</span>
                    <span className="text-orange-600 text-[10px] font-mono">MIDDLEWARE HANDLER</span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                      <div className="text-stone-500 text-[10px]">Controller Class</div>
                      <div className="text-stone-900 font-semibold break-all">{match.route.controller}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                      <div className="text-stone-500 text-[10px]">Action Method</div>
                      <div className="text-orange-600 font-semibold">{match.route.action}()</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                      <div className="text-stone-500 text-[10px]">Extracted Parameters</div>
                      <div className="text-stone-800 font-semibold">
                        {Object.keys(match.params).length > 0 ? (
                          JSON.stringify(match.params)
                        ) : (
                          <span className="text-stone-400 font-normal">None (static route)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Card: Middleware Pipeline Execution Order */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 flex items-center justify-between">
                    <span>ONION MIDDLEWARE CHAIN</span>
                    <span className="text-stone-500 text-[10px] font-mono">{match.route.middleware.length} layers</span>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    {match.route.middleware.map((mw, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white border border-stone-200 text-stone-800"
                      >
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 font-mono">
                          #{i + 1}
                        </span>
                        <span className="font-semibold text-stone-900">{mw}</span>
                        <span className="ml-auto text-[10px] text-emerald-600 font-medium">Passed</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-600/10 border border-orange-600/20 text-orange-600 font-semibold">
                      <CornerDownRight className="w-3.5 h-3.5" />
                      <span>{match.route.action}() Handler resolved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-2">
              <div className="text-xs font-mono font-bold text-rose-700">404 NOT FOUND</div>
              <p className="text-xs text-rose-600 font-mono">
                No route matching {method} "{path}". Try selecting one of the test presets above.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
