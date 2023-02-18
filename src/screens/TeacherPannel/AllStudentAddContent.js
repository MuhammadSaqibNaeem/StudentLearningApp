/** @format */
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
////responsive width height code ///
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///

const AllStudentAddContent = ({ navigation }) => {
  const [addContent, setAddContent] = useState("");
  const [user, setUser] = useState("");
  console.log(user);
  const profileData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      setUser(docSnap.data());
    }
  };
  /////UserName From Firebase/////
  useEffect(() => {
    profileData();
  }, []);

  const AssignContent = () => {
    const dbref = collection(db, "AllStudentContent");
    addDoc(dbref, {
      teacherName: user.name,
      addContent,
      date: new Date().toDateString(),
    }).then(() => {
      Alert.alert("Unit Assigned");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.textInputSubViews, { width: wp("88%") }]}>
        <View style={styles.pickerStyle}>
          <Picker
            selectedValue={addContent}
            onValueChange={(value) => setAddContent(value)}
            style={{ width: wp("78%"), alignSelf: "center" }}
            mode="dropdown"
          >
            <Picker.Item label="Please Select Your Content" value="" />
            <Picker.Item label="Unit 2" value="Unit 2" />
            <Picker.Item label="Unit 3" value="Unit 3" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonView}>
        <View style={styles.buttonSubView}>
          <PrimaryButton title={"Assign"} onPress={AssignContent} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllStudentAddContent;

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
    marginTop: -100,
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
