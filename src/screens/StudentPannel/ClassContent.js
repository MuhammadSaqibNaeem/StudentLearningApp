/** @format */

import { auth, db } from "../../../firebase.config";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
///App Colors///
import Colors from "../../../assets/theme/Colors";
///App Colors///
import PrimaryButton from "../../components/PrimaryButton";
import { doc, getDocFromCache } from "firebase/firestore";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
////responsive width height code ///
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ClassContent = () => {
  const ContentData = async () => {
    const docRef = doc(db, "AllStudentContent");

    try {
      const doc = await getDocFromCache(docRef);
      console.log("Cached document data:", doc.data());
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };

  /////UserName From Firebase/////
  useEffect(() => {
    ContentData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.secondView}></View>
    </View>
  );
};

export default ClassContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondView: {
    width: wp("90%"),
    height: hp("20%"),
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.secondary,
  },
});
