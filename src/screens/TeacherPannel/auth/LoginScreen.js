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
import { collection, getDocs, query, where } from "firebase/firestore";
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

      const docref=collection(db, "users")
    
      const q= query(docref,where ("email",'==',email.toLocaleLowerCase()))
      getDocs(q).then((snap)=>{
        const l=   snap.docs.map((doc)=>{
             console.log(doc.data())
           }).length
          if(l==1){
           signInWithEmailAndPassword(auth, email, password)
                 .then(() => {
                     AsyncStorage.setItem('UserType','Teacher')
                 })
                 
                 .catch((error) => {
                  alert('Wrong Email Or Password')
                 }); 
          }
          else{
           alert('No Registered Student With Given Email')
          }
          })
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
          <View style={{flexDirection:'row',justifyContent:'center'}}>
          <Text style={[styles.textStyle, { color: Colors.textColor }]}>
              Not Yet Registered ?
            </Text>
          <TouchableOpacity
            style={{ alignSelf: "center",}}
            onPress={() => navigation.navigate("TeacherSignUpScreen")}
          >
           
            <Text style={styles.textStyle}> Sign Up</Text>
          </TouchableOpacity>
          </View>
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
