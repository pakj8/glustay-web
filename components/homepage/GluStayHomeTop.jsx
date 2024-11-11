import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useHomepageGetBookingDetailsByReservationId } from "../../graphql/Booking/datasource";

function GluStayHomeTop({ details }) {
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A"; // Return "N/A" if timestamp is missing
    const date = new Date(timestamp); // Convert timestamp to Date object
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        });
  };

  const formattedCheckinDate = formatDate(details?.checkinDate);
  const formattedCheckoutDate = formatDate(details?.checkOutDate);
  return (
    <div className="container mx-auto lg:w-[360px] mt-16">
      <div className="flex flex-col gap-3 ml-5">
        <h2 className="font-mulish text-black text-2xl font-bold">
          Ohai {details?.firstName} {details?.lastName}
        </h2>

        <p className="font-medium text-ht-59 font-poppins text-sm">
          Welcome to{" "}
          <span className="font-semibold text-gray-600">
            {details?.hotelId?.hotelName}
          </span>
        </p>
        <div className=" flex flex-col gap-3 rounded-md shadow-md">
          <div className="flex items-center bg-ht-100 py-3 px-3 rounded-t-lg">
            <p className="font-poppins font-medium text-xs ">
              Reservation ID:{" "}
              <span className="font-semibold ">{details?.reservationId}</span>
            </p>
          </div>
        </div>

        <div className="px-3 pb-3 grid grid-cols-9 shadow-2xl  ">
          <div className="flex flex-col  col-span-4">
            {" "}
            <p className=" text-xs text-ht-91 font-medium">Check in{""}</p>
            <span className="text-black font-bold font-mulish text-xs">
              {formattedCheckinDate}
            </span>
          </div>
          <div className=" h-1 col-span-1 mt-4 bg-ht-100"></div>
          <div className="flex flex-col items-end  col-span-4">
            {" "}
            <p className=" text-xs text-ht-91 font-medium">Check out {""}</p>
            <span className="text-black font-bold  text-xs">
              {formattedCheckoutDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GluStayHomeTop;
