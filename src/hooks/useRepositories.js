import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useDebounce } from "use-debounce";

const useRepositories = ({ sortBy, searchQuery, first }) => {
  const [value] = useDebounce(searchQuery, 500);

  const parseSortBy = (sortBy) => {
    switch (sortBy) {
      case "latest":
        return { orderBy: "CREATED_AT", orderDirection: "DESC" };

      case "highestRated":
        return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };

      case "lowestRated":
        return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };

      default:
        return { orderBy: "CREATED_AT", orderDirection: "DESC" };
    }
  };

  const variables = { ...parseSortBy(sortBy), searchKeyword: value, first: first };

  const { data, loading, fetchMore, refetch, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchmore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchmore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    ...result,
  };
};

export default useRepositories;
