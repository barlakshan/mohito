import Navbar from "./components/Navbar";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin;

const App = () => {
  return (
    <main>
      <Navbar />
    </main>
  );
};

export default App;
