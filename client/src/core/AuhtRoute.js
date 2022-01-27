import React, {  useState } from 'react'
import { Navigate } from 'react-router-dom'
import apiClient from './http-common'
export default function AuthRoute({children}) {
    const [auth, setAuth] = useState(null);
    apiClient.getNoError('/v1/check/').then(res => setAuth((res.status === 200) ? children :  <Navigate to="/auth"/>))
    return auth
}