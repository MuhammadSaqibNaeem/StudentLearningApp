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
import Colors from "../../../assets/theme/Colors";
import PrimaryButton from "../../components/PrimaryButton";

import * as Progress from "react-native-progress";

////responsive width height code ///
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const TaskListScreen = ({ route }) => {
  const Data = route.params;
  console.log("Dataaaaaaaaaaaaaaa", Data);
  return (
    <SafeAreaView>
      <View style={styles.SecondView}>
        <View style={[styles.mainView, { marginTop: hp("2%") }]}>
          <View style={styles.textView}>
            <Text style={styles.HeadingTextStyle}>{Data.task}</Text>
          </View>

          <Progress.Pie
            progress={0.8}
            width={30}
            color={Colors.secondary}
            size={30}
          />
          <View style={styles.textView}>
            <Text style={styles.HeadingTextStyle}>From</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskListScreen;

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
});
