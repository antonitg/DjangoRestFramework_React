import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation, useQueryClient } from 'react-query'
import apiClient from '../core/http-common'

export function AttemptRegister() {
    const queryClient = useQueryClient()
    const queryKey = 'register'
    return useMutation((payload) => { return apiClient.post('/v1/register/', payload.user.data)},
        {
          onMutate: async ({ userData }) => {
            const user = queryClient.getQueryData(queryKey)
            await queryClient.cancelQueries(queryKey)  
            queryClient.setQueryData(queryKey, () => ({
              user: userData,
            }))
            return { user }
          },
          onError: (err, _, context) => {
            queryClient.setQueryData(queryKey, "Error")
            const MySwal = withReactContent(Swal)
            MySwal.fire({
              didOpen: () => {
                MySwal.clickConfirm()
              }
            }).then(() => {
              return MySwal.fire(<p>An error ocurred during register :/</p>)
            })
        },
          onSettled: () => {
            queryClient.invalidateQueries(queryKey)
          },
          onSuccess: (data,_,context) => {

              // hookLogin(_.user.data.username,_.user.data.password);
              console.log(data);
              console.log(context);
              console.log(_);
              const MySwal = withReactContent(Swal)
              MySwal.fire({
                didOpen: () => {
                MySwal.clickConfirm()
              }
            }).then(() => {
              return MySwal.fire(<p>The register was a success! Login now!</p>)
            })
            }
        }
      )
}
