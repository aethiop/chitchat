import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Card = ({base64Image, children, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    padding: 15,
    alignSelf: 'center',
    backgroundColor: '#e0d5d5',
    borderRadius: 21,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
    resizeMode: 'contain',
    borderRadius: 160,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default Card;