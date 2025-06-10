import { Add, CalendarToday, Delete, KeyboardArrowRightOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { TaskType, UserType } from '../types';
import { apiCall } from '../utils/api-call';
import { commonDate } from '../utils/date-formatter';
import { notification } from '../utils/toast';
import { TaskModal } from './TaskModal';

export const Task = ({ user, tasks }: { user: UserType; tasks: TaskType[] }) => {
	const { checkToken } = useAuth();
	const [mode, setMode] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [choosenTask, setChoosenTask] = useState<TaskType | null>(null);

	const tasksCategory = (() => {
		const pathname = location.pathname;
		switch (pathname) {
			case '/personal':
				return 'Personal';
			case '/work':
				return 'Work';
			case '/groups':
				return 'Groups';
			default:
				return 'Tasks';
		}
	})();

	const tasksByCategory =
		tasksCategory != 'Tasks'
			? Array.from(tasks ?? []).filter((task) => task?.taskType?.toLowerCase() == tasksCategory.toLowerCase())
			: tasks;

	const handleOpenModal = (taskId?: number) => {
		if (taskId) {
			setChoosenTask(tasks.find((task) => task?.id === taskId) as TaskType);
			setMode('edit');
		} else {
			setMode('create');
		}
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setMode('');
		setChoosenTask(null);
		setIsModalOpen(false);
	};

	const handleCheckedTask = (event: React.ChangeEvent<HTMLInputElement>) => {
		const taskId = Number(event.target.getAttribute('data-id'));
		const isDone = event.target.checked;
		updateTask(taskId, { done: isDone });
		tasks?.forEach((task) => {
			if (task?.id == taskId) {
				task.done = isDone;
			}
		});
	};

	const updateTask = async (id: number, checked: { done: boolean }) => {
		try {
			const response = await apiCall(`/todo/${id}`, 'PATCH', checked);
			await checkToken(response);
			notification.success(response.message);
		} catch (error) {
			notification.error((error as Error).message || 'Network error');
		}
	};

	const deleteTask = async (id: number) => {
		try {
			const response = await apiCall(`/todo/${id}`, 'DELETE');
			await checkToken(response);
			notification.success(response.message);
		} catch (error) {
			notification.error((error as Error).message || 'Network error');
		}
	};

	return (
		<React.Fragment>
			<div className="flex w-full">
				<div className="flex w-full min-w-[500px] flex-col">
					<div className="mx-5 flex items-center justify-between">
						<h1 className="m-0 flex-1 text-4xl font-semibold text-gray-200">{tasksCategory}</h1>
						<span className="text-lg text-white">
							<strong>Welcome </strong>
							{user.username}
						</span>
					</div>
					<div className="flex-1 p-5">
						<div
							className="flex cursor-pointer items-center rounded-xl border border-gray-600 bg-gradient-to-r from-gray-700 to-gray-800 p-3 transition duration-300 hover:bg-gray-700/80 hover:shadow-md"
							onClick={() => handleOpenModal()}>
							<div className="mr-2 text-gray-400">
								<Add />
							</div>
							<span className="font-medium text-gray-400">Add New Task</span>
						</div>
						{Array.from(tasksByCategory ?? [])
							.sort((a, b) => new Date(a?.createdAt ?? '').getTime() - new Date(b?.createdAt ?? '').getTime())
							.map((task) => (
								<div
									key={task?.id}
									className="my-2 flex cursor-pointer items-center justify-between border-b-2 border-gray-700 p-2 hover:bg-gray-700/50"
									onClick={() => handleOpenModal(task?.id)}>
									<div className="flex items-center gap-2">
										<div className="mr-2 text-gray-400">
											<input
												aria-label="Without Label"
												type="checkbox"
												data-id={task?.id}
												defaultChecked={task?.done}
												className="mt-1 cursor-pointer"
												onChange={handleCheckedTask}
												onClick={(event) => event.stopPropagation()}
											/>
										</div>
										<div className="flex flex-col gap-2">
											<span className="text-gray-200">{task?.title}</span>
											<div className="flex gap-3">
												{task?.deadline && (
													<div className="flex items-center gap-2 text-gray-400">
														<CalendarToday />
														<span className="text-sm">{commonDate(task?.deadline)}</span>
													</div>
												)}
												<div className="flex items-center gap-2">
													<div className="rounded-md bg-gray-700 px-2 py-1 text-xs font-semibold text-gray-200">
														{Array.from(task?.subtasks ?? []).length}
													</div>
													<span className="text-sm text-gray-400">Subtasks</span>
												</div>
												<div className="flex items-center gap-2">
													<div
														className={`bg-${
															task?.taskType === 'Personal'
																? 'red-500'
																: task?.taskType === 'Work'
																	? 'blue-500'
																	: 'yellow-500'
														} rounded-md p-1`}
													/>
													<span className="text-sm text-gray-400">{task?.taskType}</span>
												</div>
												<div
													className="flex items-center text-gray-400 hover:text-red-400"
													onClick={(event) => {
														event.stopPropagation();
														deleteTask(Number(task?.id));
													}}>
													<Delete />
												</div>
											</div>
										</div>
									</div>
									<div className="text-gray-400">
										<KeyboardArrowRightOutlined />
									</div>
								</div>
							))}
						{!Array.from(tasks ?? []).length && (
							<div className="text-gray-400">Looks like you don't have any tasks yet. Start adding some!</div>
						)}
					</div>
				</div>
			</div>
			{isModalOpen && <TaskModal mode={mode} choosenTask={choosenTask} handleCloseModal={handleCloseModal} />}
		</React.Fragment>
	);
};
