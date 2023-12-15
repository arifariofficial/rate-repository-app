import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Link } from "react-router-native";
import { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Searchbar } from "react-native-paper";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e5e8",
  },
});

const stylesMenu = StyleSheet.create({
  container: {
    backgroundColor: "#e1e5e8",
    padding: 20,
  },
  placeholder: {
    color: "black",
    fontSize: 20,
  },
  inputIOS: {
    fontSize: 20,
  },
  inputAndroid: {
    fontSize: 20,
  },
  icon: {
    marginTop: 5,
    backgroundColor: "transparent",
    borderTopWidth: 15,
    borderTopColor: "gray",
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    width: 0,
    height: 0,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListHeaderComponent = ({ setSortBy, searchQuery, setSearchQuery }) => {
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View>
      <View>
        <Searchbar
          mode="view"
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View style={stylesMenu.container}>
        <RNPickerSelect
          style={stylesMenu}
          onValueChange={(value) => setSortBy(value)}
          items={[
            { label: "Latest repositories", value: "latest" },
            { label: "Highest rated repositories", value: "highestRated" },
            { label: "Lowest rated repositories", value: "lowestRated" },
          ]}
          Icon={() => {
            return <View style={stylesMenu.icon} />;
          }}
        />
      </View>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  refetch,
  setSortBy,
  searchQuery,
  setSearchQuery,
  onEndReach,
}) => {
  useEffect(() => {
    if (!repositories) {
      refetch();
    }
  }, [refetch]);

  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <ListHeaderComponent
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      }
      renderItem={({ item }) => (
        <Link to={`/repositories/${item.id}`} underlayColor={0.85}>
          <RepositoryItem key={item.id} item={item} />
        </Link>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const { repositories, refetch, fetchMore } = useRepositories({ sortBy, searchQuery, first: 3 });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      refetch={refetch}
      setSortBy={setSortBy}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
