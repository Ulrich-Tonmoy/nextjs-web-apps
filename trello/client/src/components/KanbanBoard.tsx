import PlusIcon from "@icons/PlusIcon";
import { List, Id, Task, Priority, Board } from "@utils/types";
import { useState, useEffect } from "react";
import ListContainer from "./ListContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

const KanbanBoard = () => {
  const [board, setBoard] = useState<Board[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [activeList, setActiveList] = useState<List | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const createList = () => {
    const listToAdd: List = {
      id: crypto.randomUUID(),
      title: `List ${lists.length + 1}`,
      tasksOrder: [],
      count: 0,
    };

    setLists([...lists, listToAdd]);
  };

  const deleteList = (id: Id) => {
    const filteredLists = lists.filter((list) => list.id !== id);
    setLists(filteredLists);

    const filteredTask = tasks.filter((task) => task.listId !== id);
    setTasks(filteredTask);
  };

  const updateList = (id: Id, title: string) => {
    const updatedList = lists.map((list) => {
      if (list.id !== id) return list;
      return { ...list, title };
    });
    setLists(updatedList);
  };

  const createTask = (listId: Id) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      listId,
      priority: Priority.None,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);

    const updateList = lists.filter((list) => list.id === listId)[0];
    updateList.count++;
    setLists(lists);
  };

  const deleteTask = (id: Id, listId: Id) => {
    const filteredTask = tasks.filter((task) => task.id !== id);
    setTasks(filteredTask);

    const updateList = lists.filter((list) => list.id === listId)[0];
    updateList.count--;
    setLists(lists);
  };

  const updateTask = (id: Id, content: string, priority: Priority) => {
    const updatedTask = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content, priority };
    });

    setTasks(updatedTask);
  };

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "List") {
      setActiveList(e.active.data.current.list);
      return;
    }

    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
      return;
    }
  };

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over) return;

    if (active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        const overIndex = tasks.findIndex((t) => t.id === over.id);

        if (tasks[activeIndex].listId != tasks[overIndex].listId) {
          // Fix introduced after video recording
          tasks[activeIndex].listId = tasks[overIndex].listId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);

        tasks[activeIndex].listId = over.id;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    setActiveList(null);
    setActiveTask(null);

    const { active, over } = e;
    if (!over) return;

    if (active.id === over.id) return;

    const isActiveAList = active.data.current?.type === "List";
    if (!isActiveAList) return;

    setLists((lists) => {
      const activeListIndex = lists.findIndex((col) => col.id === active.id);

      const overListIndex = lists.findIndex((col) => col.id === over.id);

      return arrayMove(lists, activeListIndex, overListIndex);
    });
    console.log(lists, "<=>", tasks);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/board");
      const data = await response.json();
      setLists(data.lists);
      setTasks(data.tasks);
      setBoard(data.boards);
    })();
  }, []);

  if (!board) {
    return <>No board found</>;
  }

  return (
    <>
      <button
        onClick={() => createList()}
        className="h-[40px] w-[105px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-listBackgroundColor p-1 ring-rose-500 hover:ring-2 flex gap-2 absolute top-5 right-5 stroke-gray-500 hover:stroke-white"
      >
        <PlusIcon /> Add List
      </button>
      <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="flex gap-4">
            <div className="flex gap-4">
              {board[0] && (
                <SortableContext items={board[0].listsOrder}>
                  {lists.map((list, i: number) => (
                    <ListContainer
                      key={i}
                      list={list}
                      deleteList={deleteList}
                      updateList={updateList}
                      tasks={tasks.filter((task) => task.listId === list.id)}
                      createTask={createTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                    />
                  ))}
                </SortableContext>
              )}
            </div>
          </div>
          {createPortal(
            <DragOverlay>
              {activeList && (
                <ListContainer
                  list={activeList}
                  deleteList={deleteList}
                  updateList={updateList}
                  tasks={tasks.filter((task) => task.listId === activeList.id)}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              )}
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
      </div>
    </>
  );
};

export default KanbanBoard;
