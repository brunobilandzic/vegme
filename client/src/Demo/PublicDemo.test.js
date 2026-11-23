import { fireEvent, render, screen } from "@testing-library/react";
import PublicDemo from "./PublicDemo";

beforeEach(() => window.localStorage.clear());

test("saves and restores a practice plan with meals from one cook", () => {
  const page = render(<PublicDemo />);
  fireEvent.click(screen.getByRole("button", { name: "Add Roasted chickpea bowl" }));
  expect(screen.getByRole("button", { name: "Add Wild mushroom barley" }).disabled).toBe(true);
  fireEvent.change(screen.getByLabelText("Delivery day"), { target: { value: "Wednesday" } });
  fireEvent.click(screen.getByRole("button", { name: "Save practice plan" }));
  expect(screen.getByRole("status").textContent).toBe("Practice plan saved.");
  page.unmount();

  render(<PublicDemo />);
  expect(screen.getByText(/Wednesday · Roasted chickpea bowl/)).toBeTruthy();
  expect(screen.getByLabelText("Delivery day").value).toBe("Wednesday");
});

test("shows a cook's new meal in the planner and hides it when withdrawn", () => {
  render(<PublicDemo />);
  const cook = screen.getByRole("button", { name: "Cook workspace" });
  const menu = screen.getByRole("button", { name: "Meal planner" });
  fireEvent.click(cook);
  fireEvent.change(screen.getByLabelText("Meal name"), { target: { value: "Herb stew" } });
  fireEvent.change(screen.getByLabelText("Ingredients"), { target: { value: "Beans and thyme" } });
  fireEvent.click(screen.getByRole("button", { name: "Add to menu" }));
  fireEvent.click(menu);
  expect(screen.getByRole("button", { name: "Add Herb stew" })).toBeTruthy();
  fireEvent.click(cook);
  const card = screen.getByRole("heading", { name: "Herb stew" }).closest("article");
  fireEvent.click(card.querySelector("button"));
  fireEvent.click(menu);
  expect(screen.queryByRole("button", { name: "Add Herb stew" })).toBeNull();
});
