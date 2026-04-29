import { gql } from "@apollo/client";

export const GET_EVENT_BOOKING_BY_EVENT_BOOKINGID = gql`
  query getEventBookingDetailsByEventBookingId($eventBookingId: String) {
    getEventBookingDetailsByEventBookingId(eventBookingId: $eventBookingId) {
      _id
      eventId {
        _id
        name
        date
        time
      }
      bookingId
      hotelId
      firstName
      lastName
      email
      phoneNumber
      numberOfGuests
      totalAmount
      reservationId
      eventBookingId
    }
  }
`;
