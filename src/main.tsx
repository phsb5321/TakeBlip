import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ReactQueryDevtools } from 'react-query/devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import "@fontsource/nunito-sans"; // Defaults to weight 400.
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Page_ListView } from '@/pages/listView'
import { Page_DetailView } from '@/pages/detailView';


const theme = extendTheme({
  colors: {
    navbar: '#1A2437',
    titleGrey: '#56616E',
    highlight: '#2CC3D5',
    selectedHighlight: '#009DAF',
    clearText: '#F8FBFB',
    iconSelected: '#6E7B91',
    iconLight: '#D2DFE6',
    subtitle: '#607B99',
    background: '#F5F8F9',
    white: '#FFFFFF',
    boxTextColor: '#52636C',
    boxSubtitle: '#738192',
    detailText: '#8CA0B3',
  },

  fonts: {
    body: 'Nunito Sans, sans-serif',
  }
})

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/detail/:name" element={<Page_DetailView />} />
            <Route path="/" element={<Page_ListView />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
