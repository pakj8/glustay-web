import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetRequestBookingByObjectId } from "../../../graphql/RequestBooking/datasource";
import CheckMark from "../../../public/assets/check-mark.png";
import Check from "../../../public/assets/check.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { clearState } from "../../../redux/request/requestSlice";

function Index() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);
  const dispatch = useDispatch();

  const { data } = useGetRequestBookingByObjectId(router?.query?.bookingId);

  useEffect(() => {
    if (data) {
      setBookingData(data?.getRequestBookingByObjectId);
    }
  }, [data]);

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-5 mt-20 lg:w-[360px]">
      <div className="bg-yellow-100 rounded-md shadow-md p-3 w-full">
        <div className="flex  gap-5">
          <div className="col-span-1">
            <Image
              src={CheckMark}
              alt="checkmark"
              width={50}
              height={50}
              loading="lazy"
            />
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-black text-base font-medium">
              Thank you for your request.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        {bookingData?.request?.map((req, index) => {
          return (
            <div
              key={index}
              className="flex gap-1 items-center border rounded-md border-[#ffe700] border-dotted p-2"
            >
              <Image
                src={Check}
                alt="check"
                width={20}
                height={20}
                loading="lazy"
              />
              <p className="text-black font-semibold text-base">
                {req?.requestTitle}
              </p>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          router?.push(`/glustay/${bookingData?.reservationId}`);
        }}
        className="fixed bottom-10 rounded-lg py-3 w-[350px] font-semibold text-lg disabled:bg-gray-400 bg-[#ffe700]"
      >
        Back to homepage
      </button>
    </div>
  );
}

export default Index;
