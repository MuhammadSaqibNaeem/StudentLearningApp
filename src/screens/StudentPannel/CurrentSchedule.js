/** @format */

import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
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
  FlatList,
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
import CurrentTask from "../../components/CurrentTask";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const YourCurrentSchedule = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState("");
  console.log("Taskkkkkkkkkkkkkkkkk", user);
  //////Messages Data///////
  const TaskList = async () => {
    const q = query(
      collection(db, "IndividualTasks"),
      where("studentId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    let TaskList = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());

      TaskList.push(doc.data());
      setUser(TaskList);
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      TaskList();
    }, 5000);
  }, []);
  return (
    <SafeAreaView>
 
      {!isLoading ? (
        <SafeAreaView style={{ marginTop: "5%" }}>
         {user ? <FlatList
            data={user}
            renderItem={({ item }) => (
              <CurrentTask
                item={item}
                onPress={() => navigation.navigate("TaskListScreen", item)}
              />
            )}
            keyExtractor={(item) => item.id}
          /> :
          <View >

            <Text style={styles.HeadingTextStyle}>No Current Schedules For You</Text>
          </View>
          }
        </SafeAreaView>
      ) : (
        <ActivityIndicator
          color={Colors.secondary}
          size={"large"}
          style={{ justifyContent: "center", marginTop: hp("40%") }}
        />
      )}
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
    width: wp("98%"),
    height: hp("10%"),
    justifyContent: "center",
    marginTop: hp("10%"),
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
    width: wp("25%"),
    justifyContent: "center",
    backgroundColor: "red",
  },
});
