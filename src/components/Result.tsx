import React from 'react';
import { Data } from '../App';
import styled from 'styled-components';

interface Props {
	data: Data;
}

const Text = styled.p`
	font-size: 2rem;
	font-family: sans-serif;
`;

const Result: React.FC<Props> = ({ data }) => {
	const { nickname, email, password, text } = data;
	return (
		<>
			<Text>Nickname: {nickname.value}</Text>
			<Text>E-mail: {email.value}</Text>
			<Text>Password: {password.value}</Text>
			<Text>Text: {text.value}</Text>
		</>
	);
};

export default Result;
