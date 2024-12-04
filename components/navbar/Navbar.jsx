import Image from "next/image";
import React, { useState } from "react";
import GluStayLogo from "../../public/assets/glustaylogo.svg";
import Profile from "../../public/assets/gluiconprofile.svg";
import Request from "../../public/assets/quote-request (1).png";
import Food from "../../public/assets/add (1).png";
import Booking from "../../public/assets/booking.png";
import Support from "../../public/assets/support.png";
import { useRouter } from "next/router";

function Navbar() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const router = useRouter();

  const handleProfileClick = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  return (
    <div className="fixed top-0 inset-x-0 z-10 bg-white shadow-md w-full">
      <div className="container mx-auto py-2 px-4 lg:max-w-[360px] flex items-center">
        {/* Logo */}
        <Image
          onClick={() =>
            router?.push(`/glustay/${sessionStorage?.getItem("reservationId")}`)
          }
          src={GluStayLogo}
          alt="GluStay Logo"
          width={1000}
          height={1000}
          className="w-auto h-10 mr-auto"
        />

        {/* Profile Icon */}
        <Image
          src={Profile}
          alt="Profile Icon"
          width={26}
          height={26}
          className="cursor-pointer ml-auto"
          onClick={handleProfileClick}
        />

        {/* Full-Screen Overlay */}
        {isAccountOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
            <div className="relative bg-white p-8 rounded-lg w-5/6 max-w-lg text-center">
              <button
                onClick={() => setIsAccountOpen(false)}
                className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-6">My Account</h2>
              <div className="grid grid-cols-3 justify-evenly mt-5">
                <div
                  onClick={() => {
                    router?.push(
                      `/glustay/profile/request?reservationId=${sessionStorage?.getItem(
                        "reservationId"
                      )}`
                    );
                    setIsAccountOpen(false);
                  }}
                  className="flex cursor-pointer flex-col gap-2 justify-center items-center p-2"
                >
                  <Image
                    src={Request}
                    alt="My Requests"
                    width={80}
                    height={80}
                    className="bg-yellow-100 p-4 rounded-lg flex flex-col items-center "
                  />
                  <p className="font-poppins font-medium text-center text-sm">
                    My Request
                  </p>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center p-2">
                  <Image
                    src={Booking}
                    alt="My Requests"
                    width={80}
                    height={80}
                    className="bg-yellow-100 p-4 rounded-lg flex flex-col items-center "
                  />
                  <p className="font-poppins font-medium text-center text-sm">
                    My Booking
                  </p>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center p-2">
                  <Image
                    src={Food}
                    alt="My Requests"
                    width={80}
                    height={80}
                    className="bg-yellow-100 p-4 rounded-lg flex flex-col items-center "
                  />
                  <p className="font-poppins font-medium text-center text-sm">
                    My Food
                  </p>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center p-2">
                  <Image
                    src={Support}
                    alt="My Requests"
                    width={80}
                    height={80}
                    className="bg-yellow-100 p-4 rounded-lg flex flex-col items-center "
                  />
                  <p className="font-poppins font-medium text-center text-sm">
                    My Support
                  </p>
                </div>
              </div>

              {/* <div className="flex flex-row gap-2">
                <div className="bg-yellow-100 p-4 rounded-lg flex flex-col items-center">
                  <Image
                    src={Request}
                    alt="My Requests"
                    width={24}
                    height={24}
                  />
                  <span className="mt-2">My Requests</span>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg flex flex-col items-center">
                  <Image
                    src={Booking}
                    alt="My Bookings"
                    width={24}
                    height={24}
                  />
                </div>
                <span className="mt-2">My Bookings</span>
              </div>
              <div className="flex flex-row gap-2 mt-4">
                <div className="bg-yellow-100 p-4 rounded-lg flex flex-col items-center">
                  <Image src={Food} alt="Food Orders" width={24} height={24} />
                  <span className="mt-2">Food Orders</span>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg flex flex-col items-center">
                  <Image src={Support} alt="Support" width={24} height={24} />
                  <span className="mt-2">Support</span>
                </div>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
