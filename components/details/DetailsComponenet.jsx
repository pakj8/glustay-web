import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useHomepageGetBookingDetailsByReservationId } from "../../graphql/Booking/datasource";
import Image from "next/image";
import File from "../../public/assets/file.png";
import Wifi from "../../public/assets/wi-fi-icon.png";
import Location from "../../public/assets/location.png";
import Info from "./Info";
import Password from "./Password";
import LocationModal from "./LocationModal";

function DetailsComponent({ details }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const handleLocationClick = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);
  const handleImportantInfoClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleWifiClick = () => {
    setIsPasswordModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const importantInfoContent = (
    <div>Basic important information about the hotel.</div>
  );

  const passwordInfo = <p></p>;
  return (
    <div className="container mx-auto px-5 mt-7">
      <div className="glufeature grid grid-cols-3 gap-4">
        <section
          className="bg-ht-100 py-1.5 rounded-lg cursor-pointer bg-[#FFE700]"
          onClick={handleImportantInfoClick}
        >
          <div className="flex flex-col gap-2 justify-center items-center ">
            <div className="rounded-full bg-white p-3">
              <Image src={File} alt="File" height={22} width={22} />
            </div>
            <p className="text-xs font-medium font-poppins text-center ">
              Important info
            </p>
          </div>
        </section>

        <section
          className="bg-ht-100 py-1.5 rounded-lg bg-[#FFE700]"
          onClick={handleLocationClick}
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="rounded-full bg-white p-3">
              <Image src={Location} alt="Location" height={22} width={22} />
            </div>
            <p className="text-xs font-medium font-poppins text-center">
              Locate Us
            </p>
          </div>
        </section>

        <section
          className="bg-ht-100 py-1.5 rounded-lg bg-[#FFE700] "
          onClick={handleWifiClick}
        >
          <div className="flex flex-col gap-2 justify-center items-center ">
            <div className="rounded-full bg-white p-3">
              <Image src={Wifi} alt="Wifi" height={22} width={22} />
            </div>
            <p className="text-xs font-medium font-poppins text-center">
              Wifi Password
            </p>
          </div>
        </section>
      </div>

      <Info
        isOpen={isModalOpen}
        onClose={closeModal}
        content={importantInfoContent}
      />
      <Password
        isOpen={isPasswordModalOpen}
        onClose={closePasswordModal}
        wifi={passwordInfo}
        details={details}
      />
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={closeLocationModal}
        details={details}
      />
    </div>
  );
}

export default DetailsComponent;
