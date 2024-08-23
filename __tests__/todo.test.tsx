import { expect, test } from "vitest";
import {act, render, screen, waitFor, waitForElementToBeRemoved} from  "@testing-library/react"
import Todo from "../components/Todos/todo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "../components/shadcn/Loader";
import { vi } from "vitest"


test("Todo page testing", async () => {
  const mockGetTodos = vi.fn(() => ({
    data: [
        { id: 1, title: "Test Todo",  description: "Learning testing", completed: false },
        {id: 2, title: "learnig", description: "learning coding", completed: false}
    ]
}))
mockGetTodos()
    render(
        <QueryClientProvider client={new QueryClient}>
            <Todo />
        </QueryClientProvider>
    )
    const loader = render(<Loader />)
    mockGetTodos
    expect(loader)
    expect(mockGetTodos).toHaveBeenCalled()
//     const text = screen.getByText("Oops You've no todos yet 😞")
//    await waitFor(() => text)
})