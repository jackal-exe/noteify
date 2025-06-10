import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Layout } from '../components/Layout';
import { apiCall } from '../utils/api-call';
import { notification } from '../utils/toast';

const initialError = {
	username: '',
	email: '',
	phoneNumber: '',
	password: ''
};

const formData = {
	username: '',
	password: '',
	email: '',
	phoneNumber: '',
	role: 'user'
};

const Register = () => {
	const navigate = useNavigate();
	const { checkToken } = useAuth();
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({ ...formData });
	const [error, setError] = useState({ ...initialError });

	const validateSubmit = () => {
		if (!form.username || error.username) return 'Please check your username field.';
		if (!form.password || error.password) return 'Please check your password field.';
		if (!form.email || error.email) return 'Please check your email field.';
		if (!form.phoneNumber || error.phoneNumber) return 'Please check your phone number field.';
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const errorMsg = validateSubmit();
		if (errorMsg) return notification.error(errorMsg);

		try {
			setLoading(true);
			const response = await apiCall('/user', 'POST', form);
			await checkToken(response);
			setForm({ ...formData });
			setError({ ...initialError });
			navigate('/signin');
			notification.success(response.message);
		} catch (error) {
			notification.error((error as Error).message || 'Network error!');
		} finally {
			setLoading(false);
		}
	};

	const setFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const setErrors = (event: React.ChangeEvent<HTMLInputElement>, message: string | null) => {
		setError({ ...error, [event.target.name]: message });
	};

	return (
		<Layout>
			<div className="flex h-screen w-full flex-col items-center justify-center gap-10">
				<span className="font-bold tracking-[10px] text-white uppercase">Welcome to NoteIfy</span>
				<form className="flex w-full max-w-[400px] flex-col gap-4" onSubmit={handleSubmit}>
					<Input
						type="input"
						name="username"
						label="Username"
						elementId="username"
						value={form.username}
						placeholder="Your username"
						error={error.username}
						onInput={(event) => {
							!/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{6,21}$/.test(event.target.value)
								? setErrors(event, 'username must be an alphanumeric.')
								: setErrors(event, '');
						}}
						onChange={(event) => setFormData(event)}
					/>
					<Input
						type="password"
						name="password"
						label="Password"
						elementId="password"
						value={form.password}
						placeholder="Your password"
						error={error.password}
						onInput={(event) => {
							!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W|_]){6,21}.*$/.test(event.target.value)
								? setErrors(
										event,
										'password must have mininum 1 uppercase, 1 lowercase, 1 number, 1 special characters'
									)
								: setErrors(event, '');
						}}
						onChange={(event) => setFormData(event)}
					/>
					<Input
						type="email"
						name="email"
						label="Email"
						elementId="email"
						value={form.email}
						placeholder="Your email"
						error={error.email}
						onInput={(event) => {
							!/^[\w-.]+@([\w-]+\.)[\w-]{2,4}$/.test(event.target.value)
								? setErrors(event, 'email not valid.')
								: setErrors(event, '');
						}}
						onChange={(event) => setFormData(event)}
					/>

					<Input
						type="text"
						name="phoneNumber"
						label="Phone Number"
						elementId="phone-number"
						value={form.phoneNumber}
						placeholder="Your phone number"
						error={error.phoneNumber}
						onInput={(event) => {
							isNaN(event.target.value as unknown as number) &&
								(event.target.value = event.target.value.slice(0, -1));
							!/^[0-9]{10,12}$/.test(event.target.value)
								? setErrors(event, 'phone number not valid.')
								: setErrors(event, '');
						}}
						onChange={(event) => setFormData(event)}
					/>
					<button disabled={loading} className="bg-primary rounded px-4 py-2 text-white" type="submit">
						Create Account
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
	value: string;
	elementId: string;
	placeholder: string;
	error: boolean | string;
	onInput: (_data: React.ChangeEvent<HTMLInputElement>) => void;
	onChange: (_data: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, name, label, value, elementId, placeholder, onInput, onChange, error }: Input) => {
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
				value={value}
				placeholder={placeholder}
				onInput={onInput}
				onChange={onChange}
			/>
			{error ? <span className="text-red-500">{error}</span> : null}
		</div>
	);
};

export default Register;
