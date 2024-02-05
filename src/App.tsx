import React, { useState } from 'react';
import Form from './components/Form';
import Result from './components/Result';

interface Element {
	value: string;
	valid: boolean;
}

export interface Data {
	nickname: Element;
	email: Element;
	password: Element;
	passwordRepeat: Element;
	text: Element;
}

const App: React.FC = () => {
	const [isEnded, setIsEnded] = useState<boolean>(false);
	const [data, setData] = useState<Data>({
		nickname: {
			value: '',
			valid: false,
		},
		email: {
			value: '',
			valid: false,
		},
		password: {
			value: '',
			valid: false,
		},
		passwordRepeat: {
			value: '',
			valid: false,
		},
		text: {
			value: '',
			valid: true,
		},
	});

	return (
		<>
			{!isEnded ? (
				<Form
					data={data}
					setData={setData}
					setIsEnded={setIsEnded}
				/>
			) : (
				<Result data={data} />
			)}
		</>
	);
};

export default App;
