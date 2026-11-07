export default function Fantome({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 150" className={className} role="img" aria-label="Un petit fantôme souriant">
      <defs>
        <linearGradient id="fantome-corps" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFE3EE" />
        </linearGradient>
      </defs>
      <g transform="translate(8 6)">
        <path
          d="M60 8C33 8 14 29 14 56v66c0 6 6 9 11 5l11-9 12 10c3 3 8 3 11 0l11-10 11 10c3 3 8 3 11 0l12-10 11 9c5 4 11 1 11-5V56C106 29 87 8 60 8Z"
          fill="url(#fantome-corps)"
          stroke="#1B1A17"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <ellipse cx="44" cy="56" rx="8" ry="11" fill="#1B1A17" />
        <ellipse cx="76" cy="56" rx="8" ry="11" fill="#1B1A17" />
        <circle cx="47" cy="51" r="3.2" fill="#FFFFFF" />
        <circle cx="79" cy="51" r="3.2" fill="#FFFFFF" />
        <ellipse cx="30" cy="76" rx="7" ry="4.5" fill="#FF9DB8" opacity="0.75" />
        <ellipse cx="90" cy="76" rx="7" ry="4.5" fill="#FF9DB8" opacity="0.75" />
        <path d="M53 77c4 6 10 6 14 0" fill="none" stroke="#1B1A17" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M112 6l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="#FF7A45" />
      </g>
    </svg>
  );
}
