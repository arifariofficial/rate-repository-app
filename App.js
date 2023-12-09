import { NativeRouter } from "react-router-native";
import Main from "./src/Main";
import { StatusBar } from "react-native";

const App = () => {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
