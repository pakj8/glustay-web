import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetEventsByHotelId } from "../../../graphql/events/datasource";
import Image from "next/image";
import CheckMark from "../../../public/assets/check-mark.png";
import EventsCard from "../../../components/events/EventsCard";
import Footer from "../../../components/footer/Footer";

function Index() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  const { data, error, refetch, loading } = useGetEventsByHotelId(
    router?.query?.hotelId
  );

  useEffect(() => {
    if (data) {
      setEvents(data?.getEventsByHotelId);
    }
  }, [data]);

  return (
    <>
      <div className="container mx-auto px-5 mt-20 lg:w-[360px]">
        <div className="grid grid-cols-10">
          <div className="col-span-1">
            <svg
              onClick={() => router?.back()}
              className="rotate-180"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 8.99997H12.17L7.29 13.88C6.9 14.27 6.9 14.91 7.29 15.3C7.68 15.69 8.31 15.69 8.7 15.3L15.29 8.70997C15.68 8.31997 15.68 7.68997 15.29 7.29997L8.71 0.699971C8.32 0.309971 7.69 0.309971 7.3 0.699971C6.91 1.08997 6.91 1.71997 7.3 2.10997L12.17 6.99997H1C0.45 6.99997 0 7.44997 0 7.99997C0 8.54997 0.45 8.99997 1 8.99997Z"
                fill="#323232"
              />
            </svg>
          </div>
          <div className="col-span-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-center text-xl font-semibold">
                Events & Activities
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-3">
          {events?.map((event, index) => {
            return <EventsCard key={index} event={event} />;
          })}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Index;
