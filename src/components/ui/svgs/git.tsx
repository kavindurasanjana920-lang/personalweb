import type { SVGProps } from "react";

const Git = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid">
    <path d="M12 2.8 21.2 12 12 21.2 2.8 12Z" fill="#F05032"/>
    <circle cx="9" cy="9" r="1.3" fill="#FFF"/>
    <circle cx="15" cy="15" r="1.3" fill="#FFF"/>
    <circle cx="12" cy="12" r="1.3" fill="#FFF"/>
    <path d="M9 9v3l3 3" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export { Git };
