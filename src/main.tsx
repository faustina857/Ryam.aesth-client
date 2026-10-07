import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider, useIsFetching } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, 
      retry: 1,
    },
  },
})

// tells the prerender robot when the page has finished loading
function PrerenderSignal() {
  const fetching = useIsFetching()

  useEffect(() => {
    if (fetching === 0) {
      const timer = setTimeout(() => {
        document.dispatchEvent(new Event('app-rendered'))
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [fetching])

  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <PrerenderSignal />
        <App />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
)
