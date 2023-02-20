/** @format */

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import TextInputCom from "../../components/TextInputCom";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import Colors from "../../../assets/theme/Colors";
import PrimaryButton from "../../components/PrimaryButton";
import { Picker } from "@react-native-picker/picker";
import { async } from "@firebase/util";
const IndividualStudentMessagesScreen = ({ navigation, route }) => {
  const { name } = route.params;

  const [message, setMessage] = useState("");
  const [teachersData, setTeachersData] = useState([]);
  const [StudentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [recieverID, setRecieverID] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const getTeachers = async () => {
      const newData = [];
      const dbref = collection(db, "users");
      const docs = await getDocs(dbref);

      const data = docs.docs.map((doc) => {
        return doc.data();
      });

      setTeachersData(data);

      setLoadingData(false);
    };
    getTeachers();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("TeacherName").then((val) => {
      setStudentName(val);
    });
  }, []);

  const sendMessage = async () => {
    if (recieverID == "") {
      alert("Select A Teacher First");
    } else if (message == "") {
      alert("Enter A Message");
    } else {
      const date = new Date().toDateString();
      console.log(date);
      addDoc(collection(db, "IndividualMessages"), {
        message,
        sendDate: date,
        senderID: auth.currentUser.uid,
        recieverID,
        senderName: name,
        type: "individual",
        reply: "",
        status: "unread",
      }).then(() => {
        setLoading(false);
        setMessage("");
        Alert.alert("Message Sent ");
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.textInputMainView}>
        {loading && (
          <ActivityIndicator size={"small"} color={Colors.secondary} />
        )}
        <View
          style={{
            height: hp("20%"),
            borderBottomWidth: 2,
            borderColor: Colors.secondary,
            justifyContent: "center",
            padding: 10,
            width: wp("100%"),
          }}
        >
          {loadingData ? (
            <ActivityIndicator size={"small"} color={"blue"} />
          ) : (
            <View>
              <Text style={styles.textStyle}>Please Select A Teacher</Text>
              <FlatList
                data={teachersData}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedIndex(index);
                        setRecieverID(item.uid);
                      }}
                    >
                      <View
                        key={index}
                        style={{
                          backgroundColor:
                            index == selectedIndex
                              ? Colors.secondary
                              : Colors.background,

                          flexDirection: "row",
                          margin: 5,
                          elevation: 5,
                          shadowColor: Colors.secondary,
                          borderRadius: 10,
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            margin: 3,
                            padding: 3,
                            color:
                              index == selectedIndex
                                ? Colors.background
                                : Colors.textColor,
                          }}
                        >
                          {item.name}
                        </Text>

                        <Text
                          style={{
                            fontSize: 16,
                            margin: 3,
                            padding: 3,
                            color:
                              index == selectedIndex
                                ? Colors.background
                                : Colors.textColor,
                          }}
                        >
                          {item.subjectName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => {
                  return item.uid;
                }}
              />
            </View>
          )}
        </View>

        <View style={[styles.inputView, { top: hp("3%") }]}>
          <TextInputCom
            numLines={5}
            multiline={true}
            text={"Message"}
            placeholder={"Enter Your Message"}
            borderWidth={2}
            padding={10}
            height={hp("12%")}
            textAlignVertical={"top"}
            borderRadius={16}
            value={message}
            onChangeText={(value) => setMessage(value)}
          />
        </View>

        <View style={{ top: hp("8%") }}>
          <PrimaryButton
            title={"Send"}
            iconColor={Colors.background}
            onPress={() => {
              setLoading(true);
              sendMessage();
            }}
          />

          <View
            style={{
              top: hp("2%"),
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={styles.viewMessagesButton}
              onPress={() => {
                navigation.navigate("IndividualRecievedMessagesScreen");
              }}
            >
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 16,
                    color: Colors.secondary,
                    textAlign: "center",
                    margin: 5,
                  },
                ]}
              >
                Personal Messages
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewMessagesButton}
              onPress={() => {
                navigation.navigate("StudentMessagesScreen");
              }}
            >
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 16,
                    textAlign: "center",
                    color: Colors.secondary,
                  },
                ]}
              >
                All Messages
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default IndividualStudentMessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  textStyle: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    color: Colors.textColor,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
  textInputMainView: {
    width: wp("88%"),
    height: hp("30%"),
    justifyContent: "center",
    alignItems: "center",
    bottom: hp("10%"),
  },

  inputView: {
    width: wp("100%"),
    height: hp("15%"),
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: 250,
    height: 150,
    bottom: hp("20%"),
  },
  pickerStyle: {
    width: wp("83%"),
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 16,
    height: hp("7%"),
  },
  viewMessagesButton: {
    padding: 5,
    height: hp("8%"),
    justifyContent: "center",
    width: wp("30%"),
    margin: 5,
    borderWidth: 2,
    alignSelf: "flex-start",
    borderColor: Colors.secondary,
  },
});
