import React, { useState } from "react";

function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [complaint, setComplaint] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, like sending the data to a backend
    console.log("Complaint Raised", { name, email, subject, complaint });
  };

  return (
    <div className="container mx-auto mt-20 flex flex-col p-5 items-center">
      <h2 className="text-2xl font-semibold mb-4">Raise a Complaint</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-[#595959] font-poppins font-medium text-sm"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border text-[#595959] font-poppins font-medium text-base p-2 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[#595959] font-poppins font-medium text-sm"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border text-[#595959] font-poppins font-medium text-base p-2 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="subject"
              className="text-[#595959] font-poppins font-medium text-sm"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border text-[#595959] font-poppins font-medium text-base p-2 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="complaint"
              className="text-[#595959] font-poppins font-medium text-sm"
            >
              Complaint Details
            </label>
            <textarea
              id="complaint"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              rows="5"
              className="border text-[#595959] font-poppins font-medium text-base p-2 rounded-md"
              required
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className=" w-36 rounded-md h-[56px] disabled:bg-gray-300 bg-[#FFE700] font-mulish botton-[120px] mt-10 mb-10 text-black font-bold px-3"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Index;
