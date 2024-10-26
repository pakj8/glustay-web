import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useHomepageGetBookingDetailsByReservationId } from "../../graphql/Booking/datasource";

function GluStayHomeTop() {
  const router = useRouter();
  const [details, setDetails] = useState(null);

  const { data, error, loading, refetch } =
    useHomepageGetBookingDetailsByReservationId(
      router.query.reservationId ? router.query.reservationId : null
    );

  useEffect(() => {
    if (data) {
      setDetails(data?.getBookingDetailsByReservationId);
    }
  }, [data]);

  console.log(details);
  return <div></div>;
}

export default GluStayHomeTop;
