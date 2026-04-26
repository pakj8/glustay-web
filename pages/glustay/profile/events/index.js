import React, { useEffect, useState } from "react";
import { useGetEventBookingByReservationId } from "../../../../graphql/events/datasource";
import { useRouter } from "next/router";
import { dateFormatter, timeFormatter } from "../../../../utils/utils";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function Index() {
  const router = useRouter();
  const [eventBooking, setEventBooking] = useState([]);
  const [openStatus, setOpenStatus] = useState({});

  const { data } = useGetEventBookingByReservationId(
    router?.query?.reservationId
  );

  const handleOpen = (status, index) => {
    setOpenStatus((prevState) => ({
      ...prevState,
      [status]: prevState[status] === index + 1 ? null : index + 1,
    }));
  };

  useEffect(() => {
    if (data) {
      setEventBooking(data?.getEventsBookingByReservationId);
    }
  }, [data]);

  return (
    <div className="container mx-auto px-5 mt-20 lg:w-[360px]">
      <div className="flex flex-col gap-2">
        {eventBooking
          ?.slice()
          ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
          ?.map((req, index) => {
            return (
              <Accordion
                open={openStatus[status] === index + 1}
                icon={<Icon id={index + 1} open={openStatus[status]} />}
                key={index}
              >
                <AccordionHeader
                  className="flex justify-between items-center py-4 border-b-blue-gray-100 antialiased font-sans text-xl font-semibold leading-snug select-none hover:text-blue-gray-900 transition-colors text-blue-gray-900 w-full h-auto border-b-2"
                  onClick={() => handleOpen(status, index)}
                >
                  <div className="flex gap-3 items-center">
                    <p className="text-sm text-start font-poppins">
                      {" "}
                      {req?.eventId?.name}
                    </p>
                    {/* <div className="text-[#00520D] bg-[#DDFFD5] font-mulish px-2 py-0.5 h-5 rounded-full text-[10px] flex items-center gap-1">
                      {req?.status === "Pending"
                        ? "Open"
                        : req?.status === "Completed"
                        ? "Close"
                        : req?.status}
                      <svg
                        width="7"
                        height="5"
                        viewBox="0 0 7 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.37492 4.07512L1.06242 2.76262C0.916172 2.61637 0.683672 2.61637 0.537422 2.76262C0.391172 2.90887 0.391172 3.14137 0.537422 3.28762L2.10867 4.85887C2.25492 5.00512 2.49117 5.00512 2.63742 4.85887L6.61242 0.887617C6.75867 0.741367 6.75867 0.508867 6.61242 0.362617C6.46617 0.216367 6.23367 0.216367 6.08742 0.362617L2.37492 4.07512Z"
                          fill="#006FD6"
                        ></path>
                      </svg>
                    </div> */}
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start">
                      <p className="font-poppins font-medium text-sm text-[#919191]">
                        Reservation ID
                      </p>
                      <p className="font-semibold font-poppins text-sm text-[#595959] ml-auto">
                        {req?.reservationId}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <p className="font-poppins font-medium text-sm text-[#919191]">
                        Event ID
                      </p>
                      <p className="font-semibold font-poppins text-sm text-[#595959] ml-auto">
                        {req?.eventBookingId}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <p className="font-poppins font-medium text-sm text-[#919191]">
                        Event date & time
                      </p>
                      <div className="flex flex-col ml-auto">
                        <p className="font-semibold font-poppins text-sm text-[#595959] ">
                          {dateFormatter(req?.eventId?.date)}
                        </p>
                        <p className="font-semibold font-poppins text-sm text-[#595959] ml-auto">
                          {req?.eventId?.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <p className="font-poppins font-medium text-sm text-[#919191]">
                        Full Name
                      </p>
                      <p className="font-semibold font-poppins text-sm text-[#595959] ml-auto">
                        {req?.firstName} {req?.lastName}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <p className="font-poppins font-medium text-sm text-[#919191]">
                        Email
                      </p>
                      <p className="font-semibold font-poppins text-sm text-[#595959] ml-auto">
                        {req?.email}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <p className="font-poppins font-medium text-sm text-[#919191]">
                        Phone Number
                      </p>
                      <p className="font-semibold font-poppins text-sm text-[#595959] ml-auto">
                        {req?.phoneNumber === "" ? "-" : req?.phoneNumber}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <p className="font-poppins font-medium text-sm text-[#919191]">
                        Total Amount
                      </p>
                      <p className="font-semibold font-poppins text-sm text-[#595959] ml-auto">
                        {!req?.totalAmount || req?.totalAmount === "NaN"
                          ? "0"
                          : req?.totalAmount}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <p className="font-poppins font-medium text-sm text-[#919191]">
                        Booking date & time
                      </p>
                      <div className="flex flex-col ml-auto">
                        <p className="font-semibold font-poppins text-sm text-[#595959] ">
                          {dateFormatter(req?.createdAt)}
                        </p>
                        <p className="font-semibold font-poppins text-sm text-[#595959] ml-auto">
                          {timeFormatter(req?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionBody>
              </Accordion>
            );
          })}
      </div>
    </div>
  );
}

export default Index;
