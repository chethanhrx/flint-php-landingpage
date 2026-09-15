export interface CapabilityItem {
  name: string;
  description: string;
  docPath: string;
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
    description: 'Predictable, immutable immutable HTTP primitives without hidden mutability or ambient global state.',
    items: [
      { name: 'Request', description: 'Strictly typed, immutable server requests with validated body, query, and server params.', docPath: '/docs/core/request-response' },
      { name: 'Response', description: 'Declarative responses including JSON, stream, text, and redirect builders.', docPath: '/docs/core/request-response' },
      { name: 'Headers', description: 'Normalized header bags with case-insensitive inspection and immutability.', docPath: '/docs/core/request-response' },
      { name: 'Routing', description: 'Fast routing supporting typed parameter constraints and REST verbs.', docPath: '/docs/core/routing' },
      { name: 'Middleware', description: 'Composable onion-skin pipeline adhering to standard PSR-15 contracts.', docPath: '/docs/core/middleware' },
      { name: 'Kernel', description: 'Deterministic request lifecycle coordinator with zero magical callbacks.', docPath: '/docs/core/kernel' },
      { name: 'Exception Handling', description: 'Centralized, format-aware error handling producing RFC 7807 Problem Details.', docPath: '/docs/core/kernel' },
    ],
  },
  {
    id: 'application',
    title: 'Application & Core',
    badge: 'Lifecycle',
    description: 'Explicit dependency wiring, type-safe configuration, and zero ambient static facades.',
    items: [
      { name: 'Application', description: 'Central composition root coordinating container, boot phases, and runtime.', docPath: '/docs/core/application' },
      { name: 'Configuration', description: 'Environment-backed, typed immutable configurations validated at startup.', docPath: '/docs/getting-started/configuration' },
      { name: 'Bootstrappers', description: 'Discrete lifecycle units for registering providers and services.', docPath: '/docs/core/application' },
      { name: 'Request Attributes', description: 'Type-safe request-scoped metadata passing between middleware and handlers.', docPath: '/docs/core/request-response' },
      { name: 'Dependency Injection', description: 'Autoreflection container with constructor injection and interface bindings.', docPath: '/docs/core/dependency-injection' },
      { name: 'Controllers', description: 'Lightweight invokable or action-based handlers receiving injected dependencies.', docPath: '/docs/core/controllers' },
    ],
  },
  {
    id: 'data',
    title: 'Data & Persistence',
    badge: 'Persistence',
    description: 'Explicit database connections, transactional boundaries, and clean Data Mapper ORM architecture.',
    items: [
      { name: 'Validation', description: 'Composable schema-based validation with clear, localized error bags.', docPath: '/docs/data/validation' },
      { name: 'Database Foundation', description: 'Clean PDO connection manager supporting connection pooling and read/write splitting.', docPath: '/docs/data/database' },
      { name: 'PDO Connections', description: 'Type-safe prepared statements, parameter binding, and robust retry logic.', docPath: '/docs/data/database' },
      { name: 'Transactions', description: 'Explicit closure-based transaction management with auto-rollback on failure.', docPath: '/docs/data/database' },
      { name: 'Data Mapper ORM', description: 'Decoupled domain entities and persistence repositories without active-record leaks.', docPath: '/docs/data/orm' },
    ],
  },
  {
    id: 'security',
    title: 'Security Primitives',
    badge: 'Security-First',
    description: 'Hardened cryptographic defaults, strict authentication barriers, and defense-in-depth protections.',
    items: [
      { name: 'Authentication', description: 'Pluggable token, session, and API key guards with constant-time verification.', docPath: '/docs/security/authentication' },
      { name: 'Authorization', description: 'Voter and policy-based authorization gates with granular domain logic.', docPath: '/docs/security/authorization' },
      { name: 'Password Hashing', description: 'Argon2id and Bcrypt implementations configured with secure cost factors.', docPath: '/docs/security/authentication' },
      { name: 'Security Headers', description: 'Automated CSP, HSTS, X-Frame-Options, and Referrer-Policy enforcement.', docPath: '/docs/security/security-headers' },
      { name: 'Trusted Proxy Support', description: 'Strict IP/CIDR verification for reverse proxies and load balancers.', docPath: '/docs/security/trusted-proxies' },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure & Async',
    badge: 'Operations',
    description: 'Production-ready utilities for caching, message queues, real-time messaging, and observability.',
    items: [
      { name: 'Cache', description: 'Array and file cache stores.', docPath: '/docs/infrastructure/cache' },
      { name: 'Queue', description: 'In-memory job queue foundation (persistence and distributed workers deferred).', docPath: '/docs/infrastructure/queue' },
      { name: 'Events', description: 'Event dispatcher for decoupled domain notifications.', docPath: '/docs/infrastructure/events' },
      { name: 'Observability', description: 'In-memory structured logging foundation (OTel integration deferred).', docPath: '/docs/infrastructure/observability' },
      { name: 'Metrics', description: 'Foundation metrics registry (exporters deferred).', docPath: '/docs/infrastructure/metrics' },
      { name: 'WebSockets', description: 'WebSocket protocol frame parser (server runtime deferred).', docPath: '/docs/infrastructure/websockets' },
    ],
  },
  {
    id: 'tooling',
    title: 'Developer Tooling',
    badge: 'Developer Experience',
    description: 'Fast CLI commands, zero-dependency test fixtures, OpenAPI generator, and standardized project skeleton.',
    items: [
      { name: 'CLI Tooling (bin/flint)', description: 'Expressive console commands for code generation, migrations, and routes.', docPath: '/docs/developer-tools/cli' },
      { name: 'Testing Suite', description: 'Clean HTTP test client, mock container bindings, and fluent assertions.', docPath: '/docs/developer-tools/testing' },
      { name: 'OpenAPI Generator', description: 'Automatic OpenAPI 3.1 specification generation from route and schema metadata.', docPath: '/docs/developer-tools/openapi' },
      { name: 'Official Skeleton', description: 'Production-ready structure in flintphp/skeleton with clean separation of concerns.', docPath: '/docs/getting-started/project-structure' },
    ],
  },
];
