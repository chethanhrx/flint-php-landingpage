export interface DocPage {
  slug: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      text?: string;
      codeBlock?: {
        language: string;
        filename?: string;
        code: string;
      };
      bulletPoints?: string[];
      table?: {
        headers: string[];
        rows: string[][];
      };
    }[];
  };
}

export interface DocCategory {
  id: string;
  name: string;
  pages: DocPage[];
}

export const DOCS_DATA: DocCategory[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    pages: [
      {
        slug: 'introduction',
        category: 'Getting Started',
        title: 'Introduction to FlintPHP',
        description: 'Understand the design philosophy, explicit composition principles, and why FlintPHP rejects framework magic.',
        readTime: '4 min read',
        content: {
          lead: 'FlintPHP is a fast, secure, modern PHP framework designed from first principles for building fast APIs and robust web applications without framework magic.',
          sections: [
            {
              heading: 'The FlintPHP Philosophy: Explicit Composition Over Magic',
              text: 'Modern PHP has evolved into a powerhouse language with strong types, read-only classes, enums, fibers, and JIT compilation. However, mainstream PHP frameworks continue to rely heavily on global static facades, magic method resolution, automatic ambient service discovery, and hidden state mutations. FlintPHP was built to challenge this status quo.',
              bulletPoints: [
                'Predictable & Testable: Every dependency is injected via constructors or request pipelines.',
                'Zero Facades: No static magic disguising hidden singleton instances.',
                'Immutable HTTP Primitives: Requests and responses are immutable representations using explicit architecture.',
                'Minimal Dependencies: Lean, audited core keeping memory footprint minimal.',
                'Security-by-Default: Configurable security headers middleware included out of the box.',
              ],
            },
            {
              heading: 'System Requirements',
              text: 'FlintPHP v1.0.0 requires modern runtime environments to guarantee strict type safety and high performance.',
              bulletPoints: [
                'PHP 8.2 or higher',
                'Composer 2.x',
              ],
            },
          ],
        },
      },
      {
        slug: 'installation',
        category: 'Getting Started',
        title: 'Installation & Setup',
        description: 'Install FlintPHP by adding the framework package to your PHP 8.2+ project.',
        readTime: '3 min read',
        content: {
          lead: 'Getting started with FlintPHP takes less than 30 seconds using Composer.',
          sections: [
            {
              heading: 'Creating a New Project',
              text: 'The recommended way to start a new FlintPHP application is using the official Skeleton. This provides a complete directory structure and development setup instantly.',
              codeBlock: {
                language: 'bash',
                filename: 'terminal',
                code: `# Create a new application project using the skeleton
composer create-project flintphp/skeleton my-app

# Enter the project directory
cd my-app

# Inspect available CLI commands
php bin/flint`,
              },
            },
            {
              heading: 'Starting the Local Development Server',
              text: 'FlintPHP includes a built-in routing script for the PHP development server, allowing zero-setup local development:',
              codeBlock: {
                language: 'bash',
                filename: 'terminal',
                code: `# Start dev server bound to port 8000
php -S localhost:8000 -t public

# Visit in your browser or curl:
curl http://localhost:8000/api/health`,
              },
            },
            {
              heading: 'Adding FlintPHP to an Existing Composer Project',
              text: 'If you are migrating an existing codebase or building a microservice within an existing monorepo, install the core framework package directly:',
              codeBlock: {
                language: 'bash',
                filename: 'terminal',
                code: `composer require flintphp/framework:^1.0.0`,
              },
            },
          ],
        },
      },
      {
        slug: 'first-application',
        category: 'Getting Started',
        title: 'Create Your First Application',
        description: 'Step-by-step walkthrough of setting up routes, creating an API controller, and returning structured JSON.',
        readTime: '5 min read',
        content: {
          lead: 'Learn how FlintPHP processes incoming HTTP requests and returns strictly typed JSON responses.',
          sections: [
            {
              heading: '1. Registering an API Route',
              text: 'Open routes/api.php and define your endpoint using the Router instance:',
              codeBlock: {
                language: 'php',
                filename: 'routes/api.php',
                code: `<?php

declare(strict_types=1);

use FlintPHP\\Framework\\Routing\\Router;
use FlintPHP\\Framework\\Http\\Response;
use FlintPHP\\Framework\\Http\\Request;

/** @var Router $router */

$router->get('/api/welcome', function (Request $request): Response {
    $name = $request->query('name', 'Developer');

    return Response::json([
        'message' => sprintf('Welcome to FlintPHP, %s!', htmlspecialchars((string) $name)),
        'framework' => 'FlintPHP',
        'version' => '1.0.0',
        'php_version' => PHP_VERSION,
    ]);
});`,
              },
            },
            {
              heading: '2. Testing the Endpoint',
              text: 'Execute a test request against the local development server:',
              codeBlock: {
                language: 'bash',
                filename: 'terminal',
                code: `curl -i "http://localhost:8000/api/welcome?name=Ada"`,
              },
            },
          ],
        },
      },
      {
        slug: 'project-structure',
        category: 'Getting Started',
        title: 'Project Structure',
        description: 'Tour the recommended directory structure for a FlintPHP application.',
        readTime: '4 min read',
        content: {
          lead: 'FlintPHP enforces clean architectural boundaries with an intuitive, modular project layout.',
          sections: [
            {
              heading: 'Directory Overview',
              table: {
                headers: ['Directory / File', 'Purpose & Responsibility'],
                rows: [
                  ['bin/flint', 'Console foundation for registering and executing custom application tasks'],
                  ['config/', 'Immutable configuration files returning typed arrays'],
                  ['public/index.php', 'Single web entry point; initializes Application & executes HTTP Kernel'],
                  ['routes/', 'Explicit route registration definitions (api.php, web.php)'],
                  ['src/Bootstrappers/', 'Lifecycle classes for binding services into the DI container'],
                  ['src/Controllers/', 'HTTP request handlers and controllers'],
                  ['src/Domain/', 'Core business entities and data mappers'],
                  ['src/Middleware/', 'Request/response pipeline middleware'],
                  ['storage/', 'Application logs, cache storage, and file uploads'],
                  ['tests/', 'Unit, feature, and integration test suites'],
                ],
              },
            },
          ],
        },
      },
      {
        slug: 'configuration',
        category: 'Getting Started',
        title: 'Configuration',
        description: 'Manage environment variables and type-safe configuration without hidden global state.',
        readTime: '4 min read',
        content: {
          lead: 'All configuration in FlintPHP is immutable, isolated, and injected via the Config repository.',
          sections: [
            {
              heading: 'Environment Loading & Type Safety',
              text: 'FlintPHP utilizes a strongly typed Configuration Repository initialized during bootstrap:',
              codeBlock: {
                language: 'php',
                filename: 'config/app.php',
                code: `<?php

declare(strict_types=1);

return [
    'name' => 'FlintPHP App',
    'env' => 'production',
    'debug' => false,
    'url' => 'http://localhost:8000',
    'timezone' => 'UTC',
];`,
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: 'core',
    name: 'Core Architecture',
    pages: [
      {
        slug: 'application',
        category: 'Core Architecture',
        title: 'Application & Bootstrappers',
        description: 'How the Application composition root coordinates the container, bootstrappers, and lifecycle.',
        readTime: '5 min read',
        content: {
          lead: 'The FlintPHP\\Framework\\Application instance serves as the composition root of your system.',
          sections: [
            {
              heading: 'Lifecycle Phases',
              text: 'The FlintPHP lifecycle executes in discrete, deterministic phases:',
              bulletPoints: [
                '1. Environment & Config Loading: Configuration is parsed into read-only dictionaries.',
                '2. Container Initialization: Dependency injection container is instantiated.',
                '3. Bootstrapper Execution: Registered bootstrappers bind providers, services, and repositories.',
                '4. Kernel Execution: Request passes through the middleware onion into routing.',
                '5. Termination: Cleanup and log flushes.',
              ],
            },
          ],
        },
      },
      {
        slug: 'request-response',
        category: 'Core Architecture',
        title: 'Request & Response Primitives',
        description: 'Work with immutable, strictly typed HTTP messages using proprietary immutable representations.',
        readTime: '6 min read',
        content: {
          lead: 'FlintPHP treats HTTP requests and responses as pure, immutable data values.',
          sections: [
            {
              heading: 'Request Capabilities',
              codeBlock: {
                language: 'php',
                filename: 'Example.php',
                code: `use FlintPHP\\Framework\\Http\\Request;
use FlintPHP\\Framework\\Http\\Response;

function handle(Request $request): Response
{
    // Inspect query params, JSON body, headers
    $page = (int) $request->query('page', 1);
    $apiKey = $request->header('X-API-Key');
    $payload = json_decode($request->body(), true);

    // Immutably pass authenticated identity
    $requestWithUser = $request->withAttribute('user_id', 42);

    return Response::json([
        'status' => 'success',
        'received_page' => $page,
    ]);
}`,
              },
            },
          ],
        },
      },
      {
        slug: 'routing',
        category: 'Core Architecture',
        title: 'Fast Routing Engine',
        description: 'High-speed route matching with dynamic route parameters and reflection-assisted handler parameter conversion.',
        readTime: '5 min read',
        content: {
          lead: 'FlintPHP features a fast router designed to match routes efficiently.',
          sections: [
            {
              heading: 'Route Definitions & Constraints',
              codeBlock: {
                language: 'php',
                filename: 'routes/api.php',
                code: `use FlintPHP\\Framework\\Routing\\Router;
use App\\Controllers\\PostController;
use App\\Middleware\\BearerAuthMiddleware;

/** @var Router $router */

$router->get('/api/v1/posts', [PostController::class, 'index']);
$router->get('/api/v1/posts/{slug}', [PostController::class, 'show']);

// Protected routes requiring Bearer authentication
$router->post('/api/v1/posts', [PostController::class, 'store'], middleware: [BearerAuthMiddleware::class]);
$router->delete('/api/v1/posts/{id}', [PostController::class, 'destroy'], middleware: [BearerAuthMiddleware::class]);`,
              },
            },
          ],
        },
      },
      {
        slug: 'middleware',
        category: 'Core Architecture',
        title: 'Middleware Pipeline',
        description: 'Compose request-processing layers with onion-architecture predictability.',
        readTime: '4 min read',
        content: {
          lead: 'Middleware in FlintPHP follows a standard onion-skin architecture without magic shortcuts.',
          sections: [
            {
              heading: 'Creating Custom Middleware',
              codeBlock: {
                language: 'php',
                filename: 'src/Middleware/RateLimitMiddleware.php',
                code: `namespace App\\Middleware;

use FlintPHP\\Framework\\Middleware\\MiddlewareInterface;
use FlintPHP\\Framework\\Http\\Response;
use FlintPHP\\Framework\\Http\\Request;
use FlintPHP\\Framework\\Cache\\CacheInterface;

final class RateLimitMiddleware implements MiddlewareInterface
{
    public function __construct(
        private readonly CacheInterface $cache,
        private readonly int $maxRequests = 60,
        private readonly int $decaySeconds = 60,
    ) {}

    public function process(Request $request, callable $next): Response
    {
        $ip = $request->server('REMOTE_ADDR', '127.0.0.1');
        $key = 'rate_limit:' . $ip;

        $hits = (int) ($this->cache->get($key) ?? 0) + 1;
        if ($hits > $this->maxRequests) {
            return Response::json(['error' => 'Rate limit exceeded. Try again later.'], status: 429);
        }

        $this->cache->set($key, $hits, $this->decaySeconds);

        $response = $next($request);
        return $response->withHeader('X-RateLimit-Remaining', (string) ($this->maxRequests - $hits));
    }
}`,
              },
            },
          ],
        },
      },
      {
        slug: 'dependency-injection',
        category: 'Core Architecture',
        title: 'Dependency Injection Container',
        description: 'Deterministic inversion of control with constructor auto-reflection and interface binding.',
        readTime: '5 min read',
        content: {
          lead: 'FlintPHP includes a zero-magic PSR-11 compliant dependency injection container.',
          sections: [
            {
              heading: 'Interface Bindings & Singletons',
              codeBlock: {
                language: 'php',
                filename: 'src/Bootstrappers/PaymentBootstrapper.php',
                code: `use FlintPHP\\Framework\\Container\\Container;
use FlintPHP\\Framework\\Config\\Contract\\ConfigRepositoryInterface;
use App\\Services\\PaymentGateway;
use App\\Services\\StripeGateway;

final class PaymentBootstrapper
{
    public function register(Container $container): void
    {
        // Singleton binding with explicit factory closure
        $container->singleton(PaymentGateway::class, function (Container $c): PaymentGateway {
            $config = $c->get(ConfigRepositoryInterface::class);
            return new StripeGateway(
                apiKey: $config->get('services.stripe.key'),
                webhookSecret: $config->get('services.stripe.secret')
            );
        });
    }
}`,
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: 'data',
    name: 'Data & Persistence',
    pages: [
      {
        slug: 'validation',
        category: 'Data & Persistence',
        title: 'Validation Engine',
        description: 'Declarative, schema-based request validation with localized error messages.',
        readTime: '4 min read',
        content: {
          lead: 'FlintPHP validation separates validation logic cleanly from models and controllers.',
          sections: [
            {
              heading: 'Validating Payloads',
              codeBlock: {
                language: 'php',
                filename: 'Example.php',
                code: `use FlintPHP\\Framework\\Validation\\Validator;
use FlintPHP\\Framework\\Validation\\Rules\\{Required, Email, Max, Integer, Min, In};

$validator = $container->get(Validator::class);

$result = $validator->validate(json_decode($request->body(), true) ?? [], [
    'email' => [new Required(), new Email(), new Max(255)],
    'age' => [new Required(), new Integer(), new Min(18)],
    'roles' => [new Required(), new In(['editor', 'admin', 'viewer'])],
]);

if (!$result->isValid()) {
    return Response::json(['errors' => $result->errors()], status: 422);
}`,
              },
            },
          ],
        },
      },
      {
        slug: 'database',
        category: 'Data & Persistence',
        title: 'Database & Transactions',
        description: 'Robust PDO wrapper with transaction boundaries and prepared statements.',
        readTime: '5 min read',
        content: {
          lead: 'Execute parameterized queries and nested transactions with explicit PDO safety.',
          sections: [
            {
              heading: 'Atomic Transactions',
              codeBlock: {
                language: 'php',
                filename: 'TransferService.php',
                code: `use FlintPHP\\Framework\\Database\\ConnectionInterface;

final class TransferService
{
    public function __construct(private readonly ConnectionInterface $db) {}

    public function transfer(int $fromId, int $toId, int $amountCents): void
    {
        $this->db->transaction(function () use ($fromId, $toId, $amountCents) {
            $this->db->execute(
                'UPDATE accounts SET balance = balance - :amt WHERE id = :id AND balance >= :amt',
                ['amt' => $amountCents, 'id' => $fromId]
            );
            $this->db->execute(
                'UPDATE accounts SET balance = balance + :amt WHERE id = :id',
                ['amt' => $amountCents, 'id' => $toId]
            );
        });
    }
}`,
              },
            },
          ],
        },
      },
      {
        slug: 'orm',
        category: 'Data & Persistence',
        title: 'Data Mapper ORM',
        description: 'True Data Mapper pattern decoupling domain business entities from persistence tables.',
        readTime: '6 min read',
        content: {
          lead: 'Unlike Active Record frameworks, FlintPHP separates domain models from database queries.',
          sections: [
            {
              heading: 'Entity & OrmManager Pattern',
              codeBlock: {
                language: 'php',
                filename: 'src/Domain/Order.php',
                code: `namespace App\\Domain;

// Pure Domain Entity - zero database knowledge, zero base classes!
final class Order
{
    public function __construct(
        public readonly ?int $id,
        public readonly int $customerId,
        public readonly int $totalCents,
        public readonly string $status,
        public readonly \\DateTimeImmutable $createdAt,
    ) {}

    public function canBeCancelled(): bool
    {
        return $this->status === 'pending';
    }
}`,
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: 'security',
    name: 'Security Primitives',
    pages: [
      {
        slug: 'authentication',
        category: 'Security Primitives',
        title: 'Authentication & Passwords',
        description: 'Native password hashing, and authenticator interfaces.',
        readTime: '5 min read',
        content: {
          lead: 'Security primitives are baked directly into the framework core with hardened defaults.',
          sections: [
            {
              heading: 'Password Hashing',
              codeBlock: {
                language: 'php',
                filename: 'src/Security/Hasher.php',
                code: `use FlintPHP\Framework\Authentication\PasswordHasher;

$hasher = new PasswordHasher();

// Uses PASSWORD_DEFAULT (Argon2id or bcrypt depending on PHP version)
$hash = $hasher->hash('super-secret-password');

// Verifies the password against the stored hash
$valid = $hasher->verify('super-secret-password', $hash);`,
              },
            },
          ],
        },
      },
      {
        slug: 'security-headers',
        category: 'Security Primitives',
        title: 'Security Headers',
        description: 'Configurable CSP, HSTS, X-Content-Type-Options, and Clickjacking mitigation.',
        readTime: '4 min read',
        content: {
          lead: 'FlintPHP includes configurable security header middleware that you can attach to your request pipeline.',
          sections: [
            {
              heading: 'Headers Enforced',
              bulletPoints: [
                'Content-Security-Policy: default-src \'self\'',
                'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
                'X-Content-Type-Options: nosniff',
                'X-Frame-Options: DENY',
                'Referrer-Policy: strict-origin-when-cross-origin',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure & Async',
    pages: [
      {
        slug: 'cache',
        category: 'Infrastructure',
        title: 'Caching Subsystem',
        description: 'In-memory array and file cache drivers.',
        readTime: '4 min read',
        content: {
          lead: 'Fast multi-driver caching with atomic increments, tags, and TTL support.',
          sections: [
            {
              heading: 'Cache Usage',
              codeBlock: {
                language: 'php',
                filename: 'CacheExample.php',
                code: `use FlintPHP\\Framework\\Cache\\CacheInterface;

$cache = $container->get(CacheInterface::class);

// Cache with TTL
$stats = $cache->get('dashboard:metrics');
if ($stats === null) {
    $stats = $db->fetchColumn('SELECT COUNT(*) as total FROM users');
    $cache->set('dashboard:metrics', $stats, 300);
}`,
              },
            },
          ],
        },
      },
      {
        slug: 'queue',
        category: 'Infrastructure',
        title: 'Asynchronous Job Queues',
        description: 'In-memory job queue foundation (persistence and distributed workers deferred).',
        readTime: '5 min read',
        content: {
          lead: 'Offload operations into an in-memory job queue.',
          sections: [
            {
              heading: 'Dispatching a Job',
              codeBlock: {
                language: 'php',
                filename: 'src/Jobs/SendWelcomeEmailJob.php',
                code: `namespace App\\Jobs;

use FlintPHP\\Framework\\Queue\\JobInterface;

final class SendWelcomeEmailJob implements JobInterface
{
    public function __construct(
        public readonly int $userId,
        public readonly string $emailAddress,
    ) {}

    public function handle(): void
    {
        // Send welcome email using your preferred mailer
        // e.g., PHP mail(), SMTP library, or third-party service
        mail($this->emailAddress, 'Welcome!', 'Thank you for registering.');
    }
}`,
              },
            },
          ],
        },
      },
      {
        slug: 'websockets',
        category: 'Infrastructure',
        title: 'WebSockets & Real-Time',
        description: 'WebSocket protocol frame parser (server runtime deferred).',
        readTime: '5 min read',
        content: {
          lead: 'Build real-time notification streams, presence indicators, and live dashboards.',
          sections: [
            {
              heading: 'WebSocket Handler',
              codeBlock: {
                language: 'php',
                filename: 'src/WebSockets/ChatHandler.php',
                code: `use FlintPHP\\Framework\\WebSocket\\Parser\\IncrementalParser;
use FlintPHP\\Framework\\WebSocket\\Frame\\FrameBuilder;
use FlintPHP\\Framework\\WebSocket\\Handshake\\HandshakeValidator;

final class ProtocolParser
{
    private IncrementalParser $parser;
    private FrameBuilder $frameBuilder;

    public function __construct()
    {
        $this->parser = new IncrementalParser();
        $this->frameBuilder = new FrameBuilder();
    }

    public function onData(string $data): ?string
    {
        // Feed raw TCP data into the incremental parser
        $this->parser->feed($data);

        // Attempt to extract a complete frame
        $frame = $this->parser->nextFrame();
        if ($frame === null) {
            return null;
        }

        return $frame->payload;
    }
}`,
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    pages: [
      {
        slug: 'cli',
        category: 'Developer Tools',
        title: 'Flint Console (bin/flint)',
        description: 'Foundation console application for registering and executing custom commands.',
        readTime: '4 min read',
        content: {
          lead: 'Command-line utilities designed for speed and clarity in local and CI environments.',
          sections: [
            {
              heading: 'Standard Commands',
              table: {
                headers: ['Command', 'Action'],
                rows: [
                  ['php bin/flint list', 'Lists all registered console commands'],
                  ['php bin/flint help', 'Displays help information for a specific command'],
                                  ],
              },
            },
          ],
        },
      },
      {
        slug: 'testing',
        category: 'Developer Tools',
        title: 'Testing Suite',
        description: 'Base test case with HTTP helpers and fluent response assertions.',
        readTime: '4 min read',
        content: {
          lead: 'FlintPHP applications are 100% testable without boot-strapping global PHP globals.',
          sections: [
            {
              heading: 'Writing an API Feature Test',
              codeBlock: {
                language: 'php',
                filename: 'tests/Feature/HealthTest.php',
                code: `namespace Tests\\Feature;

use FlintPHP\\Framework\\Http\\Kernel;
use FlintPHP\\Framework\\Http\\Request;
use FlintPHP\\Framework\\Testing\\TestCase;

final class HealthTest extends TestCase
{
    protected function createKernel(): Kernel
    {
        // Bootstrap your application and return its Kernel
        $app = require __DIR__ . '/../../bootstrap/app.php';
        $app->boot();
        return $app->kernel();
    }

    public function test_health_endpoint_returns_200_and_json(): void
    {
        $response = $this->get('/api/health');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertJson([
            'status' => 'healthy',
            'version' => '1.0.0',
        ]);
    }
}`,
              },
            },
          ],
        },
      },
      {
        slug: 'openapi',
        category: 'Developer Tools',
        title: 'OpenAPI Document Builder',
        description: 'Programmatic OpenAPI 3.1 document construction and JSON serialization.',
        readTime: '4 min read',
        content: {
          lead: 'FlintPHP includes a programmatic OpenAPI 3.1 document builder for constructing API specifications.',
          sections: [
            {
              heading: 'Building an OpenAPI Document',
              codeBlock: {
                language: 'php',
                filename: 'docs.php',
                code: `use FlintPHP\\Framework\\OpenApi\\OpenApiDocument;
use FlintPHP\\Framework\\OpenApi\\Info;
use FlintPHP\\Framework\\OpenApi\\PathItem;
use FlintPHP\\Framework\\OpenApi\\Operation;
use FlintPHP\\Framework\\OpenApi\\Response;
use FlintPHP\\Framework\\OpenApi\\Schema;
use FlintPHP\\Framework\\OpenApi\\OpenApiSerializer;

$doc = new OpenApiDocument(
    info: new Info(title: 'My API', version: '1.0.0'),
    paths: [
        '/api/users' => new PathItem(
            get: new Operation(
                responses: ['200' => new Response(description: 'Success')]
            )
        ),
    ]
);

$serializer = new OpenApiSerializer();
$json = $serializer->toJson($doc);`,
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: 'reference',
    name: 'Reference',
    pages: [
      {
        slug: 'changelog',
        category: 'Reference',
        title: 'Changelog',
        description: 'Official release notes and roadmap for FlintPHP.',
        readTime: '2 min read',
        content: {
          lead: 'Current stable release: v1.0.0 (Released September 2026).',
          sections: [
            {
              heading: 'v1.0.0 — Initial Stable Release',
              bulletPoints: [
                'Stable release of flintphp/framework.',
                'PSR-11 Container compliance.',
                'Fast router with dynamic path variables.',
                'Explicit Data Mapper ORM and transactional PDO layer.',
                'Native password hashing and security header enforcement.',
                              ],
            },
          ],
        },
      },
      {
        slug: 'security',
        category: 'Reference',
        title: 'Security Policy',
        description: 'Reporting vulnerabilities, security audits, and cryptographic guidelines.',
        readTime: '3 min read',
        content: {
          lead: 'FlintPHP takes security with the highest standard of architectural rigor.',
          sections: [
            {
              heading: 'Reporting Vulnerabilities',
              text: 'If you discover a security vulnerability in FlintPHP, please report it confidentially to security@flintphp.dev rather than opening a public issue.',
            },
          ],
        },
      },
    ],
  },
];
