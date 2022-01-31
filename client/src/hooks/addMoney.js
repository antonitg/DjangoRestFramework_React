import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation, useQueryClient } from 'react-query'
import apiClient from '../core/http-common'
export function AddMoneyMutation() {
    const queryClient = useQueryClient()
    return useMutation((payload) => {return apiClient.post('/v2/transactions/', {'amount':payload.amount})}, {
        onMutate: async () => {
        },
        onError: (err, _, context) => {
            // console.log(err.response.data); // Log error
            const MySwal = withReactContent(Swal)
            MySwal.fire({
              didOpen: () => {
                MySwal.clickConfirm()
              }
            }).then(() => {
              return MySwal.fire(<p>That amount or value its not valid.</p>)
            })
        },
        onSuccess: (info, variables) => {
            const MySwal = withReactContent(Swal)
            MySwal.fire({
              didOpen: () => {
                MySwal.clickConfirm()
              }
            }).then(() => {
              return MySwal.fire(<p>Success!</p>)
            })
            apiClient.get("/v2/profile/money/").then(result => queryClient.setQueryData('getMoney', () => (result.data)))
            apiClient.get("/v2/transactions/history/").then(result => queryClient.setQueryData(['transactions'], () => (result.data))) 
        },
      })
}
