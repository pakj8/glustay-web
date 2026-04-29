import Image from "next/image";
import Background from "../public/assets/background.png";
import Button from "../public/assets/button.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetBookingDetailsByReservationId,
  useSendOtp,
  useVerifyOtp,
} from "../graphql/Booking/datasource";

export default function Home() {
  const [reservationId, setReservationId] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const router = useRouter();
  const [showPage, setShowPage] = useState("Main");
  const [userData, setUserData] = useState();
  const [otp, setOtp] = useState("");

  const { refetch } = useGetBookingDetailsByReservationId(
    reservationId?.toUpperCase()
  );
  const [sendOtpHandler, { data, loading }] = useSendOtp();
  const [
    verifyOtpHandler,
    {
      data: verifyOtpData,
      loading: verifyOtpLoading,
      error: verifyOtpErr,
      refetch: verifyOtpRefetch,
    },
  ] = useVerifyOtp();

  useEffect(() => {
    if (data?.sendOtp?.success === true) {
      setShowPage("OTP");
    }
  }, [data?.sendOtp?.success]);

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

  useEffect(() => {
    if (verifyOtpData?.verifyOTP?.success === true) {
      localStorage.setItem("authentication", "verified");
      sessionStorage.setItem("authentication", "verified");
      router.push(`/glustay/${userData?.reservationId}`);
    } else if (verifyOtpData?.verifyOTP?.success === false) {
      triggerShake();
    }
  }, [verifyOtpData, router, userData?.reservationId]);

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
        ) : showPage === "Confirm" ? (
          <div className="absolute top-40 left-5 font-poppins text-3xl leading-normal">
            <p>
              Are you <br />
              <span className="font-bold">
                {userData?.firstName} {userData?.lastName}
              </span>
            </p>
            <div className="space-y-8 mt-8">
              <button
                disabled={loading}
                // onClick={() =>
                //   router.push(`/glustay/${userData?.reservationId}`)
                // }
                // onClick={() => {
                //   const isVerified =
                //     localStorage.getItem("authentication") ||
                //     sessionStorage.getItem("authentication");
                //   console.log(isVerified);
                //   // console.log(!isVerified);

                //   if (!isVerified || isVerified !== "verified") {
                //     sendOtpHandler(userData?.email);
                //   } else {
                //     router.push(`/glustay/${userData?.reservationId}`);
                //   }
                // }}
                onClick={async () => {
                  const isVerified =
                    localStorage.getItem("authentication") ||
                    sessionStorage.getItem("authentication");

                  console.log("isVerified:", isVerified); // ✅ check this

                  if (!isVerified || isVerified !== "verified") {
                    console.log("Sending OTP to:", userData?.email); // ✅ check email
                    try {
                      const response = await sendOtpHandler(userData?.email);
                      console.log("OTP response:", response); // ✅ check response
                    } catch (err) {
                      console.log("OTP error:", err); // ✅ check error
                    }
                  } else {
                    router.push(`/glustay/${userData?.reservationId}`);
                  }
                }}
                className="w-72 flex disabled:bg-gray-400 justify-center items-center font-poppins text-base font-medium disabled:border-gray-300 border border-[#FFE700] h-14 rounded-md hover:bg-[#FFE700] text-[#000000]"
              >
                {loading ? "Loading..." : "Yes"}
              </button>
              {!loading && (
                <button
                  onClick={() => setShowPage("Main")}
                  className="w-72 flex justify-center items-center font-poppins text-base font-medium border border-[#FFE700] h-14 rounded-md hover:bg-[#FFE700] text-[#000000]"
                >
                  No
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="absolute top-80 left-5">
            <div className="flex flex-col ">
              <p className="font-poppins leading-normal font-semibold">
                A 6-digit verification code has been sent to your email address.
                Please enter it below to continue.
              </p>
              <input
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="text"
                required
                className={`mt-4 p-2 rounded-md font-semibold font-poppins w-[320px] uppercase text-[#121212] border outline-none ${
                  verifyOtpData?.verifyOTP?.success === false
                    ? "border-red-500 border-2 animate-shake"
                    : "border-yellow-400"
                }`}
                placeholder="Enter OTP"
              />
              {verifyOtpData?.verifyOTP?.success !== true && (
                <p className="text-red-500 font-semibold text-sm mt-2 animate-shake">
                  {verifyOtpData?.verifyOTP?.message}
                </p>
              )}

              <button
                disabled={otp?.length !== 6}
                onClick={async (e) => {
                  if (otp !== "" && userData?.email) {
                    e?.preventDefault();
                    await verifyOtpHandler(userData?.email, otp);
                  }
                }}
                className="w-[320px] mt-3 flex justify-center items-center font-semibold font-poppins text-base h-14 disabled:bg-gray-300 disabled:text-black rounded-md text-white bg-black"
              >
                Verify
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
