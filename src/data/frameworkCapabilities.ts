export interface CapabilityItem {
  name: string;
  description: string;
  docPath: string;
  status?: 'Stable' | 'Foundation' | 'Experimental' | 'Deferred';
}

export interface CapabilityGroup {
  id: string;
  title: string;
  badge: string;
  description: string;
  items: CapabilityItem[];
}

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    id: 'http',
    title: 'HTTP Layer',
    badge: 'Foundation',
    description: 'Predictable, immutable HTTP primitives without hidden mutability or ambient global state.',
    items: [
      { name: 'Request', description: 'Strictly typed, immutable server requests with validated body, query, and server params.', docPath: '/docs/core/request-response', status: 'Stable' },
      { name: 'Response', description: 'Declarative responses including JSON, stream, text, and redirect builders.', docPath: '/docs/core/request-response', status: 'Stable' },
      { name: 'Headers', description: 'Normalized header bags with case-insensitive inspection and immutability.', docPath: '/docs/core/request-response', status: 'Stable' },
      { name: 'Routing', description: 'Fast routing supporting dynamic path variables and REST verbs.', docPath: '/docs/core/routing', status: 'Stable' },
      { name: 'Middleware', description: 'Composable onion-skin pipeline adhering to standard middleware contracts.', docPath: '/docs/core/middleware', status: 'Stable' },
      { name: 'Kernel', description: 'Deterministic request lifecycle coordinator with zero magical callbacks.', docPath: '/docs/core/kernel', status: 'Stable' },
      { name: 'Exception Handling', description: 'Centralized, format-aware error handling producing RFC 7807 Problem Details.', docPath: '/docs/core/kernel', status: 'Stable' },
    ],
  },
  {
    id: 'application',
    title: 'Application & Core',
    badge: 'Lifecycle',
    description: 'Explicit dependency wiring, type-safe configuration, and zero ambient static facades.',
    items: [
      { name: 'Application', description: 'Central composition root coordinating container, boot phases, and runtime.', docPath: '/docs/core/application', status: 'Stable' },
      { name: 'Configuration', description: 'Environment-backed, typed immutable configurations validated at startup.', docPath: '/docs/getting-started/configuration', status: 'Stable' },
      { name: 'Bootstrappers', description: 'Discrete lifecycle units for registering providers and services.', docPath: '/docs/core/application', status: 'Stable' },
      { name: 'Request Attributes', description: 'Type-safe request-scoped metadata passing between middleware and handlers.', docPath: '/docs/core/request-response', status: 'Stable' },
      { name: 'Dependency Injection', description: 'Autoreflection container with constructor injection and interface bindings.', docPath: '/docs/core/dependency-injection', status: 'Stable' },
      { name: 'Controllers', description: 'Lightweight invokable or action-based handlers receiving injected dependencies.', docPath: '/docs/core/controllers', status: 'Stable' },
    ],
  },
  {
    id: 'data',
    title: 'Data & Persistence',
    badge: 'Persistence',
    description: 'Explicit database connections, transactional boundaries, and clean Data Mapper ORM architecture.',
    items: [
      { name: 'Validation', description: 'Composable schema-based validation with clear, localized error bags.', docPath: '/docs/data/validation', status: 'Stable' },
      { name: 'Database Foundation', description: 'Clean PDO connection manager providing simple and direct PDO lifecycle management.', docPath: '/docs/data/database', status: 'Stable' },
      { name: 'PDO Connections', description: 'Type-safe prepared statements, parameter binding, and predictable error handling.', docPath: '/docs/data/database', status: 'Stable' },
      { name: 'Transactions', description: 'Explicit closure-based transaction management with auto-rollback on failure.', docPath: '/docs/data/database', status: 'Stable' },
      { name: 'Data Mapper ORM', description: 'Decoupled domain entities and persistence repositories without active-record leaks.', docPath: '/docs/data/orm', status: 'Stable' },
    ],
  },
  {
    id: 'security',
    title: 'Security Primitives',
    badge: 'Security-First',
    description: 'Standard authentication and configurable security headers.',
    items: [
      { name: 'Authentication', description: 'Pluggable token, session, and API key guards with constant-time verification.', docPath: '/docs/security/authentication', status: 'Stable' },
      { name: 'Authorization', description: 'Voter and policy-based authorization gates with granular domain logic.', docPath: '/docs/security/authorization', status: 'Deferred' },
      { name: 'Password Hashing', description: 'Argon2id and Bcrypt implementations configured with secure cost factors.', docPath: '/docs/security/authentication', status: 'Stable' },
      { name: 'Security Headers', description: 'Configurable CSP, HSTS, X-Frame-Options, and Referrer-Policy enforcement.', docPath: '/docs/security/security-headers', status: 'Stable' },
      { name: 'Trusted Proxy Support', description: 'Strict IP/CIDR verification for reverse proxies and load balancers.', docPath: '/docs/security/trusted-proxies', status: 'Stable' },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure & Async',
    badge: 'Operations',
    description: 'Foundation utilities for caching, message queues, real-time messaging, and observability.',
    items: [
      { name: 'Cache', description: 'Array and file cache stores.', docPath: '/docs/infrastructure/cache', status: 'Stable' },
      { name: 'Queue', description: 'In-memory job queue foundation (persistence and distributed workers deferred).', docPath: '/docs/infrastructure/queue', status: 'Foundation' },
      { name: 'Events', description: 'Event dispatcher for decoupled domain notifications.', docPath: '/docs/infrastructure/events', status: 'Foundation' },
      { name: 'Observability', description: 'In-memory structured logging foundation (OTel integration deferred).', docPath: '/docs/infrastructure/observability', status: 'Foundation' },
      { name: 'Metrics', description: 'Foundation metrics registry (exporters deferred).', docPath: '/docs/infrastructure/metrics', status: 'Foundation' },
      { name: 'WebSockets', description: 'WebSocket protocol frame parser (server runtime deferred).', docPath: '/docs/infrastructure/websockets', status: 'Foundation' },
    ],
  },
  {
    id: 'tooling',
    title: 'Developer Tooling',
    badge: 'Developer Experience',
    description: 'Fast CLI commands, zero-dependency test fixtures.',
    items: [
      { name: 'CLI Tooling (bin/flint)', description: 'Expressive console commands for code generation, migrations, and routes.', docPath: '/docs/developer-tools/cli', status: 'Stable' },
      { name: 'Testing Suite', description: 'Clean HTTP test client, mock container bindings, and fluent assertions.', docPath: '/docs/developer-tools/testing', status: 'Stable' },

    ],
  },
];
