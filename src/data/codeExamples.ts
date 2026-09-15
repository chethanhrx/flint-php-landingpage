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
$app = new Application(dirname(__DIR__));

// Register application routes and middleware
$app->bootstrapWith([
    App\\Bootstrappers\\DatabaseBootstrapper::class,
    App\\Bootstrappers\\RouteBootstrapper::class,
]);

// Build HTTP request from PHP globals
$request = Request::fromGlobals();

// Process through explicit HTTP Kernel
$kernel = $app->container()->get(Kernel::class);
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
$router->get('/api/users/{id}', function (Request $request, int $id): Response {
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
        private readonly \FlintPHP\Framework\Authentication\AuthenticatorInterface $authenticator
    ) {}

    public function process(Request $request, callable $next): Response
    {
        try {
            $identity = $this->authenticator->authenticate($request);
            return $next($request->withAttribute('current_user', $identity));
        } catch (\FlintPHP\Framework\Authentication\Exception\AuthenticationException $e) {
            return Response::json(['error' => $e->getMessage()])->withStatus(401);
        }
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
