import React from "react";
import Image from "next/image";
import CloseIcon from "../../public/assets/close.png";
import ArrowIcon from "../../public/assets/arrow.png";

function Info({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5 z-50">
      <div className="relative bg-white rounded-2xl p-6 w-80 lg:w-[360px] max-h-[75vh] overflow-y-auto">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <Image src={CloseIcon} alt="Close" width={15} height={18} />
        </button>
        <div className="flex items-center border-l-8 border-ht-100 px-4 mb-4">
          <h1 className="font-poppins text-lg font-semibold">Important Info</h1>
        </div>
        <div className="flex flex-col gap-1 ">
          <h2 className="font-medium font-poppins text-base">Rules</h2>
          <div className="font-medium font-poppins text-sm space-y-2 mt-4">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
