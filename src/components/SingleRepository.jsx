import { FlatList, Pressable, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import theme from "../theme";
import * as Linking from "expo-linking";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import useReviews from "../hooks/useReviews";
import { format } from "date-fns";
import { useEffect } from "react";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: 15,
    width: 350,
  },
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    margin: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  button: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    padding: 20,
  },
  separator: {
    height: 10,
    backgroundColor: "#e1e5e8",
  },
  rating: {
    fontSize: 25,
    fontWeight: "bold",
    color: theme.colors.primary,
    textAlign: "center",
  },
  ratingContainer: {
    display: "flex",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
  },
  rightContainer: {
    margin: 10,
    marginTop: 0,
  },
  text: {
    marginTop: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 20,
  },
});

const RepositoryInfo = () => {
  const { id } = useParams();
  const { repository, refetch } = useRepository({ id, first: 2 });

  useEffect(() => {
    if (!repository) {
      refetch();
    }
  }, []);

  const repoDetails = repository ? repository : {};

  return (
    <View>
      <RepositoryItem item={repoDetails} />
      <Pressable style={styles.buttonContainer} onPress={() => Linking.openURL(repository.url)}>
        <Text style={styles.button}>Open In GitHub</Text>
      </Pressable>
      <View style={styles.separator} />
    </View>
  );
};

export const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();

  const { reviews, fetchMore } = useReviews({ id, first: 5 });

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
