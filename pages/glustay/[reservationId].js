import React, { useEffect, useState } from "react";
import TopHead from "../../public/assets/tophead.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useHomepageGetBookingDetailsByReservationId } from "../../graphql/Booking/datasource";
import GluStayHomeTop from "../../components/homepage/GluStayHomeTop";

function Index() {
  return (
    <>
      <div className=" mx-auto lg:grid place-items-center pt-9 pb-2 h-1 mt-5">
        <div className="lg:w-[360px] px-5">
          <Image
            src={TopHead}
            alt="tophead"
            width={100}
            height={100}
            loading="lazy"
          />
        </div>
      </div>
      <div className="container mx-auto lg:w-[360px] mt-16">
        <div className="mb-5 lg:w-[360px] ">
          {/* <div className="container mx-auto px-5 mt-10">
            <div className="flex flex-col gap-3">
              <h2></h2>
            </div>
          </div> */}
          <GluStayHomeTop />
        </div>
      </div>
    </>
  );
}

export default Index;
