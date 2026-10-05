///<reference types="@testing-library/jest-dom" />

import { describe, it, expect, vi, afterEach } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";

import { searchWeb } from "../../../src/api/search";
import Search from "../../../src/components/Search";

vi.mock("../../../src/api/search", () => ({
  searchWeb: vi.fn(),
}));

describe("Search component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render search component and display search results after successful search", async () => {
    const searchMock = vi.mocked(searchWeb);
    searchMock.mockResolvedValue([
      {
        title: "React 19 features",
        url: "https://reactjs.org/blog/2024/01/01/react-19-features.html",
        snippet: "React 19 introduces several new features and improvements...",
        source: "reactjs.org",
      },
    ]);

    const user = userEvent.setup();

    render(<Search />);

    const input = screen.getByPlaceholderText("Search the web...");
    const button = screen.getByRole("button", { name: /Search/i });

    await user.type(input, "react19 features");
    await user.click(button);

    expect(searchMock).toHaveBeenCalledWith("react19 features");

    expect(await screen.findByText("React 19 features")).toBeInTheDocument();

    expect(
      await screen.findByText(
        "React 19 introduces several new features and improvements...",
      ),
    ).toBeInTheDocument();

    expect(await screen.findByText("reactjs.org")).toBeInTheDocument();
  });

  it("should render search component and show error message on failed search", async () => {
    const searchMock = vi.mocked(searchWeb);
    searchMock.mockRejectedValue(new Error("Search failed"));

    const user = userEvent.setup();

    render(<Search />);

    const input = screen.getByPlaceholderText("Search the web...");
    const button = screen.getByRole("button", { name: /Search/i });

    await user.type(input, "react19 features");
    await user.click(button);

    expect(searchMock).toHaveBeenCalledWith("react19 features");

    expect(
      await screen.findByText("Something went wrong while searching."),
    ).toBeInTheDocument();

    expect(screen.queryByText("React 19 features")).not.toBeInTheDocument();
  });
});
