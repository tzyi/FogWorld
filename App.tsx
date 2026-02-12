import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps'; // 1. 匯入地圖組件

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider="google"
        initialRegion={{
          latitude: 25.0330,
          longitude: 121.5654,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});