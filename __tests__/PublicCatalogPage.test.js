import React from 'react';
import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import PublicCatalogPage from '../src/pages/PublicCatalogPage';


jest.mock('axios', () => ({
    get: jest.fn(),
}))



describe("Vérification des composants de la page produit", () => {

    it('Récupère un produit depuis l\'api est l\'affiche sur la page produit', async () => {
        const mockData = {
            status: 200, data: {
                '@context': '/api/contexts/Product',
                '@id': '/api/products',
                '@type': 'hydra:Collection',
                'hydra:member': [
                    {
                        '@id': '/api/products/1',
                        'id': 1,
                        'label': 'serviette',
                        'description': 'serviette de bain',
                        'price': '26',
                        "category": {
                            "@id": "/api/categories/4",
                            "@type": "Category",
                            "id": 4,
                            "libelle": "Epicerie sucrée"
                        },
                        'discountPrice': null
                    }
                ]
            }
        }
        axios.get.mockResolvedValue(mockData)
        render(<PublicCatalogPage />)

        await waitFor(() => {
            expect(screen.getByText('serviette de bain')).toBeInTheDocument()
            expect(screen.getByText('serviette')).toBeInTheDocument()

        })
    })


})