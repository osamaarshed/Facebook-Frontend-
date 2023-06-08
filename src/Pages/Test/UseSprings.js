import React from "react";
import { useSprings, animated } from "@react-spring/web";

// useSprings works the same way as useSpring but it is for more than one springs.
// If we want to animate multiple springs we use useSprings.

const UseSprings = () => {
  const [springs] = useSprings(3, (i) => ({
    from: {
      x: i * 100,
      background:
        i === 0 ? "yellow" : i === 1 ? "orange" : i === 2 ? "red" : "",
    },
    to: {
      x: i * 200,
    },
    delay: i * 1000,
  }));
  return (
    <>
      <h1>UseSprings</h1>
      <div className="useSpring-div-container">
        {springs.map((props, i) => (
          <animated.div className="useSprings-div" style={props}></animated.div>
        ))}
      </div>
    </>
  );
};

export default UseSprings;
