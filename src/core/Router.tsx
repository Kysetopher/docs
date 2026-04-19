import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/core/layout'
import { DocRecordPage } from '../pages/doc-record-page'
import { DocsPage } from '../pages/docs-page'
import { HomePage } from '../pages/home-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'docs', element: <DocsPage /> },
      { path: 'docs/:docId', element: <DocRecordPage /> },
    ],
  },
])
