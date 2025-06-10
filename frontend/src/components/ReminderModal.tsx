import { Close } from '@mui/icons-material';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { ReminderType } from '../types';
import { apiCall } from '../utils/api-call';
import { notification } from '../utils/toast';

export const ReminderModal = ({
	mode,
	choosenReminder,
	handleCloseModal
}: {
	mode: string;
	choosenReminder: ReminderType | null;
	handleCloseModal: () => void;
}) => {
	const { checkToken } = useAuth();
	const initialState = {
		title: choosenReminder?.title ?? '',
		note: choosenReminder?.note ?? ''
	};
	const [form, setForm] = useState<Partial<ReminderType>>({
		...initialState
	});

	const setFormValues = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await apiCall('/reminder', 'POST', form);
			await checkToken(response);
			handleCloseModal();
			setForm({ ...initialState });
			notification.success(response.message);
		} catch (error) {
			notification.error((error as Error).message || 'Network error');
		}
	};

	const handleUpdate = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await apiCall(`/reminder/${choosenReminder?.id}`, 'PATCH', form);
			await checkToken(response);
			handleCloseModal();
			notification.success(response.message);
		} catch (error) {
			notification.error((error as Error).message || 'Network error');
		}
	};

	const deleteTask = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await apiCall(`/reminder/${choosenReminder?.id}`, 'DELETE');
			await checkToken(response);
			handleCloseModal();
			notification.success(response.message);
		} catch (error) {
			notification.error((error as Error).message || 'Network error');
		}
	};

	return (
		<div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm">
			<div
				className="fixed z-50 flex h-full w-full items-center justify-center"
				onClick={(event: React.MouseEvent<HTMLDivElement>) =>
					event.currentTarget == event.target && handleCloseModal()
				}>
				<div className="flex h-fit w-96 flex-col overflow-auto rounded-lg bg-gray-800 p-5">
					<div className="mb-4 flex items-center justify-between">
						<span className="text-xl font-medium text-gray-200">
							{mode === 'edit' ? 'Edit Reminder:' : 'Create Reminder:'}
						</span>
						<Close style={{ cursor: 'pointer', color: '#e5e7eb' }} onClick={handleCloseModal} />
					</div>
					<div className="mb-5 flex rounded-md border-2 border-gray-600 p-4">
						<input
							value={form.title}
							name="title"
							placeholder={'Title'}
							className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 outline-none"
							onChange={setFormValues}
						/>
					</div>
					<div className="mb-5 flex h-24 rounded-md border-2 border-gray-600 p-4">
						<textarea
							placeholder={'Note'}
							value={form.note}
							name="note"
							className="flex-1 resize-none bg-transparent text-gray-200 placeholder-gray-400 outline-none"
							onChange={setFormValues}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<button
							onClick={mode === 'edit' ? handleUpdate : handleSubmit}
							className="cursor-pointer rounded-lg bg-gray-700 px-4 py-2 text-gray-200 hover:bg-gray-600">
							{mode === 'edit' ? 'Save Changes' : 'Create Reminder'}
						</button>
						{mode == 'edit' && (
							<button
								onClick={deleteTask}
								className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-gray-200 hover:bg-red-700">
								Delete Task
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
