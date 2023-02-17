/** @format */

import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  AsyncStorage,
  ToastAndroid,
  Alert
} from "react-native";
import React,{useState,useEffect} from "react";
import PrimaryButton from "../../components/PrimaryButton";
////responsive width height code ///
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///
import Colors from "../../../assets/theme/Colors";
import * as Progress from "react-native-progress";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase.config";

const SocialScreen = () => {
  const[studentName,setStudentName]=useState('')
  const[studentId,setStudentId]=useState('')

  useEffect(()=>{
    AsyncStorage.getItem('studentName').then((val)=>{
      setStudentName(val)
      AsyncStorage.getItem('studentId').then((val)=>{
        setStudentId(val)
      })
    })
  },[])

  const AssignTask=(task)=>{
    const dbref= collection(db,'IndividualTasks')
    addDoc(dbref,{
      studentName,
      studentId,
      task,
      date: new Date().toDateString()
    }).then(()=>{
    Alert.alert('Task Assigned')
    })

  }
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text
          style={[
            styles.HeadingTextStyle,
            { color: Colors.secondary, fontSize: 25, textAlign: "center" },
          ]}
        >
          {studentName} Social Learning Participation Progress Report
        </Text>
        <View style={styles.mainView}>
          <View style={styles.textView}>
            <Text style={styles.HeadingTextStyle}>{studentName} Participation</Text>
          </View>

          <Progress.Pie
            progress={0.7}
            width={70}
            size={70}
            color={Colors.secondary}
            style={styles.progressStyle}
          />
        </View>
        <View style={styles.secondView}>
          <Text style={[styles.HeadingTextStyle, { color: Colors.secondary }]}>
            Assign New Task for {studentName}
          </Text>
          <PrimaryButton onPress={()=>{AssignTask('newTask')}} title={"Assign"} width={wp("30%")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SocialScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 20,
    height: screenHeight,
  },
  ProgressViewStyle: {
    width: wp("90%"),
    height: hp("20%"),

    justifyContent: "space-between",
    flexDirection: "row",
  },
  textProgressView: {
    // backgroundColor: "green",
  },
  progressStyle: {
    alignItems: "center",
  },
  HeadingTextStyle: {
    color: Colors.textColor,
    fontSize: 16,
    textAlign:'center',
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: hp("1%"),
  },
  mainView: {
    flexDirection: "row",
    // backgroundColor: "green",
    justifyContent: "space-between",
    marginTop: hp("10%"),
  },
  textView: {
    width: wp("50%"),

    justifyContent: "center",
  },
  secondView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: wp("10%"),
  },
});
