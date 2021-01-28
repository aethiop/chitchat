import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "../screens/ChatScreen";
import NotificationScreen from "../screens/NotificationScreen";
import BottomBar from "../components/BottomBar";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
	return (
		<Tab.Navigator tabBar={(props) => <BottomBar {...props} />}>
			<Tab.Screen name="Chats" component={ChatScreen} />
			<Tab.Screen name="Notifications" component={NotificationScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
};
