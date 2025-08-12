import type { ICreateTask, ITask, IUpdateTask } from "./task";
import { readFile } from "fs/promises";
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

const findAll = async (): Promise<ITask[]> => {
  const tasks = await getTasks();
  return tasks;
};

findAll();

/* 
export const create = (task: ICreateTask): ITask => {
  return;
};

export const update = (task: IUpdateTask): ITask => {
  return;
};

export const remove = (id: number): void => {}; */
