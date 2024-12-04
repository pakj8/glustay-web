import { useMutation } from "@apollo/client";
import { CREATE_RAISECOMPLAINT } from "./Mutation";

export const useCreateRaiseComplaint = () => {
  const [createComplaint, { data, loading, error, refetch }] = useMutation(
    CREATE_RAISECOMPLAINT
  );

  const createComplaintHandler = async (ComplaintInput) => {
    try {
      return await createComplaint({
        variables: { ComplaintInput },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return [createComplaintHandler, { data, loading, error, refetch }];
};
