import HeroSlider from "@/components/Home/HeroSlider";
import NewArrivals from "../components/NewArrival/NewArrival";
import ExtraSections from "../components/NewArrival/ExtraSections";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <HeroSlider />
      <NewArrivals/>
      <ExtraSections/>
    </main>
  );
}