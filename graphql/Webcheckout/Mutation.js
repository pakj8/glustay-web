import { gql } from "@apollo/client";

export const CREATE_WEBCHECKOUT = gql`
  mutation createWebCheckout($InputCheckout: InputCheckout) {
    createWebCheckout(InputCheckout: $InputCheckout) {
      email
    }
  }
`;
