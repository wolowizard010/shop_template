import { Routes, Route } from 'react-router-dom'
import Navbar       from './components/Navbar'
import Landing      from './pages/Landing'
import Products     from './pages/Products'
import Checkout     from './pages/Checkout'
import Confirmation from './pages/Confirmation'

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/"                      element={<Landing />} />
                <Route path="/products"              element={<Products />} />
                <Route path="/checkout"              element={<Checkout />} />
                <Route path="/confirmation/:orderId" element={<Confirmation />} />
            </Routes>
        </>
    )
}