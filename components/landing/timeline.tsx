const events = [
  {
    date: "March 3, 2021",
    title: "WaiFusion Minted",
    description: "16,384 unique WaiFusion NFTs were minted on Ethereum, becoming one of the first generative anime collections.",
  },
  {
    date: "March 22, 2021",
    title: "Original Team Departure",
    description: "The original creators stepped away from the project, leaving the collection's future uncertain.",
  },
  {
    date: "March 24, 2021",
    title: "Community Takeover",
    description: "WaiFusion became the first NFT project to be fully carried forward by its community, redefining decentralization.",
  },
  {
    date: "September 2021",
    title: "Kusari Stewardship",
    description: "Kusari collective took stewardship of WaiFusion, ensuring long-term vision and community governance.",
  },
]

export function Timeline() {
  return (
    <section id="timeline" className="border-t border-border bg-card py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-2 font-mono text-sm uppercase tracking-wider text-primary">History</p>
          <h2 className="text-balance font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A timeline of firsts
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            From creation to community takeover, WaiFusion has pioneered new ground in the NFT space.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-1/2 md:block" />

          <div className="space-y-8 md:space-y-12">
            {events.map((event, index) => (
              <div
                key={event.date}
                className={`relative flex flex-col gap-4 md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div
                    className={`rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/50 ${
                      index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                    } md:max-w-md`}
                  >
                    <p className="mb-1 font-mono text-sm text-primary">{event.date}</p>
                    <h3 className="mb-2 font-mono text-xl font-semibold text-foreground">{event.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-4 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background md:left-1/2 md:block" />

                {/* Spacer for opposite side */}
                <div className="hidden flex-1 md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
