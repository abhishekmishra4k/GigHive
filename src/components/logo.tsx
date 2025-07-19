import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="40"
      height="40"
      aria-label="Gighive Lite Logo"
      {...props}
    >
      <defs>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g transform="translate(10, 10)">
        <path 
          d="M120,90 A60,60 0 1,1 60,30" 
          fill="none" 
          stroke="url(#gold-gradient)" 
          strokeWidth="20" 
          strokeLinecap="round"
        />
        <path 
          d="M120,90 L120,150 L60,150" 
          fill="none" 
          stroke="url(#gold-gradient)" 
          strokeWidth="20" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M120,90 L160,50 M120,90 L160,130" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="12" 
          strokeLinecap="round" 
          transform="translate(-10, 0)"
          className="text-foreground/80"
        />
      </g>
    </svg>
  );
}
