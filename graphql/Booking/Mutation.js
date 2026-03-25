import { gql } from "@apollo/client";

// export const CREATE_RAISECOMPLAINT = gql`
//   mutation createRaiseComplaint($ComplaintInput: ComplaintInput) {
//     createRaiseComplaint(ComplaintInput: $ComplaintInput) {
//       fullName
//     }
//   }
// `;

export const SEND_OTP = gql`
  mutation sendOtp($email: String) {
    sendOtp(email: $email) {
      success
      message
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation verifyOTP($email: String, $otp: String) {
    verifyOTP(email: $email, otp: $otp) {
      success
      message
    }
  }
`;
