import Gun from "gun/gun";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, FlatList, Alert } from "react-native";
import Card from "../components/Card";
import FilledButton from "../components/FilledButton";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import Title from "../components/Title";
import { Authentication } from "../contexts/Authentication";
import { User } from "../contexts/User";
import useGun from "../hooks/useGun";

const ChatScreen = ({ navigation }) => {
	const {user} = useContext(User);
	const {gun, app, SEA , me} = useGun();
	const [loading, setLoading] = useState(false);
	const [friends, setFriends] = useState([])	
	// const {username, keyPair} = user;
	const [query, setQuery] = useState('');

	// const {searchFriend } = actions;


	const addFriend = () => {
		setLoading(true);
		console.log("LOADING")	
		app.get("users").map(user => user.username === query ? user: undefined).on(async (ack,key) => {

			//getting info from public graph
			const taggedUsername = ack.username;
			const pub = ack.pub;
			const username = taggedUsername.slice(0, -5);
			let hash = await SEA.work(key, null, null, {name: "SHA-256"})
			//creating certificate
			var certificate = await SEA.certify(pub, {".": {"*": `${hash}#${pub}/chatbox/`, "+": "*"}}, user.keyPair)

			//adding friend to my profile
			me.get("friends").set({username: taggedUsername, pub: pub, mycert: certificate})

			//sending a key to get our info as notification
			app.get("users").map(u => u.pub === user.keyPair.pub ? u : undefined).once((_, key)=> {
				gun.get("@"+pub).get("requests").set(key)
			});

			setFriends([...friends,[username, pub]]);
			setLoading(true);

		});

	}

	


	const renderFriend = ({item}) => {
		return <Card style={styles.friend}>{item[0]}</Card>
	}

	
	return (
		<SafeAreaView style={styles.container}>
			<Title>Chitchat</Title>
			<View  style={styles.addFriend}>
				<Input placeholder={"Username#0000"} style={{width: '80%'}} onChangeText={text=> {setQuery(text.toLowerCase())}}/>
				<IconButton style={{margin: 15}} name={"person-add"} onPress={() => {addFriend()}}/>
			</View>
			<FlatList
				data={friends}
				extraData={loading}
				keyExtractor={(item, index)=> index.toString()}
				renderItem={renderFriend}
			/>

			
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

	addFriend: {
		justifyContent: 'center',
		flexDirection: "row",
		marginBottom: 10
	},

	friend: {
		margin: 5,
		backgroundColor: 'tomato'
	}
});

export default ChatScreen;