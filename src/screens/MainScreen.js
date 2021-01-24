import React from "react";
import { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import FilledButton from "../components/FilledButton";
import IconButton from "../components/IconButton";
import { Authentication } from "../contexts/Authentication";
import { User } from "../contexts/User";

const MainScreen = ({ navigation }) => {
	const { username, keypair } = useContext(User);
	const { logout } = useContext(Authentication);
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Welcome, {username}</Text>
			<Text style={styles.subtitle} selectable>
				{JSON.stringify(keypair)}
			</Text>
			<FilledButton
				onPress={() => {
					logout();
				}}
			>
				Log Out
			</FilledButton>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-evenly",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "100",
	},
});

export default MainScreen;