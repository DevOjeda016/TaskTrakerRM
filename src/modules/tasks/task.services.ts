import type { ITask, ICreateTask, IUpdateTask, TaskStatus } from "./task.js";
import { findAll, remove, save, update } from "./task.dao.js";

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
  try {
    const updatedTask = await update(id, task);
    return updatedTask;
  } catch (error) {
    throw error;
  }
};

export const removeTask = async (id: number): Promise<void> => {
  await remove(id);
};
