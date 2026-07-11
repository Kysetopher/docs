import { Navigate, createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/core/layout'
import { DocRecordPage } from '../pages/doc-record-page'
import { HomePage } from '../pages/home-page'
import { TalentAgencyCustomerExperiencePage } from '../pages/talent-agency-customer-experience-page'
import { SpacePage } from '../pages/space-page'
import { SplashesPage } from '../pages/splashes-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'docs', element: <Navigate to='/' replace /> },
      { path: 'docs/:spaceId', element: <SpacePage /> },
      { path: 'docs/:spaceId/:docId', element: <DocRecordPage /> },
      { path: 'docs/:docId', element: <DocRecordPage /> },
      { path: 'spaces/:spaceId', element: <SpacePage /> },
      { path: 'spaces/:spaceId/:docId', element: <DocRecordPage /> },
      { path: 'spaces/talent-agency/customer-experience', element: <TalentAgencyCustomerExperiencePage /> },
      { path: 'splashes', element: <SplashesPage /> },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
})