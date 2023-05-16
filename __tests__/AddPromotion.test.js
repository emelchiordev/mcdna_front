import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import axios from 'axios';
import AddPromotion from '../src/components/AddPromotion';
import PromotionService from '../src/services/PromotionService';


jest.mock('axios', () => ({
    get: jest.fn(),
    delete: jest.fn(),
    post: jest.fn()
}))



describe("Vérification des composants de la page promotion", () => {

    const mockProductId = 1;
    const mockData = {
        status: 200, data: {
            '@context': '/api/contexts/Promotions',
            '@id': '/api/promotions',
            '@type': 'hydra:Collection',
            'hydra:member': [
                {
                    id: 1,
                    percentage: 20,
                    startDate: '2022-01-01',
                    endDate: '2022-01-10',
                    products: `/api/products/${mockProductId}`,
                },
                {
                    id: 2,
                    percentage: 30,
                    startDate: '2022-01-11',
                    endDate: '2022-01-20',
                    products: `/api/products/${mockProductId}`,
                },
            ]
        }
    }

    test('Vérification appel API lorsque qu\'on demande la suppression d\'une promtion', async () => {


        axios.get.mockResolvedValue(mockData)
        axios.delete.mockResolvedValue({ status: 204 })

        render(<AddPromotion productId={mockProductId} />);
        await waitFor(async () => {
            const deleteButtons = await screen.findAllByTestId('delete-button');
            fireEvent.click(deleteButtons[0]); // Simule un clic sur le premier bouton de suppression de promotion

        })

    })
});