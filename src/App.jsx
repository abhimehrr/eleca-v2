import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layouts
import HomeLayout from './pages/HomeLayout'
import AdminLayout from './pages/AdminLayout'

// Home Pages
import Home from './pages/home/Home'
import Payment from './pages/home/Payment'
import Login from './pages/home/Login'
import ServiceDetails from './pages/home/ServiceDetails'
import WarrantyCard from './pages/home/WarrantyCard'
import TermsAndConditions from './pages/TermsAndConditions'

// Admin Pages
import Dashboard from './pages/admin/Dashboard'
import ServiceProcess from './pages/admin/ServiceProcess'
import NewService from './pages/admin/NewService'
import PriceList from './pages/admin/PriceList'
import AddProduct from './pages/admin/AddProduct'
import WarrantyCards from './pages/admin/WarrantyCards'
import WarrantyInfo from './pages/admin/WarrantyInfo'
import AddWarranty from './pages/admin/AddWarranty'

// Error
import Error from './pages/Error'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path='/' element={<HomeLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/pay' element={<Payment />} />
          <Route path='/login' element={<Login />} />
          <Route path='/service-request/:id' element={<ServiceDetails />} />
          <Route path='/warranty-card' element={<WarrantyCard />} />
          <Route path='/term-and-conditions' element={<TermsAndConditions />} />
        </Route>

        {/* Admin */}
        <Route path='/admin' element={<AdminLayout />}>
          {/* Services */}
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/new-service-request' element={<NewService />} />
          <Route path='/admin/view-service-details/:id' element={<ServiceProcess />} />
          {/* Price List */}
          <Route path='/admin/price-list' element={<PriceList />} />
          <Route path='/admin/add-a-product' element={<AddProduct />} />
          {/* Warranty Cards */}
          <Route path='/admin/all-warranty-cards' element={<WarrantyCards />} />
          <Route path='/admin/warranty-info/:id' element={<WarrantyInfo />} />
          <Route path='/admin/register-a-warranty' element={<AddWarranty />} />
        </Route>

        {/* Handle Error 404 */}
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
