import type { SVGProps } from "react";

const Agenticai = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid">
    <circle cx="12" cy="12" r="8.5" fill="none" stroke="#14B8A6" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="2.2" fill="#14B8A6" />
    <circle cx="6.8" cy="8" r="1.2" fill="#22C55E" />
    <circle cx="17.2" cy="8" r="1.2" fill="#22C55E" />
    <circle cx="17.2" cy="16" r="1.2" fill="#22C55E" />
    <circle cx="6.8" cy="16" r="1.2" fill="#22C55E" />
    <path d="M8 8.8 10.4 10.7M16 8.8 13.6 10.7M16 15.2 13.6 13.3M8 15.2 10.4 13.3" stroke="#14B8A6" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export { Agenticai };
