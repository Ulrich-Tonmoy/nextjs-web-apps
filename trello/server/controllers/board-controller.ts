export const getBoard = async (req, res) => {
  const board_data = {
    boards: [
      {
        id: "board-1",
        listsOrder: ["todo", "done", "doing"],
      },
    ],

    lists: [
      {
        id: "todo",
        count: 6,
        title: "Todo",
        taskOrder: ["1", "2", "8", "9", "10", "11"],
      },
      {
        id: "doing",
        count: 4,
        title: "Work in progress",
        taskOrder: ["3", "4", "12", "13"],
      },
      {
        id: "done",
        count: 3,
        title: "Done",
        taskOrder: ["5", "6", "7"],
      },
    ],

    tasks: [
      {
        id: "1",
        listId: "todo",
        content: "List admin APIs for dashboard",
        priority: "Priority.None",
      },
      {
        id: "2",
        listId: "todo",
        content:
          "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
        priority: "Priority.None",
      },
      {
        id: "3",
        listId: "doing",
        content: "Conduct security testing",
        priority: "Priority.None",
      },
      {
        id: "4",
        listId: "doing",
        content: "Analyze competitors",
        priority: "Priority.None",
      },
      {
        id: "5",
        listId: "done",
        content: "Create UI kit documentation",
        priority: "Priority.None",
      },
      {
        id: "6",
        listId: "done",
        content: "Dev meeting",
        priority: "Priority.None",
      },
      {
        id: "7",
        listId: "done",
        content: "Deliver dashboard prototype",
        priority: "Priority.None",
      },
      {
        id: "8",
        listId: "todo",
        content: "Optimize application performance",
        priority: "Priority.None",
      },
      {
        id: "9",
        listId: "todo",
        content: "Implement data validation",
        priority: "Priority.None",
      },
      {
        id: "10",
        listId: "todo",
        content: "Design database schema",
        priority: "Priority.None",
      },
      {
        id: "11",
        listId: "todo",
        content: "Integrate SSL web certificates into workflow",
        priority: "Priority.None",
      },
      {
        id: "12",
        listId: "doing",
        content: "Implement error logging and monitoring",
        priority: "Priority.None",
      },
      {
        id: "13",
        listId: "doing",
        content: "Design and implement responsive UI",
        priority: "Priority.None",
      },
    ],
  };
  res.send(board_data);
};
