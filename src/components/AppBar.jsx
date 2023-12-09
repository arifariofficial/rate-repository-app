import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";

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
    fontSize: 22,
    paddingHorizontal: 15,
    color: "white",
    fontWeight: "bold",
  },
});

const AppBarTab = () => {
  return (
    <View style={styles.appBarTabContainer}>
      <Pressable>
        <Link to="/">
          <Text style={styles.appBarText}>Repositories</Text>
        </Link>
      </Pressable>
      <Pressable>
        <Link to="/SignIn">
          <Text style={styles.appBarText}>Sign In</Text>
        </Link>
      </Pressable>
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
