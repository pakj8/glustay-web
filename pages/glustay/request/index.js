import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetRequestByHotelId } from "../../../graphql/Request/datasource";
import Image from "next/image";
import RequestAccordion from "../../../components/request/RequestAccordion";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../../../redux/request/requestSlice";

function Index() {
  const router = useRouter();
  const [request, setRequest] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [reviewRequest, setReviewRequest] = useState(false);
  const [userRequestCategory, setUserRequestCategory] = useState([]);
  const dispatch = useDispatch();
  const userRequest = useSelector((state) => state?.requests);

  const { data: requestData, loading } = useGetRequestByHotelId(
    router?.query?.hotelId
  );

  useEffect(() => {
    if (userRequest?.selectedRequests?.length > 0) {
      const category = Array?.from(
        new Set(userRequest?.selectedRequests?.map((req) => req?.category))
      );

      setUserRequestCategory(category);
    }
  }, [userRequest?.selectedRequests]);

  useEffect(() => {
    if (requestData) {
      setRequest(requestData?.getRequestByHotelId);
    }
  }, [requestData]);

  useEffect(() => {
    if (request) {
      const uniqueCategories = Array.from(
        new Set(request?.map((request) => request?.category))
      );

      setCategories(uniqueCategories);
    }
  }, [request]);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return reviewRequest === false ? (
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
            <h3 className="text-center text-xl font-semibold">Requests</h3>
            <p className="font-normal text-[#595959] text-xs text-center font-mulish">
              Place housekeeping, maintenance or booking requests in less than 3
              clicks.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {categories?.map((category, index) => {
          return (
            <div
              key={index}
              className="border border-gray-200 shadow-lg rounded-lg py-3 block mt-4"
            >
              <button
                onClick={toggleAccordion}
                className="flex justify-between border-[#ffe700] items-center w-full text-blue-gray-700 antialiased select-none hover:text-blue-gray-900 transition-colors text-base font-extrabold font-mulish border-l-4 border-ht-100 border-b-0 px-2 py-1"
              >
                <h2 className="text-lg font-semibold">{category}</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-[max-height] duration-300 ${
                  isOpen ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                {request
                  ?.filter((fil) => fil?.category === category)
                  ?.map((req, index) => {
                    const isAdded = userRequest?.selectedRequests?.some(
                      (storedReq) => storedReq._id === req._id
                    );

                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-3 my-2.5 py-2.5 "
                      >
                        <div className="px-2">
                          <div className="flex gap-2 items-center">
                            <div
                              className={`${
                                isAdded ? "bg-[#ffe700]" : "bg-gray-200"
                              }   p-3 rounded-md`}
                            >
                              <div className="h-10 w-10">
                                <Image
                                  src={req?.image}
                                  alt={req?.requestTitle}
                                  width={100}
                                  height={100}
                                  className="rounded-md"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <h3 className="font-mulish font-bold">
                                {req?.requestTitle}
                              </h3>
                              <p className="text-[0.6rem] font-semibold text-[#939393] font-mulish">
                                {req?.description}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                if (isAdded) {
                                  dispatch(removeRequest(req?._id));
                                } else {
                                  dispatch(addRequest(req));
                                }
                              }}
                              className={`cursor-pointer py-1.5 text-sm w-20 md:px-4 font-poppins ${
                                isAdded ? "bg-[#ffe700]" : "bg-gray-200"
                              }  rounded-md font-semibold ml-auto`}
                            >
                              {isAdded ? "Added" : "Add"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>

      <button
        disabled={userRequest?.selectedRequests?.length > 0 ? false : true}
        onClick={() => {
          setReviewRequest(true);
        }}
        className="fixed bottom-24 rounded-lg py-3 w-[350px] font-semibold text-lg disabled:bg-gray-400 bg-[#ffe700]"
      >
        Review{" "}
        {userRequest?.selectedRequests?.length > 1 ? "Requests" : "Request"}
        {userRequest?.selectedRequests?.length > 0 && (
          <> ({userRequest?.selectedRequests?.length})</>
        )}
      </button>
    </div>
  ) : (
    <div className="container mx-auto px-5 mt-20 lg:w-[360px]">
      <div className="grid grid-cols-10">
        <div className="col-span-1">
          <svg
            onClick={() => setReviewRequest(false)}
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
            <h3 className="text-center text-xl font-semibold">Requests</h3>
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
    </div>
  );
}

export default Index;
