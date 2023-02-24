/** @format */
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  Alert,
  Pressable,
  FlatList,
  Linking,
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

const ClassContent = () => {
  const [data, setData] = useState("");
  console.log("datattttt====", data);
  const ContentData = async () => {
    const q = query(collection(db, "AllStudentContent"));
    const querySnapshot = await getDocs(q);
    let TaskList = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      TaskList.push(doc.data());
      setData(TaskList);
    });
  };
  /////UserName From Firebase/////
  useEffect(() => {
    ContentData();
  }, []);
  return (
    <SafeAreaView style={{ marginTop: "5%" }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.secondView}>
            <Text style={styles.TextStyle}>
              {`Class Task ` + item.addContent}
            </Text>
            <Text style={styles.TextStyle}>
              {`Teacher ` + item.teacherName}
            </Text>
            <Text style={styles.TextStyle}>{`Assign Date  ` + item.date}</Text>
            <Pressable
              style={{ alignSelf: "center", flexDirection: "row" }}
              onPress={() => {
                Linking.openURL(item.assignmentLink);
              }}
            >
              <Text style={styles.TextStyle}>
                {`${item.addContent}` + ` Assignment Link`}
              </Text>
              <Image
                source={require("../../../assets/Link.png")}
                style={{ width: 50, height: 50, left: 5, tintColor: "white" }}
              />
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>

    // <View style={styles.container}>

    // </View>
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
    backgroundColor: Colors.secondary,
    justifyContent: "center",
  },
  TextStyle: {
    fontSize: 20,
    color: Colors.background,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
