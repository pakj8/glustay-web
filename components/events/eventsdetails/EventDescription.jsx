import React from "react";
import { useRouter } from "next/router";

function EventDescription({ description, spots, eventCount }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold font-poppins text-lg">About this event</h3>
      <p className="font-poppins font-normal text-sm text-gray-500">
        {description}
      </p>

      <div className="bg-gray-100 py-5 px-4 rounded-md">
        <div className="flex gap-2 items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>

          <p className="font-semibold font-poppins text-sm ">
            {eventCount?.getEventBookingCount} attending
          </p>

          <p className="text-gray-500 text-sm font-normal ml-auto">
            {spots - eventCount?.getEventBookingCount !== 0 ? (
              `${parseInt(spots) - eventCount?.getEventBookingCount} spots left`
            ) : (
              <span>Sold Out</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventDescription;
