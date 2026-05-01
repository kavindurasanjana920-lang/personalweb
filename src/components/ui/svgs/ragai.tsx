import type { SVGProps } from "react";

const Ragai = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid">
    <rect x="4" y="4" width="16" height="16" rx="2.5" fill="none" stroke="#7C3AED" strokeWidth="1.8"/>
    <path d="M8 9h8M8 12h6M8 15h4" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M17.5 5.5v3M16 7h3" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

export { Ragai };
