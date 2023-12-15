import { Image, StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },

  picInfoContainer: {
    display: "flex",
    paddingHorizontal: 20,
  },

  buttomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  various: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  language: {
    display: "flex",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    width: 110,
  },
  languageText: {
    color: "white",
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

const RepositoryItem = ({ item }) => {
  const formatNumber = (value) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View>
          <Image source={{ uri: item.ownerAvatarUrl }} style={styles.pic} />
        </View>
        <View style={styles.picInfoContainer}>
          <Text
            testID="repoFullName"
            style={{ fontWeight: "bold", fontSize: theme.fontSizes.subheading }}
          >
            {item.fullName}
          </Text>
          <Text testID="repoDescription" style={{ padding: 5, width: 320 }}>
            {item.description}
          </Text>
          <View style={styles.language}>
            <Text testID="repoLanguage" style={styles.languageText}>
              {item.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttomContainer}>
        <View style={styles.various}>
          <Text testID="repoStars" style={{ fontWeight: "bold" }}>
            {formatNumber(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.various}>
          <Text testID="repoForks" style={{ fontWeight: "bold" }}>
            {formatNumber(item.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.various}>
          <Text testID="repoReviews" style={{ fontWeight: "bold" }}>
            {formatNumber(item.reviewCount)}
          </Text>
          <Text>Reviwes</Text>
        </View>
        <View style={styles.various}>
          <Text testID="repoRating" style={{ fontWeight: "bold" }}>
            {formatNumber(item.ratingAverage)}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
