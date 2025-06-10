import { getCookie } from './get-cookie';

export const apiCall = async (route: string, method: string = 'GET', body?: object) => {
	const token = getCookie('noteify-session-token');

	const response = await fetch(`${import.meta.env.VITE_API_URL}${route}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: body ? JSON.stringify(body) : undefined
	});

	return response.json();
};
