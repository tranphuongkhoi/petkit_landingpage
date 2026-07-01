const features = [
  {
    title: "Self-cleaning support",
    body: "Automatically separates waste after use, reducing daily scooping for busy cat owners.",
  },
  {
    title: "Daily behavior logs",
    body: "App-connected records help owners follow litter-box visits, weight trends, and device status.",
  },
  {
    title: "Odor-control system",
    body: "A sealed waste bin and odor-control accessories help keep indoor spaces easier to manage.",
  },
  {
    title: "Safety-first design",
    body: "Multiple sensors pause operation when a cat is nearby or inside the litter box.",
  },
];

const specs = [
  ["Interior capacity", "76L"],
  ["Waste bin", "7L"],
  ["Operation noise", "35 dB"],
  ["Safety sensors", "11"],
  ["Cat weight range", "1.5-10 kg"],
  ["Dimensions", "620 x 538 x 552 mm"],
];

const products = [
  ["PETKIT Pura Max 2", "Smart self-cleaning litter box"],
  ["PETKIT YumShare Solo", "Smart auto-feeder with camera"],
  ["PETKIT Eversweet 7", "Smart pet water fountain"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a className="text-lg font-semibold" href="#top">
            PETKIT by HeLiCorp
          </a>
          <nav className="hidden items-center gap-7 text-sm text-neutral-600 md:flex">
            <a className="hover:text-neutral-950" href="#features">
              Features
            </a>
            <a className="hover:text-neutral-950" href="#specs">
              Specs
            </a>
            <a className="hover:text-neutral-950" href="#ecosystem">
              Ecosystem
            </a>
            <a className="hover:text-neutral-950" href="#signup">
              Sign up
            </a>
          </nav>
        </div>
      </header>

      <section
        id="top"
        className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24"
      >
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            PETKIT Pura Max 2
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-normal md:text-6xl">
            Self-cleaning litter care for modern cat homes.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Reduce daily scooping, keep odor easier to manage, and follow your
            cat&apos;s litter-box routine through app-connected daily logs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="inline-flex rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              href="#signup"
            >
              Get product updates
            </a>
            <a
              className="inline-flex rounded-md border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
              href="#features"
            >
              See how it helps
            </a>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-lg border border-neutral-200 bg-neutral-50 p-6">
            <div className="aspect-[4/3] rounded-md border border-dashed border-neutral-300 bg-white p-6">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-500">
                    Product visual placeholder
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    PETKIT Pura Max 2
                  </h2>
                </div>
                <div className="grid gap-3 text-sm text-neutral-700">
                  <div className="border-t border-neutral-200 pt-3">
                    76L interior capacity
                  </div>
                  <div className="border-t border-neutral-200 pt-3">
                    7L sealed waste bin
                  </div>
                  <div className="border-t border-neutral-200 pt-3">
                    11 safety sensors
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-neutral-500">
              Final product imagery should use optimized assets with clear alt
              text and stable dimensions.
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold">Built for daily cat care</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-lg border border-neutral-200 bg-white p-5">
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="specs" className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold">Key specifications</h2>
            <p className="mt-4 leading-7 text-neutral-600">
              Core technical details are grouped for quick review. Local
              warranty, shipping, and bundle contents should be confirmed before
              final commercial use.
            </p>
          </div>
          <dl className="grid gap-0 overflow-hidden rounded-lg border border-neutral-200 md:grid-cols-2">
            {specs.map(([label, value]) => (
              <div key={label} className="border-b border-neutral-200 p-5 last:border-b-0 md:border-r md:odd:border-r">
                <dt className="text-sm text-neutral-500">{label}</dt>
                <dd className="mt-2 text-xl font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="ecosystem" className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold">Smart Cat Care ecosystem</h2>
          <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
            Present Pura Max 2 as the hero product, then connect it with feeding
            and hydration products for a complete daily care story.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {products.map(([name, category]) => (
              <article key={name} className="rounded-lg border border-neutral-200 bg-white p-5">
                <div className="aspect-[4/3] rounded-md bg-neutral-100" />
                <h3 className="mt-5 text-lg font-semibold">{name}</h3>
                <p className="mt-2 text-sm text-neutral-600">{category}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="signup" className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 rounded-lg border border-neutral-200 p-6 md:grid-cols-[0.85fr_1.15fr] md:p-8">
          <div>
            <h2 className="text-3xl font-semibold">Get PETKIT updates</h2>
            <p className="mt-4 leading-7 text-neutral-600">
              Leave your contact details to receive product updates and launch
              information for the Smart Cat Care lineup.
            </p>
          </div>
          <form className="grid gap-4">
            <label className="grid gap-2 text-sm font-medium">
              Full name
              <input
                className="rounded-md border border-neutral-300 px-3 py-3 text-base font-normal outline-none transition focus:border-neutral-950"
                name="name"
                placeholder="Your name"
                type="text"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Email
              <input
                className="rounded-md border border-neutral-300 px-3 py-3 text-base font-normal outline-none transition focus:border-neutral-950"
                name="email"
                placeholder="you@example.com"
                type="email"
              />
            </label>
            <button
              className="rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              type="button"
            >
              Submit interest
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
