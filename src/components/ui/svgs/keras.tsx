import type { SVGProps } from "react";

const Keras = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid">
    <rect x="2.5" y="2.5" width="19" height="19" rx="2.5" fill="#D00000"/>
    <path d="M8 7v10M8 12l7-5M8 12l7 5" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export { Keras };
