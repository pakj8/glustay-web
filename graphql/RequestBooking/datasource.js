import { useMutation, useQuery } from "@apollo/client";
import { CREATE_REQUEST_BOOKING } from "./Mutation";
import { GET_REQUEST_BOOKING_BY_OBJECTID } from "./Query";

export const useCreateRequestBooking = () => {
  const [reqBooking, { data, loading, error, refetch }] = useMutation(
    CREATE_REQUEST_BOOKING
  );

  const reqBookingHandler = async (RequestInput) => {
    try {
      const res = await reqBooking({
        variables: {
          RequestInput,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return [reqBookingHandler, { data, loading, error, refetch }];
};

export const useGetRequestBookingByObjectId = (ObjectId) => {
  const { data, loading, refetch, error } = useQuery(
    GET_REQUEST_BOOKING_BY_OBJECTID,
    {
      variables: {
        ObjectId,
      },
      skip: !ObjectId,
    }
  );

  return { data, loading, refetch, error };
};