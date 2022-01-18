import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation, useQueryClient } from 'react-query'
import apiClient from '../core/http-common'
import  { Navigate } from 'react-router-dom'

export function AttemptAuth() {
    const queryClient = useQueryClient()
    const queryKey = 'login'
    return  useMutation(
        (payload) => {
            return apiClient.post('/v1/login/', payload.user.data)
        },
        {
          onMutate: async ({ userData }) => {
            const user = queryClient.getQueryData(queryKey)
            await queryClient.cancelQueries(queryKey)
            queryClient.setQueryData(queryKey, () => ({
              user: userData,
            }))
            return { user }
          },
          onError: (err, _, context) => {
            queryClient.setQueryData(queryKey, "Error")
            const MySwal = withReactContent(Swal)

            MySwal.fire({
              didOpen: () => {
                MySwal.clickConfirm()
              }
            }).then(() => {
              return MySwal.fire(<p>Login Error user and password don't match!</p>)
            })
        },
          onSettled: () => {
            queryClient.invalidateQueries(queryKey)
          },
          onSuccess: (data) => {
              localStorage.setItem('jwt', data.data.access)
              localStorage.setItem('refresh', data.data.refresh)
              window.location.replace("http://localhost:3000/");
              return <Navigate to="/" replace/>
            }
        }
      )
}
