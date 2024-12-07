import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import Image from "next/image";
import React, { useState } from "react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function RequestAccordion({
  category,
  index,
  data,
  userRequest,
  dispatch,
  addRequest,
}) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <Accordion
      className="border border-gray-200 shadow-lg rounded-lg py-3 block"
      open={open === index}
      icon={<Icon id={index} open={open} />}
    >
      <AccordionHeader
        className="flex justify-between items-center w-full antialiased select-none hover:text-blue-gray-900 transition-colors text-blue-gray-900 text-lg font-semibold font-poppins border-l-4 border-ht-100 border-b-0 px-2 py-1"
        onClick={() => handleOpen(index)}
      >
        {category}
      </AccordionHeader>
      <AccordionBody className="px-3">
        <div className="flex flex-col gap-3">
          {data
            ?.filter((fil) => fil?.category === category)
            ?.map((req, index) => {
              const isAdded = userRequest?.selectedRequests?.some(
                (storedReq) => storedReq._id === req._id
              );
              return (
                <div key={index} className="flex flex-col ">
                  <div className="px-2">
                    <div className="flex gap-2 items-center">
                      <div
                        className={`${
                          isAdded ? "bg-[#ffe700]" : "bg-gray-200"
                        }   p-3 rounded-md`}
                      >
                        <div className="h-10 w-10">
                          <Image
                            src={req?.image}
                            alt={req?.requestTitle}
                            width={100}
                            height={100}
                            className="rounded-md"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h3 className="font-mulish font-bold">
                          {req?.requestTitle}
                        </h3>
                        <p className="text-[0.6rem] font-semibold text-[#939393] font-mulish">
                          {req?.description}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (isAdded) {
                            dispatch(removeRequest(req?._id));
                          } else {
                            dispatch(addRequest(req));
                          }
                        }}
                        className={`cursor-pointer py-1.5 text-sm w-20 md:px-4 font-poppins ${
                          isAdded ? "bg-[#ffe700]" : "bg-gray-200"
                        }  rounded-md font-semibold ml-auto`}
                      >
                        {isAdded ? "Added" : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </AccordionBody>
    </Accordion>
  );
}

export default RequestAccordion;
