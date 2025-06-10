import { Add, Close, Delete } from '@mui/icons-material';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { SubtaskType, TaskType } from '../types';
import { apiCall } from '../utils/api-call';
import { commonDate } from '../utils/date-formatter';
import { notification } from '../utils/toast';

export const TaskModal = ({
	mode,
	choosenTask,
	handleCloseModal
}: {
	mode: string;
	choosenTask: TaskType | null;
	handleCloseModal: () => void;
}) => {
	const { checkToken } = useAuth();
	const initialState = {
		title: choosenTask?.title ?? '',
		description: choosenTask?.description ?? '',
		deadline: choosenTask?.deadline ? commonDate(choosenTask?.deadline) : commonDate(new Date().toJSON()),
		subtasks: choosenTask?.subtasks ?? [],
		taskType: choosenTask?.taskType ?? 'Personal'
	};
	const [form, setForm] = useState<Partial<TaskType>>({
		...initialState
	});
	const [taskValues, setTaskValues] = useState<string>('');

	const setSubtasks = (subtasks: SubtaskType[]) => {
		setForm((previous) => ({ ...previous, subtasks }));
	};

	const setFormValues = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const handleAddNewSubtasksOption = () => {
		const currentTaskIndex = Array.from(form.subtasks ?? []).length + 1;

		if (taskValues) {
			const taskAfterAdded = [
				...Array.from(form.subtasks ?? []),
				{ title: `${currentTaskIndex}. ${taskValues}`, done: false }
			];
			setSubtasks(taskAfterAdded);
			setTaskValues('');
		}
	};

	const handleRemoveAddedTask = (taskName: string) => {
		const taskAfterRemoved = form.subtasks?.filter((subtask) => subtask.title != taskName) as SubtaskType[];
		setSubtasks(taskAfterRemoved);
	};

	const handleCheckedSubtasks = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, defaultChecked } = event.target;
		const updatedIsDoneTask = Array.from(form.subtasks ?? []).map((subtask) => {
			if (subtask.title == name) {
				return { title: subtask.title, done: defaultChecked ? false : true };
			}
			return subtask;
		});

		setSubtasks(updatedIsDoneTask as SubtaskType[]);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await apiCall('/todo', 'POST', form);
			await checkToken(response);
			setSubtasks([]);
			setForm({ ...initialState });
			notification.success(response.message);
		} catch (error) {
			notification.error((error as Error).message || 'Network error');
		}
	};

	const handleUpdate = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await apiCall(`/todo/${choosenTask?.id}`, 'PATCH', form);
			await checkToken(response);
			notification.success(response.message);
		} catch (error) {
			notification.error((error as Error).message || 'Network error');
		}
	};

	return (
		<div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm">
			<div
				id="modal"
				className="fixed z-50 flex h-full w-full items-center justify-center"
				onClick={(event: React.MouseEvent<HTMLDivElement>) =>
					event.currentTarget == event.target && handleCloseModal()
				}>
				<div className="flex h-96 w-96 flex-col overflow-auto rounded-lg bg-gray-800 p-5">
					<div className="mb-4 flex items-center justify-between">
						<span className="text-xl font-medium text-gray-200">
							{mode === 'edit' ? 'Edit Task:' : 'Create Task:'}
						</span>
						<Close style={{ cursor: 'pointer', color: '#e5e7eb' }} onClick={handleCloseModal} />
					</div>
					<div className="mb-5 flex rounded-md border-2 border-gray-600 p-4">
						<input
							value={form.title}
							placeholder={choosenTask?.title || 'Title'}
							name="title"
							className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 outline-none"
							onChange={setFormValues}
						/>
					</div>
					<div className="mb-5 flex h-24 rounded-md border-2 border-gray-600 p-4">
						<textarea
							value={form.description}
							placeholder={choosenTask?.description || 'Description'}
							name="description"
							className="flex-1 resize-none bg-transparent text-gray-200 placeholder-gray-400 outline-none"
							onChange={setFormValues}
						/>
					</div>
					<div className="mb-5 flex items-center justify-between">
						<span className="text-gray-200">List</span>
						<select
							value={form.taskType}
							name="taskType"
							className="rounded-md border-2 border-gray-600 bg-gray-700 p-2 text-gray-200"
							onChange={setFormValues}>
							{mode === 'edit' && choosenTask?.taskType && <option disabled>Current: {choosenTask?.taskType}</option>}
							<option value="Personal">Personal</option>
							<option value="Work">Work</option>
							<option value="Groups">Groups</option>
						</select>
					</div>
					<div className="mb-5 flex items-center justify-between">
						<span className="text-gray-200">Due Date</span>
						<input
							name="deadline"
							type="date"
							value={form.deadline}
							className="rounded-md border-2 border-gray-600 bg-gray-700 p-2 text-gray-200"
							onChange={setFormValues}
						/>
					</div>
					<div className="mb-4">
						<span className="font-medium text-gray-200">Subtasks:</span>
						<div className="mb-2 flex items-center border-b-2 border-gray-600 py-2">
							<Add
								onClick={handleAddNewSubtasksOption}
								className="mr-2 cursor-pointer"
								style={{ color: '#e5e7eb' }}
							/>
							<input
								type="text"
								placeholder="Add New Subtask"
								className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 outline-none"
								onChange={(event) => setTaskValues(event.target.value)}
								value={taskValues}
							/>
						</div>
						{Array.from(form.subtasks ?? []).map((subtask: SubtaskType, index: number) => (
							<div
								key={index}
								className="flex items-center justify-between gap-4 border-b-2 border-gray-600 py-2 text-gray-200">
								<div className="flex items-center gap-5">
									{mode == 'edit' && (
										<input
											type="checkbox"
											name={subtask.title}
											defaultChecked={subtask.done}
											onChange={handleCheckedSubtasks}
											className="rounded border-gray-600 bg-gray-700"
										/>
									)}
									<span className="w-[250px] text-start break-words">{subtask.title}</span>
								</div>
								<button onClick={() => handleRemoveAddedTask(subtask.title)}>
									<Delete style={{ color: '#e5e7eb' }} />
								</button>
							</div>
						))}
					</div>
					<button
						onClick={mode === 'edit' ? handleUpdate : handleSubmit}
						className="cursor-pointer rounded-lg bg-gray-700 px-4 py-2 text-gray-200 hover:bg-gray-600">
						{mode === 'edit' ? 'Save Changes' : 'Create Task'}
					</button>
				</div>
			</div>
		</div>
	);
};
