import React from "react";
import Image from "next/image";
import ThankYou from "../../public/assets/Thankyou.svg";
import { useRouter } from "next/router";

function Thankyou({ reservationId, text }) {
  const router = useRouter();
  return (
    <div className="container mx-auto mt-20 flex flex-col p-5 items-center">
      <div>
        {" "}
        <Image
          src={ThankYou}
          alt="ThankYou"
          width={276}
          height={207}
          loading="lazy"
        />
      </div>
      <div className="text-center my-4">
        {" "}
        <p className="text-base font-semibold font-Mulish">
          {text}
          {/* Thank you for your response! */}
        </p>
      </div>
      <button
        onClick={() => router?.push(`/glustay/${reservationId}`)}
        className="fixed bottom-10 rounded-lg py-3 w-[350px] font-semibold text-lg disabled:bg-gray-400 bg-[#ffe700]"
      >
        Back to homepage
      </button>
    </div>
  );
}

export default Thankyou;
