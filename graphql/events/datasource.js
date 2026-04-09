import { useQuery } from "@apollo/client";
import { GET_EVENT_DETAILS_BY_EVENTID, GET_EVENTS_BY_HOTELID } from "./Query";

export const useGetEventsByHotelId = (hotelId) => {
  const { data, error, refetch, loading } = useQuery(GET_EVENTS_BY_HOTELID, {
    variables: { hotelId },
    skip: !hotelId,
  });
  return { data, loading, error, refetch };
};

export const useGetEventByEventId = (eventId) => {
  const { data, error, refetch, loading } = useQuery(
    GET_EVENT_DETAILS_BY_EVENTID,
    {
      variables: { eventsId: eventId },
      skip: !eventId,
    }
  );

  return { data, error, refetch, loading };
};
