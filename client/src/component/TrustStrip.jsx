import { Shield, Truck, RotateCcw, Headphones } from "lucide-react"

export default function TrustFeatures() {
  const features = [
    {
      icon: Shield,
      title: "PREMIUM QUALITY",
      description: "100% Quality Guarantee",
    },
    {
      icon: Truck,
      title: "SWIFT SHIPPING",
      description: "Delivering across India",
    },
    {
      icon: RotateCcw,
      title: "EASY RETURN",
      description: "Refer return policy",
    },
    {
      icon: Headphones,
      title: "24/7 SUPPORT",
      description: "Support every time",
    },
  ]

  return (
    <section className="w-full max-w-[1400px] mx-auto border rounded-xl border-border/50 mb-4 sm:mb-6 md:mb-10 mt-4 px-2 sm:px-4">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-1 divide-y sm:divide-y-0 sm:divide-x divide-border/50 sm:flex-row">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex flex-1 items-start gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
                <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 flex-shrink-0 stroke-foreground/60" />
                <div className="flex-1">
                  <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-foreground/60">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
