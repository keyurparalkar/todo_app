import { createContext, Dispatch, Reducer, useReducer } from "react";
import { ADD_TASK_TO_PIPELINE, MOVE_TASK, SORT_PIPELINE } from "./actions";

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
export const generateId = () => Math.trunc(Math.random() * 1000);

const initialState: TaskBoardProps = {
  todo: [
    {
      id: generateId(),
      name: "TODO TASK",
      deadline: "22/10/2023",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
  ],
  inProgress: [
    {
      id: generateId(),
      name: "IN_PROGRESS TASK",
      deadline: "22/10/2023",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
  ],
  completed: [
    {
      id: generateId(),
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
    case ADD_TASK_TO_PIPELINE: {
      return {
        ...state,
        [action.payload.key]: [
          ...state[action.payload.key],
          { ...action.payload.data, id: generateId() },
        ],
      };
    }

    case MOVE_TASK: {
      const { source, destination, nextSourceList, nextDestinationList } =
        action.payload;
      return {
        ...state,
        [source]: nextSourceList,
        [destination]: nextDestinationList,
      };
    }

    case SORT_PIPELINE: {
      const { source } = action.payload;
      const arrayToBeSorted = [...state[source]];
      return {
        ...state,
        [source]: arrayToBeSorted.sort((a, b) => {
          if (a.name && b.name) return b.name.localeCompare(a.name);
          else return -1;
        }),
      };
    }
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
