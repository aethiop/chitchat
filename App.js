import WebviewCrypto from 'react-native-webview-crypto';
import 'react-native-get-random-values';

import React, {useMemo, useReducer, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import Gun from 'gun/gun';
import SEA from 'gun/sea';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Authentication} from './src/contexts/Authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthNavigator} from './src/navigators/AuthNavigator';
import { MainNavigator } from "./src/navigators/MainNavigator";
import { User } from "./src/contexts/User";

const ACTIONS = {
	ADD_USER: "add_user",
	REMOVE_USER: "remove_user",
};

const Root = createStackNavigator();
const gun = Gun({
  peers: ['https://marda.herokuapp.com'],
});

const App = () => {
  const [state, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case ACTIONS.ADD_USER:
					return { ...state, user: { ...action.payload } };
				case ACTIONS.REMOVE_USER:
					return { ...state, user: undefined };
			}
		},
		{ user: undefined }
	);

	const createAccount = async (username) => {
		console.log(username);
		await SEA.pair().then((key) => {
			gun.get("profile/username").put({ username: username });
			loginUser(key);
		});
	};

	const loginUser = (keypair) => {
		gun.user().auth(keypair);
		gun.get("profile/username").once((res) => {
			const user = { username: res.username, keypair: keypair };
			dispatch({
				type: ACTIONS.ADD_USER,
				payload: user,
			});
			AsyncStorage.setItem("user", JSON.stringify(user));
		});
	};

	const logout = () => {
		gun.user().leave();
		AsyncStorage.removeItem("user");
		dispatch({ type: ACTIONS.REMOVE_USER });
	};

	const auth = useMemo(() => ({
		createAccount: createAccount,

		loginUser: loginUser,

		logout: logout,
	}));

	useEffect(() => {
		AsyncStorage.getItem("user").then((user) => {
			if (user) {
				dispatch({ type: ACTIONS.ADD_USER, payload: JSON.parse(user) });
			}
		});
	});


	return (
		<Authentication.Provider value={auth}>
			<NavigationContainer>
				<WebviewCrypto/>
				<Root.Navigator screenOptions={{ headerShown: false }}>
					{state.user ? (
						<Root.Screen name={"Main"}>
							{() => (
								<User.Provider value={state.user}>
									<MainNavigator></MainNavigator>
								</User.Provider>
							)}
						</Root.Screen>
					) : (
						<Root.Screen
							name="Authentication"
							component={AuthNavigator}
						/>
					)}
				</Root.Navigator>
			</NavigationContainer>
		</Authentication.Provider>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
