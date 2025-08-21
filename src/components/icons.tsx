import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a5 5 0 0 0-5 5v1a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4v1a5 5 0 0 0 5 5h0a5 5 0 0 0 5-5v-1a4 4 0 0 0 4-4v-2a4 4 0 0 0-4-4V7a5 5 0 0 0-5-5Z" />
      <path d="M6 8.5V7a2 2 0 1 1 4 0v1.5" />
      <path d="M14 8.5V7a2 2 0 1 1 4 0v1.5" />
    </svg>
  );
}

export function ChatbotLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v-2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2" />
        <path d="M12 18h.01" />
    </svg>
  );
}
