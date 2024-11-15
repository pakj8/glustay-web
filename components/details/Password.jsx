import React from "react";
import { useRouter } from "next/router";
import { useHomepageGetBookingDetailsByReservationId } from "../../graphql/Booking/datasource";
import Image from "next/image";
import CloseIcon from "../../public/assets/close.png";

function Password({ isOpen, onClose, wifi, details }) {
  if (!isOpen) return null;
  console.log(details?.reservationId);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5 z-50">
      <div className="relative bg-white rounded-2xl p-6 w-80 lg:w-[360px] max-h-[75vh] overflow-y-auto">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <Image src={CloseIcon} alt="Close" width={15} height={18} />
        </button>
        <div className="flex items-center border-l-8 border-ht-100 px-4 mb-4">
          <h1 className="font-poppins text-lg font-semibold">Wifi Password</h1>
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="font-medium font-poppins text-sm space-y-2 mt-4">
            <h2 className="font-poppins font-semibold text-base">
              Seamlessly connect with WIFI
            </h2>
            <p className="font-poppins text-base">
              Password:{" "}
              <span className="font-semibold">
                {" "}
                {details?.hotelId?.wifiPassword}
              </span>
            </p>
            {wifi}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;
