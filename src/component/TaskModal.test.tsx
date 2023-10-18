import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import TaskModal, { ModalProps } from "./TaskModal";

describe("unit testing taskmodal", () => {
  it("1. Check that the modal appears with blank fields when we ADD a task", () => {
    const props: ModalProps = {
      operation: "ADD",
      open: true,
      handleClose: jest.fn(),
      pipeline: "todo",
    };
    render(<TaskModal {...props} />);

    const element = screen.getByTestId("task-modal");
    expect(element).toBeVisible();

    expect(screen.getByText("Add a task")).toBeVisible();

    expect(screen.getByLabelText("Task name")).toBeVisible();
    expect(screen.getByLabelText("Task name")).not.toHaveValue();

    expect(screen.getByLabelText("Task description")).not.toHaveValue();
    expect(screen.getByPlaceholderText("MM/DD/YYYY")).toHaveValue(
      dayjs().format("MM/DD/YYYY")
    );

    userEvent.click(screen.getByTestId("submit-test"));

    expect(props.handleClose).toBeCalled();
  });

  it("2. Check that the modal populates all fields with task data when we UPDATE a task", () => {
    const props: ModalProps = {
      operation: "UPDATE",
      open: true,
      handleClose: jest.fn(),
      pipeline: "todo",
      task: {
        id: 1,
        name: "TODO",
        description: "test description",
        deadline: dayjs(),
      },
    };
    render(<TaskModal {...props} />);

    const element = screen.getByTestId("task-modal");
    expect(element).toBeVisible();

    expect(screen.getByText("Update a task")).toBeVisible();

    expect(screen.getByLabelText("Task name")).toBeVisible();
    expect(screen.getByLabelText("Task name")).toHaveValue("TODO");

    expect(screen.getByLabelText("Task description")).toHaveValue(
      "test description"
    );
    expect(screen.getByPlaceholderText("MM/DD/YYYY")).toHaveValue(
      dayjs().format("MM/DD/YYYY")
    );

    userEvent.click(screen.getByTestId("submit-test"));

    expect(props.handleClose).toBeCalled();
  });
});
