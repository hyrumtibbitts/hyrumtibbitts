import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Marquee from "./components/Marquee";
import Thesis from "./components/Thesis";
import Focus from "./components/Focus";
import Approach from "./components/Approach";
import Portfolio from "./components/Portfolio";
import Team from "./components/Team";
import Pitch from "./components/Pitch";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Thesis />
        <Marquee />
        <Focus />
        <Approach />
        <Portfolio />
        <Team />
        <Pitch />
      </main>
      <Footer />
    </div>
  );
}
