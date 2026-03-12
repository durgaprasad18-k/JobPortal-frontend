

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import FindJobsPage from './FindJobsPage';
import Header from '../Components/Header/Header';
import JobPage from './JobPage';
import ApplyJobPage from './ApplyJobPage';
import FindTalentPage from './FindTalentPage';
import TalentProfilePage from './TalentProfilePage';
import CompanyPage from './CompanyPage';
import JobHistoryPage from './JobHistoryPage';
import PostedJobPage from './PostedJobPage';
import PostJobPage from './PostJobPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import { useSelector } from 'react-redux';
import Footer from '../Components/Footer/Footer';
import ProfilePage from './ProfilePage';
import ProtectedRoute from '../Services/ProtectedRoute';
import PublicRoute from '../Services/PublicRoute';
import Unauthorized from './UnauthroizedPage';
import NotFoundPage from './NotFoundPage';
import { LoadingOverlay } from '@mantine/core';

const AppRoutes = () => {
  const overlay = useSelector((state: any) => state.overlay);
  return <BrowserRouter>
    <div className='relative overflow-hidden'>
      {overlay && <div className='fixed !z-[2000] w-full h-full flex  items-center justify-center'>
        <LoadingOverlay
          visible={overlay}
          zIndex={2000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'brightSun.4', type: 'bars' }}
        />

      </div>}
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/find-jobs' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><FindJobsPage /></ProtectedRoute>} />
        <Route path='/jobs/:id' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><JobPage /></ProtectedRoute>} />
        <Route path='/apply-job/:id' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><ApplyJobPage /></ProtectedRoute>} />
        <Route path='/find-talent' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><FindTalentPage /></ProtectedRoute>} />
        <Route path='/talent-profile/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><TalentProfilePage /></ProtectedRoute>} />
        <Route path='/company/:name' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><CompanyPage /></ProtectedRoute>} />
        <Route path='/job-history' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><JobHistoryPage /></ProtectedRoute>} />
        <Route path='/posted-jobs/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><PostedJobPage /></ProtectedRoute>} />
        <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><PostJobPage /></ProtectedRoute>} />
        <Route path='/signup' element={<PublicRoute><SignUpPage /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><SignUpPage /></PublicRoute>} />
        <Route path='/profile' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN', 'EMPLOYER']}><ProfilePage /></ProtectedRoute>} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
}
export default AppRoutes;