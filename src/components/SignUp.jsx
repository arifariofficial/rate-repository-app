import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import Text from "./Text";
import { Formik } from "formik";
import * as yup from "yup";
import { ref } from "yup";
import useSignUp from "../hooks/useSignUp";

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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" secureTextEntry={false} />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit} style={styles.signInButtonContainer}>
        <Text style={styles.signInButton}>Sign Up</Text>
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
  passwordConfirmation: yup
    .string()
    .oneOf([ref("password")], "password don't match")
    .required("Password confirmation is  required"),
});

const initialValues = {
  username: "",
  password: "",
};

const SignUp = () => {
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signUp({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
