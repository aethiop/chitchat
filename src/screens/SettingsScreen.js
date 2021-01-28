import React, { useState } from "react";
import { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, FlatList } from "react-native";
import FilledButton from "../components/FilledButton";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import { Authentication } from "../contexts/Authentication";
import { User } from "../contexts/User";
import Card from "../components/Card";
import Title from "../components/Title";


const SettingsScreen = ({ navigation }) => {


	const {user, actions } = useContext(User);
	const [query, setQuery] = useState("");
	const [changed, setChanged] = useState(false);
	const [friends, setFriends] = useState([]);
	const {searchFriend} = actions;


	const renderCards = (friend) => {
		
		return (
		  <Card>
			{friend.item.pub}
		  </Card>
		);
	  };

	return (
		<SafeAreaView style={styles.container}>
			<Title>Settings</Title>			
			
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

export default SettingsScreen;