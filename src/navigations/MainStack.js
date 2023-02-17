/** @format */
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../../assets/theme/Colors";

import TeacherMainStack from "./TeacherStack";
import StudentStack from "./StudentStack";
import WelcomeScreen from "../screens/WelcomeScreen";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
const Stack = createStackNavigator();
const MainStack = () => {
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
      {user ? (
        <Stack.Group>
          <Stack.Screen
            name="TeacherMainStack"
            options={{
              headerShown: false,
            }}
            component={TeacherMainStack}
          />
          <Stack.Screen
            name="StudentStack"
            options={{
              headerShown: false,
            }}
            component={StudentStack}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="WelcomeScreen"
            options={{
              headerShown: false,
            }}
            component={WelcomeScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
