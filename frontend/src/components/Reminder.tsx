import { Add } from '@mui/icons-material';
import { useState } from 'react';
import { ReminderTaskType, UserType } from '../types';
import { AddReminder } from './AddReminder';

export const Reminder = ({
	user,
	tasks
}: {
	user: UserType;
	tasks: Partial<ReminderTaskType[]>;
}) => {
	const [formType, setFormType] = useState<string>('');
	const [handleOpen, setHandleOpen] = useState<boolean>(false);
	const [selectedTask, setSelectedTask] = useState<Partial<ReminderTaskType>>({});

	const handleOpenModal = (taskId?: number) => {
		if (taskId) {
			setSelectedTask(tasks.find((task) => task?.id === taskId) as ReminderTaskType);
			setFormType('edit');
			setHandleOpen(true);
		} else {
			setFormType('create');
			setHandleOpen(true);
		}
	};

	const handleCloseModal = () => {
		setFormType('');
		setSelectedTask({});
		setHandleOpen(false);
	};

	return (
		<div className="flex w-full">
			<div className="flex w-full min-w-[500px] flex-col">
				<div className="mx-5 mb-6 flex items-center justify-between">
					<h1 className="m-0 flex-1 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-3xl font-bold text-transparent">
						Reminders
					</h1>
					<span className="text-lg text-white">
						<strong>Welcome </strong>
						{user.username}
					</span>
				</div>
				<div className="px-5" onClick={() => handleOpenModal()}>
					<div className="flex cursor-pointer items-center rounded-xl border border-gray-600 bg-gradient-to-r from-gray-700 to-gray-800 p-3 transition duration-300 hover:bg-gray-700/80 hover:shadow-md">
						<div className="mr-2 text-gray-400">
							<Add />
						</div>
						<span className="font-medium text-gray-400">Add New Reminder</span>
					</div>
				</div>
				<div className="p-5">
					<div className="h-[calc(100%-30px)] h-auto rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-xl">
						<div className="flex flex-wrap gap-5">
							{Array.from(tasks ?? [])
								.sort(
									(a, b) =>
										new Date(a?.createdAt ?? '').getTime() - new Date(b?.createdAt ?? '').getTime()
								)
								.map((reminder) => (
									<div
										key={reminder?.id}
										className="flex h-[300px] w-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-700/50 bg-gray-800/80 p-4 shadow-lg transition duration-300 hover:bg-gray-700/80 hover:shadow-xl"
										onClick={() => handleOpenModal(reminder?.id)}>
										<div className="no-scroll mb-5 flex h-full w-full flex-col overflow-auto rounded-2xl px-2 text-gray-200">
											<p className="mb-3 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-lg font-bold text-transparent">
												{reminder?.title}
											</p>
											{reminder?.note.includes('-') ? (
												reminder?.note
													.split('-')
													.filter((note) => note)
													.map((note, index) => (
														<p key={index} className="my-1.5 text-justify text-sm text-gray-400">
															• {note}
														</p>
													))
											) : (
												<p className="my-1.5 text-justify text-sm text-gray-400">
													{reminder?.note}
												</p>
											)}
										</div>
									</div>
								))}
							{!Array.from(tasks ?? []).length && (
								<div className="w-full py-8 text-center text-gray-400 italic">
									Looks like you don't have any reminders yet. Start adding some!
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{handleOpen && (
				<div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm">
					<AddReminder
						formType={formType}
						selectedTask={selectedTask}
						handleCloseModal={handleCloseModal}
					/>
				</div>
			)}
		</div>
	);
};
