import { gql } from "@apollo/client";

export const GET_WEBCHECKOUT_DETAILS_BY_RESERVATIONID = gql`
  query getCheckoutDetailsByReservationId($reservationId: ID) {
    getCheckoutDetailsByReservationId(reservationId: $reservationId)
  }
`;
