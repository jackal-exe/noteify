export const getCookie = (name: string) => {
	const cookieMatcher = new RegExp(name + '=([^;]+)');
	const cookie = cookieMatcher.exec(document.cookie);
	return cookie != null ? decodeURIComponent(cookie[1]) : null;
};
