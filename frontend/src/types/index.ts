type Subtasks = {
	title: string;
	done: boolean;
};

interface UserType {
	id: number;
	email: string;
	phoneNumber: string;
	username: string;
	role: string;
}

interface TodoTaskType {
	id: number;
	deadline: string;
	description: string;
	subtasks: Subtasks[];
	taskType: string;
	title: string;
	done: boolean;
	createdAt: Date;
	updatedAt: Date;
}

interface ReminderTaskType {
	id: number;
	title: string;
	note: string;
	createdAt: Date;
}

type DeepPartial<T> = {
	[K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type { DeepPartial, ReminderTaskType, Subtasks, TodoTaskType, UserType };
