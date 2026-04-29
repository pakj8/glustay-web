import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetEventByEventId } from "../../../graphql/events/datasource";
import EventsTopImage from "../../../components/events/eventsdetails/EventsTopImage";
import EventInformation from "../../../components/events/eventsdetails/EventInformation";
import EventDescription from "../../../components/events/eventsdetails/EventDescription";
import EventCounter from "../../../components/events/eventsdetails/EventCounter";
import Footer from "../../../components/footer/Footer";
import { useCreateEventBooking } from "../../../graphql/eventbooking/datasource";
import { useGetBookingDetailsByReservationId } from "../../../graphql/Booking/datasource";
import { useGetEventCount } from "../../../graphql/events/datasource";

function Index() {
  const router = useRouter();
  const [eventDetails, setEventDetails] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [noOfPerson, setNoOfPerson] = useState(0);

  const { data, refetch: getEventRefetch } = useGetEventByEventId(
    router?.query?.eventId
  );
  const { data: bookingDetailsData } = useGetBookingDetailsByReservationId(
    router?.query?.reservationId
  );
  const [
    createEventBookingHandler,
    { data: createBookingData, loading, error, refetch },
  ] = useCreateEventBooking();

  const { data: eventCount, refetch: getEventCount } = useGetEventCount(
    router?.query?.eventId
  );

  useEffect(() => {
    if (data?.getEventsById) {
      setEventDetails(data?.getEventsById);
      getEventCount();
    }
  }, [data, getEventCount]);

  useEffect(() => {
    if (bookingDetailsData) {
      setBookingDetails(bookingDetailsData?.getBookingDetailsByReservationId);
    }
  }, [bookingDetailsData]);

  const handleBookingEvent = async (e) => {
    try {
      e?.preventDefault();

      const bookingInput = {
        eventId: router?.query?.eventId,
        bookingId: router?.query?.bookingId,
        hotelId: router?.query?.hotelId,
        firstName: bookingDetails?.firstName,
        lastName: bookingDetails?.lastName,
        email: bookingDetails?.email,
        phoneNumber: bookingDetails?.phoneNumber || "",
        numberOfGuests: String(noOfPerson), // ✅ convert to String as per your schema
        totalAmount: String(
          parseInt(eventDetails?.pricePerPerson || 0) * noOfPerson
        ),
        reservationId: router?.query?.reservationId,
      };

      const response = await createEventBookingHandler(bookingInput);

      if (response?.data?.createEventBooking?.eventBookingId) {
        router.push(
          `/glustay/events/booking/${response?.data?.createEventBooking?.eventBookingId}`
        );
      }
    } catch (error) {
      console.error("Event booking error:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-5 mt-20 lg:w-[360px]">
        <div className="flex flex-col gap-5">
          <EventsTopImage
            image={eventDetails?.imageUrl}
            category={eventDetails?.category}
            name={eventDetails?.name}
          />
          <EventInformation
            name={eventDetails?.name}
            date={eventDetails?.date}
            time={eventDetails?.time}
            location={eventDetails?.location}
            price={eventDetails?.pricePerPerson}
            tags={eventDetails?.tags}
          />
          <EventDescription
            description={eventDetails?.description}
            spots={parseInt(eventDetails?.noOfSpots)}
            eventCount={eventCount}
          />
          <EventCounter
            handleBookingEvent={handleBookingEvent}
            setNoOfPerson={setNoOfPerson}
            spots={eventDetails?.noOfSpots}
            eventCount={eventCount}
          />
        </div>
      </div>
      {/* <div className="">
      <Footer />
      </div> */}
    </>
  );
}

export default Index;
