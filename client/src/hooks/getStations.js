import { useQuery } from 'react-query'
import apiClient from '../core/http-common'

export function GetStations() {
    return useQuery(['stations', 'getStations'], async () => await apiClient.get("/v1/stations/"))
}