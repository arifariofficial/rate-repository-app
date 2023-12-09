import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from "yup";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  signInButtonContainer: {
    backgroundColor: theme.colors.primary,
    margin: 5,
    padding: 15,
    textAlign: "center",
    borderRadius: 5,
  },
  signInButton: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" secureTextEntry={false} />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <Pressable onPress={onSubmit} style={styles.signInButtonContainer}>
        <Text style={styles.signInButton}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "Username must be greated or equal to 1"),
  password: yup.string().required("Password is  required").min(6, "Password must be 6 digits"),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  );
};

export default SignIn;
