export default function icon() {
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#faf9f5"/>
      <circle cx="16" cy="16" r="2.5" fill="#cc785c"/>
      <line x1="16" y1="4" x2="16" y2="10" stroke="#cc785c" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="16" y1="22" x2="16" y2="28" stroke="#cc785c" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="4" y1="16" x2="10" y2="16" stroke="#cc785c" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="22" y1="16" x2="28" y2="16" stroke="#cc785c" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
    {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    }
  );
}

export const size = { width: 32, height: 32 };
export const contentType = "image/svg+xml";
