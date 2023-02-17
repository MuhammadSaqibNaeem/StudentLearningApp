/** @format */

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
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

const WelcomeScreen = ({ navigation }) => {
  const [accountType, setAccountType] = useState("");

  const AccountType = () => {
    if (accountType == "Teacher") {
      navigation.navigate("TeacherLoginScreen");
    } else if (accountType == "Student") {
      navigation.navigate("StudentLoginScreen");
    } else {
      Alert.alert("Please Chose Your Account Type");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageViewStyle}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.imageStyle}
        />
      </View>

      <View style={[styles.textInputSubViews, { width: wp("88%") }]}>
        <View style={styles.pickerStyle}>
          <Picker
            selectedValue={accountType}
            onValueChange={(value) => setAccountType(value)}
            style={{ width: wp("78%"), alignSelf: "center" }}
            mode="dropdown"
          >
            <Picker.Item label="Please Select Your Account Types" value="" />
            <Picker.Item label="Teacher" value="Teacher" />
            <Picker.Item label="Student" value="Student" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonView}>
        <View style={styles.buttonSubView}>
          <PrimaryButton title={"Next"} onPress={AccountType} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

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
