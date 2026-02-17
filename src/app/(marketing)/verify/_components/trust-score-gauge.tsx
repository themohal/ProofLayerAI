"use client";

interface TrustScoreGaugeProps {
  score: number;
  size?: number;
}

export function TrustScoreGauge({ score, size = 140 }: TrustScoreGaugeProps) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const center = size / 2;

  // Color based on score
  const getColor = (s: number) => {
    if (s >= 70) return "hsl(142 76% 36%)"; // trust-high (green)
    if (s >= 40) return "hsl(45 93% 47%)";  // trust-medium (yellow)
    return "hsl(0 84% 60%)";                 // trust-low (red)
  };

  const color = getColor(score);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/30"
        />
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold" style={{ color }}>
          {Math.round(score)}
        </span>
        <span className="text-xs text-muted-foreground">Trust Score</span>
      </div>
    </div>
  );
}
