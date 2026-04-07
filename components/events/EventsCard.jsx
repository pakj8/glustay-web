import Image from "next/image";
import React from "react";
import { formatDate } from "../../constant/constant";
import { useRouter } from "next/router";

function EventsCard({ event }) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router?.push(
          `/glustay/events/event?hotelId=${event?.hotelId?._id}?eventId=${event?._id}`
        );
      }}
      className="p-3 border w-full rounded-lg  transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-sm hover:shadow-[#ffe700]"
    >
      <div className="grid grid-cols-6 gap-3 h-full">
        <div className="col-span-2 h-full">
          <Image
            src={event?.imageUrl}
            alt={event?.name}
            width={1000}
            height={1000}
            className="rounded-lg h-full w-full"
            objectFit="cover"
          />
        </div>

        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <div className="bg-[rgb(255,248,219)] py-0.5 px-2 w-fit rounded-md">
              <p className="text-[rgb(184,150,12)] text-xs">
                {event?.category}
              </p>
            </div>

            <h3 className="font-semibold text-sm">{event?.name}</h3>

            <div
              style={{ color: "rgb(136, 136, 136)" }}
              className="flex gap-1 items-center"
            >
              <svg
                height="20"
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>

              <p className="text-sm">{formatDate(event?.date)}</p>
            </div>
            <div className="flex items-center">
              <p style={{ color: "rgb(136, 136, 136)" }} className="text-xs">
                18/25 Attending
              </p>

              <div className="bg-[#ffe700] py-0.5 px-2 w-fit rounded-md ml-auto">
                <p className="text-xs font-semibold">
                  ${event?.pricePerPerson}/Person
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsCard;
