#!/usr/bin/env node

import { argv } from "node:process";
import { Options } from "./options.js";
import actions from "./modules/tasks/index.js";
import Table from "cli-table3";
import chalk from "chalk";
import { TaskStatus, type ITask } from "./modules/tasks/task.js";

const [opt, param1, param2] = argv.splice(2);

const colorizeStatus = (status: TaskStatus): string => {
  const colorMap: Record<TaskStatus, (text: string) => string> = {
    [TaskStatus.DONE]: chalk.green,
    [TaskStatus.PROGRESS]: chalk.yellow,
    [TaskStatus.TODO]: chalk.white,
  };

  return colorMap[status](status);
};

const geneateTableList = (tasks: ITask[]) => {
  const table = new Table({
    head: [
      chalk.blue("ID"),
      chalk.blue("Description"),
      chalk.blue("Status"),
      chalk.blue("Created"),
      chalk.blue("Updated"),
    ],
    colWidths: [5, 30, 15, 12, 12],
  });

  tasks.forEach((task) => {
    table.push([
      chalk.blueBright(task.id),
      task.description,
      colorizeStatus(task.status),
      new Date(task.createdAt).toLocaleDateString(),
      task.updatedAt !== undefined
        ? new Date(task.updatedAt).toLocaleDateString()
        : "-".repeat(8),
    ]);
  });

  return table;
};

const main = () => {};
switch (opt) {
  case Options.LIST:
    try {
      const tasks = await actions.list(param1);
      const table = geneateTableList(tasks);
      console.log(table.toString());
    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.red(error.message));
      }
    }
    break;
  case Options.ADD:
    try {
      const task = await actions.create(param1);
      console.log(
        `${chalk.green("✔")} Task ${task.description} added sucessfuffy (ID: ${task.id})`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.red(error.message));
      }
    }
    break;
  case Options.UPDATE:
    try {
      const task = await actions.update(Number.parseInt(param1), param2);
      console.log(
        `${chalk.green("✔")} Task updated to ${task.description} sucessfuffy`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.red(error.message));
      }
    }
    break;
  case Options.MARK_DONE:
  case Options.MARK_PROGRESS:
    try {
      console.log(opt, param1);
      const task = await actions.updateStatus(Number.parseInt(param1), opt);
      console.log(
        `${chalk.green("✔")} Task ${task.description} updated to status: ${task.status} sucessfuffy`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.red(error.message));
      }
    }
    break;
}

main();
