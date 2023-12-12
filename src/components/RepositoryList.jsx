import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e5e8",
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, refetch } = useRepositories();

  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : refetch();

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem key={item.id} item={item} />}
    />
  );
};

export default RepositoryList;
