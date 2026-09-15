/**
 * Exact geometric definition of the official FlintPHP Rock symbol (Asset 1).
 * Preserves the exact silhouette, fractures, and lightning geometry from the official brand assets.
 */

export interface Point2D {
  x: number;
  y: number;
}

// 1000x1000 reference coordinate points matching the official brand asset
export const RAW_SHARDS = {
  // Left side rock facets
  L1: [
    { x: 494, y: 172 },
    { x: 396, y: 346 },
    { x: 443, y: 414 },
    { x: 494, y: 172 },
  ],
  L2: [
    { x: 390, y: 360 },
    { x: 376, y: 498 },
    { x: 450, y: 568 },
    { x: 444, y: 428 },
  ],
  L3: [
    { x: 378, y: 512 },
    { x: 402, y: 652 },
    { x: 463, y: 726 },
    { x: 452, y: 582 },
  ],
  L4: [
    { x: 405, y: 668 },
    { x: 474, y: 822 },
    { x: 466, y: 738 },
  ],
  // Right side rock shards
  R1: [
    { x: 586, y: 450 },
    { x: 600, y: 488 },
    { x: 556, y: 696 },
    { x: 504, y: 672 },
    { x: 500, y: 642 },
    { x: 554, y: 490 },
  ],
  R2: [
    { x: 508, y: 686 },
    { x: 552, y: 706 },
    { x: 488, y: 822 },
    { x: 482, y: 780 },
    { x: 488, y: 690 },
  ],
  // Spark / Lightning parts
  sparkTop: [
    { x: 560, y: 202 },
    { x: 569, y: 234 },
    { x: 560, y: 264 },
    { x: 551, y: 234 },
  ],
  sparkRight: [
    { x: 606, y: 268 },
    { x: 625, y: 292 },
    { x: 615, y: 318 },
    { x: 599, y: 294 },
  ],
  lightning: [
    { x: 602, y: 198 },
    { x: 578, y: 348 },
    { x: 624, y: 345 },
    { x: 494, y: 638 },
    { x: 518, y: 465 },
    { x: 544, y: 420 },
    { x: 514, y: 332 },
  ],
};

const CENTER_X = 492;
const CENTER_Y = 497;
const SCALE = 0.0062;

export function to3DPoints(points: Point2D[]): [number, number][] {
  return points.map((p) => [
    (p.x - CENTER_X) * SCALE,
    -(p.y - CENTER_Y) * SCALE, // Invert Y for 3D coordinate space
  ]);
}
