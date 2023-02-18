/** @format */

import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    Image,
    Alert,
    AsyncStorage,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { Picker } from "@react-native-picker/picker";
  ///App Colors///
  import Colors from "../../assets/theme/Colors";
  ///App Colors///
  import PrimaryButton from "../components/PrimaryButton";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  ////responsive width height code ///
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  ////responsive width height code ///
  
  const SplashScreen = ({ navigation }) => {
   
  useEffect(()=>{
    const userType = () => {
        AsyncStorage.getItem('UserType').then((accountType)=>{
console.log(accountType)
            if (accountType == "Teacher") {
              navigation.navigate("TeacherMainStack");
            } else if (accountType == "Student") {
              navigation.navigate("StudentStack");
            } else {
                navigation.navigate("WelcomeScreen");
            }
        })
    };
    setTimeout(() => {
        userType()
      
   }, 3000);
   
 
  },[])
 
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageViewStyle}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.imageStyle}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  export default SplashScreen;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      flex: 1,
    },
    imageViewStyle: {
      width: screenWidth * 0.6,
      height: screenHeight * 0.3,
      justifyContent: "center",
    },
    imageStyle: {
      width: screenWidth * 0.6,
      height: screenHeight * 0.3,
      justifyContent: "center",
    },
    buttonView: {
      width: screenWidth * 0.8,
      height: screenHeight * 0.3,
      justifyContent: "center",
      // padding: 20,
    },
    buttonSubView: {
      marginTop: 20,
    },
    pickerStyle: {
      width: wp("83%"),
      overflow: "hidden",
      borderWidth: 2,
      borderColor: Colors.secondary,
      borderRadius: 16,
      height: hp("7%"),
    },
    textInputSubViews: { alignSelf: "center", padding: 15 },
    textStyle: {
      fontSize: 15,
      color: Colors.secondary,
      fontWeight: "bold",
      paddingBottom: 10,
    },
  });
  