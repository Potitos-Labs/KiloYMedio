import { render } from "@testing-library/react";
import { vi } from "vitest";

import IncDecButtons from "./IncDecButtons";

describe("SelectMenu test", () => {
  it("should render and select", () => {
    render(
      <IncDecButtons
        amount={10}
        setAmount={vi.fn()}
        max={100}
        unit="unit"
      ></IncDecButtons>,
    );
  });
});
