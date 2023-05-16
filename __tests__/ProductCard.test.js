import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import ProductCard from '../src/components/ProductCard';

describe("Vérification des différents éléments de la carte produit", () => {
    it('Le prix du produit doit s\'afficher', () => {
        const { getByText } = render(<ProductCard price="10.50" />)
        expect(getByText("10.50 €")).toBeInTheDocument()
    }),
        it('Le libellé du produit doit s\'afficher', () => {
            const { getByText } = render(<ProductCard label="Chocolat milka - 200g" />)
            expect(getByText("Chocolat milka - 200g")).toBeInTheDocument()
        })


})