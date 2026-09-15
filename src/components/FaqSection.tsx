import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is FlintPHP?',
    answer: 'FlintPHP is an open-source PHP framework for building high-performance APIs and web applications. It uses explicit constructor dependency injection, immutable HTTP primitives, and a hash-map routing engine. It requires PHP 8.2+ and is installed via Composer. FlintPHP is designed for developers who want predictable behavior without facades, global state, or automatic service discovery.',
  },
  {
    question: 'How fast is FlintPHP compared to Laravel?',
    answer: 'In local benchmarks using the PHP built-in development server at concurrency 50, FlintPHP processes approximately 3,964 requests per second compared to Laravel 11 at 307 requests per second — roughly 12.9× faster on identical simple plaintext endpoints. Under Nginx with PHP-FPM, FlintPHP has been measured at approximately 15,200 req/s for no-I/O endpoints. Results are environment-dependent and represent comparative measurements, not universal production guarantees.',
  },
  {
    question: 'Is FlintPHP a replacement for Laravel?',
    answer: 'FlintPHP is not designed to replace Laravel. It serves a different audience: developers who prefer explicit composition, minimal abstraction overhead, and predictable behavior over convenience features like facades, auto-discovery, and rich ecosystems. Laravel remains an excellent choice for teams that value its extensive package ecosystem and convention-over-configuration approach. FlintPHP is for teams that want more control.',
  },
  {
    question: 'Does FlintPHP use facades or global state?',
    answer: 'No. FlintPHP intentionally avoids facades, global state, and automatic service discovery. All dependencies are declared explicitly through constructor injection. The framework uses a PSR-11 compliant container for dependency resolution, but there are no static facade classes or ambient singletons.',
  },
  {
    question: 'What PHP version does FlintPHP require?',
    answer: 'FlintPHP requires PHP 8.2 or higher. It leverages modern PHP features including readonly properties, enums, fibers, and strict types. The framework is installed via Composer and follows PSR-4 autoloading standards.',
  },
  {
    question: 'Does FlintPHP have an ORM?',
    answer: 'Yes. FlintPHP includes a Data Mapper ORM with model classes, query builders, hydration, and transaction support. Unlike Active Record patterns, the Data Mapper approach separates domain entities from persistence logic. The ORM works with PDO and supports SQLite, MySQL, and PostgreSQL.',
  },
  {
    question: 'Is FlintPHP production-ready?',
    answer: 'FlintPHP v1.0.0 provides stable foundations for routing, middleware, dependency injection, HTTP primitives, validation, database access, authentication, and caching. Some subsystems — including queues, events, observability, WebSocket server runtime, and CLI commands — are explicitly marked as foundations. Teams should evaluate whether the current feature set meets their production requirements.',
  },
  {
    question: 'How do I install FlintPHP?',
    answer: 'Create a new project using the official skeleton: composer create-project flintphp/skeleton my-app. Then cd into the directory and run php -S localhost:8000 -t public/ to start the development server. Alternatively, add FlintPHP to an existing project with: composer require flintphp/framework.',
  },
  {
    question: 'Does FlintPHP support middleware?',
    answer: 'Yes. FlintPHP includes a composable onion-skin middleware pipeline. Middleware classes implement a simple process(Request $request, callable $next): Response interface. Middleware can be registered globally on the application or scoped to individual routes.',
  },
  {
    question: 'What database systems does FlintPHP support?',
    answer: 'FlintPHP supports SQLite, MySQL, and PostgreSQL through PDO. The ConnectionFactory class builds DSN strings from configuration arrays. The framework provides prepared statements, parameter binding, transaction management, and a Data Mapper ORM.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24 border-b border-stone-200 bg-white scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs font-mono text-orange-600 font-semibold mb-4">
            <span>FREQUENTLY ASKED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
            Questions developers ask about FlintPHP.
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Direct, technical answers — no marketing ambiguity.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-stone-200 bg-white overflow-hidden transition-all hover:border-stone-300"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-sm sm:text-base font-semibold text-stone-900" itemProp="name">
                    {item.question}
                  </h3>
                  <div className="shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-orange-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div
                    className="px-5 pb-5 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-4"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">{item.answer}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
