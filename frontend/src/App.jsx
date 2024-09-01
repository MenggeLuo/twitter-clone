import './output.css'
import React, { useState } from 'react'
//import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import SignUpPage from './pages/auth/signup/SignUpPage'
import LoginPage from './pages/auth/login/LoginPage'
import NotificationPage from './pages/notification/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'

import Sidbar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner'

function App() {
  const { data:authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        if (data.error) return null
        if (!res.ok) throw new Error(data.error || 'Fail to fetch user')
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    retry: false  
  })
  if (isLoading) {
    return <div className='h-screen flex justify-center items-center'>
      <LoadingSpinner size='large' />
    </div>
  }
  
 

  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* Common components */}
      {authUser && <Sidbar />}
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to = '/login' />} />
        <Route path='/signup' element={!authUser ?<SignUpPage /> : <Navigate to = '/' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to = '/' />} />
        <Route path='/notifications' element={!authUser ? <NotificationPage /> : <Navigate to = '/' /> } />
        <Route path='/profile/:username' element={!authUser ? <ProfilePage /> : <Navigate to = '/' />} />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>

  );
}

export default App;
