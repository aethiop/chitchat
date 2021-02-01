import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, FlatList } from "react-native";
import FilledButton from "../components/FilledButton";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import Title from "../components/Title";
import Card from "../components/Card";
import { Authentication } from "../contexts/Authentication";
import { User } from "../contexts/User";
import useGun from '../hooks/useGun'
const NotificationScreen = ({ navigation }) => {
	const {user, actions } = useContext(User);
	const { logout } = useContext(Authentication);
	const {username, keyPair} = user;
	const {searchUser } = actions;
	const {gun, app, SEA , me} = useGun();

	const [notifications, setNotifications] = useState([]);
	const [refreshing, setRefreshing] = useState(false);




	useEffect(() => {
		gun.get("@"+user.keyPair.pub).get("requests").map().once(ack => {
			console.log("CHANGED")

			console.log("KE: ", ack)
			app.get("users").get(ack).once(data => {

			})
		}, [])
	})
	const renderNotification = ({item}) => {
		return <Card style={styles.notification}>{item[1]} from {item[0]}</Card>
	}

	


	return (
		<SafeAreaView style={styles.container}>
			<Title>Notifications</Title>
			<FlatList
				data={notifications}
				extraData={refreshing}
				keyExtractor={(item, index)=> index.toString()}
				renderItem={renderNotification}
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
});

export default NotificationScreen;