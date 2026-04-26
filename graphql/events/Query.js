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
      noOfSpots
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
      noOfSpots
    }
  }
`;

export const GET_EVENT_BOOKING_COUNT = gql`
  query getEventBookingCount($eventId: ID) {
    getEventBookingCount(eventId: $eventId)
  }
`;

// export const GET_EVENT_BOOKING_BY_RESERVATIONID = gql`
//   query getEventsBookingByReservationId($reservationId: String) {
//     getEventsBookingByReservationId(reservationId: $reservationId) {
//       _id
//       eventId
//       bookingId
//       hotelId
//       firstName
//       lastName
//       email
//       phoneNumber
//       numberOfGuests
//       totalAmount
//       reservationId
//       eventBookingId
//     }
//   }
// `;

export const GET_EVENT_BOOKING_BY_RESERVATIONID = gql`
  query getEventsBookingByReservationId($reservationId: String) {
    getEventsBookingByReservationId(reservationId: $reservationId) {
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
      createdAt
      updatedAt
    }
  }
`;
