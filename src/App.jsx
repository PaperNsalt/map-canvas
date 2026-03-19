import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import EditorPage from './pages/Editor'
import GalleryPage from './pages/Gallery'
import AboutPage from './pages/About'

import Navbar from './components/Navbar'

import './App.css'
import './index.css'

function App() {

  return (
  <>
  <Navbar/>
  <Routes>
    <Route  path='/' element={<HomePage />}/>
    <Route  path='editor' element={<EditorPage />}/>
    <Route  path='gallery' element={<GalleryPage />}/>
    <Route  path='about' element={<AboutPage />}/>
  </Routes>
  </>
  )
}

export default App
