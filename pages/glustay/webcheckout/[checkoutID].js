import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  useCreateWebcheckout,
  useGetWebcheckoutDetailsByReservationId,
} from "../../../graphql/Webcheckout/datasource";
import Thankyou from "../../../components/thankyou/Thankyou";
import RouterLoader from "../../../components/loader/RouterLoader";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });

function ContactlessCheckoutForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");

  const { data, loading, refetch } = useGetWebcheckoutDetailsByReservationId(
    router?.query?.checkoutID
  );
  const [createWebcheckoutHandler, { loading: formCheckoutLoading, error }] =
    useCreateWebcheckout();

  const options = [
    { label: "7 am - 8 am", value: "7 am - 8 am" },
    { label: "8 am - 9 am", value: "8 am - 9 am" },
    { label: "9 am - 10 am", value: "9 am - 10 am" },
    { label: "10 am - 11 am", value: "10 am - 11 am" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      console.log({
        fullName,
        email,
        phoneNumber,
        checkoutTime,
        checkoutID: router?.query?.checkoutID,
        hotelId: router?.query?.hotelId,
      });
      if (router?.query?.checkoutID && router?.query?.hotelId) {
        if (fullName && email && phoneNumber && checkoutTime) {
          const InputCheckout = {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            timings: checkoutTime,
            reservationId: router?.query?.checkoutID,
            hotelId: router?.query?.hotelId,
          };
          await createWebcheckoutHandler(InputCheckout);
          refetch();
        } else {
          alert("Please fill out all fields.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return loading || formCheckoutLoading ? (
    <RouterLoader />
  ) : data?.getCheckoutDetailsByReservationId === true ? (
    <Thankyou
      reservationId={router?.query?.checkoutID}
      text="Thank you for staying with us!"
    />
  ) : (
    <div className="container mx-auto mt-20 flex flex-col p-5 items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Contactless Checkout
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Customer Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target?.value)}
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target?.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target?.value)}
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="checkout"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Checkout time
            </label>
            <Select
              onChange={(e) => setCheckoutTime(e?.value)}
              id="checkout"
              options={options}
            />
          </div>

          {/* Checkout Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-yellow-300 text-black font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Complete Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactlessCheckoutForm;
