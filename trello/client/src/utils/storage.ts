import { List, Task } from "./types";

export const createData = (type: "Task" | "List", data: Task | List) => {
  localStorage.setItem(type, data.toString());
};

export const updateData = (type: "Task" | "List", data: Task | List) => {
  localStorage.setItem(type, data.toString());
};

export const getData = (type: "Task" | "List") => {
  return localStorage.getItem(type);
};

export const deleteData = (type: "Task" | "List") => {
  localStorage.removeItem(type);
};

export const clearAll = () => {
  localStorage.clear();
};
