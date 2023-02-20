/** @format */

import { StyleSheet, Text, View, Image, Alert,FlatList,ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth, db } from "../../../firebase.config";
import { getDocs, query, where ,collection} from "firebase/firestore";
import Colors from "../../../assets/theme/Colors";

const RecievedMessages = ({ navigation }) => {
 
 
  //const image="Exists"
  const[loading,setLoading]=useState(true)
  const[messages,setMessages]=useState([])
  const arr=[]
  const getMessages=()=>{
    const uid=auth.currentUser.uid
    const dbRef=collection(db,"GroupMessages")
    const q=query(dbRef,where("sentTo",'array-contains',uid))
    getDocs(q).then((docsnap)=>{
docsnap.docs.map((docs)=>{
    //console.log("Contains")
    arr.push(docs.data())
// console.log(docs.data().sentImage)

setMessages(arr)
})
}).then(()=>{setLoading(false) 

})
}
 

  useEffect(()=>{
    getMessages()
  },[])
  const RenderItem=({item})=>{
    return(
        <View style={styles.listViewContainer}>

<View>
<View style={{flexDirection:'column',padding:5}}>

<Text style={[styles.messageText,{alignSelf:'center',margin:5}]}>Message:</Text>
   <Text style={[styles.messageText,{alignSelf:'center',color:Colors.secondary}]}>{item.message}</Text>
           </View>
                    <View style={{flexDirection:'column',padding:5}}>

         <Text style={[styles.messageText,{alignSelf:'center',margin:5}]}>Teacher Name:</Text>
            <Text style={[styles.messageText,{alignSelf:'center',color:Colors.secondary}]}>{item.teacherName}</Text>
                    </View>
                    <View style={{flexDirection:'column',padding:5}}>

            <Text style={[styles.messageText,{alignSelf:'center',margin:5}]}> Subject:</Text>
            <Text style={[styles.messageText,{alignSelf:'center',color:Colors.secondary}]}>{item.teacherSubject}</Text>
            </View>
            <View style={{flexDirection:'column',padding:5}}>

<Text style={[styles.messageText,{alignSelf:'center',margin:5}]}> Date:</Text>
<Text style={[styles.messageText,{alignSelf:'center',color:Colors.secondary}]}>{item.sentDate}</Text>
</View>
      </View> 
          
</View>
     
    )
  }
  const KeyExtractor=(item)=>{return item.message}
  return (
    <View style={styles.container}>
        {loading ? <View>
            <ActivityIndicator
        size={'large'}
        color={Colors.secondary}
        />
        </View>:
        <View
       
        >{
            messages!= null ?
           <View style={{  top: hp('5%'),}}>
         <FlatList
         contentContainerStyle={{paddingBottom:40}}
        data={messages}
        renderItem={RenderItem}
        keyExtractor={KeyExtractor}
        />
         </View>:
            <Text>You Don't Have Recieved Any Messages Yet</Text>
            }
            </View>
        }

  
     
    </View>
  );
}

export default RecievedMessages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  textStyle: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    color: Colors.textColor,
    fontWeight: "bold",
  },
 
  messageText:{
    alignContent: "center",
    fontSize: 18,
    color: Colors.textColor,
    fontWeight: "700",
},
  inputView: {
    width: wp("100%"),
    height: hp("15%"),
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: 200,
    height: 150,
    borderRadius:20
  },
  listViewContainer:{
    width:wp('90%'),
    height:hp('40%'), 
    borderBottomWidth: 1,
  
    marginTop:10,
    marginBottom:5,
  
    alignItems:'center',
    justifyContent:'space-evenly', 
}
})
