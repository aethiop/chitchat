//Input Component

import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = ({style, onPress, placeholder, ...props}) => {
  return (
    <TextInput
      {...props}
      placeholder={placeholder}
      style={[styles.input, style]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    padding: 14,
    backgroundColor: '#D6D6D6',
    borderRadius: 28,
    margin: 14,
  },
});

export default Input;
