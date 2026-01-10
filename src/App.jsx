import Navbar from "./components/Navbar";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";

gsap.registerPlugin;

const App = () => {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Cocktails />
    </main>
  );
};

export default App;
