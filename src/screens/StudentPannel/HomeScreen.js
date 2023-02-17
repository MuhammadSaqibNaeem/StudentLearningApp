/** @format */
/*FireBase */
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { auth, db } from "../../../firebase.config";
import { signOut } from "firebase/auth";
/**FireBase */
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
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../../assets/theme/Colors";
import PrimaryButton from "../../components/PrimaryButton";
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
const TeacherHomeScreen = ({ navigation }) => {
  const [user, setUser] = useState("");

  /////UserName From Firebase/////
  const profileData = async () => {
    const docRef = doc(db, "studentsData", auth.currentUser.uid);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      setUser(docSnap.data());
      console.log("datatatata====================", docSnap.data());
    }
  };
  /////UserName From Firebase/////
  useEffect(() => {
    profileData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Entypo
            name="log-out"
            size={30}
            color={Colors.background}
            style={{ marginRight: wp("5%") }}
            onPress={() => decide()}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  const decide = () => {
    Alert.alert(
      "Log Out",
      "Are You Sure!",
      [
        {
          text: "Yes",
          onPress: () => logOut(),
          style: "yes",
        },
        { text: "No" },
      ],
      { cancelable: false }
    );
  };
  const logOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("WelcomeScreen");
        ToastAndroid.show("Logged Out", ToastAndroid.SHORT);
      })
      .catch((error) => {});
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <ScrollView style={styles.container}>
          <View style={styles.HeadingTextStyleView}>
            {user ? (
              <Text style={styles.HeadingTextStyle}>
                Welcome {user.name.substring(0, 20)}!
              </Text>
            ) : (
              <ActivityIndicator size={"large"} color={Colors.secondary} />
            )}
          </View>

          <View style={styles.SecondView}>
            <View style={{ marginBottom: 10 }}>
              <PrimaryButton
                title={" Your Current Schedule"}
                width={wp("80%")}
                onPress={() => navigation.navigate("YourCurrentSchedule")}
              />
            </View>

            <View
              style={{
                marginTop: 10,
                marginBottom: 20,
                height: hp("11%"),
                width: wp("60%"),
                alignSelf: "center",
                borderWidth: 4,
                borderColor: Colors.secondary,
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: wp("50%"),
                  alignSelf: "center",
                }}
              >
                <Text
                  style={[
                    styles.HeadingTextStyle,
                    { fontSize: 30, color: Colors.secondary },
                  ]}
                >
                  Messages
                </Text>
                <Entypo
                  name="message"
                  size={45}
                  color={Colors.secondary}
                  onPress={() => navigation.navigate("StudentMassagesScreen")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TeacherHomeScreen;

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
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  SecondView: {
    width: wp("90%"),
    height: hp("30%"),
    justifyContent: "center",
    marginTop: hp("10%"),
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
    width: wp("25%"),
    justifyContent: "center",
  },
});
