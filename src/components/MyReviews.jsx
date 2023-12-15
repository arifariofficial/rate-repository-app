import useMyReviews from "../hooks/useMyReviews";
import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-dom";

import Text from "./Text";
import { format } from "date-fns";
import theme from "../theme";
import useDeleteReview from "../hooks/useDeleteReview";

const stylesSeparator = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e5e8",
  },
});
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
  repositoryName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 20,
  },
  buttonContainerMyReview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  btn1Container: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  btn2Container: {
    backgroundColor: "#d7394c",
    borderRadius: 3,
  },
  btn: {
    fontSize: 20,
    padding: 15,
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 25,
  },
});

const MyReviewItems = ({ review, refetch }) => {
  const navigate = useNavigate();

  const [deleteReview] = useDeleteReview();

  const handleDeleteReview = () => {
    Alert.alert("Delete review", "Are you sure you want to delete this review", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await deleteReview(review.id);
            setTimeout(() => {
              refetch();
            }, 100);
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
          <Text style={styles.date}>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonContainerMyReview}>
        <Pressable
          style={styles.btn1Container}
          onPress={() => navigate(`/repositories/${review.repository.id}`)}
        >
          <Text style={styles.btn}>View repository</Text>
        </Pressable>
        <Pressable style={styles.btn2Container} onPress={handleDeleteReview}>
          <Text style={styles.btn}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { myReviews, refetch } = useMyReviews();

  const myReviewsNodes = myReviews ? myReviews.edges.map((edge) => edge.node) : [];

  const ItemSeparator = () => <View style={stylesSeparator.separator} />;

  return (
    <FlatList
      data={myReviewsNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <MyReviewItems review={item} refetch={refetch} />}
    />
  );
};

export default MyReviews;
