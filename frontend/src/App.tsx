import { createBrowserRouter, redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { getCookie } from './utils/get-cookie';

const authLoader = async ({ request }: { request: Request }) => {
	const token = getCookie('noteify-session-token');
	const pathname = new URL(request.url).pathname;

	const isPathSignIn = pathname.startsWith('/signin');
	const isPathCreateAccount = pathname.startsWith('/create-account');

	if (!token && !isPathSignIn && !isPathCreateAccount) {
		throw redirect('/signin');
	}

	if (token && (isPathSignIn || isPathCreateAccount)) {
		throw redirect('/');
	}

	return null;
};

export const router = createBrowserRouter([
	{
		id: 'todo',
		path: '/',
		element: <Home />,
		loader: authLoader
	},
	{
		id: 'todo-personal',
		path: '/personal',
		element: <Home />,
		loader: authLoader
	},
	{
		id: 'todo-work',
		path: '/work',
		element: <Home />,
		loader: authLoader
	},
	{
		id: 'todo-groups',
		path: '/groups',
		element: <Home />,
		loader: authLoader
	},
	{
		id: 'todo-reminders',
		path: '/reminder',
		element: <Home />,
		loader: authLoader
	},
	{
		id: 'signin',
		path: '/signin',
		element: <Login />,
		loader: authLoader
	},
	{
		id: 'create-account',
		path: '/create-account',
		element: <Register />,
		loader: authLoader
	}
]);
