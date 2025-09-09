# tasktrackerrm

Task tracker is a project used to track and manage your tasks. In this task, you will build a simple command line interface (CLI) to track what you need to do, what you have done, and what you are currently working on.

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd tasktrackerrm
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

## Usage

There are two ways to run the CLI:

### Development

For development, you can run the CLI directly using `tsx`:

```bash
npx tsx src/index.ts <command>
```

### Production

First, build the project:

```bash
npm run build
```

This will compile the TypeScript code to JavaScript in the `dist` directory. Then, you can use the global `task-cli` command (if you've installed the package globally via `npm link` or `npm install -g`) or run the compiled code directly:

```bash
npm start -- <command>
# or
node dist/index.js <command>
```

## Commands

Here are the available commands:

| Command                         | Description                                |
| ------------------------------- | ------------------------------------------ |
| `add "task description"`        | Add a new task                             |
| `update <id> "new description"` | Update a task's description                |
| `delete <id>`                   | Delete a task by ID                        |
| `mark-in-progress <id>`         | Mark a task as in progress                 |
| `mark-done <id>`                | Mark a task as done                        |
| `list`                          | List all tasks                             |
| `list <status>`                 | List tasks by status (todo, in-progress, done) |
| `--help, -h`                    | Show the help message                      |
| `--version, -v`                 | Show the version number                    |

## Examples

Here are a few examples of how to use the CLI:

```bash
# Add a new task
$ task-cli add "Buy groceries"

# Update a task
$ task-cli update 1 "Buy groceries and cook dinner"

# Mark a task as in progress
$ task-cli mark-in-progress 1

# List completed tasks
$ task-cli list done
```

## License

This project is licensed under the ISC License.
