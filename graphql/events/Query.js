import { gql } from "@apollo/client";

export const GET_EVENTS_BY_HOTELID = gql`
  query getEventsByHotelId($hotelId: ID) {
    getEventsByHotelId(hotelId: $hotelId) {
      _id
      name
      imageUrl
      category
      date
      time
      location
      pricePerPerson
      tags
      description
      hotelId {
        _id
        hotelName
      }
    }
  }
`;

export const GET_EVENT_DETAILS_BY_EVENTID = gql`
  query getEventsById($eventsId: ID) {
    getEventsById(eventsId: $eventsId) {
      _id
      name
      imageUrl
      category
      date
      time
      location
      pricePerPerson
      tags
      description
      hotelId {
        _id
        hotelName
      }
    }
  }
`;
