import { StyleSheet, View } from "react-native";
import RepositoryList from "./components/RepositoryList";
import AppBar from "./components/AppBar";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SingleRepository from "./components/SingleRepository";
import CreateReview from "./components/CreateReview";
import SignUp from "./components/SignUp";
import MyReviews from "./components/MyReviews";

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
        <Route path="/repositories/:id" element={<SingleRepository />} />
        <Route path="/CreateReview" element={<CreateReview />} />
        <Route path="/MyReviews" element={<MyReviews />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUP" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
