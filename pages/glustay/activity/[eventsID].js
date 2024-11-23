import React, { useState } from "react";
import Image from "next/image";
import Sitting from "../../../public/assets/sitting.svg";
import Arrow from "../../../public/assets/back.png";

function Index() {
  const [activeButton, setActiveButton] = useState("ALL");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="container mx-auto mt-20 flex flex-col p-5 items-center">
      <div className="grid grid-cols-10 px-5">
        <div className="col-span-1">
          <Image
            src={Arrow}
            alt="sitting"
            width={20}
            height={20}
            loading="lazy"
          />
        </div>
        <div className="col-span-8 flex flex-col gap-2">
          <h1 className="text-center font-poppins text-xl font-bold">
            Events & Activities
          </h1>
          <p className="font-poppins text-ht-91 text-xs text-center text-gray-500">
            Explore all happening events & activities in less than 3 clicks
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-7 mt-3 px-5">
        {["ALL", "Free", "Paid"].map((buttonName) => (
          <button
            key={buttonName}
            className={`border border-ht-100 rounded-md font-poppins uppercase py-1 px-5 font-semibold ${
              activeButton === buttonName
                ? "bg-transparent text-gray-700"
                : "bg-ht-100"
            }`}
            onClick={() => handleButtonClick(buttonName)}
          >
            {buttonName}
          </button>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-poppins mt-4 px-5 text-ht-91 font-medium text-xs text-center text-gray-500">
          There are no scheduled activities/events for your stay duration.
        </p>
        <div className="mt-8">
          <Image
            src={Sitting}
            alt="sitting"
            width={1000}
            height={1000}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default Index;
