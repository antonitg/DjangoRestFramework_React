import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation, useQueryClient } from 'react-query'
import apiClient from '../core/http-common'
export function CreateBike() {
    const queryClient = useQueryClient()
    return useMutation((payload) => {return apiClient.post('/v3/bikes/', {'name':'New Bike', 'station_id':payload.station_id})}, {
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
              return MySwal.fire(<p>New bike added!</p>)
            })
            apiClient.get("/v2/stations/").then(result => queryClient.setQueryData(['stations'], () => (result.data))) // Fill te station query
            
        },
      })
}
