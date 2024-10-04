import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SearchContextProvider } from './utils/SearchContext.tsx'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import handleError from './utils/handleError.ts'

const queryCache = new QueryCache({
  onError: (error) => handleError(error),
})
const queryClient = new QueryClient({
  queryCache,
})

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <BrowserRouter>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </BrowserRouter>
    </StrictMode>
  </QueryClientProvider>,
)
