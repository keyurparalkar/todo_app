import { createContext, Dispatch, Reducer, useReducer } from "react";
import { ADD_TASK_TO_PIPELINE } from "./actions";

export type TaskProps = {
  id: number;
  name?: string;
  description?: string;
  deadline?: string;
  attachment?: string;
};
export type TaskBoardProps = Record<string, TaskProps[] | []>;

export type TaskBoardActionProps = {
  type: string;
  payload?: any;
};

const initialState: TaskBoardProps = {
  todo: [
    {
      id: 1,
      name: "Apply for Jobs",
      deadline: "22/10/2023",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
  ],
  inProgress: [
    {
      id: 1,
      name: "Apply for Jobs",
      deadline: "22/10/2023",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
  ],
  completed: [
    {
      id: 1,
      name: "Apply for Jobs",
      deadline: "22/10/2023",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
  ],
};

export const BoardContext = createContext<TaskBoardProps>(initialState);
export const BoardDispatchContext = createContext<
  Dispatch<TaskBoardActionProps>
>((() => undefined) as Dispatch<TaskBoardActionProps>);

export const boardReducer = (
  state: TaskBoardProps,
  action: TaskBoardActionProps
) => {
  switch (action.type) {
    case ADD_TASK_TO_PIPELINE:
      return state;

    default:
      return state;
  }
};

export const TaskBoardProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer<
    Reducer<TaskBoardProps, TaskBoardActionProps>
  >(boardReducer, initialState);

  return (
    <BoardContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardContext.Provider>
  );
};
