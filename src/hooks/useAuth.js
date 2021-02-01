import React, {useMemo, useReducer, useState, useEffect} from 'react';
import useGun from './useGun';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'react-test-renderer';
import Gun from 'gun/gun';




const ACTIONS = {
	ADD_USER: "add_user",
	REMOVE_USER: "remove_user",
};


const useAuth = () => {

    const {gun, app, me, SEA} = useGun();
      
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

	//Register an account using name
	const register = async (name) => {
		await SEA.pair().then(async key => {
			var created = false;
			console.log("KEY CREATED: ", key);
			login(key);

			//Tagging username with 4 digit random number
			const tagUser = (username) => {
				 return `${username}#${Math.floor(1000 + Math.random() * 9000)}`.toLowerCase();
			};

			var userTagged = tagUser(name);
				
			app.get("users").map().once(data => {
				if (!created && (userTagged === data.username)) {
					userTagged = tagUser(name);
				}
			});
			console.log("SETTING UP USERS")
			app.get("users").set({pub: key.pub, username: userTagged, epub: key.epub});
			console.log("SETTING -> PROFILE WITH {USERNAME, DATE CREATED}")
			me.get("profile").put({username: userTagged, dateCreated: new Date().toUTCString()})

		})
	};


	//Login using key
	const login = (key) => {
		me.auth(key);

		if (me.is) {

			console.log("PROFILE AUTHENTICATED")
			me.get("profile").get("username").on(username=> {
				console.log("PROFILE FOUND:", username)
				dispatch({type: ACTIONS.ADD_USER, payload: {username: username, keyPair: key}});
				AsyncStorage.setItem("user", JSON.stringify({username: username, keyPair: key}))
			});
		}
	};

	//Logout
	const logout = () => {
		console.log("REMOVED USER AND LOGGED OUT")
		dispatch({ type: ACTIONS.REMOVE_USER });
		AsyncStorage.removeItem("user");
		me.leave();
	};
	
	

	const auth = useMemo(() => ({
		register: register,

		login: login,

		logout: logout,
	}));
	useEffect(() => {
		
		AsyncStorage.getItem("user").then((user) => {
			if (!state.user && user) {
				dispatch({ type: ACTIONS.ADD_USER, payload: JSON.parse(user) });
			}
		});
	});
    
    return {auth, state, app, me, gun};
}

export default useAuth;