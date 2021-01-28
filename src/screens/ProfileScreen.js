import React, { useState } from "react";
import { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, Dimensions } from "react-native";
import FilledButton from "../components/FilledButton";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import { Authentication } from "../contexts/Authentication";
import { User } from "../contexts/User";
import Icon from 'react-native-vector-icons/Ionicons'
const ProfileScreen = ({ navigation }) => {
	const {user, actions } = useContext(User);
	const { logout } = useContext(Authentication);
	const {username, keyPair} = user;
	const {searchUser } = actions;
	return (
		<SafeAreaView style={styles.container}>
			<View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between'}}>
			<Text style={styles.title}>{username}</Text>
			<IconButton name={'exit'} size={25} onPress={() => {
				logout();
			}}/>

			</View>
			<Text style={styles.title}></Text>
			<Text style={styles.subtitle} selectable={true} >
				{JSON.stringify(keyPair)}
			</Text>

	
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 20,
		flex: 1,
	},
	title: {
		textAlign: 'center',
		fontSize: 28,
		fontWeight: "bold",
	},
	subtitle: {

		fontSize: 18,
		fontWeight: "100",
	},
});

export default ProfileScreen;