import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L12 8" />
      <path d="M12 16L12 22" />
      <path d="M18 8L18 16" />
      <path d="M6 8L6 16" />
      <path d="M9 5L15 5" />
      <path d="M9 19L15 19" />
    </svg>
  );
}
