import { expect, test } from "vitest"
import { render, screen } from '@testing-library/react'
import {UpdateAlert }from "../utils/updateModal"



test('Home', () => {
    render(
        <UpdateAlert todo={{
            id: 0,
            title: "",
            description: ""
        }} disables={{
            done: false
        }} onUpdate={function (updatedData: { title: string; description: string }): void {
            throw new Error("Function not implemented.")
        } } isLoading={false}  />
    )
    const update = "update"
    const appName = screen.findByTitle(update)
    expect(appName)
})