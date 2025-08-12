import type { ITask, ICreateTask, IUpdateTask } from "./task";
import { findAll, remove, save, update } from "./task.dao";

export const getTasks = async (): Promise<ITask[]> => {
  const tasks = await findAll();
  return tasks;
};

export const createTask = async (task: ICreateTask): Promise<ITask> => {
  const savedTask = await save(task);
  return savedTask;
};

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
