export function SpikeMark({
  className = "",
  size = 24,
  color = "currentColor",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2" fill={color} />
      <line x1="12" y1="2" x2="12" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="16" x2="12" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="12" x2="8" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
