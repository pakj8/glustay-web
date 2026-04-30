import { gql } from "@apollo/client";

export const CREATE_BOOKING = gql`
  mutation CreateEventBooking($bookingInput: eventBookingInput) {
    createEventBooking(bookingInput: $bookingInput) {
      _id
      eventId {
        _id
        name
        date
        time
      }
      bookingId
      hotelId {
        _id
        hotelName
      }
      firstName
      lastName
      email
      phoneNumber
      numberOfGuests
      totalAmount
      reservationId
      eventBookingId
      createdAt
    }
  }
`;
