import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.ts';
import { Layout } from '../components/Layout.tsx';
import { LoadingSpinner } from '../components/LoadingSpinner.tsx';
import { Reminder } from '../components/Reminder.tsx';
import { Sidebar } from '../components/Sidebar.tsx';
import { Task } from '../components/Task.tsx';
import { ReminderType, TaskType } from '../types/index.ts';
import { apiCall } from '../utils/api-call.ts';
import { notification } from '../utils/toast.ts';

const Home = () => {
	const { checkToken } = useAuth();
	const { pathname } = useLocation();
	const [fetching, setFetching] = useState(true);
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [reminders, setReminders] = useState<ReminderType[]>([]);

	useEffect(() => {
		const getTasksAndReminders = async () => {
			try {
				const responseTasks = await apiCall('/todo');
				await checkToken(responseTasks);
				setTasks(responseTasks.result.data);

				const responseReminders = await apiCall('/reminder');
				await checkToken(responseReminders);
				setReminders(responseReminders.result.data);
			} catch (error) {
				notification.error((error as Error).message || 'Network error!');
			} finally {
				setFetching(false);
			}
		};
		getTasksAndReminders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (fetching) {
		return <LoadingSpinner />;
	}

	const user = JSON.parse(localStorage['user'] ?? '{}');
	const totalTasks = Array.from(tasks ?? []).length;
	const totalReminders = Array.from(reminders ?? []).length;
	const totalPersonal = Array.from(tasks ?? []).filter((task) => task?.taskType == 'Personal').length;
	const totalWork = Array.from(tasks ?? []).filter((task) => task?.taskType == 'Work').length;
	const totalGroups = Array.from(tasks ?? []).filter((task) => task?.taskType == 'Groups').length;

	return (
		<Layout>
			<div className="flex p-6">
				<Sidebar
					totalTasks={totalTasks}
					totalReminders={totalReminders}
					totalPersonal={totalPersonal}
					totalWork={totalWork}
					totalGroups={totalGroups}
				/>
				{pathname == '/reminder' ? (
					<Reminder user={user} reminders={reminders} />
				) : (
					<Task user={user} tasks={tasks} />
				)}
			</div>
		</Layout>
	);
};

export default Home;
