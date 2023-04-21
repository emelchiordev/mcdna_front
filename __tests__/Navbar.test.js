import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Navbar from '../src/components/Navbar';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

describe("Vérification des éléements de la barre de navigation", () => {
    it("Vérification des 3 items du menu", () => {
        const { getByText } = render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        )
        expect(getByText("Catalogue")).toBeInTheDocument()
        expect(getByText("Rayons")).toBeInTheDocument()
        expect(getByText("Promotions")).toBeInTheDocument()

    }),
        it("Vérification de la présence du logo et du titre", () => {
            const { getByText, getByAltText } = render(
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            )
            expect(getByAltText("logo")).toBeInTheDocument()
            expect(getByText("MERCADONA")).toBeInTheDocument()

        })
})