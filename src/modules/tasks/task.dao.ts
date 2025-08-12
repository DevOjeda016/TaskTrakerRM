import {
  TaskStatus,
  type ICreateTask,
  type ITask,
  type IUpdateTask,
} from "./task";
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

export const save = async (task: ICreateTask): Promise<ITask> => {
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

export const update = async (id: number, task: IUpdateTask): Promise<ITask> => {
  const tasks = await getTasks();
  tasks
    .filter((e) => e.id == id)
    .map((e) => {
      e.status = task.status !== undefined ? task.status : e.status;
      e.description =
        task.description !== undefined ? task.description : e.description;
      e.updatedAt = task.updatedAt;
    });
  await saveTasks(tasks);
  return tasks.filter((e) => e.id == id)[0];
};

export const remove = async (id: number): Promise<void> => {
  const tasks = await getTasks();
  const updatedTask = tasks.filter((e) => e.id !== id);
  await saveTasks(updatedTask);
};
