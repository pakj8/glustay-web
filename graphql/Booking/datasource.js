import { useQuery } from "@apollo/client";
import { GET_BOOKING_DETAILS_BY_RESERVATIONID } from "./Query";

export const useGetBookingDetailsByReservationId = (reservationId) => {
  const { data, loading, error, refetch } = useQuery(
    GET_BOOKING_DETAILS_BY_RESERVATIONID,
    {
      variables: { reservationId },
      skip: true,
    }
  );

  return { data, loading, error, refetch };
};
