import React from 'react';


import Gun from 'gun/gun';
import SEA from 'gun/sea';
import 'gun/lib/unset';
import  'gun/lib/then';
import  'gun/lib/path';
import 'gun/lib/radix.js';
import 'gun/lib/radisk.js';
import 'gun/lib/store.js';
import asyncStore from 'gun/lib/ras.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useGun = () => {
    const gun = Gun({
        peers: ['https://marda.herokuapp.com/gun', "http://192.168.0.106:8765/gun"],
        store: asyncStore({AsyncStorage})
      });
	const app = gun.get("chitchat");
	const me = gun.user();
    return {gun, app, me, SEA}
}

export default useGun;