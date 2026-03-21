import type { SVGProps } from "react";

const Huggingface = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid">
    <circle cx="12" cy="12" r="9" fill="#FFD54F"/>
    <circle cx="9" cy="10" r="1" fill="#5D4037"/>
    <circle cx="15" cy="10" r="1" fill="#5D4037"/>
    <path d="M8.2 13.6c.8 1.6 2.2 2.4 3.8 2.4 1.6 0 3-.8 3.8-2.4" fill="none" stroke="#5D4037" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

export { Huggingface };
