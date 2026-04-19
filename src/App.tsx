import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/core/layout'
import { DocsPage } from './pages/docs-page'
import { HomePage } from './pages/home-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'docs', element: <DocsPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
