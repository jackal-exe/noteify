import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Layout } from '../components/Layout';
import { apiCall } from '../utils/api-call';
import { notification } from '../utils/toast';

const Login = () => {
	const navigate = useNavigate();
	const { checkToken } = useAuth();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');

	const errors = () => {
		if (!email) return 'Please input your email.';
		if (emailError) return 'Please input your email correctly.';
		if (!password) return 'Please input your password.';
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const errorMessage = errors();
		if (errorMessage) return notification.error(errorMessage);

		const body = { email, password };
		try {
			const response = await apiCall('/auth/login', 'POST', body);
			await checkToken(response);
			const { accessToken, ...others } = response.result.data;
			document.cookie = `noteify-session-token=${accessToken}; path=/; samesite=lax; secure`;
			localStorage.setItem('user', JSON.stringify(others));
			notification.success('Success');
			navigate('/');
		} catch (error) {
			notification.error((error as Error).message || 'Network error!');
		}
	};

	return (
		<Layout>
			<div className="flex h-screen w-full flex-col items-center justify-center gap-10">
				<span className="font-bold tracking-[10px] text-white uppercase">Welcome to NoteIfy</span>
				<form className="flex w-full max-w-[400px] flex-col gap-4" onSubmit={handleSubmit}>
					<Input
						type="input"
						name="email"
						label="Email"
						elementId="email"
						placeholder="email"
						error={emailError}
						onInput={useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
							const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
							!EMAIL_REGEX.test(event.target.value) ? setEmailError('email not valid!') : setEmailError('');
						}, [])}
						onChange={useCallback((event) => setEmail(event.target.value), [])}
					/>
					<Input
						type="password"
						name="password"
						label="Password"
						elementId="password"
						placeholder="password"
						onChange={useCallback((event) => setPassword(event.target.value), [])}
					/>
					<button className="bg-primary rounded px-4 py-2 text-white" type="submit">
						Sign in
					</button>
				</form>
			</div>
		</Layout>
	);
};

interface Input {
	type: string;
	name: string;
	label: string;
	elementId: string;
	placeholder: string;
	error?: boolean | string;
	onInput?: (_data: React.ChangeEvent<HTMLInputElement>) => void;
	onChange: (_data: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = memo(({ type, name, label, elementId, placeholder, error, onInput, onChange }: Input) => {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={elementId} className="text-white">
				{label}
			</label>
			<input
				id={elementId}
				className={`border-primary rounded border-2 p-2 text-white duration-300 outline-none`}
				type={type}
				name={name}
				placeholder={placeholder}
				onInput={onInput}
				onChange={onChange}
			/>
			{error ? <span className="text-red-500">{error}</span> : null}
		</div>
	);
});

Input.displayName = 'Input';

export default Login;
