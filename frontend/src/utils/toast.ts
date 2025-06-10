export const notification = {
	success: (message: string) => {
		const oldToast = document.querySelector('.toast');
		oldToast && oldToast.remove();
		const toast = document.createElement('div');
		toast.className = 'toast';
		toast.style.backgroundColor = 'green';

		const toastContent = document.createElement('div');
		toastContent.textContent = message;
		toastContent.className = 'toast-content';

		toast.appendChild(toastContent);

		toast.onclick = () => {
			toast.style.animation = 'slide-out 0.2s forwards';
			setTimeout(() => toast.remove(), 1000);
		};

		setTimeout(() => toast.click(), 3000);

		document.body.appendChild(toast);
	},
	error: (message: string) => {
		const oldToast = document.querySelector('.toast');
		oldToast && oldToast.remove();
		const toast = document.createElement('div');
		toast.className = 'toast';
		toast.style.backgroundColor = 'red';

		const toastContent = document.createElement('div');
		toastContent.textContent = message;
		toastContent.className = 'toast-content';

		toast.appendChild(toastContent);

		toast.onclick = () => {
			toast.style.animation = 'slide-out 0.2s forwards';
			setTimeout(() => toast.remove(), 1000);
		};

		setTimeout(() => toast.click(), 3000);

		document.body.appendChild(toast);
	}
};
