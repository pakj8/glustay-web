import React, { useEffect } from "react";
import Close from "../../public/assets/close.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { updateReqMessage } from "../../redux/request/requestSlice";

function AddDetailsModal({
  setAddDetailsModal,
  addDetailsReqId,
  setMessage,
  message,
  userRequest,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    const existingMessage = userRequest?.selectedRequests?.find(
      (req) => req?._id === addDetailsReqId
    )?.message;
    setMessage(existingMessage || "");
  }, [addDetailsReqId, userRequest, setMessage]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-end animate z-20 lg:w-[360px] mx-auto">
      <div className="animate-up-parent bg-white w-full px-5 py-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <label id="message" className="font-semibold text-base">
              Message
            </label>
            <Image
              onClick={() => setAddDetailsModal(false)}
              src={Close}
              alt="close"
              width={15}
              height={15}
              loading="lazy"
              className="ml-auto"
            />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            rows="4"
            cols="10"
            name="message"
            id="message"
            className="border rounded-lg border-black outline-none p-3"
          />
          <button
            disabled={message === ""}
            onClick={() => {
              setAddDetailsModal(false);
              dispatch(
                updateReqMessage({ _id: addDetailsReqId, message: message })
              );
            }}
            type="submit"
            className="bg-[#ffe700] disabled:bg-gray-400 py-2 rounded-md shadow-lg font-semibold text-base"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDetailsModal;
