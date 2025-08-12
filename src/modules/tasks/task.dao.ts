import { TaskStatus, type ICreateTask, type ITask } from "./task";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const getFilePath = (): string => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, "../../db/tasks.json");
  return filePath;
};

const getTasks = async (): Promise<ITask[]> => {
  const filePath = getFilePath();
  const data = await readFile(filePath, "utf-8");
  const tasks = JSON.parse(data);
  return tasks;
};

const saveTasks = async (tasks: ITask[]): Promise<void> => {
  const filePath = getFilePath();
  await writeFile(filePath, JSON.stringify(tasks, null, 2));
};

export const findAll = async (): Promise<ITask[]> => {
  const tasks = await getTasks();
  return tasks;
};

export const create = async (task: ICreateTask): Promise<ITask> => {
  const tasks = await getTasks();
  const newId = tasks[tasks.length - 1].id + 1;
  const newTask: ITask = {
    ...task,
    id: newId,
    status: TaskStatus.DONE,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  await saveTasks(tasks);
  return newTask;
};

/* 

export const update = (task: IUpdateTask): ITask => {
  return;
};

export const remove = (id: number): void => {}; */
