import { useField } from "formik";
import TextInput from "./TextInput";
import { StyleSheet } from "react-native";
import Text from "./Text";

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const styles = StyleSheet.create({
    errotText: {
      marginTop: 5,
      color: "red",
      fontWeight: "500",
    },
    textInput: {
      borderWidth: showError ? 2 : 1,
      borderColor: showError ? "#d73a4a" : "gray",
      margin: 5,
      padding: 10,
      fontSize: 20,
      borderRadius: 5,
    },
  });

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles.textInput}
        {...props}
      />
      {showError && <Text style={styles.errotText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
