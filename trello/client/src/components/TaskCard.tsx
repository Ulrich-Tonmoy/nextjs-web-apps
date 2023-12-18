import { useSortable } from "@dnd-kit/sortable";
import DeleteIcon from "@icons/DeleteIcon";
import { Id, Priority, Task } from "@utils/types";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
  deleteTask: (id: Id, listId: Id) => void;
  updateTask: (id: Id, content: string, priority: Priority) => void;
}

const TaskCard = ({ task, deleteTask, updateTask }: TaskCardProps) => {
  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-mainBackgroundColor p-2.5 h-[120px] group min-h-[120px] rounded-xl flex items-center flex-col border-2 border-rose-500 cursor-grab relative task opacity-30"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor p-2.5 h-[120px] group min-h-[120px] rounded-xl flex items-center flex-col hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      >
        <select
          name="priority"
          id="priority"
          className="p-1 text-white bg-black rounded focus:outline-none"
          value={task.priority}
          onBlur={() => setEditMode(false)}
          onChange={(e) =>
            updateTask(task.id, task.content, e.target.value as Priority)
          }
        >
          {(Object.keys(Priority) as (keyof typeof Priority)[]).map(
            (key, index) => {
              return (
                <option key={index} value={key}>
                  {key}
                </option>
              );
            },
          )}
        </select>
        <textarea
          className="w-full p-2 mt-1 text-white bg-black border-none rounded-md resize-none focus:outline-none"
          placeholder="Task Content here..."
          value={task.content}
          onBlur={() => setEditMode(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) setEditMode(false);
          }}
          onChange={(e) => updateTask(task.id, e.target.value, task.priority)}
        />
      </div>
    );
  }

  const bg =
    task.priority === Priority.Critical
      ? "bg-rose-500"
      : task.priority === Priority.High
      ? "bg-orange-500"
      : task.priority === Priority.Medium
      ? "bg-yellow-500"
      : task.priority === Priority.Low
      ? "bg-blue-500"
      : task.priority === Priority.Clear
      ? "bg-green-500"
      : "bg-gray-500";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => setEditMode(true)}
      className="bg-mainBackgroundColor p-2.5 h-[120px] group min-h-[120px] rounded-xl flex items-center flex-col hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
    >
      <h1 className={`text-center px-1 py-0.5 rounded-md ${bg}`}>
        {task.priority}
      </h1>
      <p className="w-full overflow-x-hidden overflow-y-auto text-left whitespace-pre-wrap">
        {task.content}
      </p>
      <button
        onClick={() => deleteTask(task.id, task.listId)}
        title="Delete"
        className="absolute hidden p-1 rounded opacity-50 -translate-y-7 stroke-white bg-listBackgroundColor right-4 top-8 group-hover:block hover:opacity-100"
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default TaskCard;
