import { gql } from "@apollo/client";

export const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadImage($file: Upload) {
    uploadImage(file: $file) {
      url
    }
  }
`;
