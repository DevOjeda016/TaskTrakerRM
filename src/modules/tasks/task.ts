export enum TaskStatus {
  TODO = "todo",
  PROGRESS = "in progress",
  DONE = "done",
}

export interface ITask {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export type ICreateTask = Pick<ITask, "description">;

export type IUpdateTask = Partial<Pick<ITask, "description" | "status">> &
  Pick<ITask, "updatedAt">;
