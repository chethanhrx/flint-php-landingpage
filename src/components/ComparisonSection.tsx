import React from 'react';
import { Check, X, Minus } from 'lucide-react';

interface Feature {
  name: string;
  laravel: boolean | string;
  symfony: boolean | string;
  slim: boolean | string;
  flintphp: boolean | string;
}

const FEATURES: Feature[] = [
  { name: 'PHP Version Required', laravel: '8.2+', symfony: '8.1+', slim: '8.1+', flintphp: '8.2+' },
  { name: 'Immutable HTTP Primitives', laravel: false, symfony: false, slim: false, flintphp: true },
  { name: 'No Facades / Global State', laravel: false, symfony: 'Partial', slim: true, flintphp: true },
  { name: 'PSR-11 Container', laravel: 'Custom', symfony: 'Custom', slim: 'Yes', flintphp: 'Yes' },
  { name: 'Explicit Constructor DI', laravel: 'Partial', symfony: true, slim: true, flintphp: true },
  { name: 'O(1) Static Route Matching', laravel: false, symfony: false, slim: false, flintphp: true },
  { name: 'Data Mapper ORM', laravel: 'Active Record', symfony: 'Doctrine', slim: 'None', flintphp: 'Yes' },
  { name: 'Built-in Auth Middleware', laravel: true, symfony: true, slim: false, flintphp: true },
  { name: 'Security Headers Middleware', laravel: false, symfony: false, slim: false, flintphp: true },
  { name: 'OpenAPI Document Builder', laravel: 'Package', symfony: 'Package', slim: 'Package', flintphp: 'Built-in' },
  { name: 'CLI Console Foundation', laravel: 'Artisan', symfony: 'Console', slim: false, flintphp: 'Yes' },
  { name: 'PHPUnit Test Base', laravel: true, symfony: true, slim: false, flintphp: true },
  { name: 'Learning Curve', laravel: 'Moderate', symfony: 'Steep', slim: 'Low', flintphp: 'Low' },
];

const renderCell = (value: boolean | string) => {
  if (value === true) return <Check className="w-4 h-4 text-emerald-600" />;
  if (value === false) return <X className="w-4 h-4 text-stone-300" />;
  return <span className="text-xs font-mono font-semibold text-stone-700">{value}</span>;
};

export const ComparisonSection: React.FC = () => {
  return (
    <section id="comparison" className="py-16 sm:py-24 border-b border-stone-200 bg-stone-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-xs font-mono text-orange-600 font-semibold mb-4 shadow-xs">
            <span>FRAMEWORK COMPARISON</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
            How FlintPHP compares to established frameworks.
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            An honest comparison of capabilities, design philosophy, and trade-offs.
            FlintPHP is not trying to replace Laravel — it serves developers who prefer
            explicit composition and minimal overhead.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl bg-white border border-stone-200 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-0 border-b border-stone-200 bg-stone-50">
            <div className="p-4 text-xs font-mono font-bold text-stone-500 uppercase">
              Feature
            </div>
            <div className="p-4 text-center">
              <span className="text-xs font-mono font-bold text-stone-900">FlintPHP</span>
            </div>
            <div className="p-4 text-center">
              <span className="text-xs font-mono font-bold text-[#FF2D20]">Laravel 11</span>
            </div>
            <div className="p-4 text-center">
              <span className="text-xs font-mono font-bold text-stone-600">Slim 4</span>
            </div>
          </div>

          {/* Table Rows */}
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-4 gap-0 ${idx < FEATURES.length - 1 ? 'border-b border-stone-100' : ''} hover:bg-stone-50/50 transition-colors`}
            >
              <div className="p-4 flex items-center">
                <span className="text-sm text-stone-700 font-medium">{feature.name}</span>
              </div>
              <div className="p-4 flex items-center justify-center">
                {renderCell(feature.flintphp)}
              </div>
              <div className="p-4 flex items-center justify-center">
                {renderCell(feature.laravel)}
              </div>
              <div className="p-4 flex items-center justify-center">
                {renderCell(feature.slim)}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-stone-500 mt-4 leading-relaxed">
          Comparison reflects framework capabilities as of September 2026. Laravel and Symfony are mature,
          production-proven ecosystems with extensive package ecosystems. FlintPHP is a newer framework
          focused on explicit composition and minimal overhead. Choose the framework that best fits your team's needs.
        </p>
      </div>
    </section>
  );
};
