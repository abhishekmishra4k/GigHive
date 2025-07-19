import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="40"
      height="40"
      aria-label="GigHive Logo"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#logoGradient)"
        d="M165.4,243.3c-15.9,0-31.2-5.4-43.4-15.4L58.5,178c-12.3-10-19.9-25.2-19.9-42c0-16.8,7.6-32,19.9-42l63.5-49.9 c12.2-10,27.5-15.4,43.4-15.4c33.4,0,60.5,27.1,60.5,60.5v88.8C225.9,216.2,198.8,243.3,165.4,243.3z M128,55.3 c-11.8,0-23,4.4-31.9,12.3L32.6,117.5c-9,7.9-14.7,18.8-14.7,30.5c0,11.7,5.7,22.6,14.7,30.5l63.5,49.9 c8.9,7.9,20.1,12.3,31.9,12.3c22.4,0,40.5-18.2,40.5-40.5V95.8C168.5,73.4,150.4,55.3,128,55.3z"
      />
      <path
        fill="hsl(var(--background))"
        d="M128,65.3c-16.8,0-30.5,13.6-30.5,30.5v64.4c0,16.8,13.6,30.5,30.5,30.5c16.8,0,30.5-13.6,30.5-30.5V95.8 C158.5,78.9,144.8,65.3,128,65.3z"
      />
    </svg>
  );
}
