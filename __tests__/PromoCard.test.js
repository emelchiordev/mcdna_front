import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import PromoCard from '../src/components/PromoCard';

describe("Vérification des différents éléments de la carte produit en promotion", () => {
    it("Affichage du pourcentage de remise", () => {
        const { getByText } = render(<PromoCard percent_promo="20%" />)
        expect(getByText("-20%")).toBeInTheDocument()
    }),
        it("Affichage du prix remisé", () => {
            const { getByText } = render(<PromoCard price_discount="22.53" />)
            expect(getByText("22.53€")).toBeInTheDocument()

        })
})