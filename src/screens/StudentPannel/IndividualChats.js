

/** @format */

import { StyleSheet, Text, View, Image,TouchableOpacity, ToastAndroid, ActivityIndicator, Alert,AsyncStorage,FlatList } from "react-native";
import React,{useEffect, useState} from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
 


import TextInputCom from "../../components/TextInputCom"; 
import { collection, getDocs,query, where,addDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import Colors from "../../../assets/theme/Colors";
import PrimaryButton from "../../components/PrimaryButton";

const IndividualStudentMessagesScreen = ({ navigation }) => {
  const[message,setMessage]=useState('');
const[teachersData,setTeachersData]=useState('')
  const[StudentName,setStudentName]=useState('')
  const[loading,setLoading]=useState(false)
  

const getTeachers=()=>{
    const newData= []
    const dbref= collection(db,'users')
    getDocs(dbref).then((docs)=>{
        docs.docs.map((doc)=>{
           newData.push(doc.data()) 
        })
    })
    setTeachersData(newData)
}
useEffect(()=>{

    getTeachers()
},[])

  useEffect(()=>{
    AsyncStorage.getItem('TeacherName').then((val)=>{
        setStudentName(val)
    })
    
  
  },[])
  

 
  const sendMessage=async()=>{
    
  
    const date= new Date().toDateString()
    console.log(date)
    addDoc(collection(db, "AllMessages"), {
    message,
    sendDate: date,
    teacherName,
    teacherId,
    subject: teacherSubject,
    type: 'individual',
    senderId: auth.currentUser.uid
    }).then(()=>{
      setLoading(false)
      setMessage('')
    Alert.alert('Message Sent To All')
    });
  
  
    
  }
  return (
    <View style={styles.container}>
       <Image
        style={styles.Image}
        source={require("../../../assets/logo.png")}
      />
     
      <View style={styles.textInputMainView}>
      {
            loading &&
              <ActivityIndicator
              size={'small'}
              color={Colors.secondary}
              />
            
          }
          <View style={{height:200,width:300}}>
<FlatList
data={teachersData}
renderItem={({item})=>{
    return(
        <TouchableOpacity>
            <View style={{flexDirection:'row'}}>
                <Text>{item.name}</Text>
                <Text>{item.subject}</Text>

            </View>
        </TouchableOpacity>
    )
}}

/>

          </View>

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

<TouchableOpacity

  onPress={() => {
    navigation.navigate("IndividualRecievedMessagesScreen");
  }}
>
  <Text
    style={[
      styles.textStyle,
      { fontSize: 20, color: Colors.secondary },
    ]}
  >
   View Individual Messages
  </Text>
</TouchableOpacity>
        </View>
        </View>

      </View>
    </View>
  );
};

export default IndividualStudentMessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "center",
    alignItems: "center",
    bottom:hp('10%')
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
    bottom: hp("20%"),
  },
});



