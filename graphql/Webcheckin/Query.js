import { gql } from "@apollo/client";

export const GET_GUESTS_DETAILS_BY_RESERVATIONID = gql`
  query getGuestDetailsByReservationId($reservationId: String) {
    getGuestDetailsByReservationId(reservationId: $reservationId) {
      _id
      timeOfArrival
      firstName
      lastName
      gender
      reservationId
      age
      countryCode
      phoneNumber
      email
      residingCountry
      governmentIdProof
      createdAt
      updatedAt
    }
  }
`;
