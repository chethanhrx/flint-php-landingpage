import fs from 'fs';
import path from 'path';

// Standalone Rock Symbol (Asset 1)
export const FLINT_ROCK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="none" role="img" aria-label="FlintPHP Rock Symbol">
  <defs>
    <!-- Lightning Gradient -->
    <linearGradient id="flintLightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFA133" />
      <stop offset="35%" stop-color="#FF6A00" />
      <stop offset="100%" stop-color="#E64A00" />
    </linearGradient>
    <filter id="flintGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  
  <!-- Group of Flint Shards (Color: #12151B / deep obsidian stone) -->
  <g id="flint-stone" fill="#12151B">
    <!-- L1: Top-Left Shard -->
    <polygon points="494,172 396,346 443,414 494,172" />
    
    <!-- L2: Mid-Upper-Left Shard -->
    <polygon points="390,360 376,498 450,568 444,428" />
    
    <!-- L3: Mid-Lower-Left Shard -->
    <polygon points="378,512 402,652 463,726 452,582" />
    
    <!-- L4: Bottom-Left Tip Shard -->
    <polygon points="405,668 474,822 466,738" />
    
    <!-- R1: Mid-Right Shard -->
    <polygon points="586,450 600,488 556,696 504,672 500,642 554,490" />
    
    <!-- R2: Bottom-Right Tip Shard -->
    <polygon points="508,686 552,706 488,822 482,780 488,690" />
  </g>

  <!-- Group of Lightning & Sparks (Color: vivid FlintPHP orange) -->
  <g id="flint-sparks" fill="url(#flintLightningGrad)">
    <!-- Top Floating Spark Shard -->
    <polygon points="560,202 569,234 560,264 551,234" />
    
    <!-- Upper-Right Floating Spark Shard -->
    <polygon points="606,268 625,292 615,318 599,294" />
    
    <!-- Main Lightning Bolt -->
    <polygon points="602,198 578,348 624,345 494,638 518,465 544,420 514,332" />
  </g>
</svg>`;

// Complete Logo with Wordmark (Asset 2)
export function getFlintLogoSvg(textColor = '#F5F7FA') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 680" fill="none" role="img" aria-label="FlintPHP Logo">
  <defs>
    <linearGradient id="logoLightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFA133" />
      <stop offset="40%" stop-color="#FF6A00" />
      <stop offset="100%" stop-color="#E64A00" />
    </linearGradient>
  </defs>

  <!-- Rock Symbol scaled & positioned on left -->
  <g transform="translate(-140, -160) scale(1)">
    <!-- Flint Shards -->
    <g fill="${textColor === '#F5F7FA' ? '#E4E7EB' : '#12151B'}">
      <polygon points="494,172 396,346 443,414 494,172" />
      <polygon points="390,360 376,498 450,568 444,428" />
      <polygon points="378,512 402,652 463,726 452,582" />
      <polygon points="405,668 474,822 466,738" />
      <polygon points="586,450 600,488 556,696 504,672 500,642 554,490" />
      <polygon points="508,686 552,706 488,822 482,780 488,690" />
    </g>
    <!-- Sparks -->
    <g fill="url(#logoLightningGrad)">
      <polygon points="560,202 569,234 560,264 551,234" />
      <polygon points="606,268 625,292 615,318 599,294" />
      <polygon points="602,198 578,348 624,345 494,638 518,465 544,420 514,332" />
    </g>
  </g>

  <!-- Wordmark 'FlintPHP' -->
  <text x="560" y="440" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="280" font-weight="800" letter-spacing="-0.03em" fill="${textColor}">
    Flint<tspan font-weight="900" fill="${textColor}">PHP</tspan>
  </text>
</svg>`;
}

fs.writeFileSync(path.resolve('./public/flintphp-rock.svg'), FLINT_ROCK_SVG);
fs.writeFileSync(path.resolve('./public/flintphp-logo.svg'), getFlintLogoSvg('#F5F7FA'));
fs.writeFileSync(path.resolve('./public/flintphp-logo-dark.svg'), getFlintLogoSvg('#12151B'));
fs.writeFileSync(path.resolve('./public/favicon.svg'), FLINT_ROCK_SVG);

console.log('Generated brand assets successfully');
