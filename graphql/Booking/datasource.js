import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOKING_DETAILS_BY_RESERVATIONID } from "./Query";
import { SEND_OTP, VERIFY_OTP } from "./Mutation";

export const useGetBookingDetailsByReservationId = (reservationId) => {
  const { data, loading, error, refetch } = useQuery(
    GET_BOOKING_DETAILS_BY_RESERVATIONID,
    {
      variables: { reservationId },
      skip: !reservationId,
    }
  );

  return { data, loading, error, refetch };
};

export const useHomepageGetBookingDetailsByReservationId = (reservationId) => {
  const { data, loading, error, refetch } = useQuery(
    GET_BOOKING_DETAILS_BY_RESERVATIONID,
    {
      variables: { reservationId },
      skip: !reservationId,
    }
  );

  return { data, loading, error, refetch };
};

// export const useCreateRaiseComplaint = () => {
//   const [createComplaint, { data, loading, error, refetch }] = useMutation(
//     CREATE_RAISECOMPLAINT
//   );

//   const createComplaintHandler = async (ComplaintInput) => {
//     try {
//       return await createComplaint({
//         variables: { ComplaintInput },
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return [createComplaintHandler, { data, loading, error, refetch }];
// };

export const useSendOtp = () => {
  const [sendOtp, { data, loading, error, refetch }] = useMutation(SEND_OTP);

  const sendOtpHandler = async (email) => {
    try {
      return await sendOtp({
        variables: { email },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return [sendOtpHandler, { data, loading, error, refetch }];
};

export const useVerifyOtp = () => {
  const [verifyOtp, { data, loading, error, refetch }] =
    useMutation(VERIFY_OTP);

  const verifyOtpHandler = async (email, otp) => {
    try {
      return await verifyOtp({
        variables: { email, otp },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return [verifyOtpHandler, { data, loading, error, refetch }];
};
