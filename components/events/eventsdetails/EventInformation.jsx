import React from "react";
import { formatDate } from "../../../constant/constant";

function EventInformation({ name, date, time, location, price, tags }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold font-poppins text-xl">{name}</h2>

      <div className="flex gap-2 items-center">
        <div className="bg-[rgb(255,248,219)] rounded-sm p-1.5">
          <svg
            width="20"
            height="20"
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
        </div>
        <p className="font-poppins font-medium text-sm">{formatDate(date)}</p>
      </div>

      <div className="flex gap-2 items-center">
        <div className="bg-[rgb(255,248,219)] rounded-sm p-1.5">
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
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <p className="font-poppins font-normal text-sm">{time}</p>
      </div>

      <div className="flex gap-2 items-center">
        <div className="bg-[rgb(255,248,219)] rounded-sm p-1.5">
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
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <p className="font-poppins font-normal text-sm">{location}</p>
      </div>

      <div className="bg-[rgb(255,248,219)] w-fit py-1 px-2 flex items-center gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
          <path d="M13 5v2"></path>
          <path d="M13 17v2"></path>
          <path d="M13 11v2"></path>
        </svg>

        <p className="font-semibold font-poppins text-sm">
          {price === "Free" ? "Free" : `$${price}/Per Person`}
        </p>
      </div>

      <div className="flex gap-2 items-center">
        {tags?.map((tag, index) => {
          return (
            <div
              key={index}
              className=" bg-gray-200 py-1 px-2 rounded-lg w-fit text-gray-500 font-semibold text-sm"
            >
              <p>{tag}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EventInformation;
