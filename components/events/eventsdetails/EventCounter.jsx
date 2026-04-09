import React, { useEffect, useState } from "react";

function EventCounter({ setNoOfPerson, handleBookingEvent }) {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    setNoOfPerson(counter);
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
        <div
          onClick={() => setCounter(counter + 1)} // ✅ only increment
          className="px-4 py-2 rounded-lg border border-[#ffe700] bg-[rgb(255,248,219)] text-xl font-poppins cursor-pointer"
        >
          +
        </div>
      </div>
      <button
        onClick={() => handleBookingEvent()}
        className="bg-[#ffe700] font-semibold py-4 w-full rounded-2xl font-poppins text-xl"
      >
        RSVP - {counter} Guest
      </button>
    </div>
  );
}

export default EventCounter;
