import { Close } from '@mui/icons-material';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { ReminderTaskType } from '../types';
import { apiCall } from '../utils/api-call';
import { notification } from '../utils/toast';

export const AddReminder = ({
	formType,
	selectedTask,
	handleCloseModal
}: {
	formType: string | null;
	selectedTask: Partial<ReminderTaskType>;
	handleCloseModal: () => void;
}) => {
	const { checkToken } = useAuth();
	const initialState = {
		title: selectedTask.title || '',
		note: selectedTask.note || ''
	};
	const [form, setForm] = useState<Partial<ReminderTaskType>>({
		...initialState
	});

	const setFormValues = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
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
			const response = await apiCall(`/reminder/${selectedTask.id}`, 'PATCH', form);
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
			const response = await apiCall(`/reminder/${selectedTask.id}`, 'DELETE');
			await checkToken(response);
			handleCloseModal();
			notification.success(response.message);
		} catch (error) {
			notification.error((error as Error).message || 'Network error');
		}
	};

	// Generate date options
	const data: string[] = [];
	const nowDate = new Date();
	const endDate = new Date('2024-12-31');
	for (let date = nowDate; date <= endDate; date.setDate(date.getDate() + 1)) {
		data.push(date.toDateString().slice(4));
	}

	return (
		<div
			className="fixed z-50 flex h-full w-full items-center justify-center"
			onClick={(event: React.MouseEvent<HTMLDivElement>) =>
				event.currentTarget == event.target && handleCloseModal()
			}>
			<div className="flex h-fit w-96 flex-col overflow-auto rounded-lg bg-gray-800 p-5">
				<div className="mb-4 flex items-center justify-between">
					<span className="text-xl font-medium text-gray-200">
						{formType === 'edit' ? 'Edit Reminder:' : 'Create Reminder:'}
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
						onClick={formType === 'edit' ? handleUpdate : handleSubmit}
						className="cursor-pointer rounded-lg bg-gray-700 px-4 py-2 text-gray-200 hover:bg-gray-600">
						{formType === 'edit' ? 'Save Changes' : 'Create Reminder'}
					</button>
					{formType == 'edit' && (
						<button
							onClick={deleteTask}
							className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-gray-200 hover:bg-red-700">
							Delete Task
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
