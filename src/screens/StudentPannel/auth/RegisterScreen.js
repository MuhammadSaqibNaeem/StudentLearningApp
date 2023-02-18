/** @format */
////////////firebase//////

import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../../../firebase.config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

//////////firebase///////////////
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
  AsyncStorage,
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
import { async } from "@firebase/util";

////responsive width height code ///
////responsive width height code ///
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///

const StudentSignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const SignUp = async () => {
  //   if (name != "" && email != "" && password != "") {
  //     createUserWithEmailAndPassword(auth, email, password)
  //       .then((userCredential) => {
  //         // sendEmailVerification(auth.currentUser).then(() => {
  //         //   // Email verification sent!
  //         //   // ...
  //        // });
  //          AsyncStorage.setItem('UserType','Student').then(()=>{
  //           setDoc(doc(db, "studentsData", userCredential.user.uid), {
  //             uid: userCredential.user.uid,
  //             name,
  //             email,
  //           });
  //           {
  //             Platform.OS === "ios"
  //               ? Alert.alert("Your Account Successfully Created")
  //               : ToastAndroid.show(
  //                   "Your Account Successfully Created",
  //                   ToastAndroid.SHORT
  //                 );
  //           }
  //          })
          

  //         navigation.navigate("StudentLoginScreen");
  //       })
  //       .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         {
  //           Platform.OS === "ios"
  //             ? Alert.alert(errorMessage, ToastAndroid.SHORT)
  //             : ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
  //         }
  //       });
  //   } else {
  //     Alert.alert("Sorry, Please Enter All Data");
  //   }
  // };
  const SignUp= async()=>{
   
  
    if (
      email != "" &&
      password != "" &&
      name != "" 
    ) {
    
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          AsyncStorage.setItem("UserType", "Student").then(() => {
           
           
            setDoc(
              doc(db, "studentsData", "" + userCredential.user.uid),

              {
                uid: userCredential.user.uid,
                name,
                email:email.toLowerCase(),
               
              }
            );
            alert("Your Account Successfully Created");
          });
        })
        .catch((error) => {
        
          const errorMessage = error.message;
          Alert.alert(errorMessage);
        });
      
    } else {
      alert("Sorry, Please Enter All Data");
    }
  }

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
          <Text style={styles.HeadingTextStyle}>Student Sign Up</Text>
        </View>

        <View style={styles.textInputMaiView}>
          <View style={styles.textInputSubViews}>
            <TextInputCom
              text={"Name"}
              placeholder={"Please Enter Your Name"}
              keyboardType={"default"}
              borderWidth={2}
              borderRadius={16}
              onChangeText={(value) => setName(value)}
            />
          </View>
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
          <View style={{flexDirection:'row',justifyContent:'center'}}>
          <Text style={[styles.textStyle, { color: Colors.textColor }]}>
              Already Have An Account ?
            </Text>
          <TouchableOpacity
            style={{ alignSelf: "center",}}
            onPress={() => navigation.goBack()}
          >
           
            <Text style={styles.textStyle}> Login In </Text>
          </TouchableOpacity>
          </View>
          <View style={styles.textInputSubViews}>
            <PrimaryButton title={"Sign Up"} onPress={SignUp} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentSignUpScreen;

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
    width: screenWidth * 0.3,
    height: screenHeight * 0.1,
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
