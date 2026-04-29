import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import TopHead from "../../../../public/assets/tophead.png";
import { useGetEventDetailsByEventBookingId } from "../../../../graphql/eventbooking/datasource";

export default function Index() {
  const router = useRouter();
  const [eventBookingDetails, setEventBookingDetails] = useState(null);

  console.log(router?.query?.eventBookingId);

  const { data } = useGetEventDetailsByEventBookingId(
    router?.query?.eventBookingId
  );

  useEffect(() => {
    if (data) {
      setEventBookingDetails(data?.getEventBookingDetailsByEventBookingId);
    }
  }, [data]);

  const isFree =
    !eventBookingDetails?.totalAmount ||
    eventBookingDetails?.totalAmount === "0" ||
    totalAmount === "NaN";

  return (
    <div className="container mx-auto px-5 lg:w-[360px] mt-10 pb-10">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <Image src={TopHead} alt="tophead" width={80} height={80} />
      </div>

      {/* Success Icon */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-[#ffe700] flex items-center justify-center text-4xl mb-4">
          🎉
        </div>
        <h1 className="font-poppins font-bold text-2xl text-center">
          Booking Confirmed!
        </h1>
        <p className="font-poppins text-gray-500 text-center text-sm mt-2">
          Your spot has been successfully reserved.
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden mb-6">
        {/* Header */}
        <div className="bg-[#ffe700] px-4 py-3">
          <p className="font-poppins font-semibold text-sm">Booking Details</p>
        </div>

        {/* Details */}
        <div className="flex flex-col divide-y divide-gray-100">
          {/* Booking ID */}
          <div className="flex justify-between items-center px-4 py-3">
            <p className="font-poppins text-sm text-gray-500">Booking ID</p>
            <p className="font-poppins font-semibold text-sm">
              {eventBookingDetails?.eventBookingId}
            </p>
          </div>

          {/* Event Name */}
          {eventBookingDetails?.eventId?.name && (
            <div className="flex justify-between items-center px-4 py-3">
              <p className="font-poppins text-sm text-gray-500">Event</p>
              <p className="font-poppins font-semibold text-sm text-right max-w-[180px]">
                {eventBookingDetails?.eventId?.name}
              </p>
            </div>
          )}

          {/* Date */}
          {eventBookingDetails?.eventId?.date && (
            <div className="flex justify-between items-center px-4 py-3">
              <p className="font-poppins text-sm text-gray-500">Date</p>
              <p className="font-poppins font-semibold text-sm">
                {new Date(
                  eventBookingDetails?.eventId?.date
                ).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          )}

          {/* Time */}
          {eventBookingDetails?.eventId?.time && (
            <div className="flex justify-between items-center px-4 py-3">
              <p className="font-poppins text-sm text-gray-500">Time</p>
              <p className="font-poppins font-semibold text-sm">
                {eventBookingDetails?.eventId?.time}
              </p>
            </div>
          )}

          {/* Location */}
          {eventBookingDetails?.location && (
            <div className="flex justify-between items-center px-4 py-3">
              <p className="font-poppins text-sm text-gray-500">Location</p>
              <p className="font-poppins font-semibold text-sm">
                {eventBookingDetails?.location}
              </p>
            </div>
          )}

          {/* Guests */}
          {eventBookingDetails?.numberOfGuests && (
            <div className="flex justify-between items-center px-4 py-3">
              <p className="font-poppins text-sm text-gray-500">Guests</p>
              <p className="font-poppins font-semibold text-sm">
                {eventBookingDetails?.numberOfGuests}{" "}
                {eventBookingDetails?.numberOfGuests === "1"
                  ? "Guest"
                  : "Guests"}
              </p>
            </div>
          )}

          {/* Total Amount */}
          <div className="flex justify-between items-center px-4 py-3">
            <p className="font-poppins text-sm text-gray-500">Total Paid</p>
            <p className="font-poppins font-semibold text-sm">
              {isFree ? (
                <span className="text-green-500">Free</span>
              ) : (
                `$${eventBookingDetails?.totalAmount}`
              )}
            </p>
          </div>

          {/* Email */}
        </div>
      </div>

      {/* Reservation ID */}
      <div className="bg-gray-50 rounded-2xl px-4 py-3 mb-6 flex justify-between items-center">
        <p className="font-poppins text-sm text-gray-500">Reservation ID</p>
        <p className="font-poppins font-semibold text-sm">
          {eventBookingDetails?.reservationId}
        </p>
      </div>

      {/* Back to Home Button */}
      <button
        onClick={() =>
          router.push(`/glustay/${eventBookingDetails?.reservationId}`)
        }
        className="bg-[#ffe700] font-semibold py-4 w-full rounded-2xl font-poppins text-base"
      >
        Back to Home
      </button>

      {/* Browse more events */}
      <button
        onClick={() =>
          router.push(
            `/glustay/events?hotelId=${eventBookingDetails?.hotelId}&reservationId=${eventBookingDetails?.reservationId}&bookingId=${eventBookingDetails?.bookingId}`
          )
        }
        className="mt-3 border border-[#ffe700] font-semibold py-4 w-full rounded-2xl font-poppins text-base"
      >
        Browse More Events
      </button>
    </div>
  );
}
