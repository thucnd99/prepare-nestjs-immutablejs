import React from "react";
import { render, screen } from '@testing-library/react'
import Home from "../pages/home/Home";

describe('Home', () => {
    test('renders', () => {
        render(<Home />)
        const titleElement = screen.getByText(/home/i)
        expect(titleElement).toBeInTheDocument()
    })
})