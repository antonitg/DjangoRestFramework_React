import React, {  useState } from 'react'
import { Navigate } from 'react-router-dom'
import apiClient from './http-common'
export default function AdminRoute({children}) {
    const [auth, setAuth] = useState(null);
    apiClient.getNoError('/v1/check/admin/').then(res => setAuth((res.status === 200) ? children :  <Navigate to="/auth"/>))
    return auth
}