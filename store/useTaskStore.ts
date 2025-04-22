import { create } from "zustand";
import supabase from "../src/helper/superbaseClient";

type Task = {
  id: number;
  title: string;
  list_type: string;
  start_time: string;
  end_time: string;
  completed: boolean;
};

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (index: number) => void;
  fetchTasks: () => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  addTask: (task) => {
    set((currentState) => ({
      tasks: [...currentState.tasks, task],
    }));
  },
  removeTask: (indexToRemove) => {
    set((currentState) => {
      const newTaskList = currentState.tasks.filter((_, index) => {
        return index !== indexToRemove;
      });
      return {
        tasks: newTaskList,
      };
    });
  },
  fetchTasks: async () => {
    try {
      const { data, error } = await supabase
        .from("todo")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching tasks:", error);
        return;
      }

      set({ tasks: data || [] });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  },
}));
