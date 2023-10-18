import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Reducer, useReducer } from "react";
import {
  BoardContext,
  BoardDispatchContext,
  boardReducer,
  initialState,
  TaskBoardActionProps,
  TaskBoardProps,
  TaskBoardProvider,
} from "../context";
import PipeLine from "./PipeLine";

describe("unit testing Pipeline", () => {
  it("1. Check that task appears in the pipeline", () => {
    render(
      <TaskBoardProvider>
        <PipeLine pLine="todo" tasks={initialState["todo"]} />
      </TaskBoardProvider>
    );

    const taskElem = screen.getByText("TODO TASK");
    expect(taskElem).toBeVisible();
  });

  it("2. Check that added task is sorted and move to last position in the pipeline", () => {
    const TestingComponent = () => {
      const [state, dispatch] = useReducer<
        Reducer<TaskBoardProps, TaskBoardActionProps>
      >(boardReducer, initialState);

      return (
        <BoardContext.Provider value={state}>
          <BoardDispatchContext.Provider value={dispatch}>
            <PipeLine pLine="todo" tasks={initialState["todo"]} />
          </BoardDispatchContext.Provider>
        </BoardContext.Provider>
      );
    };
    render(<TestingComponent />);

    const addButton = screen.getByTestId("AddIcon");
    userEvent.click(addButton);
    expect(screen.getByText("Add a task")).toBeVisible();

    const nameElem = screen.getByLabelText("Task name");
    userEvent.type(nameElem, "Example Update JIRA");
    expect(nameElem).toHaveValue("Example Update JIRA");

    const desp = screen.getByLabelText("Task description");
    userEvent.type(desp, "test");
    expect(desp).toHaveValue("test");

    userEvent.click(screen.getByTestId("test-submit"));

    waitFor(() => {
      const sortElem = screen.getByTestId("SortByAlphaIcon");
      expect(sortElem).toBeVisible();
      userEvent.click(sortElem);

      const firstElem = screen.getByDisplayValue("Example Update JIRA");
      expect(firstElem).toBeVisible();
    });
  });
});
