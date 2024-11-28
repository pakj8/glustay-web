import { useMutation, useQuery } from "@apollo/client";
import { GET_GUESTS_DETAILS_BY_RESERVATIONID } from "./Query";
import { CREATE_WEBCHECKIN_RESPONSE } from "./Mutation";

export const useGetGuestsDetailsByReservationId = (reservationId) => {
  const { data, loading, refetch, error } = useQuery(
    GET_GUESTS_DETAILS_BY_RESERVATIONID,
    {
      variables: { reservationId },
      skip: !reservationId,
    }
  );

  return { data, loading, refetch, error };
};

export const useCreateWebcheckinResponse = () => {
  const [createWebcheckin, { data, loading, refetch, error }] = useMutation(
    CREATE_WEBCHECKIN_RESPONSE
  );

  const createWebcheckinHandler = async (WebCheckInInput) => {
    try {
      const data = await createWebcheckin({
        variables: {
          WebCheckInInput,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return [createWebcheckinHandler, { data, loading, refetch, error }];
};
