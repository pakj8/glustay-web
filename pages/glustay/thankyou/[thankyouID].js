import React from "react";
import Image from "next/image";
import Thankyou from "../../../public/assets/Thankyou.svg";
function ContactlessCheckoutForm() {
  return (
    <div className="container mx-auto mt-20 flex flex-col p-5 items-center">
      <div>
        {" "}
        <Image
          src={Thankyou}
          alt="Thankyou"
          width={276}
          height={207}
          loading="lazy"
        />
      </div>
      <div className="text-center my-4">
        {" "}
        <p className="text-base font-semibold font-Mulish">
          Thank you for staying with us!
        </p>
      </div>
      <button className="fixed bottom-10 rounded-lg py-3 w-[350px] font-semibold text-lg disabled:bg-gray-400 bg-[#ffe700]">
        Back to homepage
      </button>
    </div>
  );
}

export default ContactlessCheckoutForm;
