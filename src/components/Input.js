//Input Component

import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = ({style, onPress, placeholder, ...props}) => {
  return (
    <TextInput
      {...props}
      placeholder={placeholder}
      placeholderTextColor={'#a9a9a9'}
      style={[styles.input, style]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '70%',
    padding: 14,
    backgroundColor: '#D6D6D6',
    borderRadius: 28,
    margin: 5
  },
});

export default Input;
