export function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 0.5L5.6 3.4L8.5 4L5.6 4.6L5 7.5L4.4 4.6L1.5 4L4.4 3.4L5 0.5Z"
        fill="currentColor"
      />
      <path
        d="M8 1L8.3 2.2L9.5 2.5L8.3 2.8L8 4L7.7 2.8L6.5 2.5L7.7 2.2L8 1Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}
