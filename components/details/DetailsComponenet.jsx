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
    <ul className="list-disc list-inside ">
      <li className="pb-3">
        The Hosteller Bhandardara is family-friendly till 30 November 2024.
        Note: Guests below 18 are not allowed in dorm rooms.
      </li>
      <li className="pb-3">Guests with local IDs are allowed.</li>
      <li>
        Visitor timings: 9 AM to 9 PM. Visitors are not allowed in rooms and
        must stay in common areas.
      </li>
      <li className="pb-3">
        Drug/alcohol abuse is strictly prohibited; violators will be blacklisted
        and asked to vacate immediately.
      </li>
      <li className="pb-3">
        Dedicated smoking areas are available. Smoking in dorms is prohibited.
      </li>
      <li className="pb-3">
        Accommodation in the same dorm is not guaranteed for groups of 3-4, and
        room allocation is based on availability.
      </li>
      <li className="pb-3">
        Unbox Cafe serves vegetarian food and promotes self-service.
      </li>
      <li className="pb-3">Outside food is prohibited inside the hostel.</li>
      <li className="pb-3">Timings:</li>
      <p>Check-in: 2 PM</p>
      <p>Check-out: 11 AM</p>
      <p>Guest visits: 9 AM - 9 PM</p>
      <p> Cafe: 8 AM - 3 PM & 6 PM - 12 AM</p>
      <p>Reception: 24 Hours</p>
      <p>Common Area: 24 Hours.</p>
    </ul>
  );

  const passwordInfo = <p></p>;
  return (
    <div className="container mx-auto px-5 mt-7">
      <div className="glufeature grid grid-cols-3 gap-4">
        <section
          className="bg-ht-100 py-1.5 rounded-lg cursor-pointer"
          onClick={handleImportantInfoClick}
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="rounded-full bg-white p-3">
              <Image src={File} alt="File" height={22} width={22} />
            </div>
            <p className="text-xs font-medium font-poppins text-center">
              Important info
            </p>
          </div>
        </section>

        <section
          className="bg-ht-100 py-1.5 rounded-lg"
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
          className="bg-ht-100 py-1.5 rounded-lg"
          onClick={handleWifiClick}
        >
          <div className="flex flex-col gap-2 justify-center items-center">
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
