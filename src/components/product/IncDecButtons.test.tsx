import { render } from "@testing-library/react";
import { vi } from "vitest";

import IncDecButtons from "./IncDecButtons";

describe("SelectMenu test", () => {
  it("should render and select", () => {
    render(
      <IncDecButtons
        amount={10}
        isEdible={false}
        setAmount={vi.fn()}
        stock={100}
        stockLeft={true}
        productUnit="unit"
      ></IncDecButtons>,
    );
  });
});
