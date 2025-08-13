import chalk from "chalk";

export const handleError = (error: unknown): void => {
  if (error instanceof Error) {
    console.log(chalk.red(`✗ ${error.message}`));
  } else {
    console.log(chalk.red("✗ An unexpected error occurred"));
  }
  process.exit(1);
};
