import DeleteIcon from "@icons/DeleteIcon";
import { List, Id, Task, Priority } from "@utils/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useMemo } from "react";
import PlusIcon from "@icons/PlusIcon";
import TaskCard from "./TaskCard";

interface ListContainerProps {
  list: List;
  deleteList: (id: Id) => void;
  updateList: (id: Id, title: string) => void;
  tasks: Task[];
  createTask: (listId: Id) => void;
  deleteTask: (id: Id, listId: Id) => void;
  updateTask: (id: Id, content: string, priority: Priority) => void;
}

const ListContainer = ({
  list,
  deleteList,
  updateList,
  tasks,
  createTask,
  deleteTask,
  updateTask,
}: ListContainerProps) => {
  const [editMode, setEditMode] = useState(false);
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
      id: list.id,
      data: {
        type: "List",
        list,
      },
      disabled: editMode,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  console.log(list);

  const taskIds = useMemo(() => {
    return tasks.map((task: Task) => task.id);
  }, [tasks]);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-listBackgroundColor opacity-60 border-2 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-listBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-listBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2" onClick={() => setEditMode(true)}>
          <div className="flex items-center justify-center px-2 py-1 text-sm rounded-full bg-listBackgroundColor">
            {list.count}
          </div>
          {!editMode && list.title}
          {editMode && (
            <input
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
              value={list.title}
              onChange={(e) => updateList(list.id, e.target.value)}
              className="px-2 bg-black border rounded outline-none focus:border-rose-500"
            />
          )}
        </div>
        <div>
          <button
            onClick={() => deleteList(list.id)}
            title="Delete"
            className="px-1 py-2 rounded stroke-gray-500 hover:stroke-white hover:bg-listBackgroundColor"
          >
            <DeleteIcon />
          </button>
          <button
            onClick={() => createTask(list.id)}
            title="Add"
            className="px-1 py-2 rounded stroke-gray-500 hover:stroke-white hover:bg-listBackgroundColor"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-grow gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default ListContainer;
