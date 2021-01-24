import WebviewCrypto from 'react-native-webview-crypto';
import 'react-native-get-random-values';

import React, {useMemo, useReducer, useState, useEffect} from 'react';
import {View, StyleSheet, ActionSheetIOS} from 'react-native';

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


const APP_NAME = "chitchat"
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

	const sleep = (milliseconds) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	  }
	  

	const createAccount = async (username) => {
		
		await SEA.pair().then((key) => {
			gun.get("#").get("chitchat/profile").put({username:username, pub: key.pub, status: 'active'});
			loginUser(key);
		});
	};
	

	const getUsername = () => {
		return new Promise((resolve, reject) => {
			gun.user().get({"*": "chitchat/profile"}).once((res) => {
				if (res) {
					resolve(res);
				}
				reject()
			});
		}); 	
	};

	const loginUser = async (keypair) => {

		gun.user().auth(keypair);
		gun.get("#").get("chitchat/profile").once(data => {
			gun.back().once((k) => {console.log(k)})
			console.log(data)
			const user = { username: data.username, keypair: keypair };
			dispatch({
				type: ACTIONS.ADD_USER,
				payload: user,
			});
			AsyncStorage.setItem("user", JSON.stringify(user));
		})

	
		

		
		
	};

	const logout = () => {
		gun.user().leave();
		AsyncStorage.removeItem("user");
		dispatch({ type: ACTIONS.REMOVE_USER });
	};


	const addFriend = (pub) => {
		gun.user(`${pub}`).map().on(d => {console.log(d)})
		

	};

	const auth = useMemo(() => ({
		createAccount: createAccount,

		loginUser: loginUser,

		logout: logout,
	}));

	const userActions = useMemo(() => ({
		addFriend: addFriend
	}))

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
				<Root.Navigator screenOptions={{ headerShown: false , animationEnabled: false}}>
					{state.user ? (
						<Root.Screen name={"Main"}>
							{() => (
								<User.Provider value={{user: state.user, userActions}}>
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
