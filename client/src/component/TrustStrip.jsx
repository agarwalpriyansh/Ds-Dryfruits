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
    <section className="w-[1400px] mx-auto border rounded-xl  border-border/50 mb-10 mt-4 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1 divide-x divide-border/50 sm:flex-row">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex flex-1 items-start gap-4 px-4 py-8 sm:px-6">
                <Icon className="h-8 w-8 flex-shrink-0 stroke-foreground/60" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold tracking-wide text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-sm text-foreground/60">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
