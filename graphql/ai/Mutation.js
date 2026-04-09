import { gql } from "@apollo/client";

export const GLU_CHAT = gql`
  mutation GluChat(
    $messages: [ChatMessageInput!]!
    $guestName: String
    $hotelName: String
    $reservationId: String
    $hotelAddress: String
    $wifiPassword: String
  ) {
    gluChat(
      messages: $messages
      guestName: $guestName
      hotelName: $hotelName
      reservationId: $reservationId
      hotelAddress: $hotelAddress
      wifiPassword: $wifiPassword
    ) {
      reply
    }
  }
`;
