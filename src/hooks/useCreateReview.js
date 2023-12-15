import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await mutate({
      variables: { review: { repositoryName, ownerName, rating: parseInt(rating), text } },
    });
    apolloClient.resetStore();
    return { data };
  };
  return [createReview, result];
};

export default useCreateReview;
