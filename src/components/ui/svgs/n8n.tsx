import type { SVGProps } from "react";

const N8n = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid">
    <circle cx="6" cy="12" r="2.2" fill="#EA4B71"/>
    <circle cx="12" cy="7" r="2.2" fill="#EA4B71"/>
    <circle cx="12" cy="17" r="2.2" fill="#EA4B71"/>
    <circle cx="18" cy="12" r="2.2" fill="#EA4B71"/>
    <path d="M8 11 10 8.4M8 13l2 2.6M14 8.4 16 11M14 15.6l2-2.6" stroke="#EA4B71" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

export { N8n };
