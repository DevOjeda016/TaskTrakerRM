import {
  TaskStatus,
  type ICreateTask,
  type ITask,
  type IUpdateTask,
} from "./task.js";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const getFilePath = (): string => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, "../../db/tasks.json");
  return filePath;
};

const ensureDbFile = async (): Promise<void> => {
  const filePath = getFilePath();
  const dbDir = dirname(filePath);

  if (!existsSync(dbDir)) {
    await mkdir(dbDir, { recursive: true });
  }

  if (!existsSync(filePath)) {
    await writeFile(filePath, "[]");
  }
};

const getTasks = async (): Promise<ITask[]> => {
  await ensureDbFile();
  const filePath = getFilePath();
  const data = await readFile(filePath, "utf-8");
  const tasks = JSON.parse(data);
  return tasks.map((task: ITask) => ({
    ...task,
    createdAt: new Date(task.createdAt),
    updatedAt: task.updatedAt ? new Date(task.updatedAt) : undefined,
  }));
};

const saveTasks = async (tasks: ITask[]): Promise<void> => {
  await ensureDbFile();
  const filePath = getFilePath();
  await writeFile(filePath, JSON.stringify(tasks, null, 2));
};

export const findAll = async (): Promise<ITask[]> => {
  const tasks = await getTasks();
  return tasks;
};

export const save = async (task: ICreateTask): Promise<ITask> => {
  const tasks = await getTasks();

  const newId = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;

  const newTask: ITask = {
    ...task,
    id: newId,
    status: TaskStatus.TODO,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  await saveTasks(tasks);
  return newTask;
};

export const update = async (id: number, task: IUpdateTask): Promise<ITask> => {
  const tasks = await getTasks();

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    throw new Error(`Task with id ${id} not found`);
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    status: task.status !== undefined ? task.status : tasks[taskIndex].status,
    description:
      task.description !== undefined
        ? task.description
        : tasks[taskIndex].description,
    updatedAt: new Date(),
  };

  await saveTasks(tasks);
  return tasks[taskIndex];
};

export const remove = async (id: number): Promise<void> => {
  const tasks = await getTasks();
  const updatedTasks = tasks.filter((e) => e.id !== id);
  await saveTasks(updatedTasks);
};
