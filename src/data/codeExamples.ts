export interface CodeExample {
  id: string;
  title: string;
  category: string;
  filename: string;
  description: string;
  code: string;
}

export const CODE_EXAMPLES: CodeExample[] = [
  {
    id: 'bootstrap',
    title: 'Application Bootstrap',
    category: 'Core',
    filename: 'public/index.php',
    description: 'Explicit bootstrap flow: loads environment, initializes container, binds routes, and handles the request through the kernel.',
    code: `<?php

declare(strict_types=1);

use FlintPHP\\Framework\\Application;
use FlintPHP\\Framework\\Http\\Kernel;
use FlintPHP\\Framework\\Http\\Request;

require __DIR__ . '/../vendor/autoload.php';

// Initialize the Application container with immutable configuration
$app = Application::create(basePath: dirname(__DIR__));

// Register application routes and middleware
$app->bootstrapWith([
    App\\Bootstrappers\\DatabaseBootstrapper::class,
    App\\Bootstrappers\\RouteBootstrapper::class,
]);

// Build HTTP request from PHP globals
$request = Request::fromGlobals();

// Process through explicit HTTP Kernel
$kernel = $app->getContainer()->get(Kernel::class);
$response = $kernel->handle($request);

// Send response headers and body
$response->send();
$kernel->terminate($request, $response);
`,
  },
  {
    id: 'get-route',
    title: 'GET Route',
    category: 'Routing',
    filename: 'routes/api.php',
    description: 'Direct route declaration with typed response closure and explicit status code.',
    code: `<?php

declare(strict_types=1);

use FlintPHP\\Framework\\Routing\\Router;
use FlintPHP\\Framework\\Http\\Response;
use FlintPHP\\Framework\\Http\\Request;

/** @var Router $router */

$router->get('/api/health', function (Request $request): Response {
    return Response::json([
        'status' => 'healthy',
        'framework' => 'FlintPHP',
        'version' => '1.0.0',
        'timestamp' => time(),
    ]);
});
`,
  },
  {
    id: 'dynamic-route',
    title: 'Dynamic Route',
    category: 'Routing',
    filename: 'routes/api.php',
    description: 'Typed route parameters with regex constraints and direct handler mapping.',
    code: `<?php

declare(strict_types=1);

use FlintPHP\\Framework\\Routing\\Router;
use FlintPHP\\Framework\\Http\\Response;
use FlintPHP\\Framework\\Http\\Request;

/** @var Router $router */

// Route with typed integer ID constraint
$router->get('/api/users/{id:int}', function (Request $request, int $id): Response {
    return Response::json([
        'user_id' => $id,
        'requested_at' => (new DateTimeImmutable())->format(DATE_ATOM),
    ]);
})->name('users.show');
`,
  },
  {
    id: 'controller',
    title: 'Controller',
    category: 'Application',
    filename: 'src/Controllers/UserController.php',
    description: 'Invokable controller with explicit constructor dependency injection and typed request handling.',
    code: `<?php

declare(strict_types=1);

namespace App\\Controllers;

use App\\Domain\\UserRepository;
use FlintPHP\\Framework\\Http\\Response;
use FlintPHP\\Framework\\Http\\Request;
use FlintPHP\\Framework\\Http\\Exception\\HttpException;

final class UserController
{
    public function __construct(
        private readonly UserRepository $users,
    ) {}

    public function show(Request $request, int $id): Response
    {
        $user = $this->users->findById($id);

        if ($user === null) {
            throw new NotFoundException(sprintf('User with ID %d not found.', $id));
        }

        return Response::json([
            'data' => [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'role' => $user->role,
            ],
        ]);
    }
}
`,
  },
  {
    id: 'middleware',
    title: 'PSR-15 Middleware',
    category: 'HTTP',
    filename: 'src/Middleware/TimingMiddleware.php',
    description: 'Standard PSR-15 onion-skin middleware measuring execution time and appending custom headers.',
    code: `<?php

declare(strict_types=1);

namespace App\\Middleware;

use FlintPHP\\Framework\\Http\\MiddlewareInterface;
use FlintPHP\\Framework\\Http\\RequestHandlerInterface;
use FlintPHP\\Framework\\Http\\Response;
use FlintPHP\\Framework\\Http\\Request;

final class TimingMiddleware implements MiddlewareInterface
{
    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        $startTime = microtime(true);

        // Process down the explicit middleware stack
        $response = $handler->handle($request);

        $executionMs = round((microtime(true) - $startTime) * 1000, 2);

        // Return new immutable response with added server-timing header
        return $response
            ->withHeader('Server-Timing', sprintf('app;dur=%.2f', $executionMs))
            ->withHeader('X-Frame-Options', 'DENY')
            ->withHeader('X-Content-Type-Options', 'nosniff');
    }
}
`,
  },
  {
    id: 'dependency-injection',
    title: 'Dependency Injection',
    category: 'Core',
    filename: 'src/Bootstrappers/DatabaseBootstrapper.php',
    description: 'Explicit container interface binding without hidden service discovery or magic autowiring surprises.',
    code: `<?php

declare(strict_types=1);

namespace App\\Bootstrappers;

use App\\Domain\\UserRepository;
use App\\Infrastructure\\SqlUserRepository;
use FlintPHP\\Framework\\Container\\Container;
use FlintPHP\\Framework\\Database\\ConnectionInterface;
use FlintPHP\\Framework\\Config\\ConfigRepository as Config;

final class DatabaseBootstrapper
{
    public function register(Container $container): void
    {
        // Bind singleton database connection with explicit config injection
        $container->singleton(Connection::class, function (Container $c): Connection {
            $config = $c->get(Config::class);
            
            return new Connection(
                dsn: $config->get('database.dsn'),
                username: $config->get('database.user'),
                password: $config->get('database.password'),
                options: [
                    \\PDO::ATTR_ERRMODE => \\PDO::ERRMODE_EXCEPTION,
                    \\PDO::ATTR_DEFAULT_FETCH_MODE => \\PDO::FETCH_ASSOC,
                ]
            );
        });

        // Bind domain interface to concrete infrastructure repository
        $container->bind(UserRepository::class, SqlUserRepository::class);
    }
}
`,
  },
  {
    id: 'validation',
    title: 'Schema Validation',
    category: 'Data',
    filename: 'src/Requests/CreateUserRequest.php',
    description: 'Type-safe schema validation with clean error messages and automatic sanitization.',
    code: `<?php

declare(strict_types=1);

namespace App\\Requests;

use FlintPHP\\Framework\\Validation\\Validator;
use FlintPHP\\Framework\\Validation\\Rule;

final class CreateUserRequest
{
    public function __construct(
        public readonly string $email,
        public readonly string $name,
        public readonly string $password,
    ) {}

    public static function validate(array $data, Validator $validator): self
    {
        $validated = $validator->validate($data, [
            'email' => [Rule::required(), Rule::email(), Rule::max(255)],
            'name' => [Rule::required(), Rule::string(), Rule::min(2), Rule::max(100)],
            'password' => [Rule::required(), Rule::string(), Rule::min(10)],
        ]);

        return new self(
            email: $validated['email'],
            name: $validated['name'],
            password: $validated['password'],
        );
    }
}
`,
  },
  {
    id: 'database',
    title: 'Database & Transactions',
    category: 'Data',
    filename: 'src/Infrastructure/SqlUserRepository.php',
    description: 'Explicit PDO transaction handling with automatic rollback on unhandled exceptions.',
    code: `<?php

declare(strict_types=1);

namespace App\\Infrastructure;

use App\\Domain\\User;
use App\\Domain\\UserRepository;
use FlintPHP\\Framework\\Database\\ConnectionInterface;

final class SqlUserRepository implements UserRepository
{
    public function __construct(
        private readonly Connection $db,
    ) {}

    public function createWithProfile(User $user, array $profileData): int
    {
        // Explicit transaction boundary
        return $this->db->transaction(function (Connection $db) use ($user, $profileData): int {
            $stmt = $db->prepare(
                'INSERT INTO users (email, name, password_hash, created_at) VALUES (:email, :name, :hash, :created_at)'
            );
            $stmt->execute([
                'email' => $user->email,
                'name' => $user->name,
                'hash' => $user->passwordHash,
                'created_at' => (new \\DateTimeImmutable())->format('Y-m-d H:i:s'),
            ]);

            $userId = (int) $db->lastInsertId();

            $pStmt = $db->prepare('INSERT INTO profiles (user_id, bio) VALUES (:uid, :bio)');
            $pStmt->execute(['uid' => $userId, 'bio' => $profileData['bio'] ?? null]);

            return $userId;
        });
    }
}
`,
  },
  {
    id: 'orm',
    title: 'Data Mapper ORM',
    category: 'Data',
    filename: 'src/Domain/UserMapper.php',
    description: 'Pure domain entities completely decoupled from persistence details (no Active Record magic).',
    code: `<?php

declare(strict_types=1);

namespace App\\Domain;

use FlintPHP\\Framework\\Orm\\OrmManager;
use FlintPHP\\Framework\\Orm\\Model;

final class UserMapper extends OrmManager
{
    protected string $table = 'users';
    protected string $primaryKey = 'id';
    protected string $entityClass = User::class;

    /**
     * @return EntitySet<User>
     */
    public function findActiveAdmins(): EntitySet
    {
        return $this->query()
            ->where('status', '=', 'active')
            ->where('role', '=', 'admin')
            ->orderBy('created_at', 'DESC')
            ->toEntitySet();
    }
}
`,
  },
  {
    id: 'authentication',
    title: 'Authentication Guard',
    category: 'Security',
    filename: 'src/Middleware/BearerAuthMiddleware.php',
    description: 'Constant-time token validation and request attribution.',
    code: `<?php

declare(strict_types=1);

namespace App\\Middleware;

use FlintPHP\\Framework\\Http\\MiddlewareInterface;
use FlintPHP\\Framework\\Http\\RequestHandlerInterface;
use FlintPHP\\Framework\\Http\\Response;
use FlintPHP\\Framework\\Http\\Request;
use FlintPHP\\Framework\\Authentication\\BearerTokenAuthenticator;
use FlintPHP\\Framework\\Authentication\\Exception\\AuthenticationException;

final class BearerAuthMiddleware implements MiddlewareInterface
{
    public function __construct(
        private readonly TokenManager $tokens,
    ) {}

    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        $header = $request->header('Authorization');
        if (!preg_match('/^Bearer\\s+(.*)$/i', $header, $matches)) {
            throw new UnauthorizedException('Missing or malformed Bearer token.');
        }

        $token = $matches[1];
        $user = $this->tokens->authenticate($token);

        if ($user === null) {
            throw new UnauthorizedException('Invalid or expired authentication token.');
        }

        // Pass authenticated identity via request attribute (immutable)
        $request = $request->withAttribute('current_user', $user);

        return $handler->handle($request);
    }
}
`,
  },
  {
    id: 'authorization',
    title: 'Authorization Policy',
    category: 'Security',
    filename: 'src/Security/ProjectPolicy.php',
    description: 'Fine-grained, explicit policy voters checking domain permissions without magic.',
    code: `<?php

declare(strict_types=1);

namespace App\\Security;

use App\\Domain\\User;
use App\\Domain\\Project;
use FlintPHP\\Framework\\Authorization\\AuthorizerInterface;

final class ProjectPolicy implements PolicyInterface
{
    public const VIEW = 'project.view';
    public const EDIT = 'project.edit';
    public const DELETE = 'project.delete';

    public function can(User $user, string $ability, object $subject): bool
    {
        if (!$subject instanceof Project) {
            return false;
        }

        return match ($ability) {
            self::VIEW => $subject->isPublic || $subject->ownerId === $user->id || $user->hasRole('admin'),
            self::EDIT => $subject->ownerId === $user->id || $user->hasRole('admin'),
            self::DELETE => $subject->ownerId === $user->id && !$subject->isArchived,
            default => false,
        };
    }
}
`,
  },
  {
    id: 'json-api',
    title: 'JSON API Response',
    category: 'HTTP',
    filename: 'src/Controllers/ArticleController.php',
    description: 'Standardized JSON response envelope with HTTP status, pagination, and headers.',
    code: `<?php

declare(strict_types=1);

namespace App\\Controllers;

use FlintPHP\\Framework\\Http\\Response;
use FlintPHP\\Framework\\Http\\Request;

final class ArticleController
{
    public function index(Request $request): Response
    {
        $page = (int) $request->query('page', 1);
        $articles = [
            ['id' => 1, 'title' => 'Building Fast APIs with FlintPHP', 'slug' => 'building-fast-apis'],
            ['id' => 2, 'title' => 'Why We Avoid Facades and Magic', 'slug' => 'why-no-facades'],
        ];

        return Response::json([
            'data' => $articles,
            'meta' => [
                'current_page' => $page,
                'per_page' => 20,
                'total' => 2,
            ],
            'links' => [
                'self' => '/api/articles?page=' . $page,
            ],
        ], status: 200, headers: [
            'Cache-Control' => 'public, max-age=60',
        ]);
    }
}
`,
  },
];
