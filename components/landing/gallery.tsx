"use client"

import Image from "next/image"

const waifus = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-zfE5T5Yp3RkRMtNeRqJfYcE2vZRpxW.jpeg",
    alt: "WaiFusion NFT #1",
  },
  {
    id: 2,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-zfE5T5Yp3RkRMtNeRqJfYcE2vZRpxW.jpeg",
    alt: "WaiFusion NFT #2",
  },
  {
    id: 3,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-zfE5T5Yp3RkRMtNeRqJfYcE2vZRpxW.jpeg",
    alt: "WaiFusion NFT #3",
  },
  {
    id: 4,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-zfE5T5Yp3RkRMtNeRqJfYcE2vZRpxW.jpeg",
    alt: "WaiFusion NFT #4",
  },
  {
    id: 5,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-zfE5T5Yp3RkRMtNeRqJfYcE2vZRpxW.jpeg",
    alt: "WaiFusion NFT #5",
  },
  {
    id: 6,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-zfE5T5Yp3RkRMtNeRqJfYcE2vZRpxW.jpeg",
    alt: "WaiFusion NFT #6",
  },
]

export function Gallery() {
  return (
    <section id="gallery" className="border-t border-border bg-card py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 font-mono text-sm uppercase tracking-wider text-primary">Collection</p>
          <h2 className="text-balance font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            16,384 unique waifus
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Each WaiFusion is algorithmically generated with unique traits, making every piece a one-of-a-kind digital
            collectible on the Ethereum blockchain.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {waifus.map((waifu, index) => (
            <div
              key={waifu.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted transition-all duration-300 hover:scale-105 hover:border-primary/50"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <span className="font-mono text-4xl font-bold text-primary/40">#{index + 1}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-mono text-sm font-medium text-foreground">WaiFusion #{index + 1}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://opensea.io/collection/waifusion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View full collection on OpenSea
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
