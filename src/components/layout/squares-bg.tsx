"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Squares from "@/components/ui/squares";

export function SquaresBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Squares
        speed={0.3}
        squareSize={44}
        direction="diagonal"
        borderColor={isDark ? "rgba(63,63,70,0.3)" : "rgba(228,228,231,0.6)"}
        hoverFillColor={isDark ? "rgba(63,63,70,0.25)" : "rgba(228,228,231,0.5)"}
        className="pointer-events-auto"
      />
      {/* Radial fade so content stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
    </div>
  );
}
