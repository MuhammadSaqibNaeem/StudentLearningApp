/** @format */
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TeacherLoginScreen from "../screens/TeacherPannel/auth/LoginScreen";
import TeacherSignUpScreen from "../screens/TeacherPannel/auth/RegisterScreen";
import StudentLoginScreen from "../screens/StudentPannel/auth/LoginScreen";
import StudentSignUpScreen from "../screens/StudentPannel/auth/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import StudentHomeScreen from "../screens/StudentPannel/HomeScreen";
import TeacherHomeScreen from "../screens/TeacherPannel/TeacherHomeScreen";
import Colors from "../../assets/theme/Colors";
import LearningScreen from "../screens/TeacherPannel/LearningScreen";
import SocialScreen from "../screens/TeacherPannel/SocialScreen";
import CogniticScreen from "../screens/TeacherPannel/CogniticScreen";
import UnitScreen from "../screens/TeacherPannel/UnitScreen";
import MessagesScreen from "../screens/TeacherPannel/MessagesScreen";
import RecievedCommunication from "../screens/TeacherPannel/RecievedChats";
const Stack = createStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
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
      <Stack.Screen
        name="WelcomeScreen"
        options={{
          headerShown: false,
        }}
        component={WelcomeScreen}
      />
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
      <Stack.Screen
        name="StudentLoginScreen"
        options={{
          headerShown: false,
        }}
        component={StudentLoginScreen}
      />
      <Stack.Screen
        name="StudentSignUpScreen"
        options={{
          headerShown: false,
        }}
        component={StudentSignUpScreen}
      />
      <Stack.Screen
        name="StudentHomeScreen"
        options={{
          headerShown: false,
        }}
        component={StudentHomeScreen}
      />
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
    </Stack.Navigator>
  );
};

export default MainStack;
