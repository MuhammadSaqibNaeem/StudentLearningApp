/** @format */

import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  AsyncStorage,
} from "react-native";
import React, { useEffect,useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
////responsive width height code ///
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///
import Colors from "../../../assets/theme/Colors";
import * as Progress from "react-native-progress";
const LearningScreen = () => {
  const[studentName,setStudentName]=useState('')

  useEffect(()=>{
    AsyncStorage.getItem('studentName').then((val)=>{
      console.log(val)
      setStudentName(val)
    })
  },[])
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text
          style={[
            styles.HeadingTextStyle,
            { color: Colors.secondary, fontSize: 30 },
          ]}
        >
          {studentName} Cognitive Learning
        </Text>
        <View style={styles.mainView}>
          <View style={styles.textView}>
            <Text style={styles.HeadingTextStyle}>Working Progress</Text>
          </View>

          <Progress.Pie
            progress={0.5}
            width={70}
            size={70}
            color={Colors.secondary}
            style={styles.progressStyle}
          />
        </View>
        <View style={[styles.mainView, { marginTop: hp("5%") }]}>
          <View style={styles.textView}>
            <Text style={styles.HeadingTextStyle}>Problem Solving</Text>
          </View>

          <Progress.Pie
            progress={0.9}
            width={70}
            size={70}
            color={Colors.secondary}
            style={styles.progressStyle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LearningScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 20,
    height: screenHeight,
  },
  ProgressViewStyle: {
    width: wp("90%"),
    height: hp("20%"),

    justifyContent: "space-between",
    flexDirection: "row",
  },
  textProgressView: {
    // backgroundColor: "green",
  },
  progressStyle: {
    alignItems: "center",
  },
  HeadingTextStyle: {
    color: Colors.textColor,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: hp("1%"),
  },
  mainView: {
    flexDirection: "row",
    // backgroundColor: "green",
    justifyContent: "space-between",
    marginTop: hp("10%"),
  },
  textView: {
    width: wp("50%"),

    justifyContent: "center",
  },
});
