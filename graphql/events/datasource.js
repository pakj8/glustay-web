import { useQuery } from "@apollo/client";
import { GET_EVENTS_BY_HOTELID } from "./Query";

export const useGetEventsByHotelId = (hotelId) => {
  const { data, error, refetch, loading } = useQuery(GET_EVENTS_BY_HOTELID, {
    variables: { hotelId },
    skip: !hotelId,
  });
  return { data, loading, error, refetch };
};
