import {expect, test} from "vitest"
import { render, screen} from "@testing-library/react"
import { DeleteAlert } from "../components/shadcn/deleteModal"

test("Delete a modal", () =>{
    render(
        <DeleteAlert todo={{
            id: 0,
            title: "",
            description: ""
        }} 
        // @ts-ignore
        isLoading={false} onDelete={function (id: number): void {
            throw new Error("Function not implemented.")
        }} />
    )
    const label = 'Delete'
    const deleteButton = screen.getByText(label)
    expect(deleteButton)
} )