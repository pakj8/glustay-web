import React from "react";

function Footer() {
  const year = new Date().getFullYear;

  return (
    <div className="mr-auto text-center bg-black py-1 mt-5">
      <p className="font-poppins lg:font-normal font-light lg:text-lg text-xs text-white">
        Glustay
      </p>
      <p className="font-poppins lg:font-normal font-light lg:text-lg text-xs text-white">
        {" "}
        © 2024 All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
