import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation, useQueryClient } from 'react-query'
import apiClient from '../core/http-common'

export function RetrieveJourney() {
    const queryClient = useQueryClient()
    const queryKey = 'journey'
    return  useMutation(
        () => {
            return apiClient.get('/v2/journey/actual/')
        },
        {
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
        onSuccess: (data) => {
            if (data.data.length > 0) {
                console.log(data.data);
                queryClient.setQueryData(queryKey, () => ({
                    start: true,
                    startStation: data.data.startStation || undefined,
                    startName: data.data.startName || undefined,
                    startDate: data.data.startDate || undefined,
                    stopStation: data.data.stopStation || undefined,
                    stopName: data.data.stopName || undefined
    
                }))
            } else {
                
                console.log("Not in a journey");
            }
            console.log(data);
            }
        }
      )
}
