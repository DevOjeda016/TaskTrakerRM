#!/usr/bin/env node

import { argv } from "node:process";
import { Options } from "./options.js";
import actions from "./modules/tasks/index.js";
import chalk from "chalk";
import { version } from "./../package.json";
import { geneateTableList, generateHelp } from "./utils/outputs.js";

const [opt, param1, param2] = argv.splice(2);

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
        `${chalk.green("✔")} Task ${task.description} added sucessfully (ID: ${task.id})`,
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
        `${chalk.green("✔")} Task updated to ${task.description} sucessfully`,
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
        `${chalk.green("✔")} Task ${task.description} updated to status: ${task.status} sucessfully`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.red(error.message));
      }
    }
    break;
  case Options.DELETE:
    try {
      const isDeleted = await actions.remove(Number.parseInt(param1));
      if (isDeleted) {
        console.log(`${chalk.green("✔")} Task deleted sucessfully`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.red(error.message));
      }
    }
    break;
  case Options.HELP:
  case Options.H:
    generateHelp();
    break;
  case Options.VERSION:
  case Options.V:
    console.log(`Version: ${version}`);
  default:
    generateHelp();
}

main();
