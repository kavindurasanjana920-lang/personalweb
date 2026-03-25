import { Apple, Play } from "lucide-react";


export default function ContactSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm sm:p-8 md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.1),transparent_45%)]" />

      <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="mx-auto sm:mx-0">
          <div className="relative h-32 w-20 rounded-[1.4rem] border-2 border-emerald-600 bg-gradient-to-b from-emerald-50 to-emerald-100 p-1 dark:from-emerald-950/40 dark:to-emerald-900/40">
            <div className="mb-1 flex h-4 items-center justify-center rounded-full bg-emerald-500/90" />
            <div className="space-y-1 rounded-xl bg-background p-1.5">
              <div className="h-2 w-10 rounded bg-emerald-500/70" />
              <div className="grid grid-cols-3 gap-1">
                <div className="h-3 rounded bg-emerald-200 dark:bg-emerald-700/60" />
                <div className="h-3 rounded bg-emerald-100 dark:bg-emerald-800/60" />
                <div className="h-3 rounded bg-emerald-50 dark:bg-emerald-900/60" />
              </div>
              <div className="h-6 rounded bg-emerald-500" />
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-1.5 rounded bg-emerald-100 dark:bg-emerald-800/60"
                  />
                ))}
              </div>
            </div>
            <div className="absolute -left-7 top-5 h-6 w-8 rounded-l-full bg-emerald-300/80 dark:bg-emerald-600/60" />
            <div className="absolute -left-7 top-14 h-6 w-8 rounded-l-full bg-emerald-200/90 dark:bg-emerald-700/60" />
          </div>
        </div>

        <div className="flex flex-col gap-3 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            TrackMate App
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Track every parcel with the TrackMate app
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Get real-time parcel updates, delivery milestones, and courier status in one simple tracking app.
          </p>

          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href="#"
              aria-label="Download on the App Store"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-black bg-black px-3 py-2 text-left text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Apple className="h-5 w-5" aria-hidden="true" />
              <span className="leading-tight">
                <span className="block text-[10px]">Download on the</span>
                <span className="block text-base font-semibold">App Store</span>
              </span>
            </a>

            <a
              href="#"
              aria-label="Get it on Google Play"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-black bg-black px-3 py-2 text-left text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Play className="h-5 w-5 fill-current" aria-hidden="true" />
              <span className="leading-tight">
                <span className="block text-[10px]">GET IT ON</span>
                <span className="block text-base font-semibold">Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

