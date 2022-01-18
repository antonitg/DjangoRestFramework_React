
import { useMutation, useQuery, useQueryClient } from 'react-query'

export function JourneyMutation() {
    const queryClient = useQueryClient()
    const queryKey = 'journey'
    return useMutation((payload) => {return payload}, {
        onMutate: async () => {
            // Set default values to the query to prevent errors on empty query data
            queryClient.setQueryData(queryKey, () => ({
                start: false,
                startName: undefined,
                startStation: undefined,
                startDate: undefined,
                stopStation: undefined,
                stopName: undefined,
            }))
        },
        onError: (err, _, context) => {
            // Pendet fer algun tipo de controlador de errors o setQueryData de les variables de error que deurien de estar be ja que no pot fallar la mutation al principi per que no depen de res
            console.log(err); // Log error
            console.log(_); // Log variables
        },
        onSuccess: (data, variables) => {
            // en este cas data i variables son lo mateix ja que variables son els inputs de la mutation i data el que retorna al començar la mutation com no faig cap tipus de modificacio de datos ni faig us del api client i sols retorne el propi payload es queda en el mateix
            queryClient.setQueryData(queryKey, () => ({
                start: variables.start || false,
                startStation:variables.startStation || undefined,
                startName: variables.startName || undefined,
                startDate: variables.startDate || undefined,
                stopStation: variables.stopStation || undefined,
                stopName: variables.stopName || undefined

            }))
        },
      })
}
