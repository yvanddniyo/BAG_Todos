import { test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { DropdownMenuRadioGroupDemo } from "../components/shadcn/Profile";

test("Testing the profile components", ({ session }: any) => {
  render(<DropdownMenuRadioGroupDemo session={session} />);
  const text = "Your Profile";
  const profileTitle = screen.findByTitle(text);
  expect(profileTitle);
});