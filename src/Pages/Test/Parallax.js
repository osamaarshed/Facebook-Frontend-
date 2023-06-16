import React from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const ParallaxAnimation = () => {
  const alignCenter = {
    display: "flex",
    alignItems: "center",
  };
  return (
    <>
      <h1>Parallax</h1>
      <div className="parallax-container">
        <Parallax pages={7}>
          <ParallaxLayer
            offset={0}
            style={{ ...alignCenter, justifyContent: "center" }}
          >
            <p>Scroll Down</p>
          </ParallaxLayer>
          <ParallaxLayer
            offset={1}
            style={{
              ...alignCenter,
              justifyContent: "center",
            }}
            sticky={{ start: 1, end: 6 }}
          >
            <p
              className="parallax-p"
              style={{
                height: "100%",
                marginLeft: "-30%",
              }}
            >
              O
            </p>
          </ParallaxLayer>
          <ParallaxLayer
            offset={2}
            style={{
              ...alignCenter,
              justifyContent: "center",
            }}
            sticky={{ start: 2, end: 6 }}
          >
            <p
              className="parallax-p"
              style={{
                height: "100%",
                marginLeft: "-20%",
              }}
            >
              S
            </p>
          </ParallaxLayer>
          <ParallaxLayer offset={3} sticky={{ start: 3, end: 6 }}>
            <p
              className="parallax-p"
              style={{
                marginLeft: "-10%",
                height: "100%",
              }}
            >
              A
            </p>
          </ParallaxLayer>
          <ParallaxLayer offset={4} sticky={{ start: 4, end: 6 }}>
            <p
              className="parallax-p"
              style={{
                marginLeft: "3%",
                height: "100%",
              }}
            >
              M
            </p>
          </ParallaxLayer>
          <ParallaxLayer offset={5} sticky={{ start: 5, end: 6 }}>
            <p
              className="parallax-p"
              style={{
                marginLeft: "16%",
                height: "100%",
              }}
            >
              A
            </p>
          </ParallaxLayer>
          <ParallaxLayer offset={6}>
            <p>Finish</p>
          </ParallaxLayer>
        </Parallax>
      </div>
    </>
  );
};

export default ParallaxAnimation;
