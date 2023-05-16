import React from 'react'

const LegalPage = () => {
    return (
        <div className='container mt-5' style={{ minHeight: '75vh' }}>
            <h1>Mentions légales</h1>
            <p>Ce site est édité par [Nom de la société]</p>
            <p>Adresse : [Adresse de la société]</p>
            <p>Téléphone : [Numéro de téléphone de la société]</p>
            <p>Email : [Adresse email de la société]</p>
            <p>Directeur de la publication : [Nom du directeur de la publication]</p>
            <p>Hébergeur du site : [Nom de l'hébergeur]</p>
            <p>Adresse de l'hébergeur : [Adresse de l'hébergeur]</p>
            <p>Téléphone de l'hébergeur : [Numéro de téléphone de l'hébergeur]</p>
            <p>Email de l'hébergeur : [Adresse email de l'hébergeur]</p>
            <p>
                Ce site a fait l'objet d'une déclaration à la CNIL sous le numéro [Numéro
                de déclaration à la CNIL].
            </p>
            <p>
                Tous les contenus présents sur le site [Nom du site] sont protégés par
                le droit d'auteur. Toute reproduction, même partielle, est interdite
                sans l'accord préalable de la société [Nom de la société].
            </p>
        </div>
    )
}

export default LegalPage