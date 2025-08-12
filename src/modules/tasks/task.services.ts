import type { ITask, ICreateTask, IUpdateTask, TaskStatus } from "./task";
import { findAll, remove, save, update } from "./task.dao";

export const getTasks = async (property?: TaskStatus): Promise<ITask[]> => {
  const tasks = await findAll();
  return property !== undefined
    ? tasks.filter((e) => e.status === property)
    : tasks;
};

export const createTask = (task: ICreateTask): Promise<ITask> => save(task);

export const updateTask = async (
  id: number,
  task: IUpdateTask,
): Promise<ITask> => {
  const updatedTask = await update(id, task);
  return updatedTask;
};

export const removeTask = async (id: number): Promise<void> => {
  await remove(id);
};
