import React, { useState } from 'react';
import { Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import aws256 from 'aes256'

const App = () => {
  // barcodeRecognised = ({barcodes}) => {
  //   barcodes.forEach(barcode => console.warn(barcode.data));
  // }
  const [isread, setIsread] = useState(false);

  return (
    <RNCamera
      ref={ref => {
        this.camera = ref;
      }}
      style={{
        flex: 1,
        width: '100%'
      }}
      onBarCodeRead={(scan) => {
        if (!isread) {
          setIsread(true);
          const array = scan.data.split(":");
          var username = array[0];
          var token = array[1];
          console.log(scan.data);
          axios.post( "/verifyToken", {
            username: username,
            key: token
          })
            .then(res => {
              if (res.data === true) {
                Alert.alert(
                  "Success",
                  "Student is Authenticated to enter the Campus", [
                  {
                    text: "OK",
                    onPress: () => setIsread(false)
                  }
                ]
                )
              }
              else {
                Alert.alert(
                  "Invalid QR Code",
                  "This QR Code is Invalid", [
                  {
                    text: "OK",
                    onPress: () => setIsread(false)
                  }
                ]
                )
              }
            })
            .catch(err => console.log(err));
        }
      }}
    ></RNCamera>


  )
}

export default App;