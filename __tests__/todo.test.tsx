import { expect, test } from "vitest";
import {act, render, screen, waitFor, waitForElementToBeRemoved} from  "@testing-library/react"
import Todo from "../lib/components/todo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "../utils/Loader";
import { setTimeout } from "timers";


test("Todo page testing", async () => {
 
    render(
        <QueryClientProvider client={new QueryClient}>
            <Todo />
        </QueryClientProvider>
    )
    const loader = render(<Loader />)
    expect(loader)
//     const text = screen.getByText("Oops You've no todos yet 😞")
//    await waitFor(() => text)
})