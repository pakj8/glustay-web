import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import React, { useState } from "react";
import countries from "world-countries";
function Index() {
  const options = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
    { value: "Other", label: "Other" },
  ];

  const proof = [
    { value: "Passport", label: "Passport" },
    { value: "Goverment ID", label: "Goverment ID" },
    { value: "Other", label: "Other" },
  ];

  const ageOptions = Array.from({ length: 50 - 18 + 1 }, (_, i) => ({
    value: i + 18,
    label: `${i + 18}`,
  }));

  const [phone, setPhone] = useState("");
  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

  return (
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
                type="time"
                name=""
                id="timeofArrival"
                className="border border-gray-300 text-[#595959] font-poppins font-medium text-base rounded-md w-full px-3 py-2 focus:outline-none focus:border-[#595959] bg-white"
              />
            </div>
          </div>
        </div>{" "}
        <div className="grid lg:grid-cols-1 grid-cols-1 lg:gap-3">
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="firtName"
              className="text-[#595959] font-mulish font-medium text-sm"
            >
              First Name
            </label>{" "}
            <input
              required
              type="text"
              name=""
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
              required
              type="text"
              name=""
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

            <Select options={options} />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="age"
              className="text-[#595959] font-mulish font-medium text-sm"
            >
              Age
            </label>
            <Select options={ageOptions} />
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
              value={phone}
              onChange={(value) => setPhone(value)}
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
              required
              type="text"
              name=""
              id="PhoneNumber"
              className="border text-[#595959] font-poppins font-medium text-base p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="lastName"
              className="text-[#595959] font-mulish font-medium text-sm"
            >
              Email Address
            </label>{" "}
            <input
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
              id="country"
              options={countryOptions}
              onChange={(option) => setSelectedCountry(option)}
              placeholder="Choose a country"
              className="basic-single"
              classNamePrefix="select"
              isSearchable={true}
            />
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <label
              htmlFor="gender"
              className="text-[#595959] font-mulish font-medium text-sm"
            >
              Select Document
            </label>

            <Select options={proof} />
          </div>
          <div className="flex flex-col gap-5 mt-5">
            <label
              htmlFor="upload"
              className="text-[#595959] font-medium text-sm"
            >
              Upload Documents
            </label>
            <input
              type="file"
              id="upload"
              className="border border-gray-300 text-[#595959] font-medium text-base rounded-md w-full px-3 py-2"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-5">
          <input
            type="checkbox"
            name="checkbox"
            id=""
            width={40}
            height={40}
            className="p-2 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 "
          />
          <label
            htmlFor="ageConfrimation"
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
            type="checkbox"
            name="checkbox"
            id=""
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
