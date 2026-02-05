import { Card, CardContent } from "@/components/ui/card"
import { Users, Sparkles, Shield, Heart } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Community-Owned",
    description:
      "After the original team stepped away, the community took over stewardship, becoming the first NFT project to be fully community-run.",
  },
  {
    icon: Sparkles,
    title: "First of Its Kind",
    description:
      "WaiFusion was the first generative anime collection on Ethereum, pioneering the space for thousands of projects that followed.",
  },
  {
    icon: Shield,
    title: "Kusari Stewardship",
    description:
      "In 2021, Kusari took stewardship of WaiFusion, ensuring the collection's continuity and evolution under community governance.",
  },
  {
    icon: Heart,
    title: "Cultural Legacy",
    description:
      "More than just art, WaiFusion represents a monumental moment in Web3 history where community proved stronger than centralized teams.",
  },
]

export function Story() {
  return (
    <section id="story" className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-2 font-mono text-sm uppercase tracking-wider text-primary">Our Story</p>
            <h2 className="text-balance font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What is WaiFusion?
            </h2>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                WaiFusion is the earliest generative anime collection in Web3, consisting of 16,384 unique NFTs on
                Ethereum. Created shortly after Hashmasks in March 2021, it pioneered the generative PFP movement.
              </p>
              <p>
                After the original team stepped away, WaiFusion evolved into a community-governed effort. Today, each
                WaiFu exists as both digital art and a symbol of decentralization.
              </p>
              <p>
                It's not just an NFT collection. It's a monumental moment in Web3 and NFT history, proving that
                communities can preserve, evolve, and own their culture without relying on centralized creators.
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 font-mono text-sm uppercase tracking-wider text-primary">The Collective</p>
            <h2 className="text-balance font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              About Kusari
            </h2>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Kusari is a creative collective and onchain platform dedicated to building a positive future for
                decentralized culture. Through collaboration with artists and communities around the world, Kusari
                creates, curates, and sustains crypto-native art projects.
              </p>
              <p>
                In 2021, the current founders of Kusari took stewardship of WaiFusion, ensuring the collection's
                continuity and evolution. Today, WaiFusion lives under the Kusari family umbrella, shaped by
                collaboration, community, and a long-term vision for onchain art.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card/50">
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-mono text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
