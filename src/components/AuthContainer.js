import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

const AuthContainer = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    paddingTop: 50,
    justifyContent: 'flex-start',
  },
});
export default AuthContainer;
