import { useMutation, useQuery } from "@apollo/client";
import { GET_WEBCHECKOUT_DETAILS_BY_RESERVATIONID } from "./Query";
import { CREATE_WEBCHECKOUT } from "./Mutation";

export const useGetWebcheckoutDetailsByReservationId = (reservationId) => {
  const { data, loading, error, refetch } = useQuery(
    GET_WEBCHECKOUT_DETAILS_BY_RESERVATIONID,
    {
      variables: { reservationId },
      skip: !reservationId,
    }
  );

  return { data, loading, error, refetch };
};

export const useCreateWebcheckout = () => {
  const [webcheckout, { data, loading, error, refetch }] =
    useMutation(CREATE_WEBCHECKOUT);

  const createWebcheckoutHandler = async (InputCheckout) => {
    try {
      return await webcheckout({
        variables: { InputCheckout },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return [createWebcheckoutHandler, { data, loading, error, refetch }];
};
