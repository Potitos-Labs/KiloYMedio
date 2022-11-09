import { Mock, test, vi } from "vitest";
import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import "@testing-library/jest-dom";
import MyApp from "@pages/_app";

vi.mock("next-auth/react");

test.todo("Home page", () => {
  const mockSession: Session = {
    expires: "1",
    user: { id: "1", email: "a", name: "Delta", image: "c" },
  };

  (useSession as Mock).mockReturnValueOnce([mockSession, false]);

  render(<MyApp />);
});
