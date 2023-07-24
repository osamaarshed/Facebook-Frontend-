import React from "react";
import { Card, Button } from "flowbite-react";

const RandomCard = () => {
  let arr = [1, 2, 3];
  return (
    <>
      <div className="mx-10 my-10 grid lg:grid-cols-3 gap-10 md:grid-cols-2 sm:grid-cols-1">
        {arr.map(() => {
          return (
            <>
              <Card
                imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
                imgSrc="https://random.imagecdn.app/500/500"
              >
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  <p>
                    Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                  </p>
                </h5>
                <div className="mb-5 mt-2.5 flex items-center">
                  <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                    <p>5.0</p>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    $599
                  </span>

                  <Button color="dark">Add To Cart</Button>
                </div>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
};

// "https://random.imagecdn.app/500/500"

export default RandomCard;
