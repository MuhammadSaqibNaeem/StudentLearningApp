/** @format */
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
  Image,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../../assets/theme/Colors";
import PrimaryButton from "../../components/PrimaryButton";
import * as DocumentPicker from "expo-document-picker";
import * as Progress from "react-native-progress";
import { WebView } from "react-native-webview";
////responsive width height code ///
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const TaskListScreen = ({ route }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [webView, setWebView] = useState(false);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (result.type === "success") {
        setSelectedDocument(result);
      } else {
        setSelectedDocument(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const UploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (result.type === "success") {
        setUploadFile(result);
      } else {
        setUploadFile(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Data = route.params;
  console.log("Dataaaaaaaaaaaaaaa", Data);
  return (
    <SafeAreaView>
      <View style={styles.SecondView}>
        <View style={[styles.mainView, { marginTop: hp("2%") }]}>
          <View style={styles.textView}>
            <Text style={styles.HeadingTextStyle}>{Data.task}</Text>
          </View>

          {selectedDocument == null ? (
            <View style={styles.pieChartText}>
              <Progress.Pie
                progress={0.8}
                width={30}
                color={Colors.secondary}
                size={30}
              />

              <Text style={styles.pieChartTextStyle}>80 %</Text>
            </View>
          ) : (
            <View style={styles.pieChartText}>
              <Progress.Pie
                progress={1}
                width={30}
                color={Colors.secondary}
                size={30}
              />
              <Text style={styles.pieChartTextStyle}>100 %</Text>
            </View>
          )}
          {/* <View style={styles.textView}>
            <Text style={styles.HeadingTextStyle}>From </Text>
          </View> */}
        </View>
        {selectedDocument == null ? (
          <PrimaryButton onPress={pickDocument} title={"Submit Your Task"} />
        ) : (
          <PrimaryButton
            onPress={() => Alert.alert("Thanks Your Task has been Submitted")}
            title={"Your Task Has Submitted"}
            width={wp("70%")}
          />
        )}
      </View>
      <View
        style={{
          alignSelf: "center",
          marginTop: "10%",
        }}
      >
        {selectedDocument && (
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Your Task File Details: {selectedDocument.name}
          </Text>
        )}
      </View>
      <View
        style={{
          marginTop: "5%",
          height: hp("80%"),
          justifyContent: "flex-start",
        }}
      >
        <PrimaryButton
          onPress={() => {
            setWebView(!webView);
          }}
          title={"Resources"}
          width={wp("70%")}
        />
        {webView == true ? (
          <View style={{ flex: 1, marginTop: "5%" }}>
            {uploadFile == "" ? (
              <PrimaryButton onPress={UploadFile} title={"Upload Your file"} />
            ) : (
              <PrimaryButton
                onPress={() => Alert.alert("Your File is Uploaded")}
                title={"Your file is Uploaded"}
                width={wp("60%")}
              />
            )}
            {/* <View style={{ marginTop: "1%" }}> */}
            <WebView
              style={styles.container}
              source={{
                uri: "https://m.youtube.com/results?sp=mAEA&search_query=mitosis ",
              }}
            />
            {/* </View> */}
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default TaskListScreen;

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
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  SecondView: {
    width: wp("85%"),
    height: hp("10%"),
    justifyContent: "center",
    marginTop: hp("2%"),
    // backgroundColor: "red",
    alignSelf: "center",
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
    width: wp("40%"),
    justifyContent: "center",
  },
  pieChartText: {
    flexDirection: "column",
    width: wp("10%"),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  pieChartTextStyle: {
    fontWeight: "bold",
    color: Colors.secondary,
    alignSelf: "center",
  },
});
