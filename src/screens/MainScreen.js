import React, { useState } from "react";
import { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import FilledButton from "../components/FilledButton";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import { Authentication } from "../contexts/Authentication";
import { User } from "../contexts/User";

const MainScreen = ({ navigation }) => {
	const { user: { username, keypair }, userActions } = useContext(User);
	const {addFriend } = userActions;
	const [pub, setPub] = useState('');
	const { logout } = useContext(Authentication);
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Welcome, {username}</Text>
			<Text style={styles.subtitle} selectable>
				{JSON.stringify(keypair)}
			</Text>
			<Input style={{ alignSelf: 'center', width: "90%" }} blurOnSubmit onChangeText={(text) => {
				setPub(text);

			}} />

			<FilledButton
				onPress={ () => {
					 addFriend(pub);
				}}
			>
				Add
			</FilledButton>
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