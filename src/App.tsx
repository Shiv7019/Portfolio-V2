import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Work from "./components/Work";
import Focus from "./components/Focus";
import Stack from "./components/Stack";
import Signal from "./components/Signal";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen bg-void text-ink antialiased">
      <Cursor />
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Focus />
        <Marquee flip />
        <Stack />
        <Signal />
        <Contact />
      </main>
    </div>
  );
}
