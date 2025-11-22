import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  // </StrictMode>,
)
