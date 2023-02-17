/** @format */
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StudentLoginScreen from "../screens/StudentPannel/auth/LoginScreen";
import StudentSignUpScreen from "../screens/StudentPannel/auth/RegisterScreen";
import StudentHomeScreen from "../screens/StudentPannel/HomeScreen";
import IndividualRecievedMessagesScreen from "../screens/StudentPannel/IndividualRecievedChats";

import Colors from "../../assets/theme/Colors";

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
    
    </Stack.Navigator>
  );
};

export default StudentStack;
