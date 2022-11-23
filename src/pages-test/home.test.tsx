import Home from "@pages/index";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { Mock, test, vi } from "vitest";

vi.mock("next-auth/react");

test.todo("Home page", () => {
  const mockSession: Session = {
    expires: "1",
    user: { id: "1", email: "a", name: "Delta", image: "c" },
  };

  (useSession as Mock).mockReturnValueOnce([mockSession, false]);

  render(<Home />);
});
