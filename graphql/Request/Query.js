import { gql } from "@apollo/client";

export const GET_REQUEST_BY_HOTELID = gql`
  query getRequestByHotelId($hotelId: ID) {
    getRequestByHotelId(hotelId: $hotelId) {
      _id
      hotelId {
        _id
        hotelName
      }
      category
      description
      image
      requestTitle
    }
  }
`;
