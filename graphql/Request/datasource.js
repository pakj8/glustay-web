import { useQuery } from "@apollo/client";
import { GET_REQUEST_BY_HOTELID } from "./Query";

export const useGetRequestByHotelId = (hotelId) => {
  const { data, loading, error, refetch } = useQuery(GET_REQUEST_BY_HOTELID, {
    variables: { hotelId },
    skip: !hotelId,
  });

  return { data, loading, error, refetch };
};
