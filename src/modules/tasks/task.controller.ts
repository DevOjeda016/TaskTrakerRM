import { TaskStatus, type ITask } from "./task.js";
import { getTasks } from "./task.services.js";

const normalizeStatus = (input?: string): TaskStatus | undefined => {
  if (!input) return undefined;

  switch (input.toLowerCase()) {
    case "todo":
      return TaskStatus.TODO;
    case "done":
      return TaskStatus.DONE;
    case "in-progress":
    case "progress":
      return TaskStatus.PROGRESS;
    default:
      throw new Error(
        "Property is not supported: try with TODO, PROGRESS, DONE",
      );
  }
};

const list = async (property?: string): Promise<ITask[]> => {
  try {
    const status = normalizeStatus(property);
    return await getTasks(status);
  } catch (e) {
    throw e;
  }
};

/* const create = () => console.log("create");

const update = () => console.log("update");

const remove = () => console.log("remove"); */

export default {
  list,
  /*   create,
  update,
  remove, */
};
