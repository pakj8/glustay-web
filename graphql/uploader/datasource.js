import { useMutation } from "@apollo/client"; // Use ES6 import
import { UPLOAD_IMAGE_MUTATION } from "./Mutation"; // Ensure correct import of mutation

export const useImageUpload = () => {
  const [uploadImage, { data, loading, error }] = useMutation(
    UPLOAD_IMAGE_MUTATION
  );

  const uploadHandler = async (file) => {
    try {
      const response = await uploadImage({
        variables: { file },
      });
      return response;
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  return [uploadHandler, { data, loading, error }];
};
