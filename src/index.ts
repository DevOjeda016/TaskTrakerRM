#!/usr/bin/env node
import { argv } from "node:process";
import { createRequire } from "node:module";
import { Options } from "./options.js";
import actions from "./modules/tasks/index.js";
import chalk from "chalk";
import { generateTableList, generateHelp } from "./utils/outputs.js";
import { handleError } from "./utils/helper.js";

const require = createRequire(import.meta.url);
const pkg = require("./../package.json") as { version: string };

const [opt, param1, param2] = argv.splice(2);

const main = async (): Promise<void> => {
  try {
    switch (opt) {
      case Options.LIST:
        const tasks = await actions.list(param1);
        const table = generateTableList(tasks);
        console.log(table.toString());
        break;

      case Options.ADD:
        const task = await actions.create(param1);
        console.log(
          `${chalk.green("✔")} Task "${task.description}" added successfully (ID: ${task.id})`,
        );
        break;

      case Options.UPDATE:
        const updatedTask = await actions.update(
          Number.parseInt(param1),
          param2,
        );
        console.log(
          `${chalk.green("✔")} Task updated to "${updatedTask.description}" successfully`,
        );
        break;

      case Options.MARK_DONE:
      case Options.MARK_PROGRESS:
        const statusTask = await actions.updateStatus(
          Number.parseInt(param1),
          opt,
        );
        console.log(
          `${chalk.green("✔")} Task "${statusTask.description}" updated to status: ${statusTask.status} successfully`,
        );
        break;

      case Options.DELETE:
        const isDeleted = await actions.remove(Number.parseInt(param1));
        if (isDeleted) {
          console.log(`${chalk.green("✔")} Task deleted successfully`);
        }
        break;

      case Options.HELP:
      case Options.H:
        generateHelp();
        break;

      case Options.VERSION:
      case Options.V:
        console.log(`Version: ${pkg.version}`);
        break;

      default:
        generateHelp();
    }
  } catch (error) {
    handleError(error);
  }
};

main();
