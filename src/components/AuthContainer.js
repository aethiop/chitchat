import React from 'react';
import {View, StyleSheet} from 'react-native';

const AuthContainer = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    paddingTop: 30,
    justifyContent: 'flex-start',
  },
});
export default AuthContainer;
