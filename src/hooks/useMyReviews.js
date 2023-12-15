import { useQuery } from "@apollo/client";
import { GET_LOGGED_USER } from "../graphql/queries";

const useMyReviews = () => {
  const { data, refetch } = useQuery(GET_LOGGED_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  return { myReviews: data?.me.reviews, refetch };
};

export default useMyReviews;
