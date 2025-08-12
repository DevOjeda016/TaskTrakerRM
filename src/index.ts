#!/usr/bin/env node

import { argv } from "node:process";
import { Options } from "./options";
import actions from "./modules/tasks/index";

const [opt, property] = argv.splice(2);

const main = () => {};
switch (opt) {
  case Options.LIST:
    try {
      const tasks = await actions.list(property);
      console.log(tasks);
      break;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
}

main();
