import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import axios from 'axios'
import type { CosmoObject } from './types'

export const useCosmicObjectsQuery = () =>
  useQuery({
    queryKey: ['cosmicObjects'],
    queryFn: async () => {
      const res = await axios.get<CosmoObject[]>('cosmicObjects')
      return res.data
    },
  })

export const useSaveCosmicObjectMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (obj: Omit<CosmoObject, 'id'> & { id?: CosmoObject['id'] }) => {
      return axios.request({
        url: `cosmicObjects/${obj.id ?? ''}`,
        method: obj.id ? 'PUT' : 'POST',
        data: obj,
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['cosmicObjects'] })
      message.success('Объект сохранен')
    },
  })
}

export const useDeleteCosmicObjectMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: CosmoObject['id']) => {
      return axios.delete(`cosmicObjects/${id}`)
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['cosmicObjects'] })
      message.success('Объект удален')
    },
  })
}
