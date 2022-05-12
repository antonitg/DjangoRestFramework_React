import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation, useQueryClient } from 'react-query'
import apiClient from '../core/http-common'
export function CloseIncidenceMutation() {
    const queryClient = useQueryClient()
    return useMutation((payload) => {return apiClient.post('/v4/incidence/close/', {'journey':payload.journey, 'response':payload.response})}, {
        onMutate: async () => {
        },
        onError: (err, _, context) => {
            const MySwal = withReactContent(Swal)
            MySwal.fire({
              didOpen: () => {
                MySwal.clickConfirm()
              }
            }).then(() => {
              return MySwal.fire(<p>{Object.values(err.response.data)[0]}</p>)
            })
        },
        onSuccess: (info, variables) => {
            const MySwal = withReactContent(Swal)
            MySwal.fire({
              didOpen: () => {
                MySwal.clickConfirm()
              }
            }).then(() => {
              return MySwal.fire(<p>Incidence closed succesfully!</p>)
            })
            apiClient.get("/v4/incidence/list/").then(result => queryClient.setQueryData(['incidence'], () => (result.data))) // Fill te station query
            
        },
      })
}
