import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import PublishItem from './pages/PublishItem'
import UserProfile from './pages/UserProfile'
import SellerProfile from './pages/SellerProfile'
import Chat from './pages/Chat'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorar" element={<Explore />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/publicar" element={<PublishItem />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/vendedor/:id" element={<SellerProfile />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App