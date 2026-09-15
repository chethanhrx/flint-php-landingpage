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
    new App\\Bootstrappers\\DatabaseBootstrapper(),
    new App\\Bootstrappers\\RouteBootstrapper(),
]);

// Build HTTP request from PHP globals
$request = Request::fromGlobals();

// Process through explicit HTTP Kernel
$kernel = $app->container()->get(Kernel::class);
$response = $kernel->handle($request);

// Send response headers and body
$response->send();
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
    description: 'Typed handler parameter resolved by reflection-assisted dispatch.',
    code: `<?php

declare(strict_types=1);

use FlintPHP\\Framework\\Routing\\Router;
use FlintPHP\\Framework\\Http\\Response;
use FlintPHP\\Framework\\Http\\Request;

/** @var Router $router */

// Typed handler parameter resolved by reflection-assisted dispatch.
$router->get('/api/users/{id}', function (Request $request, int $id): Response {
    return Response::json([
        'user_id' => $id,
        'requested_at' => (new DateTimeImmutable())->format(DATE_ATOM),
    ]);
}, 'users.show');
`,
  },
  {
    id: 'controller',
    title: 'Controller',
    category: 'Application',
    filename: 'src/Controllers/UserController.php',
    description: 'Action-based controller with explicit constructor dependency injection.',
    code: `<?php

declare(strict_types=1);

namespace App\\Controllers;

use App\\Domain\\UserRepository;
use FlintPHP\\Framework\\Http\\Response;
use FlintPHP\\Framework\\Http\\Request;

final class UserController
{
    public function __construct(
        private readonly UserRepository $users
    ) {}

    public function show(Request $request, int $id): Response
    {
        $user = $this->users->find($id);

        if (!$user) {
            return new Response('Not Found', 404);
        }

        return Response::json(['data' => $user]);
    }
}
`,
  },
  {
    id: 'authentication',
    title: 'Authentication Middleware',
    category: 'Security',
    filename: 'src/Middleware/AuthMiddleware.php',
    description: 'Explicit dependency injection of the authenticator, catching strictly typed exceptions.',
    code: `<?php

declare(strict_types=1);

namespace App\\Middleware;

use FlintPHP\\Framework\\Middleware\\MiddlewareInterface;
use FlintPHP\\Framework\\Authentication\\AuthenticatorInterface;
use FlintPHP\\Framework\\Authentication\\Exception\\AuthenticationException;
use FlintPHP\\Framework\\Http\\Request;
use FlintPHP\\Framework\\Http\\Response;

final class AuthMiddleware implements MiddlewareInterface
{
    public function __construct(
        private readonly AuthenticatorInterface $authenticator
    ) {}

    public function process(Request $request, callable $next): Response
    {
        try {
            // Explicit boundary: validates bearer token
            $identity = $this->authenticator->authenticate($request);
            
            // Pass the identity down the pipeline safely
            return $next($request->withAttribute('user', $identity));
        } catch (AuthenticationException $e) {
            return Response::json(['error' => 'Unauthorized'])->withStatus(401);
        }
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
            ['id' => 1, 'title' => 'Building Fast APIs', 'slug' => 'building-fast-apis'],
        ];

        return Response::json([
            'data' => $articles,
            'meta' => [
                'current_page' => $page,
                'per_page' => 20,
            ]
        ], status: 200, headers: [
            'Cache-Control' => 'public, max-age=60',
        ]);
    }
}
`,
  },
];
