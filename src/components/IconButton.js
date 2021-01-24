import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import {
	TouchableNativeFeedback,
	TouchableOpacity,
} from "react-native-gesture-handler";

const IconButton = ({ name, style, onPress, color }) => {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<Icon name={name} size={24} color={color} />
			{/* {<Icon name={name} size={21} color={"#644c7c"} />} */}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default IconButton;
 