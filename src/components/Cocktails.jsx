import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cocktailLists, mockTailLists } from "../../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const Cocktails = () => {
  const videoRef = useRef(null);
  useGSAP(() => {
    const video = videoRef.current;
    let duration = 0;
    const setDuration = () => {
      duration = video?.duration || 0;
    };

    if (video) {
      if (video.readyState >= 1) setDuration();
      else video.addEventListener("loadedmetadata", setDuration);
      video.pause();
    }

    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
        onUpdate: (self) => {
          if (video && duration) {
            try {
              video.currentTime = Math.min(duration, self.progress * duration);
            } catch (e) {}
          }
        },
      },
    });

    parallaxTimeline
      .from("#c-left-leaf", {
        x: -100,
        y: 100,
      })
      .from(
        "#c-right-leaf",
        {
          x: 100,
          y: 100,
        },
        "<"
      );

    return () => {
      if (video) video.removeEventListener("loadedmetadata", setDuration);
      if (parallaxTimeline.scrollTrigger) parallaxTimeline.scrollTrigger.kill();
      parallaxTimeline.kill();
    };
  });

  return (
    <section id="cocktails" className="noisy">
      <video
        ref={videoRef}
        id="cocktail-video"
        className="w-full h-auto mb-6"
        src="/videos/cocktail.mp4"
        playsInline
        muted
        preload="metadata"
      />
      <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id="c-left-leaf" />
      <img
        src="/images/cocktail-right-leaf.png"
        alt="r-leaf"
        id="c-right-leaf"
      />

      <div className="list">
        <div className="popular">
          <h2>Most popular cocktails:</h2>

          <ul>
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Most loved mocktails:</h2>

          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
