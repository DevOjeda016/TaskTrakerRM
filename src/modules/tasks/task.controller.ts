import { TaskStatus, type ITask } from "./task.js";
import {
  createTask,
  getTasks,
  removeTask,
  updateTask,
} from "./task.service.js";

const normalizeStatus = (input?: string): TaskStatus | undefined => {
  if (!input) return undefined;

  switch (input.toLowerCase()) {
    case "todo":
      return TaskStatus.TODO;
    case "done":
      return TaskStatus.DONE;
    case "in-progress":
    case "progress":
      return TaskStatus.PROGRESS;
    default:
      throw new Error(
        'Invalid status value. Supported values are: "todo", "process", "in-progress", or "done".',
      );
  }
};

const normalizeAction = (action: string): TaskStatus => {
  switch (action.toLowerCase()) {
    case "mark-todo":
      return TaskStatus.TODO;
    case "mark-in-progress":
      return TaskStatus.PROGRESS;
    default:
      throw new Error(
        'Invalid action. Supported values are: "mark-todo", "mark-in-progress".',
      );
  }
};

const list = (property?: string): Promise<ITask[]> => {
  try {
    const status = normalizeStatus(property);
    return getTasks(status);
  } catch (e) {
    throw e;
  }
};

const create = (description: string): Promise<ITask> => {
  if (!description.trim()) {
    throw new Error("Task create failed: description must be provided.");
  }

  return createTask({ description });
};

const update = (id: number, description: string): Promise<ITask> => {
  if (!id || !description.trim()) {
    throw new Error(
      "Task update failed: both ID and description must be provided.",
    );
  }
  try {
    return updateTask(id, { description });
  } catch (error) {
    throw error;
  }
};

const updateStatus = (id: number, action: string): Promise<ITask> => {
  if (!id || !action.trim()) {
    throw new Error("Task update failed: both ID and action must be provided.");
  }

  const status = normalizeAction(action);
  try {
    return updateTask(id, { status });
  } catch (error) {
    throw error;
  }
};

const remove = (id: number): Promise<boolean> => {
  if (!id) {
    throw new Error("Task delete failed: both ID must be provided.");
  }

  try {
    return removeTask(id);
  } catch (error) {
    throw error;
  }
};

export default {
  list,
  create,
  update,
  updateStatus,
  remove,
};
