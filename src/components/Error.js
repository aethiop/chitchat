import React from "react";
import { Text, StyleSheet } from "react-native";

const Error = ({ children, style }) => {
	return <Text style={styles.error}>{children}</Text>;
};

const styles = StyleSheet.create({
	error: {
		color: "tomato",
		fontSize: 16,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 20,
	},
});

export default Error;