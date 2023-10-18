import { render } from "@testing-library/react";
import { BoardContext, initialState } from "../context";
import Board from "./Board";

describe("unit testing Board", () => {
  it("1. Check that 3 boards are available", () => {
    const TestingComponent = () => {
      return (
        <BoardContext.Provider value={initialState}>
          <Board />
        </BoardContext.Provider>
      );
    };
    render(<TestingComponent />);
    const allGrids = document.querySelectorAll(".MuiGrid-root.MuiGrid-item");
    expect(allGrids).toHaveLength(3);
  });
});
