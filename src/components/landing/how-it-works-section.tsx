import { Upload, Cpu, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Content",
    description: "Upload an image, audio file, video, or paste text. We support all major formats.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analysis",
    description: "Our multi-model pipeline analyzes content using advanced AI detection algorithms.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Get Trust Score",
    description: "Receive a detailed trust score with model fingerprinting and manipulation detection.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Verify any content in three simple steps
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.step} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border md:block" />
              )}
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <step.icon className="h-7 w-7" />
              </div>
              <p className="mt-4 text-sm font-semibold text-brand">{step.step}</p>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
