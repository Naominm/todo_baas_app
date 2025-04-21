import { create } from "zustand";

type Task = {
  title: string;
  listType: string;
  startTime: string;
  endTime: string;
};

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (index: number) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  addTask: (task) => {
    set((currentState) => {
      return {
        tasks: [...currentState.tasks, task],
      };
    });
  },
  removeTask: (indexToRemove) => {
    set((currentState) => {
      const newTaskList = currentState.tasks.filter((task, index) => {
        return index !== indexToRemove;
      });
      return {
        tasks: newTaskList,
      };
    });
  },
}));
