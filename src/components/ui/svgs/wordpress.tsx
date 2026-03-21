import type { SVGProps } from "react";

const Wordpress = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid">
    <circle cx="12" cy="12" r="9" fill="#21759B" />
    <circle cx="12" cy="12" r="7.2" fill="none" stroke="#FFF" strokeWidth="1.4" />
    <path
      d="M7.2 8.1c.9 0 1.4.6 1.7 1.6l2 6.2 1.4-4.3-.7-2.1c-.2-.6-.6-1-1.1-1h2.7c-.4.2-.6.7-.4 1.3l1.7 5.2 1.2-3.7c.4-1.3.2-2.2-.4-2.8-.7-.8-1.8-1-2.6-.8 1.8-1.3 4.3-1 5.8.7 1.8 2 1.6 5-.3 6.8-2 1.8-5 1.6-6.8-.4-.8-.9-1.2-2.1-1.1-3.2"
      fill="#FFF"
    />
  </svg>
);

export { Wordpress };
