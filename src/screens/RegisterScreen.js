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

const RegisterScreen = ({ navigation }) => {
	const { register } = useContext(Authentication);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	return (
		<AuthContainer>
			<Logo/>
			<Title>Register</Title>
			<Input
				onChangeText={(text) => setUsername(text)}
				placeholder={"Type your username..."}
			/>
			
			{/* <Input
				onChangeText={(text) => setPassword(text)}
				placeholder={"Type your password..."}
				secureTextEntry
			/> */}
			<Error>{error}</Error>

			<FilledButton
				onPress={() => {
					try {
					    register(username);
					} catch (e) {
						setError(e);
					}
				}}
			>
				Register
			</FilledButton>

			<TextButton
				onPress={() => {
					navigation.navigate("Login");
				}}
				style={{ marginTop: 18 }}
			>
				I already have an account
			</TextButton>
		</AuthContainer>
	);
};

export default RegisterScreen;
