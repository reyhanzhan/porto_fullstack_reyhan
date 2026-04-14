"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Squares from "@/components/ui/squares";

export function SquaresBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Squares
        speed={0.3}
        squareSize={44}
        direction="diagonal"
        borderColor={isDark ? "rgba(129,140,248,0.08)" : "rgba(99,102,241,0.06)"}
        hoverFillColor={isDark ? "rgba(129,140,248,0.08)" : "rgba(99,102,241,0.06)"}
        className="pointer-events-auto"
      />
      {/* Radial fade so content stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.06),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(129,140,248,0.04),transparent)]" />
      <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/80 to-background" />
    </div>
  );
}
