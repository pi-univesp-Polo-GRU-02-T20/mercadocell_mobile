import { NavigationProp } from '@react-navigation/native';
import React, { FC } from 'react';
import {  StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'https://datastudio.google.com/reporting/4a3190d6-300d-485c-943f-0ba2176bc3d7'}}
        containerStyle={styles.webview}
        originWhitelist={['*']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: '100%',
    height: '100%',
    backgroundColor:'#432'
  }
})

export default HomeScreen;
