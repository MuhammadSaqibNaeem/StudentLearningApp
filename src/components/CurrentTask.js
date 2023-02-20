/** @format */

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../assets/theme/Colors";
import PrimaryButton from "../components/PrimaryButton";
import { Feather } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

////responsive width height code ///
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
const YourCurrentSchedule = ({ onPress, item }) => {
  console.log("Zoom Link==============", item);
  const navigation = useNavigation();
  function openUrl() {
    Linking.openURL(
      item.zoomLink.field1 || field2 || field3 || field4 || field5 || field6
    );
  }
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <View style={styles.SecondView}>
          <View style={[styles.mainView, { marginTop: hp("2%") }]}>
            <View style={styles.textView}>
              <Text style={styles.HeadingTextStyle}>{item.task}</Text>
            </View>
            <PrimaryButton
              title={"More Info"}
              width={wp("20%")}
              height={hp("5%")}
              fontSize={12}
              onPress={onPress}
            />
            <TouchableOpacity onPress={openUrl}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/zoom.png")}
              />
            </TouchableOpacity>
            <View style={styles.pieChartText}>
              <Progress.Pie
                progress={0.7}
                width={30}
                color={Colors.secondary}
                size={30}
              />
              <Text style={styles.pieChartTextStyle}>70 %</Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default YourCurrentSchedule;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 20,
    height: screenHeight,
  },
  HeadingTextStyleView: {
    width: screenWidth * 5,
    height: screenHeight * 0.1,
    justifyContent: "center",
    alignSelf: "center",
  },
  HeadingTextStyle: {
    color: Colors.textColor,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  SecondView: {
    width: wp("95%"),
    height: hp("10%"),
    justifyContent: "center",
    marginTop: hp("2%"),
    // backgroundColor: "red",
    alignSelf: "center",
  },
  StudentSearchView: {
    width: wp("90%"),
    height: hp("40%"),
    marginTop: 10,
    // backgroundColor: "red",
    // justifyContent: "center",
  },
  searchView: {
    width: wp("90"),
    height: hp("6%"),
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
    borderColor: Colors.secondary,
    borderWidth: 2,
  },
  textInputStyle: {
    width: wp("85%"),
    left: wp("5%"),
    fontSize: 15,
    fontWeight: "400",
    color: Colors.secondary,
  },
  mainView: {
    flexDirection: "row",
    // backgroundColor: "green",
    justifyContent: "space-between",
  },
  textView: {
    width: wp("40%"),
    justifyContent: "center",
  },
  pieChartText: {
    flexDirection: "column",
    width: wp("10%"),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  pieChartTextStyle: {
    fontWeight: "bold",
    color: Colors.secondary,
    alignSelf: "center",
  },
});
