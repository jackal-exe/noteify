import { useNavigate } from 'react-router-dom';
import { notification } from '../src/utils/toast';

export const useAuth = () => {
	const navigate = useNavigate();
	const removeCookie = () => {
		['noteify-session-token'].map((cookie) => (document.cookie = `${cookie}=; Max-Age=0; path=/`));
	};

	const checkToken = (response: { message: string; success: boolean }) => {
		return new Promise((resolve, reject) => {
			if (response.message == 'Invalid Token or Token Expires!') {
				removeCookie();
				notification.error(response.message);
				navigate('/signin');
			} else if (!response.success) {
				reject(response);
			} else {
				resolve(response);
			}
		});
	};

	return { checkToken };
};
