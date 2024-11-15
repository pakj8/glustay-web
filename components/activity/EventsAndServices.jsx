import React from "react";
import Image from "next/image";
import Texture from "../../public/assets/texture.svg";
import Checkin from "../../public/assets/contactless.svg";
import Request from "../../public/assets/request.svg";
import Food from "../../public/assets/orderfood.webp";
import Addons from "../../public/assets/addons.webp";
import Checkout from "../../public/assets/checkout.webp";
import Rentals from "../../public/assets/Rentalstransfers.webp";
import Merchandise from "../../public/assets/Merchandise.webp";
import RaiseComp from "../../public/assets/raisecomplaint.svg";
import Events from "../../public/assets/events.png";

function EventsAndServices() {
  return (
    <div className="container mx-auto px-5 mt-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center">
          <h1 className="font-poppins text-xl font-semibold text-black">
            Events & Services
          </h1>
          <Image
            src={Texture}
            alt="tophead"
            width={50}
            height={50}
            loading="lazy"
            className="ml-auto"
          />
        </div>
        <div>
          {" "}
          <p className="font-poppins text-xs font-medium text-ht-91">
            Get all your needs sorted at the click of a button
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex flex-col gap-3">
            <Image
              src={Checkin}
              alt="tophead"
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full h-full rounded-lg cursor-pointer"
            />
            <Image
              src={Request}
              alt="tophead"
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full h-full rounded-lg cursor-pointer"
            />
            <Image
              src={Food}
              alt="tophead"
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full h-full rounded-lg cursor-pointer"
            />
            <Image
              src={Addons}
              alt="tophead"
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full h-full rounded-lg cursor-pointer"
            />
            <Image
              src={Checkout}
              alt="tophead"
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full h-full rounded-lg cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Image
              src={Rentals}
              alt="tophead"
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full h-full rounded-lg cursor-pointer"
            />
            <Image
              src={RaiseComp}
              alt="tophead"
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full h-full rounded-lg cursor-pointer"
            />

            <Image
              src={Events}
              alt="tophead"
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full h-full rounded-lg cursor-pointer"
            />
            <Image
              src={Merchandise}
              alt="tophead"
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full h-full rounded-lg cursor-pointer"
            />
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-xl font-poppins font-semibold">
            That&apos;s it Folks !
          </h1>
        </div>
      </div>
    </div>
  );
}

export default EventsAndServices;
