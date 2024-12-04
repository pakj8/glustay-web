import { gql } from "@apollo/client";

export const CREATE_RAISECOMPLAINT = gql`
  mutation createRaiseComplaint($ComplaintInput: ComplaintInput) {
    createRaiseComplaint(ComplaintInput: $ComplaintInput) {
      fullName
    }
  }
`;
