import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is FlintPHP?',
    answer: 'FlintPHP is an open-source, explicit PHP framework for building high-performance APIs and modern web applications. It is built strictly for PHP 8.2+ and uses explicit constructor dependency injection, immutable HTTP primitives, and an O(1) hash-map routing engine. It is designed for developers who want predictable behavior without facades, global state, or automatic service discovery.',
  },
  {
    question: 'How fast is FlintPHP?',
    answer: 'FlintPHP is designed for absolute minimal kernel overhead. Under Nginx with PHP-FPM, FlintPHP has been measured at approximately 15,200 requests per second for no-I/O plaintext endpoints. For single DB queries, it handles ~5,500 req/s. When compared to other frameworks under the same conditions, it is roughly 2.2× faster than Slim, 5.6× faster than Symfony, and 10× faster than Laravel. Results are environment-dependent.',
  },
  {
    question: 'Is FlintPHP a Laravel alternative?',
    answer: 'Yes, FlintPHP is a lightweight Laravel alternative, but it is not a drop-in replacement. It serves developers who prefer explicit composition, minimal abstraction overhead, and strict architectural control over Laravel\'s convention-over-configuration and rich ecosystem of "magic" features. FlintPHP is for teams building high-performance APIs that want absolute control over execution and memory overhead.',
  },
  {
    question: 'Does FlintPHP use facades or global state?',
    answer: 'No. FlintPHP intentionally avoids facades, global state, and automatic service discovery. All dependencies are declared explicitly through constructor injection. The framework uses a PSR-11 compliant container for dependency resolution, but there are absolutely no static facade classes or ambient singletons bleeding state across requests.',
  },
  {
    question: 'What features does FlintPHP include?',
    answer: 'FlintPHP includes stable foundations for O(1) routing, a composable middleware pipeline, PSR-11 dependency injection container, validation, PDO database access, a Data Mapper ORM, token authentication, caching, and an OpenAPI document builder. It also provides foundational support for CLI commands, queues, and events.',
  },
  {
    question: 'Is FlintPHP production-ready?',
    answer: 'FlintPHP v1.0.0 provides stable, production-ready foundations for routing, middleware, dependency injection, HTTP primitives, validation, database access, authentication, and caching. Some advanced subsystems—including queues, events, observability, WebSocket server runtime, and CLI commands—are currently explicitly marked as foundations. Teams should evaluate whether the current feature set meets their exact production requirements.',
  },
  {
    question: 'How do I install FlintPHP?',
    answer: 'Create a new project using the official Composer skeleton: composer create-project flintphp/skeleton my-app. Then cd into the directory and run php -S localhost:8000 -t public/ to start the local development server. Alternatively, you can add FlintPHP to an existing project with: composer require flintphp/framework.',
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
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
            FlintPHP framework FAQs.
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Direct, technical answers about building with this PHP framework without facades, its explicit dependency injection, and why developers choose it as a lightweight PHP framework.
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
