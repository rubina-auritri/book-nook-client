import { Suspense } from "react";

import HeroSlider from "@/components/Home/HeroSlider";
import NewArrivals from "../components/NewArrival/NewArrival";
import ExtraSections from "../components/NewArrival/ExtraSections";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Swiper reads the current time while rendering, so it must be
          streamed behind a <Suspense> boundary (required by Cache Components). */}
      <Suspense
        fallback={
          <div className="container mx-auto px-4 pt-6">
            <div className="h-[460px] animate-pulse rounded-3xl bg-zinc-200 md:h-[520px]" />
          </div>
        }
      >
        <HeroSlider />
      </Suspense>
      <NewArrivals/>
      <ExtraSections/>
    </main>
  );
}