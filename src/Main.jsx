import { StyleSheet, View } from "react-native";
import RepositoryList from "./components/RepositoryList";
import AppBar from "./components/AppBar";
import { Routes, Route, Navigate } from "react-router-native";
import SignIn from "./components/SignIn";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
