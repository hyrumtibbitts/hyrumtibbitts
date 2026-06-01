import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Thesis from "./components/Thesis";
import Focus from "./components/Focus";
import Approach from "./components/Approach";
import Portfolio from "./components/Portfolio";
import Team from "./components/Team";
import Pitch from "./components/Pitch";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Thesis />
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
