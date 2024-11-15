import Image from "next/image";
import React, { useState } from "react";

import Profile from "../../public/assets/gluiconprofile.svg";
import Request from "../../public/assets/quote-request (1).png";
import Food from "../../public/assets/add (1).png";
import Booking from "../../public/assets/booking.png";
import Support from "../../public/assets/support.png";

function Account() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const handleProfileClick = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  return (
    <div className="fixed top-0 inset-x-0 z-10 bg-white shadow-md w-full">
      <div className="container mx-auto py-2 px-4 lg:max-w-[360px] flex items-center">
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
                <div className="flex flex-col gap-2 justify-center items-center p-2">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
