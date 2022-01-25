import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation, useQueryClient } from 'react-query'
import apiClient from '../core/http-common'
export function StartJourneyMutation() {
    const queryClient = useQueryClient()
    const queryKey = 'journey'
    return useMutation((payload) => {return apiClient.post('/v2/journey/', {'startStation':payload.startStation})}, {
        onMutate: async () => {
        },
        onError: (err, _, context) => {
            console.log(err.response.data); // Log error
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
          console.log(info);
            queryClient.setQueryData(queryKey, () => ({
                start: true,
                startStation:variables.startStation || undefined,
                startName: variables.startName || undefined,
                startDate: info.data.start,
                stopStation: variables.stopStation || undefined,
                stopName: variables.stopName || undefined
            }))
            apiClient.get("/v2/stations/").then(result => queryClient.setQueryData('stations', () => (result.data)))
        },
      })
}
