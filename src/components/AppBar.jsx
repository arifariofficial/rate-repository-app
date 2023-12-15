import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_LOGGED_USER } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router-dom";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    opacity: 0.8,
  },
  appBarTabContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 15,
  },
  appBarText: {
    fontSize: 18,
    paddingHorizontal: 15,
    color: "white",
    fontWeight: "bold",
  },
});

const AppBarTab = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const navigate = useNavigate();

  const { data } = useQuery(GET_LOGGED_USER, {
    fetchPolicy: "cache-and-network",
  });

  const handleSingOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/SignIn");
  };

  return (
    <View style={styles.appBarTabContainer}>
      <Pressable>
        <Link to="/">
          <Text style={styles.appBarText}>Repositories</Text>
        </Link>
      </Pressable>

      {data && data.me === null ? (
        <>
          <Pressable>
            <Link to="/SignIn">
              <Text style={styles.appBarText}>Sign In</Text>
            </Link>
          </Pressable>
          <Pressable>
            <Link to="/SignUp">
              <Text style={styles.appBarText}>Sign up</Text>
            </Link>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable>
            <Link to="/CreateReview">
              <Text style={styles.appBarText}>Create a review</Text>
            </Link>
          </Pressable>
          <Pressable>
            <Link to="/MyReviews">
              <Text style={styles.appBarText}>My reviews</Text>
            </Link>
          </Pressable>
          <Pressable onPress={handleSingOut}>
            <Text style={styles.appBarText}>Sign Out</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab />
      </ScrollView>
    </View>
  );
};

export default AppBar;
