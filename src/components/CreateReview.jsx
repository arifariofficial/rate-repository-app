import { Pressable, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 3,
  },
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owener name"
        secureTextEntry={false}
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
        secureTextEntry={false}
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        secureTextEntry={false}
      />
      <FormikTextInput name="review" placeholder="Review" multiline secureTextEntry={false} />

      <Pressable onPress={onSubmit} style={styles.buttonContainer}>
        <Text style={styles.button}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewSchemaValidation = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().integer().min(0).max(100).required("Rating is required"),
  review: yup.string().max(2000),
});

const initialValues = {
  repositoryOwnerName: "",
  repositoryName: "",
  rating: "",
  review: "",
};

const CreateReview = () => {
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview(values);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={ReviewSchemaValidation}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
