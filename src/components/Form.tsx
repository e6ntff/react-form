import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Data } from '../App';

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	border-radius: 0.5rem;
	box-shadow: 0 0 0.5rem #999;
	padding: 1rem;
	background: #ccc;
`;

const Label = styled.label`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	font-family: sans-serif;
	font-size: 1.5rem;
`;

const Input = styled.input`
	background: #bbb;
	border: none;
	cursor: pointer;
	box-shadow: 0 0 0.5rem #777;
	font-size: 1.5rem;
	border: 0.25rem solid #0000;
	border-radius: 0.5rem;
	font-family: sans-serif;
	inline-size: 15rem;
	padding: 0.5rem;
	transition: 0.15s;

	&:not(:valid) {
		border-color: #f00;
	}

	&:valid {
		border-color: #0f0;
	}

	&:hover {
		background: #aaa;
	}
`;

const Button = styled.button`
	background: #bbb;
	border: none;
	cursor: pointer;
	box-shadow: 0 0 0.5rem #777;
	font-size: 2rem;
	font-family: sans-serif;
	padding: 0.5rem;
	transition: 0.15s;
	border-radius: 0.5rem;

	&:hover:not(:disabled) {
		background: #aaa;
	}
`;

const Warning = styled.p`
	font-family: sans-serif;
	text-align: center;
	font-size: 1.25rem;
	color: #f00;
`;

const TextArea = styled.textarea`
	max-inline-size: 15rem;
	min-inline-size: 15rem;
	max-block-size: 10rem;
	background: #0000;
	transition: 0.15s;

	&:hover {
		background: #aaa;
	}
`;

interface Props {
	data: Data;
	setData: Dispatch<SetStateAction<Data>>;
	setIsEnded: Dispatch<SetStateAction<boolean>>;
}

const Form: React.FC<Props> = ({ data, setData, setIsEnded }) => {
	const [isFormValid, setIsFormValid] = useState<boolean>(false);
	const [passwordsValid, setPasswordsValid] = useState<boolean>(true);

	const checkValidity = useCallback((data: Data) => {
		const valid =
			!Object.values(data).some((el) => !el.valid) && checkPasswords(data);
		setIsFormValid(valid);
	}, []);

	const changeText = useCallback((event: any) => {
		setData((prevData: Data) => ({
			...prevData,
			text: { valid: true, value: event.target.value },
		}));
	}, []);

	const changeData = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target;
			const { valid } = event.target.validity;
			setData((prevData: Data) => {
				const newData = {
					...prevData,
					[name]: {
						value: value,
						valid: valid,
					},
				};
				checkPasswords(newData);
				checkValidity(newData);
				return newData;
			});
		},
		[]
	);

	const checkPasswords = useCallback((data: Data) => {
		const valid = data.password.value === data.passwordRepeat.value;
		setPasswordsValid(valid);
		return valid;
	}, []);

	const handleFormSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setIsEnded(true);
		},
		[]
	);

	return (
		<StyledForm onSubmit={handleFormSubmit}>
			<Label>
				Nickname
				<Input
					onChange={changeData}
					name='nickname'
					required
					type='text'
					minLength={4}
					maxLength={16}
					value={data.nickname.value}
				/>
			</Label>
			<Label>
				E-mail
				<Input
					onChange={changeData}
					name='email'
					type='email'
					required
					pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
					value={data.email.value}
				/>
			</Label>
			<Label>
				Password
				<Input
					onChange={changeData}
					name='password'
					type='password'
					minLength={8}
					maxLength={16}
					required
					value={data.password.value}
				/>
			</Label>
			<Label>
				Repeat password
				<Input
					onChange={changeData}
					name='passwordRepeat'
					type='password'
					minLength={8}
					maxLength={16}
					required
					value={data.passwordRepeat.value}
				/>
			</Label>
			{!passwordsValid && <Warning>Passwords does not match</Warning>}
			<TextArea
				onChange={changeText}
				name='text'
				rows={10}
				cols={30}
			/>
			<Button
				type='submit'
				disabled={!isFormValid}
			>
				Submit
			</Button>
		</StyledForm>
	);
};

export default Form;
