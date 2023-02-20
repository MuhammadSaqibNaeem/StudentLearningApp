/** @format */

import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  Alert,
} from "react-native";
import React from "react";
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
const LearningScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {/* <Text style={[styles.HeadingTextStyle, { marginBottom: 20 }]}>
          Cognitive Learning
        </Text> */}
        <View style={styles.ProgressViewStyle}>
          <View style={styles.textProgressView}>
            <View style={styles.pieChartText}>
              <Progress.Pie
                progress={0.95}
                width={100}
                color={Colors.secondary}
                size={70}
                style={styles.progressStyle}
              />
              <Text style={styles.pieChartTextStyle}>90 %</Text>
            </View>
            <Text style={styles.HeadingTextStyle}>OverAll Progress</Text>
          </View>
          <View style={styles.textProgressView}>
            <View style={styles.pieChartText}>
              <Progress.Pie
                progress={0.7}
                width={100}
                color={Colors.secondary}
                size={70}
                style={styles.progressStyle}
              />
              <Text style={styles.pieChartTextStyle}>70 %</Text>
            </View>
            <Text style={styles.HeadingTextStyle}>Accuracy</Text>
          </View>
          <View style={styles.textProgressView}>
            <View style={styles.pieChartText}>
              <Progress.Pie
                progress={0.97}
                width={100}
                color={Colors.secondary}
                size={70}
                style={styles.progressStyle}
              />
              <Text style={styles.pieChartTextStyle}>97 %</Text>
            </View>
            <Text style={styles.HeadingTextStyle}>Current Grade</Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.textView}>
            <Text style={styles.HeadingTextStyle}>Unit 1</Text>
          </View>
          <PrimaryButton
            title={"More Info"}
            width={wp("30%")}
            height={hp("6%")}
            onPress={() => Alert.alert("Unit 1 Complete")}
          />
          <View style={styles.pieChartText}>
            <Progress.Pie progress={100} width={50} color={Colors.secondary} />
            <Text style={styles.pieChartTextStyle}>100 %</Text>
          </View>
        </View>
        <View style={[styles.mainView, { marginTop: hp("2%") }]}>
          <View style={styles.textView}>
            <Text style={styles.HeadingTextStyle}>unit 2</Text>
          </View>
          <PrimaryButton
            title={"More Info"}
            width={wp("30%")}
            height={hp("6%")}
            onPress={() => Alert.alert("Unit 2 Complete")}
          />
          <View style={styles.pieChartText}>
            <Progress.Pie progress={1} width={50} color={Colors.secondary} />
            <Text style={styles.pieChartTextStyle}>100 %</Text>
          </View>
        </View>
        <View style={[styles.mainView, { marginTop: hp("2%") }]}>
          <View style={styles.textView}>
            <Text style={styles.HeadingTextStyle}>unit 3</Text>
          </View>
          <PrimaryButton
            title={"More Info"}
            onPress={() => navigation.navigate("UnitScreen")}
            width={wp("30%")}
            height={hp("6%")}
          />
          <View style={styles.pieChartText}>
            <Progress.Pie progress={0.75} width={50} color={Colors.secondary} />
            <Text style={styles.pieChartTextStyle}>75 %</Text>
          </View>
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
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: hp("1%"),
  },
  mainView: {
    flexDirection: "row",
    // backgroundColor: "green",
    justifyContent: "space-between",
  },
  textView: {
    width: wp("25%"),
    justifyContent: "center",
  },
  pieChartText: {
    flexDirection: "column",
    width: wp("10%"),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  pieChartTextStyle: { fontWeight: "bold", color: Colors.secondary },
});
