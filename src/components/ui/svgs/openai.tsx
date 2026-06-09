import type { SVGProps } from "react";

const Openai = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid">
    <circle cx="12" cy="12" r="3.2" fill="none" stroke="#10A37F" strokeWidth="2"/>
    <path d="M12 3.2 15 4.9l.1 3.4 2.9 1.7 2.9-1.7M12 3.2 9 4.9l-.1 3.4L6 10l-2.9-1.7M12 20.8 9 19.1l-.1-3.4L6 14l-2.9 1.7M12 20.8l3-1.7.1-3.4L18 14l2.9 1.7" fill="none" stroke="#10A37F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export { Openai };
