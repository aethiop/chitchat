import React from 'react';
import {Text, StyleSheet} from 'react-native';
const Title = ({children, style}) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default Title;
