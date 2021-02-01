import React from 'react';


import Gun from 'gun/gun';
import SEA from 'gun/sea';
import 'gun/lib/path'
import 'gun/lib/promise';
import 'gun/lib/radix.js';
import 'gun/lib/radisk.js';
import 'gun/lib/store.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store from 'gun/lib/ras.js';


const useGun = () => {
    const store = Store({AsyncStorage})
    const gun = Gun({
        store, 
        peers: ['https://marda.herokuapp.com/gun'],
      });
	const app = gun.get("chitchat");
	const me = gun.user();
    return {gun, app, me, SEA}
}

export default useGun;