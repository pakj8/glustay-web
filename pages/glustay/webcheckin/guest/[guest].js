import React, { useEffect, useState } from "react";
import { useGetGuestsDetailsByReservationId } from "../../../../graphql/Webcheckin/datasource";
import { useRouter } from "next/router";
import Image from "next/image";
import Whatsapp from "../../../../public/assets/whatsapp.svg";
import Link from "../../../../public/assets/link.svg";
import RouterLoader from "../../../../components/loader/RouterLoader";

function Index() {
  const router = useRouter();
  const [guestDetails, setGuestDetails] = useState([]);

  const { data, loading } = useGetGuestsDetailsByReservationId(
    router?.query?.guest
  );

  useEffect(() => {
    if (data) {
      setGuestDetails(data?.getGuestDetailsByReservationId);
    }
  }, [data]);

  return loading ? (
    <RouterLoader />
  ) : (
    <div className="container mx-auto mt-20 flex flex-col p-5 items-center lg:w-[360px]">
      <div className="grid grid-cols-10">
        <div className="col-span-1">
          <svg
            onClick={() => router?.back()}
            className="rotate-180"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 8.99997H12.17L7.29 13.88C6.9 14.27 6.9 14.91 7.29 15.3C7.68 15.69 8.31 15.69 8.7 15.3L15.29 8.70997C15.68 8.31997 15.68 7.68997 15.29 7.29997L8.71 0.699971C8.32 0.309971 7.69 0.309971 7.3 0.699971C6.91 1.08997 6.91 1.71997 7.3 2.10997L12.17 6.99997H1C0.45 6.99997 0 7.44997 0 7.99997C0 8.54997 0.45 8.99997 1 8.99997Z"
              fill="#323232"
            />
          </svg>
        </div>
        <div className="col-span-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-center text-xl font-semibold">
              Contactless Check In
            </h3>
            <p className="font-normal text-[#595959] text-xs text-center font-mulish">
              Complete your guest profile by filling in the details. Use the
              share button to send the link to your travel group and finish the
              contactless check-in process.
            </p>

            <p className="font-semibold text-center">
              Filling this detail is a must!
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl shadow-lg flex flex-col w-full mt-10">
        <div className="bg-[#ffe700] py-2.5 rounded-t-xl"></div>
        <div className="px-5 py-2.5 bg-white">
          <div className="grid grid-cols-3">
            <div className="flex flex-col gap-2 col-span-2">
              {guestDetails?.length === 0 ? (
                <div
                  onClick={() =>
                    router?.push(
                      `/glustay/webcheckin/form/${router.query?.guest}`
                    )
                  }
                  className="flex items-center gap-1.5"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_7456_1819)">
                      <circle cx="12.9912" cy="7.61572" r="6" fill="#FFE700" />
                      <path
                        d="M12.9862 0.615723C9.25498 0.615723 6.22217 3.64854 6.22217 7.37979C6.22217 11.111 9.25498 14.1438 12.9862 14.1438C16.7175 14.1438 19.7503 11.111 19.7503 7.37979C19.7503 3.64854 16.7175 0.615723 12.9862 0.615723ZM12.9862 11.7954C10.5487 11.7954 8.56592 9.8126 8.56592 7.3751C8.56592 4.9376 10.5534 2.95947 12.9862 2.95947C15.419 2.95947 17.4065 4.94229 17.4065 7.37979C17.4065 9.81729 15.4237 11.7954 12.9862 11.7954Z"
                        fill="black"
                      />
                      <path
                        d="M23.7677 20.5187C23.1583 18.2734 21.8833 16.3 20.0786 14.8187C19.577 14.4062 18.8411 14.4812 18.4286 14.9781C18.0161 15.4797 18.0911 16.2156 18.588 16.6281C20.013 17.8047 21.0255 19.3609 21.5036 21.1328C21.602 21.5031 21.4473 21.775 21.3489 21.9109C21.1708 22.1406 20.9036 22.2765 20.613 22.2765C19.9661 22.2765 19.4411 22.8015 19.4411 23.4484C19.4411 24.0953 19.9661 24.6203 20.613 24.6203C21.6395 24.6203 22.5864 24.1515 23.2098 23.3359C23.8286 22.525 24.0348 21.4984 23.7677 20.5187Z"
                        fill="black"
                      />
                      <path
                        d="M16.4035 22.2718H5.36444C4.97069 22.2718 4.741 22.0468 4.63788 21.9109C4.45975 21.6765 4.4035 21.3812 4.48319 21.0999C4.966 19.3468 5.96913 17.7999 7.38006 16.6374C7.87694 16.2249 7.95194 15.489 7.53944 14.9874C7.12694 14.4859 6.391 14.4156 5.88944 14.8281C4.1035 16.3046 2.83319 18.2546 2.22381 20.4812C1.95194 21.4749 2.1535 22.5156 2.77694 23.3359C3.391 24.1468 4.33788 24.6156 5.36444 24.6156H16.4035C17.0504 24.6156 17.5754 24.0906 17.5754 23.4437C17.5754 22.7968 17.0504 22.2718 16.4035 22.2718Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_7456_1819">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.991211 0.615723)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="font-medium">Pending</p>
                </div>
              ) : (
                guestDetails?.map((details, index) => {
                  return (
                    <div
                      onClick={() =>
                        router?.push(
                          `/glustay/webcheckin/form/${router.query?.guest}`
                        )
                      }
                      key={index}
                      className="flex items-center gap-1.5"
                    >
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_7456_1819)">
                          <circle
                            cx="12.9912"
                            cy="7.61572"
                            r="6"
                            fill="#FFE700"
                          />
                          <path
                            d="M12.9862 0.615723C9.25498 0.615723 6.22217 3.64854 6.22217 7.37979C6.22217 11.111 9.25498 14.1438 12.9862 14.1438C16.7175 14.1438 19.7503 11.111 19.7503 7.37979C19.7503 3.64854 16.7175 0.615723 12.9862 0.615723ZM12.9862 11.7954C10.5487 11.7954 8.56592 9.8126 8.56592 7.3751C8.56592 4.9376 10.5534 2.95947 12.9862 2.95947C15.419 2.95947 17.4065 4.94229 17.4065 7.37979C17.4065 9.81729 15.4237 11.7954 12.9862 11.7954Z"
                            fill="black"
                          />
                          <path
                            d="M23.7677 20.5187C23.1583 18.2734 21.8833 16.3 20.0786 14.8187C19.577 14.4062 18.8411 14.4812 18.4286 14.9781C18.0161 15.4797 18.0911 16.2156 18.588 16.6281C20.013 17.8047 21.0255 19.3609 21.5036 21.1328C21.602 21.5031 21.4473 21.775 21.3489 21.9109C21.1708 22.1406 20.9036 22.2765 20.613 22.2765C19.9661 22.2765 19.4411 22.8015 19.4411 23.4484C19.4411 24.0953 19.9661 24.6203 20.613 24.6203C21.6395 24.6203 22.5864 24.1515 23.2098 23.3359C23.8286 22.525 24.0348 21.4984 23.7677 20.5187Z"
                            fill="black"
                          />
                          <path
                            d="M16.4035 22.2718H5.36444C4.97069 22.2718 4.741 22.0468 4.63788 21.9109C4.45975 21.6765 4.4035 21.3812 4.48319 21.0999C4.966 19.3468 5.96913 17.7999 7.38006 16.6374C7.87694 16.2249 7.95194 15.489 7.53944 14.9874C7.12694 14.4859 6.391 14.4156 5.88944 14.8281C4.1035 16.3046 2.83319 18.2546 2.22381 20.4812C1.95194 21.4749 2.1535 22.5156 2.77694 23.3359C3.391 24.1468 4.33788 24.6156 5.36444 24.6156H16.4035C17.0504 24.6156 17.5754 24.0906 17.5754 23.4437C17.5754 22.7968 17.0504 22.2718 16.4035 22.2718Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_7456_1819">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.991211 0.615723)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="font-medium">
                        {details?.firstName} {details?.lastName}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
            <div className="flex gap-2 items-center justify-center">
              <Image
                onClick={() =>
                  window.open(
                    `https://api.whatsapp.com/send?text=http://localhost:3000/glustay/${router?.query?.guest}`
                  )
                }
                src={Whatsapp}
                alt="whatsapp"
                width={25}
                height={25}
                loading="lazy"
                className="cursor-pointer"
              />
              <Image
                onClick={() =>
                  navigator?.share({
                    url: `http://localhost:3000/glustay/${router?.query?.guest}`,
                  })
                }
                src={Link}
                alt="Link"
                width={25}
                height={25}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
