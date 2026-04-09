import { useMutation } from "@apollo/client";
import { CREATE_BOOKING } from "./Mutation";

export const useCreateEventBooking = () => {
  const [createEventBooking, { data, loading, error, refetch }] =
    useMutation(CREATE_BOOKING);

  const createEventBookingHandler = async (bookingInput) => {
    try {
      return await createEventBooking({
        variables: { bookingInput },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return [createEventBookingHandler, { data, loading, error, refetch }];
};
