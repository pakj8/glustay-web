import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import Select from "react-select";
import React, { useEffect, useId, useState } from "react";
import countries from "world-countries";
import dynamic from "next/dynamic";
import { useCreateWebcheckinResponse } from "../../../../graphql/Webcheckin/datasource";
import { useImageUpload } from "../../../../graphql/uploader/datasource";
import { useRouter } from "next/router";
import Thankyou from "../../../../components/thankyou/Thankyou";

const Select = dynamic(() => import("react-select"), { ssr: false });

function Index() {
  const options = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
    { value: "Other", label: "Other" },
  ];

  const ageOptions = Array.from({ length: 50 - 18 + 1 }, (_, i) => ({
    value: i + 18,
    label: `${i + 18}`,
  }));

  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

  const [timeOfArrival, setTimeOfArrival] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [countryCode, setCountryCode] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [terms, setTerms] = useState(false);
  const [ageVerify, setAgeVerify] = useState(false);

  const [createWebcheckinHandler, { data: webcheckinData }] =
    useCreateWebcheckinResponse();
  const [uploadHandler, { data: uploadData, loading, error }] =
    useImageUpload();

  const genderId = useId();
  const ageId = useId();
  const countryId = useId();
  const router = useRouter();

  const handleSubmitForm = async () => {
    try {
      if (
        timeOfArrival &&
        firstName &&
        lastName &&
        router?.query?.formId &&
        gender &&
        age &&
        countryCode &&
        phoneNumber &&
        email &&
        country &&
        uploadData?.uploadImage?.url
      ) {
        const obj = {
          timeOfArrival,
          firstName,
          lastName,
          reservationId: router?.query?.formId,
          gender,
          age: age?.toString(),
          countryCode: `+${countryCode}`,
          phoneNumber,
          email,
          residingCountry: country,
          governmentIdProof: uploadData?.uploadImage?.url,
        };

        const data = await createWebcheckinHandler(obj);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return webcheckinData?.createWebCheckInData ? (
    <Thankyou
      reservationId={router?.query?.formId}
      text="Thank you for your response!"
    />
  ) : (
    <div className="container mx-auto  mt-20 flex flex-col p-5 items-center">
      <div className="flex flex-col gap-3">
        <h2 className="font-poppins text-[28px] text-start text-[#000000]  font-semibold">
          Basic Details
        </h2>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <div className="grid lg:grid-cols-1 grid-cols-1 lg:gap-3 mt-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="timeofArrival"
              form=""
              className="text-[#595959]  font-medium text-sm"
            >
              Time of arrival
            </label>
            <div className="relative">
              {" "}
              <input
                onChange={(e) => {
                  setTimeOfArrival(e?.target?.value);
                }}
                type="time"
                name="timeofArrival"
                id="timeofArrival"
                className="border border-gray-300 text-[#595959] font-poppins font-medium text-base rounded-md w-full px-3 py-2 focus:outline-none focus:border-[#595959] bg-white"
              />
            </div>
          </div>
        </div>{" "}
        <div className="grid lg:grid-cols-1 grid-cols-1 lg:gap-3">
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="firstName"
              className="text-[#595959] font-mulish font-medium text-sm"
            >
              First Name
            </label>{" "}
            <input
              onChange={(e) => {
                setFirstName(e?.target?.value);
              }}
              required
              type="text"
              name="firstName"
              id="firstName"
              className="border text-[#595959] font-poppins font-medium text-base p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="lastName"
              className="text-[#595959] font-mulish font-medium text-sm"
            >
              Last Name
            </label>{" "}
            <input
              onChange={(e) => setLastName(e?.target.value)}
              required
              type="text"
              name="lastName"
              id="lastName"
              className="border text-[#595959] font-poppins font-medium text-base p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="gender"
              className="text-[#595959] font-mulish font-medium text-sm"
            >
              Gender
            </label>

            <Select
              onChange={(e) => setGender(e?.value)}
              instanceId={genderId}
              id="gender"
              options={options}
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="age"
              className="text-[#595959] font-mulish font-medium text-sm"
            >
              Age
            </label>
            <Select
              onChange={(e) => setAge(e?.value)}
              id="age"
              instanceId={ageId}
              options={ageOptions}
            />
          </div>
          <label
            htmlFor="phone"
            className="text-[#595959] font-mulish font-medium text-sm mt-5"
          >
            Phone Number
          </label>
          <div className="flex flex-cols-5 gap-2 ">
            <PhoneInput
              country={"us"} // Default country
              onChange={(value) => setCountryCode(value)}
              value={countryCode}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              containerStyle={{ width: "100%" }}
              inputStyle={{
                width: "100%",
                height: "40px",
                borderRadius: "0.375rem",
                border: "1px solid #d1d1d1",
                fontSize: "14px",
                paddingLeft: "48px", // Adjust to accommodate flag icon
              }}
              buttonStyle={{
                border: "none",
                background: "none",
              }}
            />
            <input
              onChange={(e) => setPhoneNumber(e?.target?.value)}
              required
              type="text"
              name=""
              id="phone"
              className="border text-[#595959] font-poppins font-medium text-base p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="email"
              className="text-[#595959] font-mulish font-medium text-sm"
            >
              Email Address
            </label>{" "}
            <input
              onChange={(e) => setEmail(e?.target?.value)}
              required
              type="email"
              name=""
              id="email"
              className="border text-[#595959] font-poppins font-medium text-base p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="country"
              className="text-[#595959] font-mulish font-medium text-sm"
            >
              Select Country
            </label>
            <Select
              instanceId={countryId}
              id="country"
              options={countryOptions}
              onChange={(option) => setCountry(option?.label)}
              placeholder="Choose a country"
              className="basic-single"
              classNamePrefix="select"
              isSearchable={true}
            />
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="upload"
              className="text-[#595959] font-medium text-sm"
            >
              Upload Documents
            </label>
            <input
              onChange={(e) => uploadHandler(e?.target?.files[0])}
              type="file"
              id="upload"
              className="border border-gray-300 text-[#595959] font-medium text-base rounded-md w-full px-3 py-2"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-5">
          <input
            onChange={() => setTerms(!terms)}
            type="checkbox"
            name="checkbox"
            id="termsandconditions"
            width={40}
            height={40}
            className="p-2 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 "
          />
          <label
            htmlFor="termsandconditions"
            className="font-mulish font-medium text-sm text-[#595959]"
          >
            I acknowledge and accept all the{" "}
            <span className="text-blue-600 cursor-pointer">
              Terms & Conditions.
            </span>
          </label>
        </div>
        <div className="flex items-center space-x-2 mt-5">
          <input
            onChange={() => setAgeVerify(!ageVerify)}
            type="checkbox"
            name="checkbox"
            id="ageConfrimation"
            width={40}
            height={40}
            className="p-2 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 "
          />
          <label
            htmlFor="ageConfrimation"
            className="font-mulish font-medium text-sm text-[#595959]"
          >
            I confirm that I am above the age of 18.
          </label>
        </div>
        <div>
          <button
            // disabled={
            //   timeOfArrival === "" ||
            //   firstName === "" ||
            //   lastName === "" ||
            //   gender === "" ||
            //   age === "" ||
            //   countryCode === "" ||
            //   phoneNumber === "" ||
            //   email === "" ||
            //   country === "" ||
            //   documentUrl === "" ||
            //   terms === false ||
            //   ageVerify === false
            // }
            onClick={() => {
              handleSubmitForm();
            }}
            type="submit"
            className="ml-auto w-36 rounded-md h-[56px] disabled:bg-gray-300 bg-[#FFE700] font-mulish botton-[120px] mt-10 mb-10 text-black font-bold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
