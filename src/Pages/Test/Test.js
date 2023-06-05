import React, { useState } from "react";
import { animated, useSpring, to } from "@react-spring/web";

const Test = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animation, api] = useSpring(() => ({
    from: {
      transform: scrollPosition > 20 ? "translateY(0px)" : "translateY(0px)",
    },
  }));
  const opacitySetter = () => {
    if (scrollPosition >= 10 && scrollPosition <= 30) {
      return 0.8;
    } else if (scrollPosition >= 30 && scrollPosition <= 50) {
      return 0.5;
    } else if (scrollPosition >= 50 && scrollPosition <= 80) {
      return 0.2;
    } else if (scrollPosition >= 80) {
      return 0;
    } else {
      return 1;
    }
  };
  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop);
    api.start({
      to: {
        transform:
          scrollPosition > 20
            ? `translateY(${scrollPosition}px)`
            : "translateY(0px)",
        opacity: opacitySetter(),
      },
      reverse: true,
    });
  };
  return (
    <div className="test-div" onScroll={handleScroll}>
      <h1>Scroller</h1>
      <div>
        <animated.p
          style={{
            fontSize: "100px",
            ...animation,
          }}
        >
          TEXT
        </animated.p>

        <div
          style={{
            fontSize: "100px",
          }}
        >
          asddas
        </div>
        <div
          style={{
            fontSize: "100px",
          }}
        >
          asddas
        </div>
        <div
          style={{
            fontSize: "100px",
          }}
        >
          asddas
        </div>
        <div
          style={{
            fontSize: "100px",
          }}
        >
          asddas
        </div>
        <div
          style={{
            fontSize: "100px",
          }}
        >
          asddas
        </div>
      </div>
    </div>
  );
};

export default Test;
