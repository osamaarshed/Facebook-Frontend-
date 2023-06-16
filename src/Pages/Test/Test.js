import React from "react";
import { animated, useScroll, useSpring } from "@react-spring/web";

//useScroll Hook is used if you want animation onScroll. You can also get the value of scrollPosition
// from useScroll Hook and on the basis of scroll position you can perform animations you want.

const Test = () => {
  const { scrollYProgress } = useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      api.start({
        to: {
          transform:
            scrollYProgress > 0
              ? `translate3d(0px, ${scrollYProgress * 150}vh, 0px) scale3d(${
                  1 - scrollYProgress
                }, ${1 - scrollYProgress}, 1)`
              : "translate3d(0px,0vh,0px) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
          opacity:
            // scrollYProgress > 0 ? 1 - scrollYProgress : 1 - scrollYProgress,
            1 - scrollYProgress,
        },
        reverse: true,
      });
    },
  });
  const [animation, api] = useSpring(() => ({
    from: {
      transform:
        scrollYProgress > 0
          ? "translate3d(0px,0vh,0px) scale3d(1, 1, 1)"
          : "translate3d(0px,0vh,0px) scale3d(1, 1, 1)",
      // opacity: scrollYProgress > 0 ? 1 - scrollYProgress : 1 - scrollYProgress,
      opacity: 1 - scrollYProgress,
    },
  }));

  return (
    <div className="test-div">
      <h1>useScroll Hook</h1>
      <div>
        <animated.div
          style={{
            willChange: `transform, opacity`,
            fontSize: "100px",
            ...animation,
          }}
        >
          <p>TEXT</p>
        </animated.div>

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
