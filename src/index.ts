#!/usr/bin/env node

import { argv } from "node:process";
import { Options } from "./options.js";
import actions from "./modules/tasks/index.js";
import Table from "cli-table3";
import chalk from "chalk";
import { TaskStatus, type ITask } from "./modules/tasks/task.js";

const [opt, property] = argv.splice(2);

const colorizeStatus = (status: TaskStatus): string => {
  const colorMap: Record<TaskStatus, (text: string) => string> = {
    [TaskStatus.DONE]: chalk.green,
    [TaskStatus.PROGRESS]: chalk.yellow,
    [TaskStatus.TODO]: chalk.white,
  };

  return colorMap[status](status);
};

const geneateTableList = (tasks: ITask[]): void => {
  const table = new Table({
    head: [
      chalk.blue("ID"),
      chalk.blue("Description"),
      chalk.blue("Status"),
      chalk.blue("Created"),
    ],
    colWidths: [5, 30, 15, 12],
  });

  tasks.forEach((task) => {
    table.push([
      chalk.blueBright(task.id),
      task.description,
      colorizeStatus(task.status),
      new Date(task.createdAt).toLocaleDateString(),
    ]);
  });
  console.log(table.toString());
};

const main = () => {};
switch (opt) {
  case Options.LIST:
    try {
      const tasks = await actions.list(property);
      geneateTableList(tasks);
    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.red(error.message));
      }
    }
    break;
}

main();
