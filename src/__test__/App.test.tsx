import { describe, it, expect } from "vitest";
import { render, screen } from "./TestUtils.tsx";

import App from "../App.tsx";

describe("Renders app page correctly", () => {
  it("Should render the app page correctly", () => {
    render(<App />);
    expect(screen.getByTestId("chart-container")).toBeDefined();
  });
});
