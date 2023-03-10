import React from 'react';
import { useAuth } from "../context/AuthContext.jsx"
import {Navigate} from "react-router-dom"

export default function ProtectedRoute({children}){
    const { currentUser } = useAuth()

        if (!currentUser){
            return <Navigate to="/signin" />
        }
        
    return children
}
