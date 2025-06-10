import { ArrowRightTwoTone, CheckBox, ExitToApp, Notes } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({
	totalTasks,
	totalReminders,
	totalPersonal,
	totalWork,
	totalGroups
}: {
	totalTasks: number;
	totalReminders: number;
	totalPersonal: number;
	totalWork: number;
	totalGroups: number;
}) => {
	const navigate = useNavigate();
	return (
		<div className="flex h-fit max-w-[400px] min-w-[400px] flex-col rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-gray-200 shadow-xl">
			<span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-2xl font-bold text-transparent">
				Menu
			</span>
			<div className="my-8">
				<span className="text-lg font-bold text-gray-300">TASKS</span>
				<ul className="mt-3 flex list-none flex-col gap-3 p-0">
					<li className="flex cursor-pointer items-center justify-between rounded-xl border border-transparent p-3 transition duration-300 hover:border-gray-700 hover:bg-gray-700/80 hover:shadow-md">
						<div className="flex items-center">
							<div className="mr-2 text-gray-400">
								<ArrowRightTwoTone />
							</div>
							<span className="font-semibold">Upcoming</span>
						</div>
						<div className="rounded-lg bg-gray-700/90 px-3 py-1 font-semibold text-gray-200 shadow-sm">12</div>
					</li>
					<li
						className="flex cursor-pointer items-center justify-between rounded-xl border border-transparent p-3 transition duration-300 hover:border-gray-700 hover:bg-gray-700/80 hover:shadow-md"
						onClick={() => navigate('/')}>
						<div className="flex items-center">
							<div className="mr-2 text-gray-400">
								<CheckBox />
							</div>
							<span className="font-semibold">Tasks</span>
						</div>
						<div className="rounded-lg bg-gray-700/90 px-3 py-1 font-semibold text-gray-200 shadow-sm">
							{totalTasks}
						</div>
					</li>
					<li
						className="flex cursor-pointer items-center justify-between rounded-xl border border-transparent p-3 transition duration-300 hover:border-gray-700 hover:bg-gray-700/80 hover:shadow-md"
						onClick={() => navigate('/reminder')}>
						<div className="flex items-center">
							<div className="mr-2 text-gray-400">
								<Notes />
							</div>
							<span className="font-semibold">Reminders</span>
						</div>
						<div className="rounded-lg bg-gray-700/90 px-3 py-1 font-semibold text-gray-200 shadow-sm">
							{totalReminders}
						</div>
					</li>
				</ul>
			</div>
			<div className="my-6">
				<span className="text-lg font-bold text-gray-300">LISTS</span>
				<ul className="mt-3 flex list-none flex-col gap-3 p-0">
					<li
						className="flex cursor-pointer items-center justify-between rounded-xl border border-transparent p-3 transition duration-300 hover:border-gray-700 hover:bg-gray-700/80 hover:shadow-md"
						onClick={() => navigate('/personal')}>
						<div className="flex items-center">
							<div className="mr-2 rounded-sm bg-red-500 p-2 shadow-sm" />
							<span className="font-semibold">Personal</span>
						</div>
						<div className="rounded-lg bg-gray-700/90 px-3 py-1 font-semibold text-gray-200 shadow-sm">
							{totalPersonal}
						</div>
					</li>
					<li
						className="flex cursor-pointer items-center justify-between rounded-xl border border-transparent p-3 transition duration-300 hover:border-gray-700 hover:bg-gray-700/80 hover:shadow-md"
						onClick={() => navigate('/work')}>
						<div className="flex items-center">
							<div className="mr-2 rounded-sm bg-blue-500 p-2 shadow-sm" />
							<span className="font-semibold">Work</span>
						</div>
						<div className="rounded-lg bg-gray-700/90 px-3 py-1 font-semibold text-gray-200 shadow-sm">
							{totalWork}
						</div>
					</li>
					<li
						className="flex cursor-pointer items-center justify-between rounded-xl border border-transparent p-3 transition duration-300 hover:border-gray-700 hover:bg-gray-700/80 hover:shadow-md"
						onClick={() => navigate('/groups')}>
						<div className="flex items-center">
							<div className="mr-2 rounded-sm bg-yellow-500 p-2 shadow-sm" />
							<span className="font-semibold">Groups</span>
						</div>
						<div className="rounded-lg bg-gray-700/90 px-3 py-1 font-semibold text-gray-200 shadow-sm">
							{totalGroups}
						</div>
					</li>
				</ul>
			</div>
			<div
				className="mt-6 flex cursor-pointer items-center rounded-xl border border-transparent p-3 transition duration-300 hover:border-gray-700 hover:bg-gray-700/80 hover:shadow-md"
				onClick={() => {
					localStorage.removeItem('user');
					document.cookie = 'noteify-session-token=; Max-Age=0; path=/';
					navigate('/signin');
				}}>
				<div className="mr-2 text-gray-400">
					<ExitToApp />
				</div>
				<span className="font-semibold">Sign Out</span>
			</div>
		</div>
	);
};
