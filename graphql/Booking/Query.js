import { gql } from "@apollo/client";

export const GET_BOOKING_DETAILS_BY_RESERVATIONID = gql`
  query getBookingDetailsByReservationId($reservationId: ID) {
    getBookingDetailsByReservationId(reservationId: $reservationId) {
      _id
      firstName
      lastName
      reservationId
      checkinDate
      checkOutDate
      hotelId {
        _id
        hotelName
      }
    }
  }
`;
