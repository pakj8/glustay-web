import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BOOKING } from "./Mutation";
import { GET_EVENT_BOOKING_BY_EVENT_BOOKINGID } from "./Query";

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

export const useGetEventDetailsByEventBookingId = (eventBookingId) => {
  const { data } = useQuery(GET_EVENT_BOOKING_BY_EVENT_BOOKINGID, {
    variables: { eventBookingId },
    skip: !eventBookingId,
  });

  return { data };
};
