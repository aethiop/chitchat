// Text Button Component

import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const TextButton = ({children, style, ...props}) => {
  return (
    <TouchableOpacity style={[style]} {...props}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
