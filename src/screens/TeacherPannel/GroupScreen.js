/** @format */

import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    Pressable,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ToastAndroid,
    AsyncStorage,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  
  import { Entypo } from "@expo/vector-icons";
import Colors from "../../../assets/theme/Colors";
import TextInputCom from "../../components/TextInputCom"; 
 import PrimaryButton from "../../components/PrimaryButton";
  import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
 
import { addDoc, collection, getDocs } from "firebase/firestore";
import DropDownPicker from 'react-native-dropdown-picker';
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import { sendSignInLinkToEmail } from "firebase/auth";
import { db,auth } from "../../../firebase.config";
import { async } from "@firebase/util";

  const MessageSelectedStudents = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const[message,setMessage]=useState('')
    
    
    const data=[]
    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(data);
 
  const[loading,setLoading]=useState(false)

   
//     const setItems=(value)=>{
//    const newData=     data.filter((item)=>{item.label==value})
//    console.log(newData)
//     }

   
    const b=[]
  useEffect(()=>{
    const getStudentsData=()=>{
        const dbref= collection(db,"studentsData")
        getDocs(dbref).then((docsnap)=>{
            
            docsnap.docs.map((doc)=>{
                data.push({value:doc.data().uid,
                    label:doc.data().name,
                })
            })
        })

    }
    getStudentsData()},[])


const sendMessage=async()=>{
    let teacherName=''
    let teacherSubject=''
  AsyncStorage.getItem('TeacherName').then((vale)=>{

  
    teacherName=vale
    AsyncStorage.getItem('TeacherSubject').then((val)=>{
   teacherSubject=val
    }).then(()=>{
      
        const dbRef= collection(db,'GroupMessages')
        addDoc(dbRef,{
      teacherName,
      teacherSubject,
      teacherId: auth.currentUser.uid,
      sentTo:value,
      sentDate:new Date().toDateString(),
      message
        }).then(()=>{
          alert('Message Sent')
          setMessage('')
      
          setLoading(false)
        })
    }).catch((err)=>{console.log(err)
    setLoading(false);})
    setLoading(false)
  })


   
  
}

  
    return (
      <View style={styles.container}>
        <Image
          style={styles.Image}
          source={require("../../../assets/logo.png")}
        />
  <DropDownPicker
  style={{top: hp('7%'),width:wp('90%'),borderColor:Colors.secondary,alignSelf:'center'}}
  textStyle={{color:Colors.secondary}}
dropDownContainerStyle={{width: wp('85%'),alignSelf:'center',top:hp('15%'),borderColor:Colors.secondary}}


      open={open}
      value={value}
      items={items}

      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      multiple={true}
      min={0}
      max={5}
      mode={"BADGE"}
      closeAfterSelecting={true}
      placeholder={"Select One Or More Students"}
    />
      <View style={styles.textInputMainView}>
      {
            loading &&
              <ActivityIndicator
              size={'small'}
              color={Colors.secondary}
              />
            
          }
        <View style={[styles.inputView,{   top: hp('3%'),}]}>
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
           onPress={()=>{
            setLoading(true)
            sendMessage()}}
          />
         
        <View style={{
  top: hp("2%"),
  alignItems:'center'
}}>


        </View>
        </View>

      </View>
       
      </View>
    );
  };
  
  export default MessageSelectedStudents;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //alignItems: "center",
      //justifyContent: "center",
      backgroundColor: Colors.background,
    },
    textStyle: {
      alignContent: "center",
      justifyContent: "center",
      fontSize: 22,
      color: Colors.textColor,
      fontWeight: "bold",
    },
    textInputMainView: {
      width: wp("88%"),
      height: hp("30%"),
      alignSelf:'center',
      justifyContent: "center",
      alignItems: "center",
      top: hp("10%"),
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
     top: hp("5%"),
     alignSelf:'center'
    },
  
    //Modal Styles
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: hp("2%"),
    },
    modalView: {
      margin: 10,
      // borderWidth:5,
      borderRadius: 20,
      //borderColor: Colors.secondary,
      width: wp("90%"),
      height: hp("80%"),
      backgroundColor: Colors.background,
   //   justifyContent:'center'
  
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
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    modalImageHolderView: {
      padding: 5,
      justifyContent: "center",
      width: wp("75%"),
      height: hp("35%"),
      borderWidth: 2,
      borderColor: Colors.secondary,
    },
  });
  