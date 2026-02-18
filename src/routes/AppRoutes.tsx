import { Navigate, Route, Routes } from 'react-router-dom'

import AboutPage from '@/pages/AboutPage'
import EventsPage from '@/pages/EventsPage'
import GymDetailsPage from '@/pages/GymDetailsPage'
import GymsPage from '@/pages/GymsPage'
import HomePage from '@/pages/HomePage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/gyms' element={<GymsPage />} />
        <Route path='/gyms/:id' element={<GymDetailsPage />} />

        <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes