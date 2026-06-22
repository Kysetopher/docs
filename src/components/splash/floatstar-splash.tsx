"use client";

import * as React from "react";
import { createSplashPalette } from "@/lib/splash/color";
import { buildStarPoints } from "@/lib/splash/geometry";

function svgNumber(value: number) {
  return value.toFixed(3);
}

export function FloatstarSplash({ color = "#38bdf8" }: { color?: string }) {
  const uid = React.useId().replace(/:/g, "");
  const stars = React.useMemo(() => buildStarPoints(121, 90), []);
  const links = stars.slice(0, 24);
  const palette = React.useMemo(() => createSplashPalette(color), [color]);

  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${uid}-sky`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`rgb(${palette.deep})`} />
            <stop offset="52%" stopColor={`rgb(${palette.shadow})`} />
            <stop offset="100%" stopColor={`rgb(${palette.surface})`} />
          </linearGradient>
          <radialGradient id={`${uid}-stars`} cx="50%" cy="42%" r="72%">
            <stop offset="0%" stopColor={`rgb(${palette.soft})`} stopOpacity="0.14" />
            <stop offset="42%" stopColor={`rgb(${palette.primary})`} stopOpacity="0.06" />
            <stop offset="100%" stopColor={`rgb(${palette.deep})`} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${uid}-sky)`} />
        <rect width="100" height="100" fill={`url(#${uid}-stars)`} />
        <g opacity="0.9">
          {links.map((point, index) => {
            const next = links[(index + 7) % links.length];
            return (
              <line
                key={`starfield-line-${index}`}
                x1={svgNumber(point.x)}
                y1={svgNumber(point.y)}
                x2={svgNumber(next.x)}
                y2={svgNumber(next.y)}
                stroke={`rgba(${palette.highlight},0.18)`}
                strokeWidth="0.18"
                strokeLinecap="round"
                strokeDasharray="0.4 1.4"
                opacity="0.5"
              />
            );
          })}
        </g>
        {stars.map((point, index) => (
          <g
            key={`starfield-star-${index}`}
            style={{ animation: `sparkTwinkle ${point.period}s linear ${-point.delay}s infinite` }}
          >
            <circle
              cx={svgNumber(point.x)}
              cy={svgNumber(point.y)}
              r={svgNumber(point.r * 1.8)}
              fill={`rgba(${palette.soft},0.12)`}
            />
            <circle
              cx={svgNumber(point.x)}
              cy={svgNumber(point.y)}
              r={svgNumber(point.r)}
              fill={`rgb(${palette.highlight})`}
              opacity={svgNumber(point.peak)}
            />
          </g>
        ))}
        <style>{`
          @keyframes sparkTwinkle {
            0%, 100% { opacity: 0.08; transform: scale(0.96); }
            18% { opacity: 0.95; transform: scale(1); }
            42% { opacity: 0.35; transform: scale(0.99); }
            68% { opacity: 0.8; transform: scale(1.03); }
          }
        `}</style>
      </svg>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(${palette.highlight},0.03), rgba(${palette.deep},0) 70%)`,
        }}
      />
    </div>
  );
}
