import { gql } from "@apollo/client";

export const CREATE_BOOKING = gql`
  mutation CreateEventBooking($bookingInput: eventBookingInput) {
    createEventBooking(bookingInput: $bookingInput) {
      _id
      eventId
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
