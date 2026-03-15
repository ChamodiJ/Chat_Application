import React from 'react' // imports React
import { Route, Routes } from 'react-router-dom' // imports routing components
import HomePage from './pages/HomePage' // imports Home page
import LoginPage from './pages/LoginPage' // imports Login page
import ProfilePage from './pages/ProfilePage' // imports Profile page

const App = () => { // creates App component
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain"> {/* main div with background image */}
      <Routes> {/* wrapper for all routes */}
        <Route path='/' element={<HomePage />} /> {/* shows HomePage for / */}
        <Route path='/login' element={<LoginPage />} /> {/* shows LoginPage for /login */}
        <Route path='/profile' element={<ProfilePage />} /> {/* shows ProfilePage for /profile */}
      </Routes>
    </div>
  )
}

export default App // exports App component