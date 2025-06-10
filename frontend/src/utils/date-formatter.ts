export const commonDate = (date: string) => {
	if (!date || isNaN(new Date(date).getTime())) return '';
	const getDate = new Date(date);
	const year = getDate.getFullYear();
	const month = String(getDate.getMonth() + 1).padStart(2, '0');
	const day = String(getDate.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};
