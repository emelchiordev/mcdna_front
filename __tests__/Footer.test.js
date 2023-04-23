import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Footer from '../src/components/Footer';

afterEach(cleanup);



it('Vérification des éléments du footer', () => {
    const { getByText } = render(<Footer />);

    // Vérifie que le texte "SUIVEZ-NOUS SUR :" s'affiche dans le composant
    expect(getByText(/SUIVEZ-NOUS SUR :/i)).toBeInTheDocument();

    // Vérifie que les quatre liens du menu s'affichent dans le composant
    expect(getByText(/MENTIONS LEGALES/i)).toBeInTheDocument();
    expect(getByText(/NOS CGU/i)).toBeInTheDocument();
    expect(getByText(/CHARTE DES COOKIES/i)).toBeInTheDocument();
    expect(getByText(/PREFERENCE DES COOKIES/i)).toBeInTheDocument();
});