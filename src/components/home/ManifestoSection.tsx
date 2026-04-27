"use client";

import RevealMask from "@/components/ui/RevealMask";

// ─── ManifestoSection ────────────────────────────────────────────────
// Editorial brand statement + horizontal scrolling ticker.

const tickerItems = [
  "PREMIUM STREETWEAR",
  "ZERO WASTE",
  "ON DEMAND",
  "NO COMPROMISES",
  "BRUTALIST DARK",
  "DROP CULTURE",
  "WEAR THE VOID",
  "LIMITED RUNS",
];

// Doubled for seamless loop
const allItems = [...tickerItems, ...tickerItems];

export default function ManifestoSection() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-10 bg-void" aria-label="Brand Manifesto">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — Label */}
          <div>
            <RevealMask direction="left">
              <p
                className="text-digital text-[10px] tracking-[0.6em] font-mono mb-8"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                SYS_VERSION // 1.0.90
              </p>
            </RevealMask>

            <RevealMask delay={0.1}>
              <h2
                className="text-bone font-mono font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                Retro Future.
                <br />
                <span className="text-digital">Digital Souls.</span>
              </h2>
            </RevealMask>

            <RevealMask delay={0.2} className="mt-8">
              <div
                className="w-12 h-px bg-digital"
                aria-hidden
              />
            </RevealMask>
          </div>

          {/* Right — Body Text */}
          <div className="md:pt-24">
            <RevealMask delay={0.15}>
              <p
                className="text-mist font-mono text-sm leading-8 tracking-wide"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                NinetyWear exists outside the seasonal calendar.
                No collections. No previews. No gatekeeping.
                Only drops — released without warning, crafted on demand,
                worn by those who don&apos;t follow trends.
                <br /><br />
                Every piece is printed only when you order it.
                Zero inventory. Zero waste. Full intent.
              </p>
            </RevealMask>

            <RevealMask delay={0.25} className="mt-10">
              <div className="flex gap-12">
                {[
                  { number: "90s", label: "CULTURE" },
                  { number: "16bit", label: "SOUL" },
                  { number: "∞", label: "LIVES" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="text-bone text-4xl font-mono font-bold"
                      style={{ fontFamily: "var(--font-space-mono)" }}
                    >
                      {stat.number}
                    </p>
                    <p
                      className="text-digital text-[9px] tracking-[0.4em] font-mono mt-1"
                      style={{ fontFamily: "var(--font-space-mono)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealMask>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="mt-20 md:mt-32 border-y border-ash py-4 overflow-hidden">
        <div className="ticker-track">
          {allItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-8 px-8 shrink-0"
            >
              <span
                className="text-bone text-sm tracking-[0.4em] font-mono whitespace-nowrap"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {item}
              </span>
              <span className="text-digital text-xs" aria-hidden>✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
