import React, { useState } from "react";
import { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, Dimensions } from "react-native";
import FilledButton from "../components/FilledButton";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import Title from "../components/Title";
import { Authentication } from "../contexts/Authentication";
import { User } from "../contexts/User";

const NotificationScreen = ({ navigation }) => {
	const {user, actions } = useContext(User);
	const { logout } = useContext(Authentication);
	const {username, keyPair} = user;
	const {searchUser } = actions;

	return (
		<SafeAreaView style={styles.container}>
			<Title>Notifications</Title>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 20,
		flex: 1,
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

export default NotificationScreen;