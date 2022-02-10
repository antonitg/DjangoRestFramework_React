import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation, useQueryClient } from 'react-query'
import apiClient from '../core/http-common'
export function EditStation() {
    const queryClient = useQueryClient()
    return useMutation((payload) => {return apiClient.post('/v3/stations/update/', {'id':payload.id, 'name':payload.name, 'space':payload.space, 'photo': payload.photo})}, {
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
              return MySwal.fire(<p>Station edited succesfully!</p>)
            })
            apiClient.get("/v2/stations/").then(result => queryClient.setQueryData(['stations'], () => (result.data))) // Fill te station query
            
        },
      })
}
