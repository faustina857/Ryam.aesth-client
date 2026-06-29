import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import BookAppointment from './pages/BookAppointment'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLogin from './pages/admin/AdminLogin'
import AdminAppointments from './pages/admin/AdminAppointments'
import AdminServices from './pages/admin/AdminServices'
import PrivacyPolicy from './pages/PrivacyPolicy'

function Layout() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/appointments" element={
          <ProtectedRoute>
            <AdminAppointments />
          </ProtectedRoute>
        } />
        <Route path="/admin/services" element={
          <ProtectedRoute>
            <AdminServices />
          </ProtectedRoute>
        } />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App