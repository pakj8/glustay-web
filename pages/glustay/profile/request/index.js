import React, { Fragment, useEffect, useState } from "react";
import { useGetRequestBookingByReservationId } from "../../../../graphql/RequestBooking/datasource";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { dateFormatter, timeFormatter } from "../../../../utils/utils";
import { Rating } from "react-simple-star-rating";

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
  const [requestBooking, setRequestBooking] = useState([]);
  const [openStatus, setOpenStatus] = useState({});
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleOpen = (status, index) => {
    setOpenStatus((prevState) => ({
      ...prevState,
      [status]: prevState[status] === index + 1 ? null : index + 1,
    }));
  };
  const { data } = useGetRequestBookingByReservationId(
    router?.query?.reservationId
  );

  useEffect(() => {
    if (data) {
      const transformedData = data?.getRequestBookingByReservationId.flatMap(
        (item) =>
          item.request.map((req) => ({
            ...req,
            status: item.status,
            reqUniqueId: item.reqUniqueId,
            reservationId: item.reservationId,
            createdAt: item?.createdAt,
            updatedAt: item?.updatedAt,
          }))
      );
      setRequestBooking(transformedData);
    }
  }, [data]);

  const status = ["Pending", "Work in progress", "Completed"];

  return (
    <div className="container mx-auto px-5 mt-20 lg:w-[360px]">
      <div className="flex flex-col gap-2">
        {status?.map((status, index) => {
          return (
            <div key={index} className="flex flex-col gap-2">
              {requestBooking?.filter((req) => req?.status === status)
                ?.length === 0 ? (
                <></>
              ) : (
                <div className="border-t-[1px] border-black mt-10">
                  <p className="text-base bg-white text-black uppercase w-[159px] -mt-3">
                    {status}
                  </p>
                </div>
              )}

              {requestBooking
                ?.filter((req) => req?.status === status)
                ?.slice()
                ?.sort(
                  (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
                )
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
                            {req?.requestTitle}
                          </p>
                          <div className="text-[#00520D] bg-[#DDFFD5] font-mulish px-2 py-0.5 h-5 rounded-full text-[10px] flex items-center gap-1">
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
                          </div>
                        </div>
                      </AccordionHeader>
                      <AccordionBody>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-start">
                            <p className="font-poppins font-medium text-sm text-[#919191]">
                              Request ID
                            </p>
                            <p className="font-semibold font-poppins text-sm text-[#595959] ml-auto">
                              {req?.reqUniqueId}
                            </p>
                          </div>
                          <div className="flex items-start">
                            <p className="font-poppins font-medium text-sm text-[#919191]">
                              Request date & time
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
                          {req?.status === "Work in progress" && (
                            <div className="flex items-start">
                              <p className="font-poppins font-medium text-sm text-[#919191]">
                                Updated date & time
                              </p>
                              <div className="flex flex-col ml-auto">
                                <p className="font-semibold font-poppins text-sm text-[#595959] ">
                                  {dateFormatter(req?.updatedAt)}
                                </p>
                                <p className="font-semibold font-poppins text-sm text-[#595959] ml-auto">
                                  {timeFormatter(req?.updatedAt)}
                                </p>
                              </div>
                            </div>
                          )}
                          {req?.status === "Completed" && (
                            <div className="flex items-start">
                              <p className="font-poppins font-medium text-sm text-[#919191]">
                                Completion date & time
                              </p>
                              <div className="flex flex-col ml-auto">
                                <p className="font-semibold font-poppins text-sm text-[#595959] ">
                                  {dateFormatter(req?.updatedAt)}
                                </p>
                                <p className="font-semibold font-poppins text-sm text-[#595959] ml-auto">
                                  {timeFormatter(req?.updatedAt)}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionBody>
                    </Accordion>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Index;
