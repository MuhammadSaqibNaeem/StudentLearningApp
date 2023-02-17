/** @format */
///////////firebase///////////////
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../../../firebase.config";

//////////firebase//////////////////
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

////components//////
import Colors from "../../../../assets/theme/Colors";
///App Colors///
import PrimaryButton from "../../../components/PrimaryButton";
import TextInputCom from "../../../components/TextInputCom";
////components//////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
////responsive width height code ///
////responsive width height code ///
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const LogIn = async () => {
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user.emailVerified);
          if (userCredential.user.emailVerified) {
            navigation.navigate("TeacherHomeScreen");
          } else {
            Alert.alert("Please Verify Your Email Address");
            sendEmailVerification(auth.currentUser).then(() => {
              // Email verification sent!
              // ...
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      alert("Your Email Address or Password is invalid");
    }
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        style={styles.container}
      >
        <Image
          source={require("../../../../assets/logo.png")}
          style={styles.imageStyle}
        />

        <View style={styles.HeadingTextStyleView}>
          <Text style={styles.HeadingTextStyle}>Teacher LogIn</Text>
        </View>

        <View style={styles.textInputMaiView}>
          <View style={styles.textInputSubViews}>
            <TextInputCom
              text={"Email"}
              placeholder={"Please Enter Your Email Address"}
              keyboardType={"email-address"}
              borderWidth={2}
              borderRadius={16}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          <View style={styles.textInputSubViews}>
            <TextInputCom
              text={"Password"}
              placeholder={"Enter Your Password"}
              secureTextEntry={true}
              borderWidth={2}
              borderRadius={16}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          <TouchableOpacity
            style={{ alignSelf: "center", padding: 5, flexDirection: "row" }}
            onPress={() => navigation.navigate("TeacherSignUpScreen")}
          >
            <Text style={[styles.textStyle, { color: Colors.textColor }]}>
              if your not register?
            </Text>
            <Text style={styles.textStyle}> Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.textInputSubViews}>
            <PrimaryButton title={"LogIn"} onPress={LogIn} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    width: screenWidth,
    height: screenHeight,
  },
  HeadingTextStyleView: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    justifyContent: "center",
    alignSelf: "center",
  },
  pickerStyle: {
    width: wp("83%"),
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 16,
    height: hp("7%"),
  },
  HeadingTextStyle: {
    color: Colors.secondary,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  textInputMaiView: {
    width: screenWidth * 0.9,
  },

  imageStyle: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.2,
    justifyContent: "center",
    alignSelf: "center",
    bottom: 25,
  },
  textInputSubViews: { alignSelf: "center", padding: 15 },
  textStyle: {
    fontSize: 15,
    color: Colors.secondary,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});
