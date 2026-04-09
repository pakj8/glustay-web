import Image from "next/image";
import React from "react";

function EventsTopImage({ image, category, name }) {
  return (
    <div className="relative">
      <Image
        src={image}
        alt={name}
        width={1000}
        height={1000}
        loading="lazy"
        objectFit="cover"
        className="w-full h-full rounded-lg"
      />
      <div className="absolute top-4 left-4">
        <div className="rounded-lg py-0.5 px-1 bg-[#ffe700]">
          <p className="font-semibold font-poppins text-sm">{category}</p>
        </div>
      </div>
    </div>
  );
}

export default EventsTopImage;
