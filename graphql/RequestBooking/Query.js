import { gql } from "@apollo/client";

export const GET_REQUEST_BOOKING_BY_OBJECTID = gql`
  query getRequestBookingByObjectId($ObjectId: ID) {
    getRequestBookingByObjectId(ObjectId: $ObjectId) {
      _id
      reservationId
      request {
        requestTitle
        _id
        category
        description
        message
      }
      status
    }
  }
`;
