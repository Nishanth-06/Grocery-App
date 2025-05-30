import {
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, login } from "../redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "1021802364616-ca2gcjnkmg111ugg7rgg2k08muhim9f7.apps.googleusercontent.com",

      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      if (user && user.data) {
        dispatch(addUser(user?.data || {}));
        dispatch(login());
        navigation.replace("MainStack");
      }
    } catch (e: any) {
      console.log("error", error);
      setError(e);
    }
  };

  const handleLogin = () => {
    dispatch(login());
    navigation.navigate("Products", {
      screen: "Products",
    });
    // if (email === "nishanth@gmail.com" && password === "123") {
    //   dispatch(login());
    //   navigation.navigate("Products", {
    //     screen: "Products",
    //   });
    // } else {
    //   Alert.alert("Incorrect User Details");
    // }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.text}>LOGIN</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Email"
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            />
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.6}
              onPress={() => {
                handleLogin();
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
              onPress={signin}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 30,
    marginTop: 30,
    color: "#098516",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    padding: 10,
    width: "100%",
    borderColor: "#098516",
    borderWidth: 2,
    borderRadius: 4,
    marginBottom: 20,
    height: 50,
  },
  button: {
    width: "100%",
    backgroundColor: "#098516",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    marginVertical: 2,
  },
  cell: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 4,
    width: 100,
    fontSize: 12,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
  },
  footer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
});

export default Login;
