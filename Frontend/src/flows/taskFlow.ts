import { defineFlow } from "fractostate";
import { tasks } from "../mock/constants";
import type { Task } from "../types";

interface initialeState {
    tasks: Task[],
    isLaoding: boolean,
    error: string |null,
  }

export const TaskFlow = defineFlow(
  "task",
  {
    tasks: tasks,
    isLaoding: false,
    error: null,
  } as initialeState,
  {
    actions: {},
  },
);
