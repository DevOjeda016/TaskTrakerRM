import chalk from "chalk";
import { TaskStatus, type ITask } from "../modules/tasks/task.js";
import Table from "cli-table3";

const colorizeStatus = (status: TaskStatus): string => {
  const colorMap: Record<TaskStatus, (text: string) => string> = {
    [TaskStatus.DONE]: chalk.green,
    [TaskStatus.PROGRESS]: chalk.yellow,
    [TaskStatus.TODO]: chalk.white,
  };

  return colorMap[status](status);
};

export const generateTableList = (tasks: ITask[]) => {
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

export const generateHelp = () => {
  console.log(`${chalk.bold("task-cli")} - Task Management CLI`);
  console.log(chalk.dim("A simple command-line tool to manage your tasks.\n"));

  console.log(chalk.bold("Usage:"));
  console.log(
    `  ${chalk.cyan("task-cli")} ${chalk.yellow("<command>")} [options]\n`,
  );

  console.log(chalk.bold("Commands:"));

  const commands = [
    { cmd: 'add "task description"', desc: "Add a new task" },
    {
      cmd: 'update <id> "new description"',
      desc: "Update a task's description",
    },
    { cmd: "delete <id>", desc: "Delete a task by ID" },
    { cmd: "mark-in-progress <id>", desc: "Mark a task as in progress" },
    { cmd: "mark-done <id>", desc: "Mark a task as done" },
    { cmd: "list", desc: "List all tasks" },
    {
      cmd: "list <status>",
      desc: "List tasks by status (todo, in-progress, done)",
    },
  ];

  commands.forEach(({ cmd, desc }) => {
    console.log(`  ${chalk.green(cmd.padEnd(32))}${desc}`);
  });

  console.log("\n" + chalk.bold("Options:"));
  console.log(`  ${chalk.cyan("--help, -h".padEnd(32))}Show this help message`);
  console.log(`  ${chalk.cyan("--version, -v".padEnd(32))}Show version number`);

  console.log("\n" + chalk.bold("Examples:"));
  const examplePrefix = chalk.gray("$");
  const examples = [
    'task-cli add "Buy groceries"',
    'task-cli update 1 "Buy groceries and cook dinner"',
    "task-cli mark-in-progress 1",
    "task-cli list done",
  ];

  examples.forEach((ex) => {
    console.log(`  ${examplePrefix} ${chalk.gray(ex)}`);
  });
};
