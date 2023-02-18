/** @format */
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TeacherLoginScreen from "../screens/TeacherPannel/auth/LoginScreen";
import TeacherSignUpScreen from "../screens/TeacherPannel/auth/RegisterScreen";
import TeacherHomeScreen from "../screens/TeacherPannel/TeacherHomeScreen";
import Colors from "../../assets/theme/Colors";
import LearningScreen from "../screens/TeacherPannel/LearningScreen";
import SocialScreen from "../screens/TeacherPannel/SocialScreen";
import CogniticScreen from "../screens/TeacherPannel/CogniticScreen";
import UnitScreen from "../screens/TeacherPannel/UnitScreen";
import MessagesScreen from "../screens/TeacherPannel/MessagesScreen";
import RecievedCommunication from "../screens/TeacherPannel/RecievedChats";
import AddNewOfficeTime from "../screens/TeacherPannel/AddNewOfficeTime";
import AllStudentAddContent from "../screens/TeacherPannel/AllStudentAddContent";
import CreateDiscusionTime from "../screens/TeacherPannel/CreateDiscusionTime";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
const Stack = createStackNavigator();

const TeacherMainStack = () => {
  const [user, setUser] = useState("");
  const checkUser = () => {
    const subs = onAuthStateChanged(auth, (userExists) => {
      console.log(userExists);
      if (userExists) {
        setUser(userExists);
      } else {
        setUser("");
      }
      return subs;
    });
  };
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.secondary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          color: Colors.background,
        },
      }}
    >
{

  user ?
( <Stack.Group>
 <Stack.Screen
   name="TeacherHomeScreen"
   options={{
     headerShown: true,
     headerTitle: "Teacher Home Screen",
     headerTintColor: Colors.secondary,
     headerTitleAlign: "center",
     headerLeft: null,
   }}
   component={TeacherHomeScreen}
 />
 <Stack.Screen
   name="LearningScreen"
   options={{
     headerShown: true,
     headerTitle: "Student Learning Progress",
   }}
   component={LearningScreen}
 />
 <Stack.Screen
   name="SocialScreen"
   options={{
     headerShown: true,
     headerTitle: "Student Social Progress",
   }}
   component={SocialScreen}
 />
 <Stack.Screen
   name="CogniticScreen"
   options={{
     headerShown: true,
     headerTitle: "Student Cognitic Progress",
   }}
   component={CogniticScreen}
 />
 <Stack.Screen
   name="UnitScreen"
   options={{
     headerShown: true,
     headerTitleAlign: "center",
     headerTitle: "Unit Screen",
   }}
   component={UnitScreen}
 />
 <Stack.Screen
   name="MessagesScreen"
   options={{
     headerShown: true,
     headerTitleAlign: "center",
     headerTitle: "Messages",
   }}
   component={MessagesScreen}
 />
 <Stack.Screen
   name="RecievedChats"
   options={{
     headerShown: true,
     headerTitleAlign: "center",
     headerTitle: "Messages",
   }}
   component={RecievedCommunication}
 />
 <Stack.Screen
   name="AllStudentAddContent"
   options={{
     headerShown: true,
     headerTitleAlign: "center",
     headerTitle: "Add Content",
   }}
   component={AllStudentAddContent}
 />
 <Stack.Screen
   name="AddNewOfficeTime"
   options={{
     headerShown: true,
     headerTitleAlign: "center",
     headerTitle: "New Office Time",
   }}
   component={AddNewOfficeTime}
 />
 <Stack.Screen
   name="CreateDiscusionTime"
   options={{
     headerShown: true,
     headerTitleAlign: "center",
     headerTitle: "Create Discussion Time",
   }}
   component={CreateDiscusionTime}
 />
 

 </Stack.Group>)
:
(<Stack.Group>
<Stack.Screen
   name="TeacherLoginScreen"
   options={{
     headerShown: false,
   }}
   component={TeacherLoginScreen}
 />
 <Stack.Screen
   name="TeacherSignUpScreen"
   options={{
     headerShown: false,
   }}
   component={TeacherSignUpScreen}
 />
</Stack.Group>)
}


    
    
    </Stack.Navigator>
  );
};

export default TeacherMainStack;
