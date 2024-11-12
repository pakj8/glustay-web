import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
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

function RequestAccordion({ category, index, data }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <Accordion
      open={open}
      icon={<Icon id={open === true ? 1 : 0} open={open === true ? 1 : 0} />}
    >
      <AccordionHeader onClick={handleOpen}>{category}</AccordionHeader>
      <AccordionBody>
        Render data specific to this category if available
      </AccordionBody>
    </Accordion>
  );
}

export default RequestAccordion;
