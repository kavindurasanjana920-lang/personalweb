import { Apple, Play } from "lucide-react";
import Image from "next/image";
import appMockup from "../../../public/app-screens/app-mockup.png";


export default function ContactSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.08),transparent_50%)]" />

      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">

        {/* App mockup image */}
        <div className="relative mx-auto w-48 shrink-0 sm:mx-0 sm:w-56">
          <Image
            src={appMockup}
            alt="TrackMate app screens"
            width={420}
            height={380}
            className="w-full object-contain drop-shadow-2xl"
            unoptimized
          />
        </div>

        {/* Text + buttons */}
        <div className="flex flex-col gap-2.5 text-center sm:text-left">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            TrackMate App
          </p>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Track every parcel with the TrackMate app
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time parcel updates, delivery milestones, and courier status — all in one app.
          </p>

          <div className="mt-1 flex flex-wrap justify-center gap-2.5 sm:justify-start">
            <a
              href="https://apps.apple.com/ua/app/trackmate/id6754271406"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-black bg-black px-3 py-2 text-left text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Apple className="h-4 w-4" aria-hidden="true" />
              <span className="leading-tight">
                <span className="block text-[9px]">Download on the</span>
                <span className="block text-sm font-semibold">App Store</span>
              </span>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.parallax.storemate_oms"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-black bg-black px-3 py-2 text-left text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              <span className="leading-tight">
                <span className="block text-[9px]">Get it on</span>
                <span className="block text-sm font-semibold">Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
