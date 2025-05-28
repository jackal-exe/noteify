import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/auth.ts';
import { Layout } from '../components/Layout.tsx';
import { LoadingSpinner } from '../components/LoadingSpinner.tsx';
import { Reminder } from '../components/Reminder.tsx';
import { Sidebar } from '../components/Sidebar.tsx';
import { Task } from '../components/Task.tsx';
import { ReminderTaskType, TodoTaskType } from '../types/index.ts';
import { apiCall } from '../utils/api-call.ts';
import { notification } from '../utils/toast.ts';

const Home = () => {
	const { pathname } = useLocation();
	const [loading, setLoading] = useState(true);
	const [todos, setTodos] = useState<Partial<TodoTaskType[]>>([]);
	const [reminders, setReminders] = useState<Partial<ReminderTaskType[]>>([]);
	const { checkToken } = useAuth();

	useEffect(() => {
		const getTasksAndReminders = async () => {
			try {
				const responseTodos = await apiCall('/todo');
				await checkToken(responseTodos);
				setTodos(responseTodos.result.data);

				const responseReminders = await apiCall('/reminder');
				await checkToken(responseReminders);
				setReminders(responseReminders.result.data);
			} catch (error) {
				notification.error((error as Error).message || 'Network error!');
			} finally {
				setLoading(false);
			}
		};
		getTasksAndReminders();
	}, []);

	if (loading) {
		return <LoadingSpinner />;
	}

	const userJson = localStorage['user'];
	const user = JSON.parse(userJson ?? '{}');
	const totalTodos = Array.from(todos ?? []).length;
	const totalReminders = Array.from(reminders ?? []).length;
	// prettier-ignore
	const totalPersonal = Array.from(todos ?? []).filter((task) => task?.taskType == 'Personal').length
	// prettier-ignore
	const totalWork = Array.from(todos ?? []).filter((task) => task?.taskType == 'Work').length
	// prettier-ignore
	const totalGroups = Array.from(todos ?? []).filter((task) => task?.taskType == 'Groups').length

	return (
		<Layout>
			<div className="flex p-6">
				<Sidebar
					totalTodos={totalTodos}
					totalReminders={totalReminders}
					totalPersonal={totalPersonal}
					totalWork={totalWork}
					totalGroups={totalGroups}
				/>
				{pathname != '/reminder' ? (
					<Task user={user} tasks={todos} />
				) : (
					<Reminder user={user} tasks={reminders} />
				)}
			</div>
		</Layout>
	);
};

export default Home;
