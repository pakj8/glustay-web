import Image from "next/image";
import React from "react";
import GluStayLogo from "../../public/assets/glustaylogo.svg";
import Profile from "../../public/assets/gluiconprofile.svg";

function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 z-10 bg-white justify-center shadow-md w-full mx-auto">
      <div className="container mx-auto py-2 pl-1 pr-5 lg:w-[360px]">
        <div className="flex items-center">
          <Image
            src={GluStayLogo}
            alt="icon"
            width={1000}
            height={1000}
            className="w-auto h-10 px-4 mr-auto"
          />
          <Image
            src={Profile}
            alt="icon"
            width={26}
            height={26}
            className="ml-auto cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
