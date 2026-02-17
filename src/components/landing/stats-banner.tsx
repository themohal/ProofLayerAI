"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 2500000, label: "Scans Completed", suffix: "+" },
  { value: 99.2, label: "Accuracy Rate", suffix: "%" },
  { value: 15000, label: "Active Users", suffix: "+" },
  { value: 150, label: "Enterprise Clients", suffix: "+" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
    return n % 1 === 0 ? n.toString() : n.toFixed(1);
  };

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-bold md:text-4xl">
        {formatNumber(count)}{suffix}
      </p>
    </div>
  );
}

export function StatsBanner() {
  return (
    <section className="border-y bg-brand text-brand-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="mt-1 text-sm opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
