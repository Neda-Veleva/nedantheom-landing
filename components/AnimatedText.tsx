import React from 'react';

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  font?: string; // optional CSS font shorthand
  durationMs?: number; // unused, kept for compatibility
};

export default function AnimatedText({
  text,
  className,
  style,
  color,
  font,
}: AnimatedTextProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline',
        whiteSpace: 'pre-wrap',
        color: color,
        ...(font ? ({ font } as React.CSSProperties) : {}),
        ...style,
      }}
      aria-label={text}
    >
      {text}
    </span>
  );
}


