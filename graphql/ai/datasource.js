import { useMutation } from "@apollo/client";
import { GLU_CHAT } from "./Mutation";

export const useGluChat = () => {
  const [gluChatMutation, { data, loading, error }] = useMutation(GLU_CHAT);

  const sendMessage = async ({
    messages,
    guestName,
    hotelName,
    reservationId,
    hotelAddress,
    wifiPassword,
  }) => {
    return await gluChatMutation({
      variables: {
        messages,
        guestName,
        hotelName,
        reservationId,
        hotelAddress,
        wifiPassword,
      },
    });
  };

  return { sendMessage, data, loading, error };
};
