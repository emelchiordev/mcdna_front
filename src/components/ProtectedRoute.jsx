import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, authenticated }) => {
    console.log(authenticated)
    if (authenticated.roles !== 'undefined') {
        if (authenticated.roles[0] === 'administrator') {
            return children
        }
    }
    return <Navigate to="/landing" replace />;

}

export default ProtectedRoute