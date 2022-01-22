import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation, useQueryClient } from 'react-query'
import apiClient from '../core/http-common'
export function StopJourneyMutation() {
    const queryClient = useQueryClient()
    const queryKey = 'journey'
    return useMutation((payload) => {return apiClient.post('/v2/journey/stop/', {'stopStation':payload.stopStation})}, {
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
                return MySwal.fire(<p>Your journey has been a success!</p>)
              })
            queryClient.setQueryData(queryKey, () => ({
                start: false,
                startStation: undefined,
                startName: undefined,
                startDate: undefined,
                stopStation: undefined,
                stopName: undefined
            }))
            apiClient.get("/v2/stations/").then(result => queryClient.setQueryData('stations', () => (result.data)))
        },
      })
}
