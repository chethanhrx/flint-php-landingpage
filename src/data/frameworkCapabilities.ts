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
      { name: 'Request', description: 'Strictly typed, immutable server request representation with explicit body, query, header, cookie, and server access.', docPath: '/docs/request-response', status: 'Stable' },
      { name: 'Response', description: 'JSON response builders with immutable status, headers, and body updates.', docPath: '/docs/request-response', status: 'Stable' },
      { name: 'Headers', description: 'Normalized header bags with case-insensitive inspection and immutability.', docPath: '/docs/request-response', status: 'Stable' },
      { name: 'Routing', description: 'Fast routing supporting dynamic path variables and REST verbs.', docPath: '/docs/routing', status: 'Stable' },
      { name: 'Middleware', description: 'Composable onion-skin pipeline adhering to simple middleware interfaces.', docPath: '/docs/middleware', status: 'Stable' },
      { name: 'Kernel', description: 'Deterministic request lifecycle coordinator with zero magical callbacks.', docPath: '/docs/kernel', status: 'Stable' },
      { name: 'Exception Handling', description: 'Centralized, format-aware error handling producing JSON error responses.', docPath: '/docs/kernel', status: 'Stable' },
    ],
  },
  {
    id: 'application',
    title: 'Application & Core',
    badge: 'Lifecycle',
    description: 'Explicit dependency wiring, type-safe configuration, and zero ambient static facades.',
    items: [
      { name: 'Application', description: 'Central composition root coordinating container, boot phases, and runtime.', docPath: '/docs/application', status: 'Stable' },
      { name: 'Configuration', description: 'Immutable configuration repository with dot-notation and array loaders.', docPath: '/docs/configuration', status: 'Stable' },
      { name: 'Bootstrappers', description: 'Discrete lifecycle units for registering providers and services.', docPath: '/docs/application', status: 'Stable' },
      { name: 'Request Attributes', description: 'Type-safe request-scoped metadata passing between middleware and handlers.', docPath: '/docs/request-response', status: 'Stable' },
      { name: 'Dependency Injection', description: 'Autoreflection container with constructor injection and interface bindings.', docPath: '/docs/dependency-injection', status: 'Stable' },
      { name: 'Controllers', description: 'Lightweight invokable or action-based handlers receiving injected dependencies.', docPath: '/docs/controllers', status: 'Stable' },
    ],
  },
  {
    id: 'data',
    title: 'Data & Persistence',
    badge: 'Persistence',
    description: 'Explicit database connections, transactional boundaries, and clean Data Mapper ORM architecture.',
    items: [
      { name: 'Validation', description: 'Composable schema-based validation with clear, localized error bags.', docPath: '/docs/validation', status: 'Stable' },
      { name: 'Database Foundation', description: 'Clean PDO connection manager providing simple and direct PDO lifecycle management.', docPath: '/docs/database', status: 'Stable' },
      { name: 'PDO Connections', description: 'Type-safe prepared statements, parameter binding, and predictable error handling.', docPath: '/docs/database', status: 'Stable' },
      { name: 'Transactions', description: 'Explicit closure-based transaction management with auto-rollback on failure.', docPath: '/docs/database', status: 'Stable' },
      { name: 'Data Mapper ORM', description: 'Decoupled domain entities and persistence repositories without active-record leaks.', docPath: '/docs/orm', status: 'Stable' },
    ],
  },
  {
    id: 'security',
    title: 'Security Primitives',
    badge: 'Security-First',
    description: 'Standard authentication and configurable security headers.',
    items: [
      { name: 'Authentication', description: 'Pluggable bearer token authenticator with secure password hashing.', docPath: '/docs/authentication', status: 'Stable' },
      { name: 'Authorization', description: 'Voter and policy-based authorization gates with granular domain logic.', docPath: '/docs/authorization', status: 'Deferred' },
      { name: 'Password Hashing', description: 'Password hashing using PASSWORD_DEFAULT (Argon2id or Bcrypt depending on PHP version).', docPath: '/docs/authentication', status: 'Stable' },
      { name: 'Security Headers', description: 'Basic configurable security headers middleware.', docPath: '/docs/security-headers', status: 'Stable' },
      { name: 'Trusted Proxy Support', description: 'Strict IP/CIDR verification for reverse proxies and load balancers.', docPath: '/docs/trusted-proxies', status: 'Deferred' },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure & Async',
    badge: 'Operations',
    description: 'Foundation utilities for caching, message queues, real-time messaging, and observability.',
    items: [
      { name: 'Cache', description: 'Array and file cache stores.', docPath: '/docs/cache', status: 'Stable' },
      { name: 'Queue', description: 'In-memory job queue foundation (persistence and distributed workers deferred).', docPath: '/docs/queue', status: 'Foundation' },
      { name: 'Events', description: 'Event dispatcher for decoupled domain notifications.', docPath: '/docs/events', status: 'Foundation' },
      { name: 'Observability', description: 'In-memory structured logging foundation (OTel integration deferred).', docPath: '/docs/observability', status: 'Foundation' },
      { name: 'Metrics', description: 'Foundation metrics registry (exporters deferred).', docPath: '/docs/metrics', status: 'Foundation' },
      { name: 'WebSockets', description: 'WebSocket protocol frame parser (server runtime deferred).', docPath: '/docs/websockets', status: 'Foundation' },
    ],
  },
  {
    id: 'tooling',
    title: 'Developer Tooling',
    badge: 'Developer Experience',
    description: 'Fast CLI commands, zero-dependency test fixtures.',
    items: [
      { name: 'CLI Tooling (bin/flint)', description: 'Foundation for building custom console commands.', docPath: '/docs/cli', status: 'Foundation' },
      { name: 'Testing Suite', description: 'Basic testing utilities and Foundation TestCase base classes.', docPath: '/docs/testing', status: 'Foundation' },

    ],
  },
];
