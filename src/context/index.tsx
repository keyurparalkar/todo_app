import { createContext, Dispatch, Reducer, useReducer } from "react";
import { ADD_TASK_TO_PIPELINE, MOVE_TASK } from "./actions";

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
      id: Math.trunc(Math.random() * 1000),
      name: "TODO TASK",
      deadline: "22/10/2023",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
  ],
  inProgress: [
    {
      id: Math.trunc(Math.random() * 1000),
      name: "IN_PROGRESS TASK",
      deadline: "22/10/2023",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
  ],
  completed: [
    {
      id: Math.trunc(Math.random() * 1000),
      name: "COMPLETED TASK",
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
      const lastIndex = state[action.payload.key].length - 1;
      return {
        ...state,
        [action.payload.key]: [
          ...state[action.payload.key],
          { ...action.payload.data, id: lastIndex + 1 },
        ],
      };

    case MOVE_TASK:
      const { source, destination, nextSourceList, nextDestinationList } =
        action.payload;
      return {
        ...state,
        [source]: nextSourceList,
        [destination]: nextDestinationList,
      };

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
