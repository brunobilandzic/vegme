import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "../App";
import rootReducer from "../Redux/rootReducer";

jest.mock("./catalog", () => ({
  ...jest.requireActual("./catalog"),
  isStaticDemo: true,
}));

it("opens the catalog and completes a guest order without API requests", async () => {
  const requests = jest.spyOn(XMLHttpRequest.prototype, "open");
  window.history.replaceState({}, "", "/");
  const store = configureStore({ reducer: rootReducer });
  const { container } = render(
    <Provider store={store}>
      <div id="backdrop-hook" />
      <div id="modal-hook" />
      <App />
    </Provider>
  );

  try {
    const mealName = "Roasted Vegetable and Lentil Bowl";
    const mealLink = await screen.findByRole("link", { name: mealName });
    const mealCard = within(mealLink.closest("article"));
    expect(mealCard.getByText("Allergens")).toBeInTheDocument();
    expect(mealCard.getByText("Tahini")).toBeInTheDocument();
    fireEvent.click(mealCard.getByRole("button", { name: "Add to cart" }));
    fireEvent.click(mealCard.getByRole("button", { name: "Remove from cart" }));
    expect(screen.getByRole("heading", { name: "About this demo" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What the full app includes" })).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
    expect(screen.queryByRole("link", { name: /login|signup/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: "Cooks" }));
    fireEvent.click(await screen.findByRole("link", { name: /mia.*meals cooked/i }));
    expect(await screen.findByText("Mia Kovač")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cooked 3 meals"));

    fireEvent.click(screen.getByText(mealName));
    await screen.findByText(mealName);
    fireEvent.click(container.querySelector("svg"));
    fireEvent.click(screen.getByRole("link", { name: /^Cart/ }));

    await screen.findByRole("option", { name: "Monday" });
    fireEvent.change(screen.getByLabelText("Delivery Address"), {
      target: { value: "Demo Street 1" },
    });
    fireEvent.change(screen.getByLabelText(/choose delivery time/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Order" }));
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    expect(await screen.findByText("Demo order complete.")).toBeInTheDocument();
    expect(store.getState().meals.mealsToOrder).toHaveLength(0);
    expect(requests).not.toHaveBeenCalled();
  } finally {
    requests.mockRestore();
  }
});
