import React, { useEffect, useState } from "react";
import TopHead from "../../public/assets/tophead.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useHomepageGetBookingDetailsByReservationId } from "../../graphql/Booking/datasource";
import GluStayHomeTop from "../../components/homepage/GluStayHomeTop";
import DetailsComponent from "../../components/details/DetailsComponenet";
import EventsAndServices from "../../components/activity/EventsAndServices";
import Account from "../../components/MyAccount/Account";
import dynamic from "next/dynamic";
// import Footer from "../../components/footer/Footer";
const Footer = dynamic(() => import("../../components/footer/Footer"));
import RouterLoader from "../../components/loader/RouterLoader";

function Index() {
  const router = useRouter();
  const [details, setDetails] = useState(null);

  const { data, error, loading, refetch } =
    useHomepageGetBookingDetailsByReservationId(
      router.query.reservationId ? router.query.reservationId : null
    );

  useEffect(() => {
    if (data) {
      setDetails(data?.getBookingDetailsByReservationId);
    }
  }, [data]);

  useEffect(() => {
    if (router?.query?.reservationId) {
      sessionStorage?.setItem("reservationId", router?.query?.reservationId);
    }
  }, [router]);

  return loading ? (
    <RouterLoader />
  ) : (
    <>
      <div className=" mx-auto lg:grid place-items-center pt-9 pb-2 h-1 mt-5">
        <div className="lg:w-[360px] px-5 pr-20  mr-30 ">
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
        <div className=" lg:w-[360px] ">
          <GluStayHomeTop details={details} />
          <DetailsComponent details={details} />
          <EventsAndServices details={details} />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Index;
