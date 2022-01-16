import { useQuery } from 'react-query'
import apiClient from '../core/http-common'

export function GetStations() {
    const { isLoading, error, data } = useQuery("getStations", () => apiClient.get("/v1/stations/"))

    if (isLoading) return 'Loading...';
    if (error) return 'An error has occured: ' + error.message;

    return (
        data
        // <AttributeFields name='Edit Monster' method='PATCH' monster={data} />
    )
    // return useQuery("getStations", () => {return apiClient.get("/v1/stations/")},
    //     {
    //         enabled: false,
    //         onSuccess: (res) => {
    //         //   const result = {
    //         //     status: res.status + "-" + res.statusText,
    //         //     headers: res.headers,
    //         //     data: res.data,
    //         //   };
    //             console.log(res);
    //             return {
    //                 res
    //             }
    //         //   setGetResult(fortmatResponse(result));
    //         },
    //         onError: (err) => {
    //             console.log(err);
    //         //   setGetResult(fortmatResponse(err.response?.data || err));
    //         },
    //       }
    //     )

}