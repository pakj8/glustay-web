import { gql } from "@apollo/client";

export const CREATE_REQUEST_BOOKING = gql`
  mutation createRequestBooking($RequestInput: RequestInput) {
    createRequestBooking(RequestInput: $RequestInput) {
      _id
    }
  }
`;
