import React, { useEffect, useState } from "react";

function EventCounter({
  setNoOfPerson,
  handleBookingEvent,
  eventCount,
  spots,
}) {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    setNoOfPerson(counter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-semibold font-poppins text-lg">Number of guests</h3>
      <div className="flex justify-center items-center gap-5">
        {" "}
        {/* ✅ no onClick here */}
        <div
          onClick={() => setCounter(counter > 1 ? counter - 1 : 1)}
          className="px-4 py-2 rounded-lg border border-gray-400 text-xl font-poppins cursor-pointer"
        >
          -
        </div>
        <p className="font-semibold font-poppins text-xl">{counter}</p>
        <button
          disabled={
            parseInt(spots) - eventCount?.getEventBookingCount === counter ||
            parseInt(spots) - eventCount?.getEventBookingCount === 0
          }
          onClick={() => setCounter(counter + 1)} // ✅ only increment
          className="px-4 py-2 rounded-lg border disabled:bg-gray-300 disabled:border-gray-300 border-[#ffe700] bg-[rgb(255,248,219)] text-xl font-poppins cursor-pointer"
        >
          +
        </button>
      </div>
      <button
        disabled={spots - eventCount?.getEventBookingCount === 0}
        onClick={() => handleBookingEvent()}
        className="bg-[#ffe700] font-semibold disabled:bg-gray-400 py-4 w-full rounded-2xl font-poppins text-xl"
      >
        RSVP - {counter} Guest
      </button>
    </div>
  );
}

export default EventCounter;
