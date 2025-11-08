import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { CosmoObject } from './types'

export const useCosmicObjects = () =>
  useQuery({
    queryKey: ['cosmicObjects'],
    queryFn: async () => {
      const res = await axios.get<CosmoObject[]>('cosmicObjects')
      return res.data
    },
  })
