import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import IconButton from "../components/IconButton";

const BottomBar = ({ state, descriptors, navigation }) => {
	return (
		<View
			style={{
				position: "absolute",
				bottom: Dimensions.get("window").width / 20,
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				height: 70,
				backgroundColor: "#262626",
				borderRadius: 35,
				width: "80%",
				marginLeft: 40,
				marginRight: 40,
				shadowColor: "#000",
				shadowOffset: {
					width: 1,
					height: 1,
				},
				shadowOpacity: 0.25,
				shadowRadius: 10,
			}}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];

				const IconNames = ["home"];

				const isFocused = state.index === index;
				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						key={index}
						activeOpacity={1}
						accessibilityRole="button"
						accessibilityStates={isFocused ? ["selected"] : []}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{
							width:
								(Dimensions.get("window").width * 13) / 25 / 2,
							height: 60,
							alignItems: "center",
							justifyContent: "center",
							flex: 1,
							flexDirection: "row",
							fontSize: 15,
						}}
					>
						<IconButton
							name={IconNames[index]}
							size={24}
							color={isFocused ? "white" : "grey"}
						/>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default BottomBar;