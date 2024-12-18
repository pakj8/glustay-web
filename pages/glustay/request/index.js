import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetRequestByHotelId } from "../../../graphql/Request/datasource";
import Image from "next/image";
import RequestAccordion from "../../../components/request/RequestAccordion";
import { useDispatch, useSelector } from "react-redux";
import {
  addRequest,
  removeRequest,
  updateHotelId,
} from "../../../redux/request/requestSlice";
import Delete from "../../../public/assets/delete.png";
import AddDetailsModal from "../../../components/request/AddDetailsModal";
import { useCreateRequestBooking } from "../../../graphql/RequestBooking/datasource";
import { useHomepageGetBookingDetailsByReservationId } from "../../../graphql/Booking/datasource";

function Index() {
  const router = useRouter();
  const [request, setRequest] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [reviewRequest, setReviewRequest] = useState(false);
  const [userRequestCategory, setUserRequestCategory] = useState([]);
  const dispatch = useDispatch();
  const userRequest = useSelector((state) => state?.requests);
  const [addDetailsModal, setAddDetailsModal] = useState(false);
  const [addDetailsReqId, setAddDetailsReqId] = useState("");
  const [message, setMessage] = useState("");
  const [guestDetails, setGuestDetails] = useState(null);

  const { data: requestData, loading } = useGetRequestByHotelId(
    router?.query?.hotelId
  );
  const [
    reqBookingHandler,
    { data: bookingData, loading: reqBookingLoading, error, refetch },
  ] = useCreateRequestBooking();

  // useEffect(() => {
  //   if (bookingData) {
  //     console.log(bookingData?.createRequestBooking);
  //   }
  // }, [bookingData]);

  const { data } = useHomepageGetBookingDetailsByReservationId(
    router?.query?.reservationId
  );

  useEffect(() => {
    if (data) {
      setGuestDetails(data?.getBookingDetailsByReservationId);
    }
  }, [data]);

  const handleSubmitReq = async (
    firstName,
    lastName,
    reservationId,
    hotelId,
    requests
  ) => {
    try {
      const sanitizedRequests = requests.map((req) => {
        const { __typename, _id, hotelId, image, ...rest } = req;
        return rest;
      });
      const RequestInput = {
        guestFirstName: firstName,
        guestLastName: lastName,
        reservationId: reservationId,
        hotelId: hotelId,
        request: sanitizedRequests,
      };

      const res = await reqBookingHandler(RequestInput);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (router?.query?.hotelId) {
      dispatch(updateHotelId(router?.query?.hotelId));
    }
  }, [dispatch, router]);

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

  useEffect(() => {
    if (userRequest?.selectedRequests?.length < 1) {
      setReviewRequest(false);
    }
  }, [userRequest?.selectedRequests?.length]);

  useEffect(() => {
    if (bookingData?.createRequestBooking) {
      router?.push(
        `/glustay/request/${bookingData?.createRequestBooking?._id}`
      );
    }
  }, [bookingData?.createRequestBooking, router]);

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
      <div className="mt-4 mb-24 flex flex-col gap-2">
        {categories?.map((category, index) => {
          return (
            <RequestAccordion
              userRequest={userRequest}
              key={index}
              category={category}
              data={request}
              dispatch={dispatch}
              addRequest={addRequest}
            />
          );
        })}
      </div>

      <button
        disabled={userRequest?.selectedRequests?.length > 0 ? false : true}
        onClick={() => {
          setReviewRequest(true);
        }}
        className="fixed bottom-10 rounded-lg py-3 w-[350px] font-semibold text-lg disabled:bg-gray-400 bg-[#ffe700]"
      >
        Review{" "}
        {userRequest?.selectedRequests?.length > 1 ? "Requests" : "Request"}
        {userRequest?.selectedRequests?.length > 0 && (
          <> ({userRequest?.selectedRequests?.length})</>
        )}
      </button>
    </div>
  ) : (
    <>
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
        <div className="">
          {userRequestCategory?.map((category, index) => {
            return (
              <div key={index} className="border-t-[1px] border-black mt-10">
                <p className="text-base bg-white text-black uppercase w-[130px] -mt-3">
                  {category}
                </p>
                <div className="mt-5 flex flex-col gap-5">
                  {userRequest?.selectedRequests?.map((req, index) => {
                    return (
                      <div key={index} className="grid grid-cols-3 ">
                        <div className="col-span-2 flex flex-col gap-1">
                          <h3 className="font-semibold text-base">
                            {req?.requestTitle}
                          </h3>
                          <p className="text-gray-500 font-medium text-xs">
                            {req?.description}
                          </p>
                          <h4
                            onClick={() => {
                              setAddDetailsModal(true);
                              setAddDetailsReqId(req?._id);
                            }}
                            className="font-semibold text-sm"
                          >
                            Add details
                          </h4>
                        </div>
                        <button
                          onClick={() => dispatch(removeRequest(req?._id))}
                          className="ml-auto"
                        >
                          <Image
                            src={Delete}
                            alt="delete"
                            width={25}
                            height={25}
                            loading="lazy"
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            handleSubmitReq(
              guestDetails?.firstName,
              guestDetails?.lastName,
              router?.query?.reservationId,
              userRequest?.hotelId,
              userRequest?.selectedRequests
            );
          }}
          className="fixed bottom-10 rounded-lg py-3 w-[350px] font-semibold text-lg disabled:bg-gray-400 bg-[#ffe700]"
        >
          Submit Request
        </button>
      </div>

      {addDetailsModal && (
        <AddDetailsModal
          userRequest={userRequest}
          message={message}
          setMessage={setMessage}
          addDetailsReqId={addDetailsReqId}
          setAddDetailsModal={setAddDetailsModal}
        />
      )}
    </>
  );
}

export default Index;
