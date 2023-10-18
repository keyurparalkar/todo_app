import { render, screen } from "@testing-library/react";
import StatusModal from "./StatusModal"; // Adjust the import path as needed
import userEvent from "@testing-library/user-event";

test("StatusModal renders correctly and interacts with user input", () => {
  render(<StatusModal />);

  // Find and click the "Add new status" button
  const addButton = screen.getByText("Add new status");
  userEvent.click(addButton);

  // Verify that the modal is open
  const modalTitle = screen.getByTestId("status-modal");
  expect(modalTitle).toBeVisible();

  // Find the input field and check its value
  const inputField = screen.getByLabelText("Enter new status");
  userEvent.type(inputField, "Test Status");
  expect(inputField).toHaveValue("Test Status");

  // Find and click the "Create Task" button
  const createTaskButton = screen.getByText("Create Status");
  userEvent.click(createTaskButton);
});
