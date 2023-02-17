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
  Modal,
  FlatList,
  AsyncStorage,
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
import { Button } from "react-native-elements";

const TeacherHomeScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState();
  const [data, setData] = useState("");
  const [filterData, setFilterData] = useState("");
  const getStudents = () => {
    const newData = [];
    const dbref = collection(db, "studentsData");
    getDocs(dbref).then((docs) => {
      docs.docs.map((doc) => {
        newData.push(doc.data());
      });
    });
    setData(newData);
    setFilterData(newData);
  };
  useEffect(() => {
    getStudents();
  }, []);
  /////UserName From Firebase/////
  const profileData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      setUser(docSnap.data());
      AsyncStorage.setItem("TeacherName", docSnap.data().name).then(() => {
        AsyncStorage.setItem("TeacherSubject", docSnap.data().subjectName);

        console.log("datatatata====================", docSnap.data());
      });
    }
  };
  /////UserName From Firebase/////
  useEffect(() => {
    profileData();
  }, []);
  /////UserName From Firebase/////

  // const [data, setData] = useState([]);
  // const [filterData, setFilterData] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const usersCollection = await firestore()
  //       .collection("studentData")
  //       .onSnapshot((querySnapshot) => {
  //         const search = [];
  //         setSearch(search);
  //         const document = [];
  //         querySnapshot.forEach((doc) => {
  //           document.push(doc.data());
  //           search.push(doc.data());
  //         });

  //         setData(document);
  //         setFilterData(document);
  //       });
  //   };
  //   getData();
  // }, []);

  const searchName = (value) => {
    if (value == "") {
      setSearch(value);
      setFilterData(data);
    } else {
      const filter = data.filter((item) => {
        const name = item.name.toLowerCase();
        if (name.includes(value)) {
          return item.name;
        }
      });
      setFilterData(filter);
      setSearch(filter);
    }
  };
  const setStudentDetails = (item) => {
    const studentName = item.name;
    const studentId = item.uid;
    AsyncStorage.setItem("studentName", studentName).then(() => {
      AsyncStorage.setItem("studentId", studentId).then(() => {
        setModalVisible(!modalVisible);
      });
    });
  };

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

  const ModalScreen = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={[
                  styles.SecondView,
                  {
                    // backgroundColor: "red",
                    width: wp("75%"),
                  },
                ]}
              >
                <View style={styles.mainView}>
                  <View style={styles.textView}>
                    <Text style={styles.HeadingTextStyle}>Learning</Text>
                  </View>
                  <PrimaryButton
                    title={"More Info"}
                    width={wp("30%")}
                    height={hp("6%")}
                    onPress={() => {
                      navigation.navigate("LearningScreen");
                      setModalVisible(!modalVisible);
                    }}
                  />
                  <Progress.Pie
                    progress={0.7}
                    width={50}
                    color={Colors.secondary}
                  />
                </View>
                <View style={[styles.mainView, { marginTop: hp("2%") }]}>
                  <View style={styles.textView}>
                    <Text style={styles.HeadingTextStyle}>Social</Text>
                  </View>
                  <PrimaryButton
                    title={"More Info"}
                    width={wp("30%")}
                    height={hp("6%")}
                    onPress={() => {
                      navigation.navigate("SocialScreen");
                      setModalVisible(!modalVisible);
                    }}
                  />
                  <Progress.Pie
                    progress={0.5}
                    width={50}
                    color={Colors.secondary}
                  />
                </View>
                <View style={[styles.mainView, { marginTop: hp("2%") }]}>
                  <View style={styles.textView}>
                    <Text style={styles.HeadingTextStyle}>Cognitic</Text>
                  </View>
                  <PrimaryButton
                    title={"More Info"}
                    onPress={() => {
                      navigation.navigate("CogniticScreen");
                      setModalVisible(!modalVisible);
                    }}
                    width={wp("30%")}
                    height={hp("6%")}
                  />
                  <Progress.Pie
                    progress={0.9}
                    width={50}
                    color={Colors.secondary}
                  />
                </View>
              </View>
              <PrimaryButton
                title={"Close"}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                width={wp("30%")}
                height={hp("6%")}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
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
              <PrimaryButton title={"Add New Office Hours"} width={wp("80%")} />
            </View>
            <PrimaryButton title={"Add Content"} button={"outline"} />
            <View style={{ marginTop: 10 }}>
              <PrimaryButton
                title={"Create New Discussion Time"}
                width={wp("80%")}
              />
            </View>
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
                onPress={() => navigation.navigate("MessagesScreen")}
              />
            </View>
          </View>

          <View style={styles.StudentSearchView}>
            <View style={styles.searchView}>
              <Feather
                name="search"
                size={25}
                color={Colors.secondary}
                style={{ left: wp("3%") }}
              />
              <TextInput
                placeholder="Search"
                placeholderTextColor={Colors.secondary}
                style={styles.textInputStyle}
                value={search}
                onChangeText={(value) => searchName(value.toLowerCase())}
              />
            </View>
            <View style={styles.studentsListView}>
              {modalVisible ? (
                <ModalScreen />
              ) : (
                <View>
                  <FlatList
                    data={filterData}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setStudentDetails(item);
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "bold",
                              color: Colors.secondary,
                            }}
                          >
                            {item.name}
                          </Text>
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
            {/* {filterData == "" ? ( */}

            {/* ) : null} */}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  studentsListView: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Colors.secondary,
  },
});
