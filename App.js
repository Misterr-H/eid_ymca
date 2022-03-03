import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { api_url } from './config/Keys';
import axios from 'axios';
import CryptoJS from 'crypto-js';
const App = () => {
  // barcodeRecognised = ({barcodes}) => {
  //   barcodes.forEach(barcode => console.warn(barcode.data));
  // }
  const [isread, setIsread] = useState(false);
  const [data, setData] = useState({})
  const key = "himanshu"

  return (
    // <RNCamera
    //   ref={ref => {
    //     this.camera = ref;
    //   }}
    //   style={{
    //     flex: 1,
    //     width: '100%'
    //   }}
    //   onBarCodeRead={(scan) => {
    //     if (!isread) {
    //       setIsread(true);
    //       const array = scan.data.split(":");
    //       var username = array[0];
    //       var token = array[1];
    //       console.log(scan.data);
    //       axios.post(api_url + "/verifyToken", {
    //         username: username,
    //         key: token
    //       })
    //         .then(res => {
    //           if (res.data === true) {
    //             Alert.alert(
    //               "Success",
    //               "Student is Authenticated to enter the Campus", [
    //               {
    //                 text: "OK",
    //                 onPress: () => setIsread(false)
    //               }
    //             ]
    //             )
    //           }
    //           else {
    //             Alert.alert(
    //               "Invalid QR Code",
    //               "This QR Code is Invalid", [
    //               {
    //                 text: "OK",
    //                 onPress: () => setIsread(false)
    //               }
    //             ]
    //             )
    //           }
    //         })
    //         .catch(err => console.log(err));
    //     }
    //   }}
    // ></RNCamera>
    <>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          width: '100%'
        }}
        onBarCodeRead={(scan) => {
          var toshow = CryptoJS.AES.decrypt(scan.data, key).toString(CryptoJS.enc.Utf8);
          console.log(toshow)
          setData(JSON.parse(toshow))
          if (!isread) {
            setIsread(true);

            // Alert.alert(
            //   "Data",
            //   toshow, [
            //   {
            //     text: "OK",
            //     onPress: () => setIsread(false)
            //   }
            // ]
            // )
            // const array = scan.data.split(":");
            // var username = array[0];
            // var token = array[1];
            // console.log(scan.data);
            // axios.post(api_url + "/verifyToken", {
            //   username: username,
            //   key: token
            // })
            //   .then(res => {
            //     if (res.data === true) {
            //       Alert.alert(
            //         "Success",
            //         "Student is Authenticated to enter the Campus", [
            //         {
            //           text: "OK",
            //           onPress: () => setIsread(false)
            //         }
            //       ]
            //       )
            //     }
            //     else {
            //       Alert.alert(
            //         "Invalid QR Code",
            //         "This QR Code is Invalid", [
            //         {
            //           text: "OK",
            //           onPress: () => setIsread(false)
            //         }
            //       ]
            //       )
            //     }
            //   })
            //   .catch(err => console.log(err));

          }
        }}
      >
        <View style={{flex:1, width:'50%', height:'50%', alignSelf:'center', borderColor:'green', borderRadius:2}}></View>
      </RNCamera>
      <View style={{ padding: 9 }}>
        <Text>Scan Results:</Text>
        <Text>Name: {data.name}</Text>
        <Text>Father Name: {data.fname}</Text>
        <Text>Roll No.: {data.rn}</Text>
        <Text>Course: {data.course}</Text>
        <Text>Date of Birth: {data.dob}</Text>
        <Text>Valid Upto: {data.valid}</Text>
      </View>

    </>


  )
}

export default App;