import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = ({ id }) => {
  const variables = { repositoryId: id };

  const { data, loading, refetch, ...result } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  return { repository: data?.repository, loading, refetch, ...result };
};

export default useRepository;
