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
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { loginUser } = useContext(Authentication);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	return (
		<AuthContainer>
			<Logo/>

			<Title>Login</Title>
			<Input
				onChangeText={(text) => setUsername(text)}
				placeholder={"Type your username..."}
			/>
			{/* <Input
				onChangeText={(text) => setPassword(text)}
				placeholder={"Type your password..."}
				secureTextEntry
			/> */}
			<FilledButton
				onPress={async () => {
					try {
						setLoading(true);

						loginUser(JSON.parse(username));
					} catch (e) {
						console.log(e);
						setError(e);
					}
					setLoading(false);
				}}
			>
				Login
			</FilledButton>
			<Error>{error}</Error>

			<TextButton
				onPress={() => {
					navigation.navigate("Register");
				}}
				style={{ marginTop: 18 }}
			>
				Create an account...
			</TextButton>
			<Loading loading={loading} />
		</AuthContainer>
	);
};

export default LoginScreen;
