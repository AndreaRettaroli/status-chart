import { describe, it, expect } from "vitest";
import { render } from "./TestUtils.tsx";

import LineChart from "../components/LineChart.tsx";

describe("Renders LineChart correctly", () => {
  it("Should render LineChart correctly", () => {
    const { container } = render(<LineChart />);
    const canvasElement = container.querySelector("canvas");

    expect(canvasElement).toBeInTheDocument();
    expect(canvasElement?.height).not.toBeNull();
    expect(canvasElement?.width).not.toBeNull();
    expect(canvasElement?.height).not.toBe(0);
    expect(canvasElement?.width).not.toBe(0);
    expect(canvasElement).toHaveAttribute("role", "img");
  });
});
