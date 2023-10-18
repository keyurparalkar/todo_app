import { render, screen } from "@testing-library/react";
import Task from "./Task";
import dayjs from "dayjs";
import userEvent from "@testing-library/user-event";

const sampleTask = {
  id: 1,
  name: "Sample Task",
  description: "This is a sample task",
  deadline: dayjs(),
  pLine: "Sample Pipeline",
};

describe("Task component", () => {
  it("renders task details and opens the modal on click", () => {
    render(<Task {...sampleTask} />);

    // Check if the task name is displayed
    const taskName = screen.getByText("Sample Task");
    expect(taskName).toBeInTheDocument();

    // Check if the deadline is displayed
    const deadline = screen.getByText(dayjs().format("DD MMM YY"));
    expect(deadline).toBeInTheDocument();

    // Check if the description is displayed
    const description = screen.getByText("This is a sample task");
    expect(description).toBeInTheDocument();

    // Check if the delete button is present
    const deleteButton = screen.getByLabelText("delete");
    expect(deleteButton).toBeInTheDocument();

    // Click on the task name to open the modal
    userEvent.click(taskName);

    // Check if the modal is now open
    const openModal = screen.getByTestId("task-modal");
    expect(openModal).toBeInTheDocument();
  });
});
