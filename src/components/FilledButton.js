//Filled Button Component

import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const FilledButton = ({style, onPress, children}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#00E585',
    padding: 14,
    width: '50%',
    borderRadius: 28,
    shadowColor: '#3D3D3D',

    elevation: 14,
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FilledButton;
