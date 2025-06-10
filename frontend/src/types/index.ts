type SubtaskType = {
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

interface TaskType {
	id: number;
	deadline: string;
	description: string;
	subtasks: SubtaskType[];
	taskType: string;
	title: string;
	done: boolean;
	createdAt: Date;
	updatedAt: Date;
}

interface ReminderType {
	id: number;
	title: string;
	note: string;
	createdAt: Date;
}

type DeepPartial<T> = {
	[K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type { DeepPartial, ReminderType, SubtaskType, TaskType, UserType };
