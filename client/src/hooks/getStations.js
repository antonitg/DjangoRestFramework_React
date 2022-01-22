// import { useQuery } from 'react-query'
// import apiClient from '../core/http-common'

// export function GetStations() {
//     return useQuery(['stations', 'getStations'], async () => await apiClient.get("/v2/stations/"))
// }

            
// Not needed anymore, retrieve data directly on functions or hooks and apply the result on the setQueryData().
// Example-> apiClient.get("/v2/stations/").then(result => queryClient.setQueryData('stations', () => (result.data)))