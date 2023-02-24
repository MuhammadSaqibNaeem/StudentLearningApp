/** @format */

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import TextInputCom from "../../components/TextInputCom";
import {
  collection,
  getDocs,
  query,
  doc,
  where,
  addDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import { async } from "@firebase/util";
import Colors from "../../../assets/theme/Colors";

const StudentMessagesScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMessages = async () => {
      const docRef = collection(db, "AllMessages");
      const docs = await getDocs(docRef);
      const data = docs.docs.map((doc) => {
        return doc.data();
      });
      setData(data);

      setLoading(false);
    };
    getMessages();
  }, []);
  const message = [];

  return (
    <View style={styles.container}>
      <View style={{ height: hp("5%"), top: hp("2%") }}>
        <Text style={[styles.textStyle, { alignSelf: "center" }]}>
          All Messages
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{ padding: 30 }}
        data={data}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <View style={styles.leftView}>
              <View
                style={{
                  flexDirection: "column",
                  margin: 5,
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.messageText, { alignSelf: "center" }]}>
                  Message:
                </Text>
                <Text
                  style={[
                    styles.messageText,
                    { color: Colors.background, alignSelf: "center" },
                  ]}
                >
                  {item.message}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  margin: 5,
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.messageText, { alignSelf: "center" }]}>
                  Date:
                </Text>
                <Text
                  style={[
                    styles.messageText,
                    { color: Colors.background, alignSelf: "center" },
                  ]}
                >
                  {item.sendDate}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  margin: 5,
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.messageText, { alignSelf: "center" }]}>
                  Teacher Name:
                </Text>
                <Text
                  style={[
                    styles.messageText,
                    { color: Colors.background, alignSelf: "center" },
                  ]}
                >
                  {item.teacherName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  margin: 5,
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.messageText, { alignSelf: "center" }]}>
                  Subject Name:
                </Text>
                <Text
                  style={[
                    styles.messageText,
                    { color: Colors.background, alignSelf: "center" },
                  ]}
                >
                  {item.subject}
                </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => {
          return item.senderId;
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default StudentMessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: Colors.background,
  },
  textStyle: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    color: Colors.textColor,
    fontWeight: "bold",
  },
  textInputMainView: {
    width: wp("88%"),
    height: hp("20%"),
    justifyContent: "center",
    alignItems: "center",
  },

  inputView: {
    width: wp("100%"),
    height: hp("8%"),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  Image: {
    width: 250,
    height: 150,
    bottom: hp("20%"),
  },
  listViewContainer: {
    width: wp("90%"),
    height: hp("50%"),
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    borderColor: Colors.secondary,
  },
  rightView: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    top: hp("3%"),
    // width: wp('80%'),
    alignSelf: "flex-end",
    backgroundColor: Colors.secondary,
  },
  leftView: {
    //height:hp('15%'),
    width: wp("90%"),
    padding: 5,
    borderRadius: 20,
    top: hp("2%"),
    alignItems: "center",

    justifyContent: "space-between",

    backgroundColor: Colors.secondary,
  },
  messageText: {
    alignContent: "center",
    fontSize: 15,
    color: Colors.textColor,
    fontWeight: "700",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",

    marginTop: 22,
  },
  modalView: {
    alignSelf: "center",
    height: hp("20%"),
    margin: 5,
    borderWidth: 1,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
