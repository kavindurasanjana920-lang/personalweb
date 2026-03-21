import type { SVGProps } from "react";

const Pytorch = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid">
    <circle cx="12" cy="12" r="7" fill="none" stroke="#EE4C2C" strokeWidth="2.2"/>
    <circle cx="12" cy="12" r="1.8" fill="#EE4C2C"/>
    <path d="M12 2.5 7.2 7.3" stroke="#EE4C2C" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

export { Pytorch };
