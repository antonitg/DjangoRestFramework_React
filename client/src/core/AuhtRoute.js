import React, {  useState } from 'react'
import { Navigate } from 'react-router-dom'
import apiClient from './http-common'
export default function AuthRoute({children}) {
    const [auth, setAuth] = useState(null);
    apiClient.getNoError('/v1/check/').then(res => {
        if (res.status === 200) {
            setAuth(children)
            // (res.data.worker === 1) ? 'y' : 'n'
            console.log(res);
            localStorage.setItem('admin', (res.data.worker === 1) ? 'y' : 'n')
        } else {
            setAuth(<Navigate to="/auth"/>)
            localStorage.setItem('admin', 'n') 
        }
    })
    return auth
}