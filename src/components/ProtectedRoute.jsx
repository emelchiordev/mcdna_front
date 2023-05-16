import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, authenticated }) => {
    if (authenticated.roles !== 'undefined') {
        if (authenticated.roles[0] === 'ROLE_ADMIN') {
            return children
        }
    }
    return <Navigate to="/landing" replace />;

}

export default ProtectedRoute