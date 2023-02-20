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
  KeyboardAvoidingView,
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
////responsive width height code ///
const UnitScreen = () => {
  const [content, setContent] = useState(false);
  const [taskProject, setTaskProject] = useState(false);
  const [classrooms, setClassRooms] = useState(false);
  const [zoomLink, setZoomLink] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
  });
  function handleFieldChange(field, value) {
    setZoomLink((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherSubject, setTeacherSubject] = useState("");
  const [classTime, setClassTime] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("studentName").then((val) => {
      setStudentName(val);
      AsyncStorage.getItem("studentId").then((val) => {
        setStudentId(val);
      });
    });
  }, []);
  const AssignTask = (task) => {
    const dbref = collection(db, "IndividualTasks");
    addDoc(dbref, {
      studentName,
      studentId,
      task,
      zoomLink,
      date: new Date().toDateString(),
    }).then(() => {
      Alert.alert("Task Assigned");
    });
  };
  const createClassTime = () => {
    AsyncStorage.getItem("TeacherName").then((val) => {
      setTeacherName(val);
      AsyncStorage.getItem("TeacherSubject")
        .then((val) => {
          setTeacherSubject(val);
        })
        .then(() => {
          const dbref = collection(db, "ClassRooms");
          addDoc(dbref, {
            studentName,
            studentId,
            teacherName,
            teacherId: auth.currentUser.uid,
            subject: teacherSubject,
            date: new Date().toDateString(),
            classTime,
          }).then(() => {
            Alert.alert("Task Assigned");
          });
        });
    });
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <ScrollView style={styles.container}>
          <View>
            <View>
              <PrimaryButton
                title={"Content"}
                height={wp("20%")}
                onPress={() => {
                  setContent(true);
                  setTaskProject(false);
                  setClassRooms(false);
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <PrimaryButton
                title={"Task/ Project"}
                height={wp("20%")}
                onPress={() => {
                  setContent(false);
                  setTaskProject(true);
                  setClassRooms(false);
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <PrimaryButton
                title={"Classrooms"}
                height={wp("20%")}
                onPress={() => {
                  setContent(false);
                  setTaskProject(false);
                  setClassRooms(true);
                }}
              />
            </View>
          </View>
          {content == true ? (
            <View style={{ marginTop: "10%" }}>
              <View style={styles.SecondContainer}>
                <Text style={styles.TextStyle}>Content</Text>
                <View style={styles.secondView}>
                  <Text
                    style={[
                      styles.HeadingTextStyle,
                      { color: Colors.secondary },
                    ]}
                  >
                    Unit 3 Chapter 4
                  </Text>
                  <PrimaryButton
                    onPress={() => {
                      AssignTask("Unit 3 Chapter 4");
                    }}
                    title={"Assign"}
                    width={wp("25%")}
                  />
                </View>

                <View style={styles.textInputSubViews}>
                  <TextInputCom
                    text={"Add Zoom Link"}
                    placeholder={"Enter Your Classroom Time"}
                    borderWidth={2}
                    borderRadius={16}
                    value={zoomLink.field1}
                    onChangeText={(text) => handleFieldChange("field1", text)}
                  />
                </View>
                <View style={styles.secondView}>
                  <Text
                    style={[
                      styles.HeadingTextStyle,
                      { color: Colors.secondary },
                    ]}
                  >
                    Unit 3 Chapter 5
                  </Text>
                  <PrimaryButton
                    onPress={() => {
                      AssignTask("Unit 3 Chapter 5");
                    }}
                    title={"Assign"}
                    width={wp("25%")}
                  />
                </View>
                <View style={styles.textInputSubViews}>
                  <TextInputCom
                    text={"Add Zoom Link"}
                    placeholder={"Enter Your Classroom Time"}
                    borderWidth={2}
                    borderRadius={16}
                    value={zoomLink.field2}
                    onChangeText={(text) => handleFieldChange("field2", text)}
                  />
                </View>
                <View style={styles.secondView}>
                  <Text
                    style={[
                      styles.HeadingTextStyle,
                      { color: Colors.secondary },
                    ]}
                  >
                    Assignment Chapter 4
                  </Text>
                  <PrimaryButton
                    onPress={() => {
                      AssignTask("Assignment Chapter 4");
                    }}
                    title={"Assign"}
                    width={wp("25%")}
                  />
                </View>
                <View style={styles.textInputSubViews}>
                  <TextInputCom
                    text={"Add Zoom Link"}
                    placeholder={"Enter Your Classroom Time"}
                    borderWidth={2}
                    borderRadius={16}
                    value={zoomLink.field3}
                    onChangeText={(text) => handleFieldChange("field3", text)}
                  />
                </View>
                <View style={{ marginBottom: "30%" }}></View>
              </View>
            </View>
          ) : taskProject == true ? (
            <View style={styles.SecondContainerView}>
              <Text style={styles.TextStyle}>New Project Task</Text>
              <View style={[styles.secondView, { top: 10 }]}>
                <Text
                  style={[styles.HeadingTextStyle, { color: Colors.secondary }]}
                >
                  Task
                </Text>
                <PrimaryButton
                  title={"Assign"}
                  onPress={() => {
                    AssignTask("Project Task");
                  }}
                  width={wp("25%")}
                />
              </View>
              <View style={styles.textInputSubViews}>
                <TextInputCom
                  text={"Add Zoom Link"}
                  placeholder={"Enter Your Classroom Time"}
                  borderWidth={2}
                  borderRadius={16}
                  value={zoomLink.field4}
                  onChangeText={(text) => handleFieldChange("field4", text)}
                />
              </View>
            </View>
          ) : classrooms == true ? (
            <View style={styles.SecondContainerView}>
              <Text style={styles.TextStyle}>Class Rooms</Text>
              <View
                style={[
                  styles.secondView,
                  { top: 10, flexDirection: "column" },
                ]}
              >
                <View style={styles.textInputSubViews}>
                  <TextInputCom
                    text={"Select Time"}
                    placeholder={"Enter Your Classroom Time"}
                    borderWidth={2}
                    borderRadius={16}
                    value={zoomLink.field5}
                    onChangeText={(text) => handleFieldChange("field5", text)}
                  />
                </View>
                <View style={styles.textInputSubViews}>
                  <TextInputCom
                    text={"Add Zoom Link"}
                    placeholder={"Enter Your Classroom Time"}
                    borderWidth={2}
                    borderRadius={16}
                    value={zoomLink.field6}
                    onChangeText={(text) => handleFieldChange("field6", text)}
                  />
                </View>
                <PrimaryButton
                  onPress={() => {
                    createClassTime();
                  }}
                  title={"Create"}
                  width={wp("25%")}
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
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
    borderColor: Colors.secondary,
    borderWidth: 2,
    marginTop: hp("2%"),
    borderRadius: 20,
    justifyContent: "center",
  },
  SecondContainerView: {
    borderColor: Colors.secondary,
    borderWidth: 2,
    marginTop: hp("2%"),
    borderRadius: 20,
    justifyContent: "center",
    height: hp("45%"),
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
