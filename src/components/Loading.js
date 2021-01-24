import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

const Loading = ({ loading, children }) => {
	if (!loading) {
		return <View />;
	}
	return (
		<View style={styles.overlay}>
			<View style={styles.container}>
				<ActivityIndicator size="small" color="#0000ff" />
				<Text style={styles.text}>{children}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFill,
		backgroundColor: "rgba(0,0,0,0.8)",
		alignItems: "center",
		justifyContent: "center",
	},

	container: {
		backgroundColor: "white",
		flexDirection: "row",
		padding: 20,
		borderRadius: 12,
	},

	text: {
		fontSize: 18,
		marginLeft: 10,
	},
});

export default Loading;