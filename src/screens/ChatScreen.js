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
	const {user, actions} = useContext(User);
	const {gun, app, SEA , me} = useGun();
	const { logout } = useContext(Authentication);
	const [loading, setLoading] = useState(false);
	const [friends, setFriends] = useState([])
	// const {username, keyPair} = user;
	const [query, setQuery] = useState('');

	// const {searchFriend } = actions;


	const addFriend = () => {
		setLoading(true);
		console.log("LOADING")	
		app.get("profiles").map(user => user.username === query ? user: undefined).once(async ack => {

			const taggedUsername = ack.username;
			const pub = ack.pub;
			var username = ""
			setFriends([...friends,[taggedUsername, pub]])
			gun.user(pub).get("profile").get("username").on(ack => {
				console.log("FOUND BY KEY: ", ack)
				username += ack;
			})

			sendRequest(pub, userTagged)


			// sendRequest(ack.pub);
		});
		console.log("USER COULD NOT BE FOUND")

		setLoading(false);
		console.log(friends)
	}

	const sendRequest = async (pub, userTagged) => {
		var certificate = await SEA.certify([pub], [{"*": "chats/inbox", "+": "*"}], user.keyPair, null, {blacklist: 'blacklist'});
		console.log(certificate);
		const friend = gun.get(pub).put({username: userTagged, pub: pub});
		me.get("friends").set(friend).once(async (data, key) => {
			console.log("DATA: ", data)
			let hash = await SEA.work(key, null, null, {name: 'SHA-256'});

			app.get("#friendRequests").get(`${pub}#${hash}`).put(key);

		});
	}


	//@davey
		// gun.get("@"+pub).get("notifications").get("requests#").set(encrypted)
		// let message = 'hello world!!!'
		// let userPub = gun.user().is.pub
		// gun.user().get('messages').set(message).on(async (data,key)=> {
		// 	let hash = await SEA.work(key,null,null,{name:'SHA-256'})
		// 	gun.get('#messages').get(userPub+'#'+hash).put(key)
		// })

		// gun.get('#messages').get({'.':{'*':userPub}}).map().once(data => {
		// 	gun.user(userPub).get('messages').get(data).once(d=> {
		// 		console.log(d, d==message) // 'hello world!!!', true
		// 	})
		// })

	useEffect(() => {
		app.get("#friendRequests").get({".": {"*": user.keyPair.pub}}).map().once(data => {
			console.log(data);
		})
	})


	const renderFriend = ({item}) => {
		console.log(item)
		return <Card style={styles.friend}>{item[0]}</Card>
	}

	return (
		<SafeAreaView style={styles.container}>
			<Title>Chitchat</Title>
			<View  style={styles.addFriend}>
				<Input placeholder={"Username#0000"} style={{width: '80%'}} onChangeText={text=> {setQuery(text.toLowerCase())}} onSubmitEditting={() => {addFriend()}}/>
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