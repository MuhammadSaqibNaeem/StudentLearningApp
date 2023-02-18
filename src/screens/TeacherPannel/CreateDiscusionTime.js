/** @format */

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
  AsyncStorage,
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
import { addDoc, collection, collectionGroup } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
const CreateDiscusionTime = () => {
  const [classTime, setClassTime] = useState("");
  const AssignTask = () => {
    const dbref = collection(db, "AllStudentDiscussionTime");
    addDoc(dbref, {
      task: "Discussion Time",
      discussionTime: classTime,
      date: new Date().toDateString(),
    }).then(() => {
      Alert.alert("Task Assigned");
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.SecondContainer}>
        <Text style={styles.TextStyle}>Discussion Time</Text>

        <View style={[styles.secondView, { top: 10, flexDirection: "column" }]}>
          <View style={styles.textInputSubViews}>
            <TextInputCom
              text={"Select Time"}
              placeholder={"Enter Your Classroom Time"}
              borderWidth={2}
              borderRadius={16}
              value={classTime}
              onChangeText={(value) => setClassTime(value)}
            />
          </View>
          <PrimaryButton
            onPress={() => {
              AssignTask();
            }}
            title={"Create"}
            width={wp("25%")}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateDiscusionTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
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
  textInputSubViews: { alignSelf: "center", padding: 15 },
});
