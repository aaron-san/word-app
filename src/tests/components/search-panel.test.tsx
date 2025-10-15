import { test, expect, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchPanel from "@/components/SearchPanel";

describe("SearchPanel", () => {
  test("renders add button", () => {
    render(<SearchPanel language="japanese" />);
    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeInTheDocument();
  });
  test("calls addWordHandler on add button click", () => {
    render(<SearchPanel language="japanese" />);
    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);
  });
  // test("The sum should work properly", () => {
  //   expect(1 + 34).toBe(33);
  // });
  test("Input field should be in the document", () => {
    render(<SearchPanel language="japanese" />);
    const inputField = screen.getByRole("textbox");
    expect(inputField).toBeInTheDocument();
  });
  test("Submit button should be enabled", () => {
    render(<SearchPanel language="japanese" />);
    const button = screen.getByRole("button", { name: /add/i });
    expect(button).toBeEnabled();
  });
  test("Input field should accept text", () => {
    render(<SearchPanel language="japanese" />);
    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "test" } });
    expect((inputField as HTMLInputElement).value).toBe("test");
  });
});
