import Image from "next/image";
import Background from "../public/assets/background.png";
import Button from "../public/assets/button.png";
import { useState } from "react";
import { useRouter } from "next/router";
import { useGetBookingDetailsByReservationId } from "../graphql/Booking/datasource";

export default function Home() {
  const [reservationId, setReservationId] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const router = useRouter();
  const [showPage, setShowPage] = useState("Main");
  const [userData, setUserData] = useState();

  const { refetch } = useGetBookingDetailsByReservationId(
    reservationId?.toUpperCase()
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!reservationId || reservationId.trim() === "") {
      setError("Reservation ID is required.");
      triggerShake();
      return;
    }

    try {
      const result = await refetch();

      if (result?.data?.getBookingDetailsByReservationId) {
        // Reservation ID exists, redirect to another page
        // router.push(`/`);
        setShowPage("Confirm");
        setUserData(result?.data?.getBookingDetailsByReservationId);
      } else {
        // Reservation ID not found
        setError("Reservation ID not found. Please try again.");
        triggerShake(); // Trigger the shake animation
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      triggerShake();
    }
  };

  const triggerShake = () => {
    setShake(true); // Add shake effect
    setTimeout(() => setShake(false), 500); // Remove shake effect after 500ms
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="relative lg:w-[360px]">
        <Image
          src={Background}
          alt="background"
          width={1000}
          height={1000}
          className="w-full h-screen"
        />
        {showPage === "Main" ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-full mt-1"
          >
            <p className="absolute top-56 left-5 font-poppins text-3xl leading-normal">
              Enter your <br />{" "}
              <span className="font-bold">Reservation ID</span> <br /> here...
            </p>
            <div className="absolute top-96 left-5">
              <input
                value={reservationId}
                onChange={(e) => setReservationId(e.target.value)}
                type="text"
                required
                className={`mt-4 p-2 rounded-md font-semibold font-poppins w-[320px] uppercase text-[#121212] border outline-none ${
                  error
                    ? "border-red-500 border-2 animate-shake"
                    : "border-yellow-400"
                }`}
                placeholder="RESERVATION ID"
              />
              {error && (
                <p className="text-red-500 font-semibold text-sm mt-2 animate-shake">
                  {error}
                </p>
              )}
            </div>
            <div className="absolute top-[480px] left-4 mt-16">
              <button
                type="submit"
                className={`${
                  !reservationId ? "opacity-25" : ""
                }  rounded-full`}
              >
                <Image
                  src={Button}
                  alt="button"
                  width={80}
                  height={80}
                  className={`${!reservationId ? "opacity-25" : ""}`}
                />
              </button>
            </div>
          </form>
        ) : (
          <div className="absolute top-40 left-5 font-poppins text-3xl leading-normal">
            <p>
              Are you <br />
              <span className="font-bold">
                {userData?.firstName} {userData?.lastName}
              </span>
            </p>
            <div className="space-y-8 mt-8">
              <button
                onClick={() =>
                  router.push(`/glustay/${userData?.reservationId}`)
                }
                className="w-72 flex justify-center items-center font-poppins text-base font-medium border border-[#FFE700] h-14 rounded-md hover:bg-[#FFE700] text-[#000000]"
              >
                Yes
              </button>
              <button
                onClick={() => setShowPage("Main")}
                className="w-72 flex justify-center items-center font-poppins text-base font-medium border border-[#FFE700] h-14 rounded-md hover:bg-[#FFE700] text-[#000000]"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
