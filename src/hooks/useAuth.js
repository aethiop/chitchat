import React, {useMemo, useReducer, useState, useEffect} from 'react';
import useGun from './useGun';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'react-test-renderer';




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
			
			app.get("users").set({pub: key.pub, username: userTagged}).once(console.log);

			app.get("users").map().on(console.log)


			me.get("profile").get("username").put(name);
			me.get("profile").get("usernameTag").put(userTagged.slice(-4));

			me.get("profile").once(console.log)

			created=true;
			console.log(userTagged)
		})
	};


	//Login using key
	const login = (key) => {
		me.auth(key);
		if (me.is) {
			me.get("profile").get("username").on(username=> {
				dispatch({type: ACTIONS.ADD_USER, payload: {username: username, keyPair: key}});
				AsyncStorage.setItem("user", JSON.stringify({username: username, keyPair: key}))
			});
		}
	};

	//Logout
	const logout = () => {
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
			if (!state && user) {
				dispatch({ type: ACTIONS.ADD_USER, payload: JSON.parse(user) });
			}
		});
	});
    
    return {auth, state, app, me, gun};
}

export default useAuth;