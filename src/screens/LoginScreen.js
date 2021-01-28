import React, { useContext, useState } from "react";

import AuthContainer from "../components/AuthContainer";
import Logo from "../components/Logo";
import Title from "../components/Title";
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import FilledButton from "../components/FilledButton";
import { Authentication } from "../contexts/Authentication";
import Loading from "../components/Loading";
import Error from "../components/Error";
import IconButton from "../components/IconButton";
// use like


const LoginScreen = ({ navigation }) => {
	const [key, setKey] = useState("");
	const { login } = useContext(Authentication);
	
	const [error, setError] = useState("");

	return (
		<AuthContainer>
			<Logo/>

			<Title>Login</Title>
			<Input
				onChangeText={(text) => setKey(text)}
				placeholder={"Paste your key here..."}
			/>
			
			{/* <Input
				onChangeText={(text) => setPassword(text)}
				placeholder={"Type your password..."}
				secureTextEntry
			/> */}
			<Error>{error}</Error>
			<FilledButton
				onPress={async () => {
					try {
						console.log("FROM LOGIN SCREEN: ", key);
						login(JSON.parse(key));
					} catch (e) {
						console.log(e);
						setError(e.Error);
					}
				}}
			>
				Login
			</FilledButton>

			<TextButton
				onPress={() => {
					navigation.navigate("Register");
				}}
				style={{ marginTop: 18 }}
			>
				Create an account...
			</TextButton>

		</AuthContainer>
	);
};

export default LoginScreen;
