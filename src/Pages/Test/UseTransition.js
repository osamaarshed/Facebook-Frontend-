import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpringRef } from "@react-spring/web";

//useTransition Hook is usually used if you have an array of data. For example in this code I
// have an array of pages on which I am applying these animations.

const pages = [
  ({ style }) => (
    <animated.div
      style={{
        ...style,
        height: "100%",
        width: "20%",
        background: "yellow",
      }}
    >
      1
    </animated.div>
  ),
  ({ style }) => (
    <animated.div
      style={{
        ...style,
        height: "100%",
        width: "20%",
        background: "orange",
      }}
    >
      2
    </animated.div>
  ),
  ({ style }) => (
    <animated.div
      style={{
        ...style,
        height: "100%",
        width: "20%",
        background: "red",
      }}
    >
      3
    </animated.div>
  ),
];
const UseTransition = () => {
  const [index, setIndex] = useState(0);
  const handleClick = () => {
    setIndex((state) => (state + 1) % 3);
  };
  const transRef = useSpringRef();
  const transition = useTransition(index, {
    ref: transRef,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-100%,0,0)" },
    config: {
      duration: 500,
    },
  });
  useEffect(() => {
    transRef.start();
  }, [index]);
  return (
    <>
      <h1>Use Transitions Hook</h1>
      <div className="useTransition-div" onClick={handleClick}>
        {transition((style, item) => {
          const Page = pages[item];
          return <Page style={style} />;
        })}
      </div>
    </>
  );
};

export default UseTransition;
