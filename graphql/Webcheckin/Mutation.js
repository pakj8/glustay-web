import { gql } from "@apollo/client";

export const CREATE_WEBCHECKIN_RESPONSE = gql`
  mutation createWebCheckInData($WebCheckInInput: WebCheckInInput) {
    createWebCheckInData(WebCheckInInput: $WebCheckInInput) {
      _id
      firstName
    }
  }
`;
