import React from 'react';
import {Image, StyleSheet} from 'react-native';
const Logo = () => {
  return <Image source={require('../assets/logo.png')} style={styles.logo} />;
};

const styles = StyleSheet.create({
  logo: {
    padding: 10,
    margin: 30,
    marginBottom: 15,
  },
});

export default Logo;
