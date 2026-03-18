import { useState, useContext, useEffect } from 'react'
import { ThemeContext } from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import "./css/Public/Homepage.css"
import "./css/Public/FamilyLaws.css"


import "./css/Components/Navbar.css"
import "./css/Components/Footer.css"

import "./css/Components/FloatingActionButton.css"
import "./css/Error/Error404.css"




import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActionButton from './components/FloatingActionButton';
import Homepage from './pages/Public/Homepage';
import FamilyLaws from './pages/Public/FamilyLaws';


import Error404 from './components/Error/Error404';



function App() {
  const { isDarkMode } = useContext(ThemeContext);
  // const token1 = localStorage.getItem('adminToken');

  return (
    <>
          <div className={isDarkMode ? 'dark' : 'light'}>
         <Router>

          {/* {token1 ? <AdminNavbar /> : <Navbar />} */}
          {/* <AdminSidebar /> */}
        
          <FloatingActionButton />
<Navbar />
          {/* <AdminNavSidebar /> */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/family-laws" element={<FamilyLaws />} />
           
          
            <Route path="*" element={<Error404 />} />
          </Routes>

          <Footer />
        </Router>
      </div>
    </>
  )
}

export default App
