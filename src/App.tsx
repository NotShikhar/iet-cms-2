import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './cms/auth'
import { CmsProvider } from './cms/store'
import { Layout } from './components/layout/Layout'
import { RequireAuth } from './components/layout/RequireAuth'
import AboutPage from './pages/AboutPage'
import AcademicsPage from './pages/AcademicsPage'
import AdminLogin from './pages/AdminLogin'
import AdminPage from './pages/AdminPage'
import AdmissionsPage from './pages/AdmissionsPage'
import CampusLifePage from './pages/CampusLifePage'
import CmsPageView from './pages/CmsPageView'
import ContactPage from './pages/ContactPage'
import DepartmentDetail from './pages/DepartmentDetail'
import DepartmentsPage from './pages/DepartmentsPage'
import Home from './pages/Home'
import NoticesPage from './pages/NoticesPage'
import PlacementsPage from './pages/PlacementsPage'

export default function App() {
  return (
    <CmsProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin sign-in stands on its own, outside the public site chrome */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/academics" element={<AcademicsPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/departments/:slug" element={<DepartmentDetail />} />
              <Route path="/admissions" element={<AdmissionsPage />} />
              <Route path="/placements" element={<PlacementsPage />} />
              <Route path="/campus-life" element={<CampusLifePage />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/page/:slug" element={<CmsPageView />} />
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <AdminPage />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CmsProvider>
  )
}
