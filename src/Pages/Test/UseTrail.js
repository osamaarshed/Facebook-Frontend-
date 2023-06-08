import { useTrail, animated } from "@react-spring/web";
import React, { useState } from "react";

const UseTrail = () => {
  const [clicked, setClicked] = useState(false);
  const name = ["O", "S", "A", "M", "A"];
  const [trail, api] = useTrail(name.length, () => ({
    x: 0,
    rotateY: 0,
    color: "black",
    opacity: 0.5,
  }));
  const handleClick = () => {
    setClicked(!clicked);
    api.start({
      x: clicked ? 100 : 0,
      rotateY: clicked ? 180 : 0,
      color: clicked ? "red" : "black",
      opacity: clicked ? 1 : 0.5,
    });
  };
  return (
    <>
      <h1>UseTrail</h1>
      <div className="useTrail-container" onClick={handleClick}>
        {trail.map((props, i) => (
          <animated.div className="useTrail-innerdiv" style={props}>
            {name[i]}
          </animated.div>
        ))}
      </div>
    </>
  );
};

export default UseTrail;
