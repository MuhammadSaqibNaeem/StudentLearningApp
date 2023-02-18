/** @format */
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StudentLoginScreen from "../screens/StudentPannel/auth/LoginScreen";
import StudentSignUpScreen from "../screens/StudentPannel/auth/RegisterScreen";
import StudentHomeScreen from "../screens/StudentPannel/HomeScreen";
import IndividualRecievedMessagesScreen from "../screens/StudentPannel/IndividualRecievedChats";

import Colors from "../../assets/theme/Colors";
import IndividualStudentMessagesScreen from "../screens/StudentPannel/IndividualChats";
import StudentMessagesScreen from "../screens/StudentPannel/StudentMessagesScreen";
import YourCurrentSchedule from "../screens/StudentPannel/CurrentSchedule";
import TaskListScreen from "../screens/StudentPannel/TaskListScreen";
import ClassContentScreen from "../screens/StudentPannel/ClassContent";
import TeacherDiscussionTime from "../screens/StudentPannel/DiscussionTime";
const Stack = createStackNavigator();
const StudentStack = () => {
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
          headerShown: true,
          headerTitle: "Teacher Home Screen",
          headerTintColor: Colors.secondary,
          headerTitleAlign: "center",
          headerLeft: null,
        }}
        component={StudentHomeScreen}
      />
      <Stack.Screen
        name="IndividualRecievedMessagesScreen"
        options={{
          headerShown: true,
          headerTitle: "Student Communication",
        }}
        component={IndividualRecievedMessagesScreen}
      />
      <Stack.Screen
        name="IndividualStudentMessagesScreen"
        options={{
          headerShown: true,
          headerTitle: "Student Communication",
        }}
        component={IndividualStudentMessagesScreen}
      />
      <Stack.Screen
        name="StudentMessagesScreen"
        options={{
          headerShown: true,
          headerTitle: "Student Communication",
        }}
        component={StudentMessagesScreen}
      />
      <Stack.Screen
        name="YourCurrentSchedule"
        options={{
          headerShown: true,
          headerTitle: "Current Schedule",
        }}
        component={YourCurrentSchedule}
      />
      <Stack.Screen
        name="TaskListScreen"
        options={{
          headerShown: true,
          headerTitle: "Task List",
          headerTitleAlign: "center",
        }}
        component={TaskListScreen}
      />
      <Stack.Screen
        name="ClassContentScreen"
        options={{
          headerShown: true,
          headerTitle: "Class Assignment",
          headerTitleAlign: "center",
        }}
        component={ClassContentScreen}
      />
      <Stack.Screen
        name="TeacherDiscussionTime"
        options={{
          headerShown: true,
          headerTitle: "Discussion Time",
          headerTitleAlign: "center",
        }}
        component={TeacherDiscussionTime}
      />
    </Stack.Navigator>
  );
};

export default StudentStack;
