/** @format */

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
////responsive width height code ///
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import PrimaryButton from "../../components/PrimaryButton";
import Colors from "../../../assets/theme/Colors";
import TextInputCom from "../../components/TextInputCom";
////responsive width height code ///
const UnitScreen = () => {
  const [content, setContent] = useState(false);
  const [taskProject, setTaskProject] = useState(false);
  const [classrooms, setClassRooms] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View>
          <View>
            <PrimaryButton
              title={"Content"}
              height={wp("20%")}
              onPress={() => setContent(!content)}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <PrimaryButton
              title={"Task/ Project"}
              height={wp("20%")}
              onPress={() => setTaskProject(!taskProject)}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <PrimaryButton
              title={"Classrooms"}
              height={wp("20%")}
              onPress={() => setClassRooms(!classrooms)}
            />
          </View>
        </View>
        {content == true ? (
          <View style={styles.SecondContainer}>
            <Text style={styles.TextStyle}>Content</Text>
            <View style={styles.secondView}>
              <Text
                style={[styles.HeadingTextStyle, { color: Colors.secondary }]}
              >
                Unit 3 Chapter 4
              </Text>
              <PrimaryButton title={"Assign"} width={wp("25%")} />
            </View>
            <View style={styles.secondView}>
              <Text
                style={[styles.HeadingTextStyle, { color: Colors.secondary }]}
              >
                Unit 3 Chapter 5
              </Text>
              <PrimaryButton title={"Assign"} width={wp("25%")} />
            </View>
            <View style={styles.secondView}>
              <Text
                style={[styles.HeadingTextStyle, { color: Colors.secondary }]}
              >
                Assignment Chapter 4
              </Text>
              <PrimaryButton title={"Assign"} width={wp("25%")} />
            </View>
          </View>
        ) : taskProject == true ? (
          <View style={styles.SecondContainer}>
            <Text style={styles.TextStyle}>New Project Task</Text>
            <View style={[styles.secondView, { top: 10 }]}>
              <Text
                style={[styles.HeadingTextStyle, { color: Colors.secondary }]}
              >
                Task
              </Text>
              <PrimaryButton title={"Assign"} width={wp("25%")} />
            </View>
          </View>
        ) : classrooms == true ? (
          <View style={styles.SecondContainer}>
            <Text style={styles.TextStyle}>Class Rooms</Text>

            <View
              style={[styles.secondView, { top: 10, flexDirection: "column" }]}
            >
              <View style={styles.textInputSubViews}>
                <TextInputCom
                  text={"Select Time"}
                  placeholder={"Enter Your Classroom Time"}
                  borderWidth={2}
                  borderRadius={16}
                  //   onChangeText={(value) => setEmail(value)}
                />
              </View>
              <PrimaryButton title={"Assign"} width={wp("25%")} />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UnitScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 20,
    height: screenHeight,
  },
  SecondContainer: {
    width: wp("90%"),
    height: hp("40%"),
    borderColor: Colors.secondary,
    borderWidth: 2,
    marginTop: hp("2%"),
    borderRadius: 20,
    justifyContent: "center",
  },
  TextStyle: {
    alignSelf: "center",
    color: Colors.secondary,
    fontWeight: "700",
    fontSize: 30,
  },
  secondView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("80%"),
    alignSelf: "center",
    marginTop: 5,
    // marginTop: wp("10%"),
  },
  HeadingTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: hp("1%"),
  },
  textInputSubViews: { alignSelf: "center", padding: 15 },
});
