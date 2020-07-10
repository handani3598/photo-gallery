import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    }) ();
  }, []);

  if (hasPermission === null) {
    return <View />; }
    if (hasPermission === false) {
      return <Text>Access to camera is denied!</Text>; }


  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1}} type={type} ref={ref => {setCameraRef(ref);}}>
        <View style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>

          <TouchableOpacity style={{ alignItems: 'center'}}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>

            <Text style={{ 
              fontSize: 18,
              paddingTop:7, 
              marginBottom: 20, 
              alignSelf: 'center', 
              fontWeight: 'bold', 
              backgroundColor: 'yellow',
              borderWidth: 3,
              borderRadius: 50,
              borderColor: 'white',
              height: 40,
              width:70,
              textAlign: 'center'}}>FLIP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignSelf: 'center'}}
           onPress={async() => {
            if(cameraRef){
              let photo = await cameraRef.takePictureAsync();
              console.log('photo', photo);
            }
          }}>
            <View style={{ 
               borderWidth: 2,
               borderRadius: 50,
               borderColor: 'white',
               height: 70,
               width:70,
               display: 'flex',
               justifyContent: 'center',
               marginBottom: 30,
               alignItems: 'center'}} >

               <View style={{
                 borderWidth: 7,
                 borderRadius: 50,
                 borderColor: 'yellow',
                 height: 60,
                 width:60,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
