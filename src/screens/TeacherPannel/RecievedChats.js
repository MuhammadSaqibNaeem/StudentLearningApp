/** @format */

 /** @format */

 import {
   StyleSheet,
   Text,
   View,
   Image,
   FlatList,
   ToastAndroid,
   ActivityIndicator,
   AsyncStorage,
   Alert,
 } from "react-native";
 import React, { useEffect, useRef, useState } from "react";
 import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp,
 } from "react-native-responsive-screen";


 import {
   collection,
   getDocs,
   query,
   where,
   addDoc,
   updateDoc,
   getDoc,
 } from "firebase/firestore";
 import { auth, db } from "../../../firebase.config";

import PrimaryButton from "../../components/PrimaryButton";
import TextInputCom from "../../components/TextInputCom"; 
import Colors from "../../../assets/theme/Colors";
 const RecievedCommunication = ({ navigation, route }) => {
   const ref = useRef();
  
   const [data, setData] = useState("");
   const [reply, setReply] = useState({});
   const [name, setName] = useState("");

   const [userId, setUserId] = useState("");
   const [recieverName, setRecieverName] = useState("");
   const [loading, setLoading] = useState(false);
   const onChangeText = (message, text) => {
     setReply((values) => ({
       [message]: text,
     }));
   };
   const checkMessages = async () => {
     const document = [];
     const userid = auth.currentUser.uid;
     const docref = collection(db, "IndividualMessages");
    const q = query(docref, where("status", "==", "unread"));
     getDocs(q).then((docsnap) => {
       docsnap.docs.map((doc) => {
         document.push(doc.data());
         setData(document);
       });
     });
   };
   useEffect(() => {
     checkMessages();
   }, []);
   const sendReply =async (item, index) => {
    const recieverName= await AsyncStorage.getItem('TeacherName')
      console.log(item)
     const message = item.message;
     const senderID = item.senderID;
     const sendDate = item.sendDate;
     const myreply = reply[index];
     const userId = auth.currentUser.uid;
     const docref = collection(db, "IndividualMessages");
     const q1 = query(
       docref,
       where("message", "==", message),
       where("senderID", "==", senderID)
     );
     getDocs(q1)
       .then((c) => {
         c.docs.map((doc) => {
           if (doc.exists) {
             const recievedDate = new Date().toDateString();
            
             updateDoc(doc.ref, {
               reply: myreply,
               recieverName,
               recievedDate,
               status:'read'
               
             }).then(() => {
               setReply("");
               setLoading(false);
               checkMessages();
              Alert.alert('Reply Sent')
             });
           }
         });
       })
       .catch((err) => {
         console.log(err);
       });
   };
   const RenderItem = ({ item, index }) => {
     return (
       <View style={styles.listViewContainer}>
         <View>
           <View style={{ flexDirection: "row" }}>
             <Text
               style={[
                 styles.messageText,
                 { alignSelf: "flex-end", marginRight: 5 },
               ]}
             >
               Student Name:
             </Text>
             <Text style={[styles.messageText, { alignSelf: "flex-end" }]}>
               {item.senderName}
             </Text>
           </View>
         </View>
         <View style={styles.rightView}>
           <Text style={[styles.messageText, { alignSelf: "flex-end" }]}>
             {item.message}
           </Text>
           <Text style={{ fontSize: 12, alignSelf: "flex-end" }}>
             {" "}
             {item.sendDate}
           </Text>
         </View>
         <View style={styles.textInputMainView}>
           <View
             ref={ref}
             key={index}
             style={[styles.inputView, { top: hp("5%"), alignSelf: "center" }]}
           >
             <TextInputCom
               text={"Reply"}
               placeholder={"Enter Your Reply"}
               borderWidth={2}
               padding={5}
               height={hp("12%")}
               textAlignVertical={"top"}
               borderRadius={16}
               value={reply[index] || ""}
               onChangeText={(value) => onChangeText(index, value)}
             />
           </View>
           {
            loading  && <ActivityIndicator
            ref={ref}
            key={index}
            color={Colors.secondary}
            size={'large'}
            />
           }
           <View style={{ top: hp("12%") }}>
             <PrimaryButton
               title={"Send Reply"}
               iconColor={Colors.background}
               onPress={() => {
                 setLoading(true);
                 sendReply(item, index);
               }}
             />
           </View>
         </View>
       </View>
     );
   };
   const KeyExtractor = (item) => {
     return item.id;
   };
   return (
     <View style={styles.container}>
       <Text style={[styles.textStyle, { bottom: hp("2%") }]}>
         Recieved Responses
       </Text>
       <View style={{ height: hp("80%") }}>
         <FlatList
           data={data}
           renderItem={RenderItem}
           keyExtractor={KeyExtractor}
           showsVerticalScrollIndicator={false}
         />
       </View>
     </View>
   );
 };

 export default RecievedCommunication;

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
     top: hp("5%"),
     height: hp("10%"),
     justifyContent: "space-around",
     alignItems: "center",
     marginBottom: 5,
   },

   inputView: {
     width: wp("100%"),
     height: hp("8%"),
     justifyContent: "center",
     alignItems: "center",
     marginVertical: 10,
   },
   Image: {
     width: 250,
     height: 150,
     bottom: hp("20%"),
   },
   listViewContainer: {
     width: wp("90%"),
     height: hp("50%"),
     borderWidth: 1,
     borderRadius: 15,
     marginTop: 10,
     marginBottom: 5,
     padding: 5,
     borderColor: Colors.secondary,
   },
   rightView: {
     padding: 10,
     marginBottom: 10,
     borderRadius: 20,
     top: hp("3%"),
    //  width: wp('80%'),
     alignSelf: "flex-end",
     backgroundColor: Colors.secondary,
   },
   leftView: {
     padding: 10,
     marginTop: 10,
     borderRadius: 20,
     top: hp("3%"),
     alignSelf: "flex-start",
     backgroundColor: Colors.secondary,
   },
   messageText: {
     alignContent: "center",
     fontSize: 18,
   color: Colors.textColor,
     fontWeight: "700",
   },
});