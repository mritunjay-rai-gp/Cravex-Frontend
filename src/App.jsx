import { useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import Signup from './components/Signup'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Help from './components/Help'
import Contact from './components/ContactUs'
import OtpVerify from './components/OtpVerify'
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router'
import About from './components/About'
import PublicLayout from './components/layouts/PublicLayout'
import DashboardLayout from './components/layouts/DashboardLayout'
import UserProfile from './components/UserProflie'
import AddRecipe from './components/AddRecipe'
import RecipeDetail from './components/RecipeDetail'
import Favorites from './components/Favourites'
import MyRecipes from './components/MyRecipes'
import EditRecipe from './components/Edit'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>

  <Routes>

      {/* PUBLIC LAYOUT ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Loading />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otpVerify" element={<OtpVerify />} />
      </Route>

      {/* DASHBOARD LAYOUT ROUTES */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/:userName" element={<UserProfile />} />
        <Route path="/add-recipe" element={<AddRecipe />} /> 
        <Route path='/recipe/:id' element={<RecipeDetail/>}/>
        <Route path='/favourites' element={<Favorites/>}/>
        <Route path='/my-recipes' element={<MyRecipes/>}/>
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />

      </Route>

    </Routes>

    </>

  )
}

export default App
